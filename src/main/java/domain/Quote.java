package domain;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import constants.Constants;

/**
 * Quote data model for insurance quotes, including premium calculation logic.
 * 
 * Stores all relevant data and provides methods for calculating and validating premiums.
 */
public class Quote {	
    
    // ============================================================================
    // DATA MODELS
    // ============================================================================
    private Customer customer;
    private Address address;
    private Vehicle vehicle;
    private DrivingHistory drivingHistory;
    private ClaimsHistory claimsHistory;
    
    // ============================================================================
    // CALCULATION RESULTS
    // ============================================================================
    private double discounts;
    private double penalties;
    private double totalPremium;
    private List<String> calculationErrors;
    private boolean isValid;

    // ============================================================================
    // CONSTRUCTORS
    // ============================================================================
    
    /**
     * Default constructor.
     */
    public Quote() {
        calculationErrors = new ArrayList<String>();
        isValid = false;
    }

    /**
     * Constructor with all required data models.
     * 
     * @param customer Customer information
     * @param address Address information
     * @param drivingHistory Driving history information
     * @param claimsHistory Claims history information
     * @param vehicle Vehicle information
     */
    public Quote(Customer customer, Address address, DrivingHistory drivingHistory, 
                ClaimsHistory claimsHistory, Vehicle vehicle) {
        this.customer = customer;
        this.address = address;
        this.drivingHistory = drivingHistory;
        this.claimsHistory = claimsHistory;
        this.vehicle = vehicle;
        calculationErrors = new ArrayList<String>();
        isValid = validateInputData();
    }

    // ============================================================================
    // VALIDATION METHODS
    // ============================================================================
    
    /**
     * Validates all input data before calculation.
     * 
     * @return true if all data is valid, false otherwise
     */
    private boolean validateInputData() {
        calculationErrors.clear();
        
        if (customer == null) {
            calculationErrors.add("Customer data is missing");
            return false;
        }
        
        if (address == null) {
            calculationErrors.add("Address data is missing");
            return false;
        }
        
        if (vehicle == null) {
            calculationErrors.add("Vehicle data is missing");
            return false;
        }
        
        if (drivingHistory == null) {
            calculationErrors.add("Driving history data is missing");
            return false;
        }
        
        if (claimsHistory == null) {
            calculationErrors.add("Claims history data is missing");
            return false;
        }
        
        // Validate customer data
        if (!customer.isValidCustomer()) {
            calculationErrors.add("Customer data validation failed");
            if (!customer.validateAge()) {
                calculationErrors.add("  - Age validation failed: " + customer.getAge() + " years old");
            }
            if (!customer.validateDrivingYears()) {
                calculationErrors.add("  - Driving years validation failed: " + customer.getDrivingYears() + " years driving (age: " + customer.getAge() + ")");
            }
            if (!customer.validateOccupation()) {
                calculationErrors.add("  - Occupation validation failed");
            }
            if (!customer.validateDates()) {
                calculationErrors.add("  - Date validation failed");
            }
            return false;
        }
        
        // Validate vehicle data
        if (vehicle.getValue() < Constants.MIN_VEHICLE_VALUE || vehicle.getValue() > Constants.MAX_VEHICLE_VALUE) {
            calculationErrors.add(Constants.ERROR_VEHICLE_VALUE);
            return false;
        }
        
        return true;
    }

    // ============================================================================
    // DISCOUNT CALCULATIONS
    // ============================================================================
    
    /**
     * Calculates all applicable discounts for the customer.
     * 
     * @return Total discount rate as a decimal (e.g., 0.15 for 15%)
     */
    public double calcDiscounts() {
        double totalDiscount = 0.0;
        
        // Professional occupation discount
        totalDiscount += calculateProfessionalDiscount();
        
        // Driving experience discount
        totalDiscount += calculateExperienceDiscount();
        
        // Postcode discount
        totalDiscount += calculatePostcodeDiscount();
        
        // Ensure discount doesn't exceed 100%
        return Math.min(totalDiscount, 1.0);
    }
    
    /**
     * Calculates professional occupation discount.
     */
    private double calculateProfessionalDiscount() {
        if (customer.getOccupation() == null) return 0.0;
        
        String occupation = customer.getOccupation().toLowerCase().trim();
        for (String prof : Constants.OCCUPATION_DISCOUNT_LIST) {
            if (prof.equals(occupation)) {
                return Constants.PROFESSIONAL_DISCOUNT_RATE;
            }
        }
        return 0.0;
    }
    
    /**
     * Calculates driving experience discount.
     */
    private double calculateExperienceDiscount() {
        if (customer.getDrivingYears() >= Constants.EXPERIENCE_DISCOUNT_THRESHOLD) {
            return Constants.EXPERIENCE_DISCOUNT_RATE;
        }
        return 0.0;
    }
    
    /**
     * Calculates postcode-based discount.
     */
    private double calculatePostcodeDiscount() {
        if (address.getPostcode().startsWith("BT47")) {
            return Constants.POSTCODE_DISCOUNT_BT47;
        }
        return 0.0;
    }

    // ============================================================================
    // PENALTY CALCULATIONS
    // ============================================================================
    
    /**
     * Calculates all applicable penalties for the customer.
     * 
     * @return Total penalty rate as a decimal (e.g., 0.25 for 25%)
     */
    public double calcPenalties() {
        double totalPenalty = 0.0;
        
        // Vehicle-specific penalty
        totalPenalty += getVehicleMultiplier();
        
        // Postcode surcharge
        totalPenalty += calculatePostcodeSurcharge();
        
        // Penalty points surcharge
        totalPenalty += calculatePenaltyPointsSurcharge();
        
        // Accident history surcharge
        totalPenalty += calculateAccidentSurcharge();
        
        return totalPenalty;
    }
    
    /**
     * Calculates vehicle-specific premium multiplier.
     */
    private double getVehicleMultiplier() {
        if (vehicle.getMake() == null || vehicle.getModel() == null) return 0.0;
        
        String makeModel = vehicle.getMake().trim() + " " + vehicle.getModel().trim();
        
        switch (makeModel) {
            case "Ford Focus":
                return Constants.VEHICLE_MULTIPLIER_FOCUS;
            case "BMW 3 Series":
                return Constants.VEHICLE_MULTIPLIER_BMW;
            case "Tesla Model S":
                return Constants.VEHICLE_MULTIPLIER_TESLA;
            case "Ferrari F430":
                return Constants.VEHICLE_MULTIPLIER_FERRARI;
            case "Rolls Royce Phantom":
                return Constants.VEHICLE_MULTIPLIER_ROLLS;
            default:
                return 0.0;
        }
    }
    
    /**
     * Calculates postcode-based surcharge.
     */
    private double calculatePostcodeSurcharge() {
        if (address.getPostcode().startsWith("BT48 6")) {
            return Constants.POSTCODE_SURCHARGE_BT486;
        } else if (address.getPostcode().startsWith("BT48")) {
            return Constants.POSTCODE_SURCHARGE_BT48;
        }
        return 0.0;
    }
    
    /**
     * Calculates penalty points surcharge.
     */
    private double calculatePenaltyPointsSurcharge() {
        int points = drivingHistory.getPenaltyPoints();
        if (points >= Constants.PENALTY_POINTS_HIGH) {
            return Constants.PENALTY_RATE_HIGH;
        } else if (points >= Constants.PENALTY_POINTS_THRESHOLD) {
            return Constants.PENALTY_RATE_MEDIUM;
        }
        return 0.0;
    }
    
    /**
     * Calculates accident history surcharge.
     */
    private double calculateAccidentSurcharge() {
        int faultAccidents = claimsHistory.getFaultAccidents();
        if (faultAccidents == 1) {
            return 0.5;
        } else if (faultAccidents == 2) {
            return 1.0;
        }
        return 0.0;
    }

    // ============================================================================
    // PREMIUM CALCULATION
    // ============================================================================
    
    /**
     * Calculates the final insurance premium including all factors.
     * Applies minimum premium, discounts, penalties, and IPT.
     * 
     * @return true if calculation was successful, false otherwise
     */
    public boolean calcPremium() {
        if (!isValid) {
            return false;
        }
        
        try {
            // Calculate discounts and penalties
            discounts = calcDiscounts();
            penalties = calcPenalties();
            
            // Start with base premium
            double basePremium = Constants.MIN_PREMIUM;
            
            // Apply discounts
            double discountedPremium = basePremium - (basePremium * discounts);
            
            // Apply penalties
            double penalizedPremium = discountedPremium + (basePremium * penalties);
            
            // Ensure minimum premium
            if (penalizedPremium < Constants.MIN_PREMIUM) {
                penalizedPremium = Constants.MIN_PREMIUM;
            }
            
            // Apply Insurance Premium Tax
            totalPremium = penalizedPremium + (penalizedPremium * Constants.IPT);
            
            // Check for excessive premium
            if (totalPremium > Constants.MAX_PREMIUM_THRESHOLD) {
                calculationErrors.add("Premium exceeds maximum threshold - manual review required");
                return false;
            }
            
            return true;
            
        } catch (Exception e) {
            calculationErrors.add("Calculation error: " + e.getMessage());
            return false;
        }
    }

    // ============================================================================
    // REPORTING METHODS
    // ============================================================================
    
    /**
     * Returns any calculation errors that occurred.
     * 
     * @return List of error messages
     */
    public List<String> getErrors() {
        return calculationErrors;
    }
    
    /**
     * Returns whether the quote calculation was successful.
     * 
     * @return true if calculation was successful
     */
    public boolean isCalculationSuccessful() {
        return isValid && totalPremium > 0;
    }

    // Getters and Setters
    public Customer getCustomer() { return customer; }
    public void setCustomer(Customer customer) { this.customer = customer; }
    
    public Address getAddress() { return address; }
    public void setAddress(Address address) { this.address = address; }
    
    public Vehicle getVehicle() { return vehicle; }
    public void setVehicle(Vehicle vehicle) { this.vehicle = vehicle; }
    
    public DrivingHistory getDrivingHistory() { return drivingHistory; }
    public void setDrivingHistory(DrivingHistory drivingHistory) { this.drivingHistory = drivingHistory; }
    
    public ClaimsHistory getClaimsHistory() { return claimsHistory; }
    public void setClaimsHistory(ClaimsHistory claimsHistory) { this.claimsHistory = claimsHistory; }
    
    public double getDiscounts() { return discounts; }
    public void setDiscounts(double discounts) { this.discounts = discounts; }
    
    public double getPenalties() { return penalties; }
    public void setPenalties(double penalties) { this.penalties = penalties; }
    
    public double getTotalPremium() { return totalPremium; }
    public void setTotalPremium(double totalPremium) { this.totalPremium = totalPremium; }
    
    public boolean isValid() { return isValid; }
    public void setValid(boolean valid) { isValid = valid; }
}
