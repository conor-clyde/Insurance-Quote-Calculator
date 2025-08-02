package collector

uses service.ValidationEngine
uses util.InputHandler
uses domain.ClaimsHistory
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
   * @param preQualFaultAccidents Fault accidents from pre-qualification
   * @param preQualNonFaultAccidents Non-fault accidents from pre-qualification
   * @return ClaimsHistory object if valid, null if cancelled
   */
  function collectClaimsHistoryData(preQualFaultAccidents: int, preQualNonFaultAccidents: int): ClaimsHistory {
    
    print("Claims History:")
    print("--------------")
    print("Please review your claims history for the past 5 years.")
    print("[NOTE] You can type 'cancel' at any time to start over")

    var claimsHistory = new ClaimsHistory()

    // Use pre-qualification data instead of asking again
    claimsHistory.FaultAccidents = preQualFaultAccidents
    claimsHistory.NonFaultAccidents = preQualNonFaultAccidents

    return _validationEngine.validateAndConfirmClaimsHistory(claimsHistory, \-> collectClaimsHistoryData(preQualFaultAccidents, preQualNonFaultAccidents))
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