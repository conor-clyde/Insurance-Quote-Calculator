package scratch

/**
 * Quote class handles the calculation of insurance premiums based on customer data.
 * Implements complex business rules for discounts, penalties, and final premium calculation.
 */
class Quote {
  
  // Data models
  private var _customer: Customer as NewCustomer
  private var _address: Address as NewAddress
  private var _vehicle: Vehicle as NewVehicle
  private var _drivingHistory: DrivingHistory as NewDrivingHistory
  private var _claimsHistory: ClaimsHistory as NewClaimsHistory
  
  // Calculation results
  private var _discounts: double as Discounts
  private var _penalties: double as Penalties
  private var _totalPremium: double as TotalPremium

  /**
   * Default constructor.
   */
  construct() {}

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
  }

  /**
   * Calculates total discounts based on customer profile and address.
   * 
   * @return Total discount percentage as a decimal
   */
  function calcDiscounts(): double {
    var discount = 0.0

    // Professional occupation discount (10%)
    if (_customer.Occupation.equals("Doctor") || 
        _customer.Occupation.equals("Nurse") || 
        _customer.Occupation.equals("Teacher")) {
      discount += 0.10
    }

    // Driving experience discount (5% for 5+ years)
    if (_customer.DrivingYears >= 5) {
      discount += 0.05
    }

    // Postcode-based discount
    discount += _address.calcPostcodeDis()

    return discount
  }

  /**
   * Calculates total penalties based on risk factors.
   * 
   * @return Total penalty percentage as a decimal
   */
  function calcPenalties(): double {
    var penalty = 0.0

    // Driving history penalties
    penalty += _drivingHistory.calcDrivingPenalty()
    
    // Claims history penalties
    penalty += _claimsHistory.calcClaimsPenalty()
    
    // Vehicle-based penalties
    penalty += _vehicle.calculateVehiclePremium()
    
    // Address-based penalties
    penalty += _address.calcPostcodePel()

    return penalty
  }

  /**
   * Calculates the final insurance premium including all factors.
   * Applies minimum premium, discounts, penalties, and IPT.
   */
  function calcPremium() {
    // Calculate discounts and penalties
    Discounts = calcDiscounts()
    _penalties = calcPenalties()
    
    // Calculate base premium with adjustments
    TotalPremium = Constants.MIN_PREMIUM + 
                   (Constants.MIN_PREMIUM * _penalties) - 
                   (Constants.MIN_PREMIUM * Discounts)

    // Ensure minimum premium is maintained
    if (TotalPremium < 300) {
      TotalPremium = 300
    }

    // Add Insurance Premium Tax (IPT)
    TotalPremium += TotalPremium * Constants.IPT
  }
}
