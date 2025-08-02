package domain

uses constants.Constants

/**
 * ClaimsHistory data model for the insurance quote process.
 * 
 * Stores fault and non-fault accident counts.
 */
class ClaimsHistory {
  var _nonFaultAccidents : int as NonFaultAccidents
  var _faultAccidents : int as FaultAccidents

  /**
   * Default constructor initializes with zero accidents.
   */
  construct() {
    _nonFaultAccidents = 0
    _faultAccidents = 0
  }

  /**
   * Constructor with claims history details.
   * 
   * @param nonFaultAccidents Number of non-fault accidents in past 5 years
   * @param faultAccidents Number of fault accidents in past 5 years
   */
  construct (nonFaultAccidents : int, faultAccidents : int) {
    _nonFaultAccidents = nonFaultAccidents
    _faultAccidents = faultAccidents
  }



  /**
   * Validates that claims history meets insurance requirements.
   * Maximum 3 non-fault accidents and maximum 2 fault accidents allowed.
   * 
   * @return Boolean indicating if claims history is acceptable
   */
  function isClaimHistoryValid() : boolean {
    return NonFaultAccidents <= Constants.MAX_NON_FAULT_ACCIDENTS && FaultAccidents < Constants.DECLINE_FAULT_ACCIDENTS;
  }

  /**
   * Calculates premium penalty based on fault accidents.
   * 1 fault accident: 50% penalty, 2 fault accidents: 100% penalty.
   * 
   * @return Penalty percentage as a decimal (0.0, 0.5, or 1.0)
   */
  function calcClaimsPenalty() : double {
    switch (_faultAccidents) {
      case 1:
        return 0.5
      case 2:
        return 1.0
      default:
        return 0   
    }
  }
  
  /**
   * Prints claims history information in a formatted display.
   * Used for user confirmation during quote process.
   */
  function printInfo() {
    print("Non-Fault Accidents: ${_nonFaultAccidents}")
    print("Fault Accidents: ${_faultAccidents}")
  }
  
  /**
   * Returns a formatted string representation of claims history.
   * 
   * @return Formatted claims history string
   */
    override function toString() : String {
      return "Non Fault Accidents: ${_nonFaultAccidents}, Fault Accidents: ${_faultAccidents}"
  }
  
  /**
   * Validates that accident counts are non-negative.
   * 
   * @return Boolean indicating if claims data is valid
   */
  function isValid() : boolean {
    return NonFaultAccidents >= 0 && FaultAccidents >= 0
  }
}
