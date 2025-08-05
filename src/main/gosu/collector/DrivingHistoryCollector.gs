package collector

uses service.ValidationEngine
uses util.InputHandler
uses domain.DrivingHistory
uses domain.PreQualResult
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
   * @param preQualResult Pre-qualification result containing driving history data
   * @return DrivingHistory object if valid, null if cancelled
   */
  function collectDrivingHistoryData(preQualResult: PreQualResult): DrivingHistory {
    
    print("Driving History:")
    print("---------------")
    print("Please review your driving history details from pre-qualification.")
    print("[NOTE] You can type 'cancel' at any time to start over")

    var drivingHistory = new DrivingHistory()

    // Use pre-qualification data
    drivingHistory.PenaltyPoints = preQualResult.PenaltyPoints
    drivingHistory.NonMotorConvictions = preQualResult.NonMotorConvictions

    // Display the data clearly
    print("")
    print("Your driving history details:")
    print("  • Penalty Points: ${preQualResult.PenaltyPoints}")
    print("  • Non-Motor Convictions: ${preQualResult.NonMotorConvictions}")
    print("")

    return _validationEngine.validateAndConfirmDrivingHistory(drivingHistory, \-> collectDrivingHistoryData(preQualResult))
  }
} 