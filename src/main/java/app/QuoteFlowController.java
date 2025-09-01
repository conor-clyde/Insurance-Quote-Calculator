package app;

import service.QuoteDataOrchestrator;
import service.BusinessRuleValidator;
import util.InputHandler;
import domain.Customer;
import domain.Address;
import domain.Vehicle;
import domain.DrivingHistory;
import domain.ClaimsHistory;
import domain.Quote;
import domain.PreQualResult;
import constants.Constants;

/**
 * QuoteFlowController manages the complete quote collection flow and user experience.
 */
public class QuoteFlowController {
    private QuoteDataOrchestrator dataOrchestrator;
    private BusinessRuleValidator businessRuleValidator;
    private InputHandler inputHandler;

    public QuoteFlowController(QuoteDataOrchestrator dataOrchestrator, BusinessRuleValidator businessRuleValidator, InputHandler inputHandler) {
        this.dataOrchestrator = dataOrchestrator;
        this.businessRuleValidator = businessRuleValidator;
        this.inputHandler = inputHandler;
    }

    /**
     * Result wrapper for quote collection.
     */
    public static class QuoteResult {
        private Quote quote;
        private boolean cancelled;
        private boolean declined;
        private String errorMessage;
        private String declineReason;
        private String customerName;
        
        public QuoteResult(Quote q, boolean c, boolean d, String error, String declineReasonParam, String customerNameParam) {
            quote = q;
            cancelled = c;
            declined = d;
            errorMessage = error;
            declineReason = declineReasonParam;
            customerName = customerNameParam;
        }

        // Getters
        public Quote getQuote() { return quote; }
        public boolean isCancelled() { return cancelled; }
        public boolean isDeclined() { return declined; }
        public String getErrorMessage() { return errorMessage; }
        public String getDeclineReason() { return declineReason; }
        public String getCustomerName() { return customerName; }
    }

    /**
     * Guides the user through all required steps: pre-qualification, data collection,
     * confirmation, and premium calculation. Handles user cancellations, declines, and errors.
     * 
     * @return QuoteResult object indicating outcome
     */
    public QuoteResult manageQuoteCollection() {
        try {
            // Step 1: Pre-qualification
            PreQualResult preQualResult = businessRuleValidator.performPreQualification();
            if (preQualResult == null) {
                if (inputHandler.isLastInputWasCancel()) {
                    return new QuoteResult(null, true, false, "User cancelled during pre-qualification", null, null);
                }
                return new QuoteResult(null, false, true, "Failed pre-qualification checks", null, null);
            }

            // Step 2: Customer Data Collection
            Customer customer = dataOrchestrator.collectCustomerData(preQualResult.getDob(), preQualResult.getOccupation());
            if (customer == null) {
                if (inputHandler.isLastInputWasCancel()) {
                    return new QuoteResult(null, true, false, "User cancelled during customer data collection", null, null);
                }
                return new QuoteResult(null, false, true, "Customer data collection failed", null, null);
            }

            // Step 3: Address Data Collection
            Address address = dataOrchestrator.collectAddressData(preQualResult.getPostcode());
            if (address == null) {
                if (inputHandler.isLastInputWasCancel()) {
                    return new QuoteResult(null, true, false, "User cancelled during address data collection", null, null);
                }
                return new QuoteResult(null, false, true, "Address data collection failed", null, null);
            }

            // Step 4: Vehicle Data Collection
            Vehicle vehicle = dataOrchestrator.collectVehicleData();
            if (vehicle == null) {
                if (inputHandler.isLastInputWasCancel()) {
                    return new QuoteResult(null, true, false, "User cancelled during vehicle data collection", null, null);
                }
                return new QuoteResult(null, false, true, "Vehicle data collection failed", null, null);
            }

            // Step 5: Create DrivingHistory and ClaimsHistory from pre-qualification data
            DrivingHistory drivingHistory = dataOrchestrator.createDrivingHistory(preQualResult);
            ClaimsHistory claimsHistory = dataOrchestrator.createClaimsHistory(preQualResult);

            // Step 6: Validate all data
            if (!dataOrchestrator.validateAllData(customer, address, vehicle, drivingHistory, claimsHistory)) {
                return new QuoteResult(null, false, true, "Data validation failed", "One or more data validation checks failed", customer.getFullName());
            }

            // Step 7: Create and calculate quote
            Quote quote = new Quote(customer, address, drivingHistory, claimsHistory, vehicle);
            if (!quote.calcPremium()) {
                return new QuoteResult(null, false, true, "Premium calculation failed", "Unable to calculate premium", customer.getFullName());
            }

            return new QuoteResult(quote, false, false, null, null, customer.getFullName());

        } catch (Exception e) {
            return new QuoteResult(null, false, false, "Unexpected error: " + e.getMessage(), null, null);
        }
    }

    /**
     * Displays welcome message to user.
     */
    public void displayWelcomeMessage() {
        System.out.println(Constants.WELCOME_MESSAGE);
        System.out.println("=====================================");
        System.out.println("This application will guide you through the insurance quote process.");
        System.out.println("You can type 'cancel' at any time to start over.");
        System.out.println("");
    }

    /**
     * Displays quote results to user.
     */
    public void displayQuoteResults(Quote quote) {
        System.out.println("");
        System.out.println("=== QUOTE RESULTS ===");
        System.out.println("Customer: " + quote.getCustomer().getFullName());
        System.out.println("Vehicle: " + quote.getVehicle().toString());
        System.out.println("Total Premium: GBP" + String.format("%.2f", quote.getTotalPremium()));
        System.out.println("Discounts: " + String.format("%.1f", quote.getDiscounts() * 100) + "%");
        System.out.println("Penalties: " + String.format("%.1f", quote.getPenalties() * 100) + "%");
        System.out.println("");
    }

    /**
     * Displays decline message to user.
     */
    public void displayDeclineMessage() {
        System.out.println("");
        System.out.println("=== QUOTE DECLINED ===");
        System.out.println("We're sorry, but we cannot provide coverage at this time.");
        System.out.println("");
    }

    /**
     * Asks user if they want to try again.
     */
    public Boolean askToTryAgain() {
        return inputHandler.askBooleanQuestion("Would you like to try again with different information? (Yes/No)");
    }

    /**
     * Asks user if they want another quote.
     */
    public Boolean askForAnotherQuote() {
        return inputHandler.askBooleanQuestion("Would you like to get another quote? (Yes/No)");
    }

    /**
     * Handles errors with user recovery options.
     */
    public Boolean handleError(String errorMessage) {
        System.out.println("Error: " + errorMessage);
        return inputHandler.askBooleanQuestion("Would you like to continue? (Yes/No)");
    }
}
