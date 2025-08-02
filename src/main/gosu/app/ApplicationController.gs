package app

uses app.QuoteFlowController
uses service.QuoteDataOrchestrator
uses service.BusinessRuleValidator
uses util.InputHandler

/**
 * Main application controller for the Insurance Quote Calculator.
 *
 * Orchestrates the entire quote calculation process by coordinating
 * data collection, business validation, and user interface components.
 */
class ApplicationController {
  private var _inputHandler: InputHandler
  private var _businessRuleValidator: BusinessRuleValidator
  private var _dataOrchestrator: QuoteDataOrchestrator
  private var _quoteFlowController: QuoteFlowController
  private var _isFirstRun : boolean
  
  construct() {
    _inputHandler = new InputHandler()
    _businessRuleValidator = new BusinessRuleValidator(_inputHandler)
    _dataOrchestrator = new QuoteDataOrchestrator(_inputHandler)
    _quoteFlowController = new QuoteFlowController(_dataOrchestrator, _businessRuleValidator, _inputHandler)
    _isFirstRun = true
  }

  /**
   * Main application entry point
   */
  function runApplication() {
    while (true) {
      try {
        handleApplicationStart(_isFirstRun)
        var quoteResult = executeQuoteCollection()
        
        if (quoteResult.cancelled) {
          handleCancellation()
          continue
        }

        if (quoteResult.declined) {
          handleDecline(quoteResult)
          continue
        }

        if (quoteResult.quote != null) {
          handleSuccessfulQuote(quoteResult)
          continue
        }

        handleUnexpectedResult()

      } catch (e: Exception) {
        handleCriticalError(e)
      }
    }
  }

  /**
   * Handles the application startup and restarting.
   */
  private function handleApplicationStart(isFirstRun: boolean) {
    if (isFirstRun) {
      _quoteFlowController.displayWelcomeMessage()
      _isFirstRun = false
    } else {
      print("The application process has been restarted. Please enter your details.")
    }
  }

  /**
   * Executes the complete quote calculation process.
   */
  private function executeQuoteCollection(): QuoteFlowController.QuoteResult {
    return _quoteFlowController.manageQuoteCollection()
  }

  /**
   * Handles user cancellation with restart/exit options.
   */
  private function handleCancellation() {
    displayCancellationMessage()
    
    var userChoice = promptUserForChoice({"Start over", "Exit"})
    
    if (userChoice == 1) {
      return
    } else if (userChoice == 2) {
      exitApplication("Thank you for your interest. Goodbye!")
      
    }
  }

  /**
   * Handles quote decline with retry options.
   */
  private function handleDecline(quoteResult: QuoteFlowController.QuoteResult) {
    _quoteFlowController.displayDeclineMessage()
    
    var tryAgain = _quoteFlowController.askToTryAgain()
    
    if (tryAgain == null || !tryAgain) {
      exitApplication("Thank you for your interest. Goodbye!")
    }
  }

  /**
   * Handles successful quote with option for another quote.
   */
  private function handleSuccessfulQuote(quoteResult: QuoteFlowController.QuoteResult) {
    _quoteFlowController.displayQuoteResults(quoteResult.quote)
    
    var anotherQuote = _quoteFlowController.askForAnotherQuote()
    
    if (anotherQuote == null || !anotherQuote) {
      exitApplication("Thank you for using the Insurance Quote Calculator!")
    }
  }

  /**
   * Handles unexpected quote results.
   */
  private function handleUnexpectedResult() {
    print("[X] An unexpected error occurred. Starting over...")
  }

  /**
   * Handles critical application errors with user recovery options.
   */
  private function handleCriticalError(error: Exception) {
    var continueAfterError = _quoteFlowController.handleError("An unexpected error occurred. Please try again or contact support.")
    
    if (continueAfterError == null || !continueAfterError) {
      exitApplication("Thank you for using the Insurance Quote Calculator!")
    }
  }

  /**
   * Displays cancellation message to user.
   */
  private function displayCancellationMessage() {
    print("[X] Quote Application Cancelled")
    print("===========================")
    print("You have cancelled the application. No information was saved.")
  }

  /**
   * Prompts user for choice from given options.
   */
  private function promptUserForChoice(options: List<String>): int {
    for (i in 0..options.Count-1) {
      print("${i+1}. ${options.get(i)}")
    }
    return _inputHandler.askIntQuestion("Enter your choice (1-${options.Count}):", 1, options.Count)
  }

  /**
   * Exits the application with proper cleanup.
   */
  private function exitApplication(message: String) {
    print(message)
    System.exit(0)
  }
} 