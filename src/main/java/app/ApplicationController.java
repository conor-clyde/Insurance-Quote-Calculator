package app;

import service.QuoteDataOrchestrator;
import service.BusinessRuleValidator;
import util.InputHandler;
import java.util.List;

/**
 * Main application controller for the Insurance Quote Calculator.
 *
 * Orchestrates the entire quote calculation process by coordinating
 * data collection, business validation, and user interface components.
 */
public class ApplicationController {
    private InputHandler inputHandler;
    private BusinessRuleValidator businessRuleValidator;
    private QuoteDataOrchestrator dataOrchestrator;
    private QuoteFlowController quoteFlowController;
    private boolean isFirstRun;
    
    public ApplicationController() {
        inputHandler = new InputHandler();
        businessRuleValidator = new BusinessRuleValidator(inputHandler);
        dataOrchestrator = new QuoteDataOrchestrator(inputHandler);
        quoteFlowController = new QuoteFlowController(dataOrchestrator, businessRuleValidator, inputHandler);
        isFirstRun = true;
    }

    /**
     * Main application entry point
     */
    public void runApplication() {
        while (true) {
            try {
                handleApplicationStart(isFirstRun);
                QuoteFlowController.QuoteResult quoteResult = executeQuoteCollection();
                
                if (quoteResult.isCancelled()) {
                    handleCancellation();
                    continue;
                }

                if (quoteResult.isDeclined()) {
                    handleDecline(quoteResult);
                    continue;
                }

                if (quoteResult.getQuote() != null) {
                    handleSuccessfulQuote(quoteResult);
                    continue;
                }

                handleUnexpectedResult();

            } catch (Exception e) {
                handleCriticalError(e);
            }
        }
    }

    /**
     * Handles the application startup and restarting.
     */
    private void handleApplicationStart(boolean isFirstRun) {
        if (isFirstRun) {
            quoteFlowController.displayWelcomeMessage();
            this.isFirstRun = false;
        } else {
            System.out.println("The application process has been restarted. Please enter your details.");
        }
    }

    /**
     * Executes the complete quote calculation process.
     */
    private QuoteFlowController.QuoteResult executeQuoteCollection() {
        return quoteFlowController.manageQuoteCollection();
    }

    /**
     * Handles user cancellation with restart/exit options.
     */
    private void handleCancellation() {
        displayCancellationMessage();
        
        int userChoice = promptUserForChoice(List.of("Start over", "Exit"));
        
        if (userChoice == 1) {
            return;
        } else if (userChoice == 2) {
            exitApplication("Thank you for your interest. Goodbye!");
        }
    }

    /**
     * Handles quote decline with retry options.
     */
    private void handleDecline(QuoteFlowController.QuoteResult quoteResult) {
        quoteFlowController.displayDeclineMessage();
        
        Boolean tryAgain = quoteFlowController.askToTryAgain();
        
        if (tryAgain == null || !tryAgain) {
            exitApplication("Thank you for your interest. Goodbye!");
        }
    }

    /**
     * Handles successful quote with option for another quote.
     */
    private void handleSuccessfulQuote(QuoteFlowController.QuoteResult quoteResult) {
        quoteFlowController.displayQuoteResults(quoteResult.getQuote());
        
        Boolean anotherQuote = quoteFlowController.askForAnotherQuote();
        
        if (anotherQuote == null || !anotherQuote) {
            exitApplication("Thank you for using the Insurance Quote Calculator!");
        }
    }

    /**
     * Handles unexpected quote results.
     */
    private void handleUnexpectedResult() {
        System.out.println("[X] An unexpected error occurred. Starting over...");
    }

    /**
     * Handles critical application errors with user recovery options.
     */
    private void handleCriticalError(Exception error) {
        Boolean continueAfterError = quoteFlowController.handleError("An unexpected error occurred. Please try again or contact support.");
        
        if (continueAfterError == null || !continueAfterError) {
            exitApplication("Thank you for using the Insurance Quote Calculator!");
        }
    }

    /**
     * Displays cancellation message to user.
     */
    private void displayCancellationMessage() {
        System.out.println("[X] Quote Application Cancelled");
        System.out.println("===========================");
        System.out.println("You have cancelled the application. No information was saved.");
    }

    /**
     * Prompts user for choice from given options.
     */
    private int promptUserForChoice(List<String> options) {
        for (int i = 0; i < options.size(); i++) {
            System.out.println((i + 1) + ". " + options.get(i));
        }
        return inputHandler.askIntQuestion("Enter your choice (1-" + options.size() + "):", 1, options.size());
    }

    /**
     * Exits the application with proper cleanup.
     */
    private void exitApplication(String message) {
        System.out.println(message);
        System.exit(0);
    }
}
