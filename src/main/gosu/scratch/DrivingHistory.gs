package scratch

class DrivingHistory {
  var _penaltyPoints : int as PenaltyPoints
  var _nonMotorConvictions : int as NonMotorConvictions

  construct() {}
  
  construct(penaltyPoints: int, nonMotorConvictions : int) {
    _penaltyPoints = penaltyPoints
    _nonMotorConvictions = nonMotorConvictions
  }

  function valDrivingHistory() : boolean{
    return PenaltyPoints <= 6 && NonMotorConvictions >= 1;
  }

  function calcDrivingPenalty() : double {
    if (PenaltyPoints >= 3 && PenaltyPoints < 6) {
      return 0.2
    } else if (PenaltyPoints == 6) {
      return 0.5
  }

  return 0;
  }
  
  function printInfo() {
    print("Penalty Points: ${_penaltyPoints}")
    print("Non-Motor Convictions: ${_nonMotorConvictions}")
  }
}
 