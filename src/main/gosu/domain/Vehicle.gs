package domain

uses constants.Constants

/**
 * Vehicle data model for the insurance quote process.
 *
 * Stores vehicle details and provides validation and premium calculation methods.
 */
class Vehicle {
  var _make : String as Make
  var _model : String as Model
  var _year : int as Year
  var _reg : String as Reg
  var _value : double as Value
  var _hasTracker : boolean as HasTracker

  /**
   * Default constructor.
   */
  construct() {}
  
  /**
   * Constructor with all vehicle details.
   * 
   * @param make Vehicle make (e.g., "Ford", "BMW")
   * @param model Vehicle model (e.g., "Focus", "3 Series")
   * @param year Manufacturing year
   * @param reg Registration number
   * @param value Vehicle value in pounds
   * @param hasTracker Whether vehicle has tracking device
   */
  construct(make: String, model: String, year: int, reg: String, value: double, hasTracker: boolean) {
    _make = make
    _model = model
    _year = year
    _reg = reg
    _value = value
    _hasTracker = hasTracker
  }


  
    /**
   * Calculates vehicle-specific premium adjustments based on make and model.
   * Higher-value vehicles have higher premium multipliers.
   * 
   * @return Premium multiplier as a decimal (0.0 to 5.0)
   */
  function calculateVehiclePremium() : double {
    switch (Make) {
      case "BMW 3 Series":
      return Constants.VEHICLE_MULTIPLIER_BMW;
      case "Tesla Model S":
      return Constants.VEHICLE_MULTIPLIER_TESLA;
      case "Ferrari F430":
      return Constants.VEHICLE_MULTIPLIER_FERRARI;
      case "Rolls Royce Phantom":
      return Constants.VEHICLE_MULTIPLIER_ROLLS;
      default:
      return Constants.VEHICLE_MULTIPLIER_FOCUS;
    } 
  }
  
  /**
   * Prints vehicle information in a formatted display.
   * Used for user confirmation during quote process.
   */
  function printInfo() {
    print("Make: ${_make}")
    print("Model: ${_model}")
    print("Year: ${_year}")
    print("Registration: ${_reg}")
    print("Value: GBP${_value}")
    print("Has Tracker: ${_hasTracker}")
  }
  
  /**
   * Returns a concise string representation of the vehicle.
   * 
   * @return Formatted vehicle string
   */
  override function toString() : String {
    return "${_make} ${_model} (${_year}) - ${_reg} - GBP${_value}"
  }
  
  /**
   * Validates that all vehicle information is complete and reasonable.
   * 
   * @return Boolean indicating if vehicle data is valid
   */
  function isValid() : boolean {
    return Make != null && !Make.trim().isEmpty() &&
           Model != null && !Model.trim().isEmpty() &&
           Year >= Constants.MIN_VEHICLE_YEAR && Year <= Constants.MAX_VEHICLE_YEAR &&
           Reg != null && !Reg.trim().isEmpty() &&
           Value > 0
   }
}
