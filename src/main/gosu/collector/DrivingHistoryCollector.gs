package collector

uses service.ValidationEngine
uses util.InputHandler
uses domain.DrivingHistory
uses constants.Constants

/**
 * DrivingHistoryCollector handles the collection and validation of driving history information.
 */
class DrivingHistoryCollector {
  private var _inputHandler: InputHandler
  private var _validationEngine: ValidationEngine
  
  /**
   * Constructs a DrivingHistoryCollector with the given InputHandler.
   * 
   * @param inputHandler The input handler to use for user prompts and input
   */
  construct(inputHandler: InputHandler) {
    _inputHandler = inputHandler
    _validationEngine = new ValidationEngine(inputHandler)
  }

  // ============================================================================
  // MAIN COLLECTION METHOD
  // ============================================================================
  
  /**
   * Collects and validates driving history information.
   * 
   * @param preQualPenaltyPoints Penalty points from pre-qualification
   * @param preQualNonMotorConvictions Non-motor convictions from pre-qualification
   * @return DrivingHistory object if valid, null if cancelled
   */
  function collectDrivingHistoryData(preQualPenaltyPoints: int, preQualNonMotorConvictions: int): DrivingHistory {
    
    print("Driving History:")
    print("---------------")
    print("Please review your driving history details.")
    print("[NOTE] You can type 'cancel' at any time to start over")

    var drivingHistory = new DrivingHistory()

    // Use pre-qualification data
    drivingHistory.PenaltyPoints = preQualPenaltyPoints
    drivingHistory.NonMotorConvictions = preQualNonMotorConvictions

    return _validationEngine.validateAndConfirmDrivingHistory(drivingHistory, \-> collectDrivingHistoryData(preQualPenaltyPoints, preQualNonMotorConvictions))
  }
} 