package service;

import java.time.LocalDate;
import java.time.Period;
import util.InputHandler;
import domain.Customer;
import domain.Address;
import domain.Vehicle;
import domain.DrivingHistory;
import domain.ClaimsHistory;
import domain.PreQualResult;
import constants.Constants;
import java.util.HashMap;
import java.util.Map;

/**
 * BusinessRuleValidator validates business rules for insurance quote eligibility and pricing.
 * 
 * This class centralizes all business rule logic, including pre-qualification, risk assessment,
 * and eligibility checks. It ensures that all quotes comply with company policy and regulatory requirements.
 */
public class BusinessRuleValidator {
    private InputHandler inputHandler;

    public BusinessRuleValidator(InputHandler inputHandler) {
        this.inputHandler = inputHandler;
    }

    /**
     * Performs pre-qualification checks to determine if customer is eligible for quotes.
     * 
     * @return PreQualResult if eligible, null if declined or cancelled
     */
    public PreQualResult performPreQualification() {
        System.out.println("Pre-Qualification Check:");
        System.out.println("------------------------");
        
        LocalDate dob = collectAndValidateDateOfBirth();
        if (dob == null) {
            return null;
        }
        
        String occupation = collectAndValidateOccupation();
        if (occupation == null) {
            return null;
        }
        
        String postcode = collectAndValidatePostcode();
        if (postcode == null) {
            return null;
        }
        
        Map<String, Integer> riskData = collectRiskAssessmentData();
        if (riskData == null) {
            return null;
        }
        
        if (!validateRiskAssessment(riskData)) {
            return null;
        }
        
        System.out.println("Pre-qualification passed! Proceeding to quote calculation...");
        System.out.println("");
        return new PreQualResult(dob, occupation, postcode, 
                               riskData.get("faultAccidents"), 
                               riskData.get("nonFaultAccidents"), 
                               riskData.get("penaltyPoints"), 
                               riskData.get("nonMotorConvictions"));
    }

    /**
     * Collects all risk assessment data in one place.
     * 
     * @return Map with risk data or null if cancelled
     */
    private Map<String, Integer> collectRiskAssessmentData() {
        // Penalty points - ask for actual count
        Integer penaltyPoints = getValidatedInt("How many penalty points do you have on your licence?", 0, null);
        if (penaltyPoints == null) {
            return null; 
        }
        
        // Non-motoring convictions - ask for actual count
        Integer nonMotorConvictions = getValidatedInt("How many non-motoring convictions do you have in the past 5 years?", 0, null);
        if (nonMotorConvictions == null) {
            return null; 
        }
        
        // Accident numbers
        Integer nonFaultAccidents = getValidatedInt("How many non-fault accidents have you had in the past 5 years?", 0, null);
        if (nonFaultAccidents == null) {
            return null; 
        }
        
        Integer faultAccidents = getValidatedInt("How many fault accidents have you had in the past 5 years?", 0, null);
        if (faultAccidents == null) {
            return null; 
        }
        
        Map<String, Integer> riskData = new HashMap<>();
        riskData.put("penaltyPoints", penaltyPoints);
        riskData.put("nonMotorConvictions", nonMotorConvictions);
        riskData.put("nonFaultAccidents", nonFaultAccidents);
        riskData.put("faultAccidents", faultAccidents);
        
        return riskData;
    }

    /**
     * Validates risk assessment data against business rules.
     */
    private boolean validateRiskAssessment(Map<String, Integer> riskData) {
        int penaltyPoints = riskData.get("penaltyPoints");
        int nonMotorConvictions = riskData.get("nonMotorConvictions");
        int nonFaultAccidents = riskData.get("nonFaultAccidents");
        int faultAccidents = riskData.get("faultAccidents");

        // Check penalty points
        if (penaltyPoints > Constants.MAX_PENALTY_POINTS) {
            System.out.println("Sorry, you have too many penalty points for coverage.");
            return false;
        }

        // Check non-motor convictions
        if (nonMotorConvictions > Constants.DECLINE_NON_MOTOR_CONVICTIONS) {
            System.out.println("Sorry, you have too many non-motoring convictions for coverage.");
            return false;
        }

        // Check accident history
        if (nonFaultAccidents > Constants.MAX_NON_FAULT_ACCIDENTS) {
            System.out.println("Sorry, you have too many non-fault accidents for coverage.");
            return false;
        }

        if (faultAccidents > Constants.MAX_FAULT_ACCIDENTS) {
            System.out.println("Sorry, you have too many fault accidents for coverage.");
            return false;
        }

        return true;
    }

    /**
     * Collects and validates date of birth.
     */
    private LocalDate collectAndValidateDateOfBirth() {
        System.out.println("Please enter your date of birth (YYYY-MM-DD format):");
        String dateStr = inputHandler.askStringQuestion("Date of birth:");
        if (dateStr == null) {
            return null;
        }

        try {
            LocalDate dob = LocalDate.parse(dateStr);
            LocalDate today = LocalDate.now();
            Period age = Period.between(dob, today);
            
            if (age.getYears() < Constants.MIN_AGE || age.getYears() > Constants.MAX_AGE) {
                System.out.println("Sorry, you must be between " + Constants.MIN_AGE + " and " + Constants.MAX_AGE + " years old for coverage.");
                return null;
            }
            
            return dob;
        } catch (Exception e) {
            System.out.println("Invalid date format. Please use YYYY-MM-DD format.");
            return collectAndValidateDateOfBirth();
        }
    }

    /**
     * Collects and validates occupation.
     */
    private String collectAndValidateOccupation() {
        while (true) {
            String occupation = inputHandler.askStringQuestion("What is your occupation?");
            if (occupation == null) {
                return null;
            }
            
            if (occupation.toLowerCase().equals("professional gambler")) {
                System.out.println("Sorry, we cannot provide coverage for professional gamblers.");
                System.out.println("Please try again with a different occupation.");
            } else {
                return occupation;
            }
        }
    }

    /**
     * Collects and validates postcode.
     */
    private String collectAndValidatePostcode() {
        while (true) {
            String postcode = inputHandler.askStringQuestion("What is your postcode?");
            if (postcode == null) {
                return null;
            }
            
            String prefix = postcode.substring(0, Math.min(4, postcode.length())).toUpperCase();
            boolean isValid = false;
            for (String validPrefix : Constants.VALID_POSTCODE_PREFIXES) {
                if (prefix.equals(validPrefix)) {
                    isValid = true;
                    break;
                }
            }
            
            if (isValid) {
                return postcode;
            } else {
                System.out.println("Sorry, we only provide coverage for BT47 and BT48 postcodes.");
                System.out.println("Please try again with a valid postcode.");
            }
        }
    }

    /**
     * Gets validated integer input from user.
     */
    private Integer getValidatedInt(String prompt, Integer min, Integer max) {
        return inputHandler.askIntQuestion(prompt, min, max);
    }
}
