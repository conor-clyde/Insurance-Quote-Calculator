package domain

uses constants.Constants

/**
 * DrivingHistory data model for the insurance quote process.
 * 
 * Stores penalty points and non-motoring convictions.
 */
class DrivingHistory {
  var _penaltyPoints : int as PenaltyPoints
  var _nonMotorConvictions : int as NonMotorConvictions

  construct() {}
  
  /**
   * Constructor with driving history details.
   * 
   * @param penaltyPoints Number of penalty points on license
   * @param nonMotorConvictions Number of non-motoring convictions
   */
  construct(penaltyPoints: int, nonMotorConvictions : int) {
    _penaltyPoints = penaltyPoints
    _nonMotorConvictions = nonMotorConvictions
  }
  
  /**
   * Validates that driving history meets insurance requirements.
   * Maximum 6 penalty points and maximum 1 non-motoring conviction allowed.
   * 
   * @return Boolean indicating if driving history is acceptable
   */
  function isValidDrivingHistory() : boolean{
    return PenaltyPoints <= Constants.MAX_PENALTY_POINTS && NonMotorConvictions <= Constants.DECLINE_NON_MOTOR_CONVICTIONS;
  }

  /**
   * Calculates premium penalty based on penalty points.
   * 3-5 points: 20% penalty, 6 points: 50% penalty.
   * 
   * @return Penalty percentage as a decimal (0.0, 0.2, or 0.5)
   */
  function calcDrivingPenalty() : double {
    if (PenaltyPoints >= Constants.PENALTY_POINTS_THRESHOLD && PenaltyPoints < Constants.PENALTY_POINTS_HIGH) {
      return Constants.PENALTY_RATE_MEDIUM
    } else if (PenaltyPoints == Constants.PENALTY_POINTS_HIGH) {
      return Constants.PENALTY_RATE_HIGH
  }
  return 0;
  }
  
  /**
   * Prints driving history information in a formatted display.
   * Used for user confirmation during quote process.
   */
  function printInfo() {
    print("Penalty Points: ${_penaltyPoints}")
    print("Non-Motor Convictions: ${_nonMotorConvictions}")
  }
  
  /**
   * Returns a formatted string representation of driving history.
   * 
   * @return Formatted driving history string
   */
  override function toString() : String {
    return "Penalty Points: ${_penaltyPoints}, Non-Motor Convictions: ${_nonMotorConvictions}"
  }
}
 