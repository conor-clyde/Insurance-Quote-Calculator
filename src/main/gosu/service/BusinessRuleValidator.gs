package service

uses java.time.LocalDate
uses java.time.Period
uses util.InputHandler
uses domain.Customer
uses domain.Address
uses domain.Vehicle
uses domain.DrivingHistory
uses domain.ClaimsHistory
uses constants.Constants
uses domain.PreQualResult

/**
 * BusinessRuleValidator validates business rules for insurance quote eligibility and pricing.
 * 
 * This class centralizes all business rule logic, including pre-qualification, risk assessment,
 * and eligibility checks. It ensures that all quotes comply with company policy and regulatory requirements.
 */
class BusinessRuleValidator {
  private var _inputHandler: InputHandler

  construct(inputHandler: InputHandler) {
    _inputHandler = inputHandler
  }

  /**
   * Performs pre-qualification checks to determine if customer is eligible for quotes.
   * 
   * @return PreQualResult if eligible, null if declined or cancelled
   */
  function performPreQualification(): PreQualResult {
    print("Pre-Qualification Check:")
    print("------------------------")
    
    var dob = collectAndValidateDateOfBirth()
    if (dob == null) {
      return null
    }
    
    var occupation = collectAndValidateOccupation()
    if (occupation == null) {
      return null
    }
    
    var postcode = collectAndValidatePostcode()
    if (postcode == null) {
      return null
    }
    
    var riskData = collectRiskAssessmentData()
    if (riskData == null) {
      return null
    }
    
    if (!validateRiskAssessment(riskData)) {
      return null
    }
    
    print("Pre-qualification passed! Proceeding to quote calculation...")
    print("")
    return new PreQualResult(dob, occupation, postcode, riskData.faultAccidents, riskData.nonFaultAccidents, riskData.penaltyPoints, riskData.nonMotorConvictions)
  }

  /**
   * Risk assessment data structure for better organization.
   */
  class RiskAssessmentData {
    var hasManyPenaltyPoints: boolean
    var hasNonMotorConvictions: boolean
    var penaltyPoints: int
    var nonMotorConvictions: int
    var nonFaultAccidents: int
    var faultAccidents: int
    
    construct(manyPenaltyPoints: boolean, hasConvictions: boolean, penaltyPointsCount: int, convictionsCount: int, nonFault: int, fault: int) {
      this.hasManyPenaltyPoints = manyPenaltyPoints
      this.hasNonMotorConvictions = hasConvictions
      this.penaltyPoints = penaltyPointsCount
      this.nonMotorConvictions = convictionsCount
      this.nonFaultAccidents = nonFault
      this.faultAccidents = fault
    }
  }

  /**
   * Collects all risk assessment data in one place.
   * 
   * @return RiskAssessmentData object or null if cancelled
   */
  private function collectRiskAssessmentData(): RiskAssessmentData {
    // Penalty points - ask for actual count
    var penaltyPoints = ValidationEngine.getValidatedInt("How many penalty points do you have on your licence?", _inputHandler, 0, null)
    if (penaltyPoints == null) {
      return null 
    }
    var hasManyPenaltyPoints = penaltyPoints > Constants.MAX_PENALTY_POINTS
    
    // Non-motoring convictions - ask for actual count
    var nonMotorConvictions = ValidationEngine.getValidatedInt("How many non-motoring convictions do you have in the past 5 years?", _inputHandler, 0, null)
    if (nonMotorConvictions == null) {
      return null 
    }
    var hasNonMotorConvictions = nonMotorConvictions > 0
    
    // Accident numbers
    var nonFaultAccidents = ValidationEngine.getValidatedInt("How many non-fault accidents have you had in the past 5 years?", _inputHandler)
    if (nonFaultAccidents == null) {
      return null 
    }
    
    var faultAccidents = ValidationEngine.getValidatedInt("How many fault accidents have you had in the past 5 years?", _inputHandler)
    if (faultAccidents == null) {
      return null 
    }
    
    return new RiskAssessmentData(hasManyPenaltyPoints, hasNonMotorConvictions, penaltyPoints, nonMotorConvictions, nonFaultAccidents, faultAccidents)
  }

  /**
   * Validates risk assessment data against business rules.
   * 
   * @param riskData RiskAssessmentData to validate
   * @return Boolean indicating if risk assessment passes
   */
  private function validateRiskAssessment(riskData: RiskAssessmentData): boolean {
    // Check penalty points
    if (riskData.hasManyPenaltyPoints) {
      print("Sorry, you have too many penalty points to qualify.")
      return false
    }
    
    // Check non-motoring convictions
    if (riskData.hasNonMotorConvictions) {
      print("Sorry, non-motoring convictions make you ineligible for quotes.")
      return false
    }
    
    // Check non-fault accidents
    if (riskData.nonFaultAccidents > Constants.MAX_NON_FAULT_ACCIDENTS) {
      print("Sorry, you have too many non-fault accidents to qualify.")
      return false
    }
    
    // Check fault accidents
    if (riskData.faultAccidents >= Constants.DECLINE_FAULT_ACCIDENTS) {
      print("Sorry, you have too many fault accidents to qualify.")
      return false
    }
    
    return true
  }

  /**
   * Collects and validates date of birth.
   * 
   * @return LocalDate if valid, null if cancelled
   */
  private function collectAndValidateDateOfBirth(): LocalDate {
    var dob: LocalDate = null
    var age = 0
    
    while (true) {
      dob = ValidationEngine.getValidatedDate("What is your date of birth?", _inputHandler)
      if (dob == null) {
        return null
      }
      
      if (!ValidationEngine.isDateNotInFuture(dob) || !ValidationEngine.isDateReasonable(dob)) {
        print("Invalid date. Please enter a date not in the future and not too far in the past.")
        continue
      }
      
      age = Period.between(dob, LocalDate.now()).getYears()
      if (age < Constants.MIN_AGE || age > Constants.MAX_AGE) {
        print("Sorry, you must be between ${Constants.MIN_AGE} and ${Constants.MAX_AGE} years old to qualify for insurance.")
        continue
      }
      
      break
    }
    
    return dob
  }

  /**
   * Collects and validates occupation with business rules.
   * 
   * @return String occupation if valid, null if declined
   */
  private function collectAndValidateOccupation(): String {
    var occupation: String = null
    
    while (true) {
      occupation = _inputHandler.askStringQuestion("What is your occupation?")
      if (occupation == null) {
        return null 
      }
      occupation = occupation.trim()
      if (occupation.length() == 0 || occupation.length() > 40 || !occupation.matches("[a-zA-Z -]+")) {
        print("Invalid occupation. Please enter a valid occupation (letters, spaces, up to 40 characters). Try again.")
        continue
      }
      
      if (occupation.toLowerCase() == "professional gambler") {
        print("Sorry, professional gamblers are not eligible for quotes.")
        return null
      }
      
      break
    }
    
    return occupation
  }

  /**
   * Collects and validates postcode with business rules.
   * 
   * @return String postcode if valid, null if declined
   */
  private function collectAndValidatePostcode(): String {
    // Use the same validation logic as ValidationEngine.getValidatedPostcode()
    return ValidationEngine.getValidatedPostcode("What is your postcode?", _inputHandler)
  }

  /**
   * Validates customer data against business rules.
   * 
   * @param customer Customer object to validate
   * @return Boolean indicating if customer meets all business rules
   */
  function validateCustomerBusinessRules(customer: Customer): boolean {
    
    if (!customer.validateAge()) {
      print("Error: Age must be between ${Constants.MIN_AGE} and ${Constants.MAX_AGE} years (you are ${customer.Age})")
      return false
    }
    
    if (!customer.validateDrivingYears()) {
      print("Error: Driving years must be positive and reasonable (you have ${customer.DrivingYears} years)")
      return false
    }
    
    if (!customer.validateOccupation()) {
      print("Error: Professional gamblers are not eligible")
      return false
    }
    
    if (!customer.validateDates()) {
      print("Error: Date of licence must be after date of birth")
      return false
    }
    
    return true
  }

  /**
   * Validates address data against business rules.
   * 
   * @param address Address object to validate
   * @return Boolean indicating if address meets business rules
   */
  function validateAddressBusinessRules(address: Address): boolean {
    
    if (!address.Postcode.startsWith("BT47") && !address.Postcode.startsWith("BT48")) {
      print("Error: Sorry, we only provide quotes for BT47/BT48 postcodes.")
      print("Your postcode: ${address.Postcode}")
      return false
    }
    
    return true
  }

  /**
   * Validates vehicle data against business rules.
   * 
   * @param vehicle Vehicle object to validate
   * @return Boolean indicating if vehicle meets business rules
   */
  function validateVehicleBusinessRules(vehicle: Vehicle): boolean {
    
    var coveredVehicles = {"Ford Focus", "BMW 3 Series", "Tesla Model S", "Ferrari F430", "Rolls Royce Phantom"}
    
    if (!coveredVehicles.contains(vehicle.Make)) {
      print("Error: Sorry, we don't provide coverage for ${vehicle.Make}.")
      print("We only cover: Ford Focus, BMW 3 Series, Tesla Model S, Ferrari F430, Rolls Royce Phantom")
      return false
    }
    
    // Check tracker requirement for high-value vehicles
    if (vehicle.Value > Constants.TRACKER_REQUIRED_VALUE && !vehicle.HasTracker) {
      print("Error: Vehicles worth over GBP${Constants.TRACKER_REQUIRED_VALUE} must have a tracking device.")
      return false
    }
    
    return true
  }

  /**
   * Validates driving history against business rules.
   * 
   * @param drivingHistory DrivingHistory object to validate
   * @return Boolean indicating if driving history meets business rules
   */
  function validateDrivingHistoryBusinessRules(drivingHistory: DrivingHistory): boolean {
    
    if (drivingHistory.PenaltyPoints > Constants.MAX_PENALTY_POINTS) {
      print("Error: Sorry, you have too many penalty points (${drivingHistory.PenaltyPoints}) to qualify for insurance.")
      print("We cannot provide quotes for drivers with more than ${Constants.MAX_PENALTY_POINTS} penalty points.")
      return false
    }
    
    if (drivingHistory.NonMotorConvictions > 0) {
      print("Error: Sorry, you have non-motoring convictions which make you ineligible for insurance.")
      print("We cannot provide quotes for drivers with non-motoring convictions.")
      return false
    }
    
    return true
  }

  /**
   * Validates claims history against business rules.
   * 
   * @param claimsHistory ClaimsHistory object to validate
   * @return Boolean indicating if claims history meets business rules
   */
  function validateClaimsHistoryBusinessRules(claimsHistory: ClaimsHistory): boolean {
    
    if (claimsHistory.FaultAccidents >= Constants.DECLINE_FAULT_ACCIDENTS) {
      print("Error: Sorry, you have too many fault accidents (${claimsHistory.FaultAccidents}) to qualify for insurance.")
      print("We cannot provide quotes for drivers with ${Constants.DECLINE_FAULT_ACCIDENTS} or more fault accidents.")
      return false
    }
    
    if (claimsHistory.NonFaultAccidents > Constants.MAX_NON_FAULT_ACCIDENTS) {
      print("Error: Sorry, you have too many non-fault accidents (${claimsHistory.NonFaultAccidents}) to qualify for insurance.")
      print("We cannot provide quotes for drivers with more than ${Constants.MAX_NON_FAULT_ACCIDENTS} non-fault accidents.")
      return false
    }
    
    return true
  }
} 