package collector

uses service.ValidationEngine
uses util.InputHandler
uses domain.ClaimsHistory
uses domain.PreQualResult
uses constants.Constants

/**
 * ClaimsHistoryCollector handles the collection and validation of claims history information.
 */
class ClaimsHistoryCollector {
  private var _inputHandler: InputHandler
  private var _validationEngine: ValidationEngine
  
  /**
   * Constructs a ClaimsHistoryCollector with the given InputHandler.
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
   * Collects and validates claims history information.
   * 
   * @param preQualResult Pre-qualification result containing claims history data
   * @return ClaimsHistory object if valid, null if cancelled
   */
  function collectClaimsHistoryData(preQualResult: PreQualResult): ClaimsHistory {
    
    print("Claims History:")
    print("--------------")
    print("Please review your claims history for the past 5 years from pre-qualification.")
    print("[NOTE] You can type 'cancel' at any time to start over")

    var claimsHistory = new ClaimsHistory()

    // Use pre-qualification data instead of asking again
    claimsHistory.FaultAccidents = preQualResult.FaultAccidents
    claimsHistory.NonFaultAccidents = preQualResult.NonFaultAccidents

    // Display the data clearly
    print("")
    print("Your claims history details:")
    print("  • Fault Accidents: ${preQualResult.FaultAccidents}")
    print("  • Non-Fault Accidents: ${preQualResult.NonFaultAccidents}")
    print("")

    return _validationEngine.validateAndConfirmClaimsHistory(claimsHistory, \-> collectClaimsHistoryData(preQualResult))
  }

  // ============================================================================
  // PRIVATE COLLECTION METHODS
  // ============================================================================
  
  /**
   * Collects fault accidents information.
   * 
   * @return Number of fault accidents, null if cancelled
   */
  private function collectFaultAccidents(): Integer {
    print("How many accidents did you cause in the last 5 years?")
          var faultAccidents = _validationEngine.getValidatedInt("Number of accidents you caused:", _inputHandler, 0, null)
    if (faultAccidents == null) {
      return null
    }
    return faultAccidents
  }
  
  /**
   * Collects non-fault accidents information.
   * 
   * @return Number of non-fault accidents, null if cancelled
   */
  private function collectNonFaultAccidents(): Integer {
    print("How many accidents were caused by others in the last 5 years?")
          var nonFaultAccidents = _validationEngine.getValidatedInt("Number of accidents caused by others:", _inputHandler, 0, null)
    if (nonFaultAccidents == null) {
      return null
    }
    return nonFaultAccidents
  }
} 