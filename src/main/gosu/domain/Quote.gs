package domain

uses java.text.DecimalFormat
uses java.util.List
uses constants.Constants

/**
 * Quote data model for insurance quotes, including premium calculation logic.
 * 
 * Stores all relevant data and provides methods for calculating and validating premiums.
 */
class Quote {	
  
  // ============================================================================
  // DATA MODELS
  // ============================================================================
  private var _customer: Customer as NewCustomer
  private var _address: Address as NewAddress
  private var _vehicle: Vehicle as NewVehicle
  private var _drivingHistory: DrivingHistory as NewDrivingHistory
  private var _claimsHistory: ClaimsHistory as NewClaimsHistory
  
  // ============================================================================
  // CALCULATION RESULTS
  // ============================================================================
  private var _discounts: double as Discounts
  private var _penalties: double as Penalties
  private var _totalPremium: double as TotalPremium
  private var _calculationErrors: List<String> as CalculationErrors
  private var _isValid: boolean as IsValid

  // ============================================================================
  // CONSTRUCTORS
  // ============================================================================
  
  /**
   * Default constructor.
   */
  construct() {
    _calculationErrors = new ArrayList<String>()
    _isValid = false
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
  construct(customer: Customer, address: Address, drivingHistory: DrivingHistory, 
            claimsHistory: ClaimsHistory, vehicle: Vehicle) {
    _customer = customer
    _address = address
    _drivingHistory = drivingHistory
    _claimsHistory = claimsHistory
    _vehicle = vehicle
    _calculationErrors = new ArrayList<String>()
    _isValid = validateInputData()
  }

  // ============================================================================
  // VALIDATION METHODS
  // ============================================================================
  
  /**
   * Validates all input data before calculation.
   * 
   * @return true if all data is valid, false otherwise
   */
  private function validateInputData(): boolean {
    _calculationErrors.clear()
    
    if (_customer == null) {
      _calculationErrors.add("Customer data is missing")
      return false
    }
    
    if (_address == null) {
      _calculationErrors.add("Address data is missing")
      return false
    }
    
    if (_vehicle == null) {
      _calculationErrors.add("Vehicle data is missing")
      return false
    }
    
    if (_drivingHistory == null) {
      _calculationErrors.add("Driving history data is missing")
      return false
    }
    
    if (_claimsHistory == null) {
      _calculationErrors.add("Claims history data is missing")
      return false
    }
    
    // Validate customer data
    if (!_customer.isValidCustomer()) {
      _calculationErrors.add("Customer data validation failed")
      if (!_customer.validateAge()) {
        _calculationErrors.add("  - Age validation failed: ${_customer.Age} years old")
      }
      if (!_customer.validateDrivingYears()) {
        _calculationErrors.add("  - Driving years validation failed: ${_customer.DrivingYears} years driving (age: ${_customer.Age})")
      }
      if (!_customer.validateOccupation()) {
        _calculationErrors.add("  - Occupation validation failed")
      }
      if (!_customer.validateDates()) {
        _calculationErrors.add("  - Date validation failed")
      }
      return false
    }
    
    // Validate vehicle data
    if (_vehicle.Value < Constants.MIN_VEHICLE_VALUE || _vehicle.Value > Constants.MAX_VEHICLE_VALUE) {
      _calculationErrors.add(Constants.ERROR_VEHICLE_VALUE)
      return false
    }
    
    return true
  }

  // ============================================================================
  // DISCOUNT CALCULATIONS
  // ============================================================================
  
  /**
   * Calculates all applicable discounts for the customer.
   * 
   * @return Total discount rate as a decimal (e.g., 0.15 for 15%)
   */
  function calcDiscounts(): double {
    var totalDiscount = 0.0
    
    // Professional occupation discount
    totalDiscount += calculateProfessionalDiscount()
    
    // Driving experience discount
    totalDiscount += calculateExperienceDiscount()
    
    // Postcode discount
    totalDiscount += calculatePostcodeDiscount()
    
    // Ensure discount doesn't exceed 100%
    return Math.min(totalDiscount, 1.0)
  }
  
  /**
   * Calculates professional occupation discount.
   */
  private function calculateProfessionalDiscount(): double {
    if (_customer.Occupation == null) return 0.0
    
    var occupation = _customer.Occupation.toLowerCase().trim()
    if (Constants.OCCUPATION_DISCOUNT_LIST.contains(occupation)) {
      return Constants.PROFESSIONAL_DISCOUNT_RATE
    }
    return 0.0
  }
  
  /**
   * Calculates driving experience discount.
   */
  private function calculateExperienceDiscount(): double {
    if (_customer.DrivingYears >= Constants.EXPERIENCE_DISCOUNT_THRESHOLD) {
      return Constants.EXPERIENCE_DISCOUNT_RATE
    }
    return 0.0
  }
  
  /**
   * Calculates postcode-based discount.
   */
  private function calculatePostcodeDiscount(): double {
    if (_address.Postcode.startsWith("BT47")) {
      return Constants.POSTCODE_DISCOUNT_BT47
    }
    return 0.0
  }

  // ============================================================================
  // PENALTY CALCULATIONS
  // ============================================================================
  
  /**
   * Calculates all applicable penalties for the customer.
   * 
   * @return Total penalty rate as a decimal (e.g., 0.25 for 25%)
   */
  function calcPenalties(): double {
    var totalPenalty = 0.0
    
    // Vehicle-specific penalty
    totalPenalty += getVehicleMultiplier()
    
    // Postcode surcharge
    totalPenalty += calculatePostcodeSurcharge()
    
    // Penalty points surcharge
    totalPenalty += calculatePenaltyPointsSurcharge()
    
    // Accident history surcharge
    totalPenalty += calculateAccidentSurcharge()
    
    return totalPenalty
  }
  
  /**
   * Calculates vehicle-specific premium multiplier.
   */
  private function getVehicleMultiplier(): double {
    if (_vehicle.Make == null || _vehicle.Model == null) return 0.0
    
    var makeModel = "${_vehicle.Make.trim()} ${_vehicle.Model.trim()}"
    
    switch (makeModel) {
      case "Ford Focus":
        return Constants.VEHICLE_MULTIPLIER_FOCUS
      case "BMW 3 Series":
        return Constants.VEHICLE_MULTIPLIER_BMW
      case "Tesla Model S":
        return Constants.VEHICLE_MULTIPLIER_TESLA
      case "Ferrari F430":
        return Constants.VEHICLE_MULTIPLIER_FERRARI
      case "Rolls Royce Phantom":
        return Constants.VEHICLE_MULTIPLIER_ROLLS
      default:
        return 0.0
    }
  }
  
  /**
   * Calculates postcode-based surcharge.
   */
  private function calculatePostcodeSurcharge(): double {
    if (_address.Postcode.startsWith("BT48 6")) {
      return Constants.POSTCODE_SURCHARGE_BT486
    } else if (_address.Postcode.startsWith("BT48")) {
      return Constants.POSTCODE_SURCHARGE_BT48
    }
    return 0.0
  }
  
  /**
   * Calculates penalty points surcharge.
   */
  private function calculatePenaltyPointsSurcharge(): double {
    var points = _drivingHistory.PenaltyPoints
    if (points >= Constants.PENALTY_POINTS_HIGH) {
      return Constants.PENALTY_RATE_HIGH
    } else if (points >= Constants.PENALTY_POINTS_THRESHOLD) {
      return Constants.PENALTY_RATE_MEDIUM
    }
    return 0.0
  }
  
  /**
   * Calculates accident history surcharge.
   */
  private function calculateAccidentSurcharge(): double {
    var faultAccidents = _claimsHistory.FaultAccidents
    if (faultAccidents == 1) {
      return 0.5
    } else if (faultAccidents == 2) {
      return 1.0
    }
    return 0.0
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
  function calcPremium(): boolean {
    if (!_isValid) {
      return false
    }
    
    try {
      // Calculate discounts and penalties
      Discounts = calcDiscounts()
      Penalties = calcPenalties()
      
      // Start with base premium
      var basePremium = Constants.MIN_PREMIUM
      
      // Apply discounts
      var discountedPremium = basePremium - (basePremium * Discounts)
      
      // Apply penalties
      var penalizedPremium = discountedPremium + (basePremium * Penalties)
      
      // Ensure minimum premium
      if (penalizedPremium < Constants.MIN_PREMIUM) {
        penalizedPremium = Constants.MIN_PREMIUM
      }
      
      // Apply Insurance Premium Tax
      TotalPremium = penalizedPremium + (penalizedPremium * Constants.IPT)
      
      // Check for excessive premium
      if (TotalPremium > Constants.MAX_PREMIUM_THRESHOLD) {
        _calculationErrors.add("Premium exceeds maximum threshold - manual review required")
        return false
      }
      
      return true
      
    } catch (e: Exception) {
      _calculationErrors.add("Calculation error: ${e.Message}")
      return false
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
  function getErrors(): List<String> {
    return _calculationErrors
  }
  
  /**
   * Returns whether the quote calculation was successful.
   * 
   * @return true if calculation was successful
   */
  function isCalculationSuccessful(): boolean {
    return _isValid && TotalPremium > 0
  }
}
