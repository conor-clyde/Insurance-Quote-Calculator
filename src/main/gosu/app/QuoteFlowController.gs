package app

uses service.QuoteDataOrchestrator
uses service.BusinessRuleValidator
uses util.InputHandler
uses domain.Customer
uses domain.Address
uses domain.Vehicle
uses domain.DrivingHistory
uses domain.ClaimsHistory
uses domain.Quote
uses constants.Constants

/**
 * QuoteFlowController manages the complete quote collection flow and user experience.
 */
class QuoteFlowController {
  private var _dataOrchestrator: QuoteDataOrchestrator
  private var _businessRuleValidator: BusinessRuleValidator
  private var _inputHandler: InputHandler

  construct(dataOrchestrator: QuoteDataOrchestrator, businessRuleValidator: BusinessRuleValidator, inputHandler: InputHandler) {
    _dataOrchestrator = dataOrchestrator
    _businessRuleValidator = businessRuleValidator
    _inputHandler = inputHandler
  }

  /**
   * Result wrapper for quote collection.
   */
  class QuoteResult {
    var _quote: Quote as quote
    var _cancelled: boolean as cancelled
    var _declined: boolean as declined
    var _errorMessage: String as errorMessage
    var _declineReason: String as declineReason
    var _customerName: String as customerName
    
    construct(q: Quote, c: boolean, d: boolean, error: String = null, declineReasonParam: String = null, customerNameParam: String = null) {
      _quote = q
      _cancelled = c
      _declined = d
      _errorMessage = error
      _declineReason = declineReasonParam
      _customerName = customerNameParam
    }
  }

  /**
   * Guides the user through all required steps: pre-qualification, data collection,
   * confirmation, and premium calculation. Handles user cancellations, declines, and errors.
   * 
   * @return QuoteResult object indicating outcome
   */
  function manageQuoteCollection(): QuoteResult {
    try {
      // Step 1: Pre-qualification
      var preQualResult = _businessRuleValidator.performPreQualification()
      if (preQualResult == null) {
        if (_inputHandler.lastInputWasCancel) {
          return new QuoteResult(null, true, false, "User cancelled during pre-qualification")
        }
        return new QuoteResult(null, false, true, "Failed pre-qualification checks")
      }

      // Step 2: Customer Data Collection
      var customer = _dataOrchestrator.collectCustomerData(preQualResult.Dob, preQualResult.Occupation)
      if (customer == null) {
        if (_inputHandler.lastInputWasCancel) {
          return new QuoteResult(null, true, false, "User cancelled during customer data collection")
        }
        return new QuoteResult(null, false, true, "Customer data collection failed")
      }

      // Step 3: Address Data Collection
      var address = _dataOrchestrator.collectAddressData(preQualResult.Postcode)
      if (address == null) {
        if (_inputHandler.lastInputWasCancel) {
          return new QuoteResult(null, true, false, "User cancelled during address data collection")
        }
        return new QuoteResult(null, false, true, "Address data collection failed")
      }

      // Step 4: Vehicle Data Collection
      var vehicle = _dataOrchestrator.collectVehicleData()
      if (vehicle == null) {
        if (_inputHandler.lastInputWasCancel) {
          return new QuoteResult(null, true, false, "User cancelled during vehicle data collection")
        }
        return new QuoteResult(null, false, true, "Vehicle data collection failed")
      }

      // Step 5: Driving History Collection
      var drivingHistory = _dataOrchestrator.collectDrivingHistoryData(preQualResult.PenaltyPoints, preQualResult.NonMotorConvictions)
      if (drivingHistory == null) {
        if (_inputHandler.lastInputWasCancel) {
          return new QuoteResult(null, true, false, "User cancelled during driving history collection")
        }
        return new QuoteResult(null, false, true, "Driving history collection failed")
      }

      // Step 6: Claims History Collection
      var claimsHistory = _dataOrchestrator.collectClaimsHistoryData(preQualResult.FaultAccidents, preQualResult.NonFaultAccidents)
      if (claimsHistory == null) {
        if (_inputHandler.lastInputWasCancel) {
          return new QuoteResult(null, true, false, "User cancelled during claims history collection")
        }
        return new QuoteResult(null, false, true, "Claims history collection failed")
      }

      // Step 7: Information Summary and Confirmation
      var confirmed = displayInformationSummaryAndConfirm(customer, address, vehicle, drivingHistory, claimsHistory)
      if (!confirmed) {
        return new QuoteResult(null, true, false, "User cancelled during information confirmation")
      }

      // Step 8: Quote Calculation
      var quote = new Quote(customer, address, drivingHistory, claimsHistory, vehicle)
      var calculationSuccess = quote.calcPremium()
      
      if (!calculationSuccess) {
        var errorMessage = "Premium calculation failed"
        if (quote != null && quote.getErrors() != null && quote.getErrors().Count > 0) {
          errorMessage = "Premium calculation failed: " + quote.getErrors().join(", ")
        }
        return new QuoteResult(quote, false, true, errorMessage)
      }

      return new QuoteResult(quote, false, false)

    } catch (e: Exception) {
      return new QuoteResult(null, false, true, "Unexpected error: ${e.Message}")
    }
  }

  /**
   * Displays welcome message
   */
  function displayWelcomeMessage() {
    print(
      "+==============================================================+\n" +
      "|                Insurance Quote Calculator                    |\n" +
      "+==============================================================+\n" +
      "Welcome to our insurance quote calculator!\n" +
      "We'll guide you through a few questions to calculate your premium.\n" +
      "[LIST] What you'll need:\n" +
      "   * Your personal details (name, age, occupation)\n" +
      "   * Your address (BT47/BT48 postcodes only)\n" +
      "   * Your vehicle information\n" +
      "   * Your driving and claims history\n" +
      "[NOTE] Tips:\n" +
      "   * You can type 'cancel' at any time to start over\n" +
      "   * This process takes about 5-10 minutes\n"
    )
  }

  /**
   * Displays quote results in a user-friendly format with enhanced presentation.
   * 
   * @param quote Quote object to display
   */
  function displayQuoteResults(quote: Quote) {
    var basePremium = Constants.MIN_PREMIUM
    var discountedPremium = basePremium - (basePremium * quote.Discounts)
    var penalizedPremium = discountedPremium + (basePremium * quote.Penalties)
    var iptAmount = penalizedPremium * Constants.IPT
    var totalPremium = quote.TotalPremium
    
    var details =
      "+==============================================================+\n" +
      "|                    Quote Calculation Complete!               |\n" +
      "+==============================================================+\n" +
      "[BREAKDOWN] Premium Breakdown:\n" +
      "   Base Premium: GBP ${Constants.MIN_PREMIUM}\n"

    if (quote.Discounts > 0) {
      var discountAmount = Constants.MIN_PREMIUM * quote.Discounts
      details += "   Discounts (${Math.round(quote.Discounts * 100)}%): -GBP ${Math.round(discountAmount)}\n"
    }
    if (quote.Penalties > 0) {
      var penaltyAmount = Constants.MIN_PREMIUM * quote.Penalties
      details += "   Penalties (${Math.round(quote.Penalties * 100)}%): +GBP ${Math.round(penaltyAmount)}\n"
    }
    details +=
      "   Subtotal (before IPT): GBP ${Math.round(penalizedPremium)}\n" +
      "   Insurance Premium Tax (12%): +GBP ${Math.round(iptAmount)}\n" +
      "   = Total Premium: GBP ${Math.round(totalPremium)}\n"

    print(details)
    
    var acceptQuote = _inputHandler.askBooleanQuestion("Would you like to accept this quote? (Yes/No)")
    if (acceptQuote == null) return
    
    if (acceptQuote) {
      print("[OK] Quote accepted! We'll be in touch with your policy details.\n[INFO] You'll receive confirmation within 24 hours.")
    } else {
      print("[X] Quote declined. Thank you for your interest.\n[NOTE] Feel free to try again with different information.")
    }
  }

  /**
   * Displays a user-friendly decline message with detailed reasons and next steps.
   */
  function displayDeclineMessage() {
    print(
      "+==============================================================+\n" +
      "|                 Quote Application Declined                   |\n" +
      "+==============================================================+\n" +
      "We're sorry, but you don't meet our current eligibility criteria.\n" +
      "[INFO] This could be due to:\n" +
      "   * Age requirements (must be 21-85 years old)\n" +
      "   * Geographic restrictions (BT47/BT48 postcodes only)\n" +
      "   * Risk factors (penalty points, convictions, claims history)\n" +
      "   * Occupation restrictions\n" +
      "   * Vehicle coverage limitations\n" +
      "[NEXT] Next Steps:\n" +
      "   * Contact our customer service team for alternative options\n" +
      "   * Try again with different information\n" +
      "   * Check our website for other insurance products\n" +
      "[INFO] Customer Service: support@example.com\n" +
      "[INFO] Phone: 0800 123 4567"
    )
  }

  /**
   * Displays a comprehensive error message with recovery options.
   * 
   * @param errorMessage Error message to display
   * @param showRetryOptions Whether to show retry options
   */
  function displayErrorMessage(errorMessage: String, showRetryOptions: boolean = true) {
    var msg =
      "+==============================================================+\n" +
      "|                         Error Occurred                       |\n" +
      "+==============================================================+\n"
    if (errorMessage == null) {
      msg += "You cancelled the application. Returning to the main menu...\n"
    } else {
      msg += "[X] Error: ${errorMessage}\nWe apologize for the inconvenience.\n"
    }
    if (showRetryOptions) {
      msg += "[RETRY] Would you like to:\n" +
              "   1. Try again with the same information\n" +
              "   2. Start over with different information\n" +
              "   3. Exit the application\n"
    }
    print(msg)
  }

  /**
   * Asks user if they want to try again after a decline with enhanced options.
   * 
   * @return Boolean indicating if user wants to try again, or null if cancelled
   */
  function askToTryAgain(): Boolean {
    return _inputHandler.askBooleanQuestion("[RETRY] Would you like to try again with different information? (Yes/No)")
  }

  /**
   * Asks user if they want another quote with enhanced messaging.
   * 
   * @return Boolean indicating if user wants another quote, or null if cancelled
   */
  function askForAnotherQuote(): Boolean {
    print("[RETRY] Would you like to get another quote? (Yes/No)")
    print("[NOTE] This will start a completely new application.")
    return _inputHandler.askBooleanQuestion("Another quote")
  }

  /**
   * Handles errors with user-friendly messaging and recovery options.
   * 
   * @param errorMessage Error message to display
   * @return Boolean indicating if user wants to continue, or null if cancelled
   */
  function handleError(errorMessage: String): Boolean {
    displayErrorMessage(errorMessage, true)
    return askToTryAgain()
  }

  /**
   * Displays a summary of collected information for user confirmation.
   * 
   * @param customer Customer information
   * @param address Address information
   * @param vehicle Vehicle information
   * @return Boolean indicating if user confirms the information
   */
  function displayInformationSummary(customer: Customer, address: Address, vehicle: Vehicle): Boolean {
    var msg =
      "+==============================================================+\n" +
      "|                    Information Summary                       |\n" +
      "+==============================================================+\n" +
      "[USER] Customer Information:\n" +
      "   Name: ${customer.FirstName} ${customer.LastName}\n" +
      "   Age: ${customer.Age} years\n" +
      "   Occupation: ${customer.Occupation}\n" +
      "   Driving Experience: ${customer.DrivingYears} years\n" +
      "[HOUSE] Address Information:\n" +
      "   Address: ${address.HouseNumber} ${address.Street}\n" +
      "   Postcode: ${address.Postcode}\n" +
      "[CAR] Vehicle Information:\n" +
      "   Make: ${vehicle.Make}\n" +
      "   Model: ${vehicle.Model}\n" +
      "   Year: ${vehicle.Year}\n" +
      "   Registration: ${vehicle.Reg}\n" +
      "   Value: GBP ${vehicle.Value}\n" +
      "   Has Tracker: ${vehicle.HasTracker ? "Yes" : "No"}\n"
    print(msg)
    return _inputHandler.askConfirmation("Please review the information above. Is everything correct?")
  }

  /**
   * Displays a summary of collected information for user confirmation and returns the confirmation status.
   * 
   * @param customer Customer information
   * @param address Address information
   * @param vehicle Vehicle information
   * @param drivingHistory Driving history information
   * @param claimsHistory Claims history information
   * @return Boolean indicating if user confirms the information
   */
  function displayInformationSummaryAndConfirm(customer: Customer, address: Address, vehicle: Vehicle, drivingHistory: DrivingHistory, claimsHistory: ClaimsHistory): Boolean {
    var msg =
      "+==============================================================+\n" +
      "|                    Information Summary                       |\n" +
      "+==============================================================+\n" +
      "[USER] Customer Information:\n" +
      "   Name: ${customer.FirstName} ${customer.LastName}\n" +
      "   Age: ${customer.Age} years\n" +
      "   Occupation: ${customer.Occupation}\n" +
      "   Driving Experience: ${customer.DrivingYears} years\n" +
      "[HOUSE] Address Information:\n" +
      "   Address: ${address.HouseNumber} ${address.Street}\n" +
      "   Postcode: ${address.Postcode}\n" +
      "[CAR] Vehicle Information:\n" +
      "   Make: ${vehicle.Make}\n" +
      "   Model: ${vehicle.Model}\n" +
      "   Year: ${vehicle.Year}\n" +
      "   Registration: ${vehicle.Reg}\n" +
      "   Value: GBP ${vehicle.Value}\n" +
      "   Has Tracker: ${vehicle.HasTracker ? "Yes" : "No"}\n" +
      "[DRIVE] Driving History:\n" +
      "   Penalty Points: ${drivingHistory.PenaltyPoints}\n" +
      "   Non-Motor Convictions: ${drivingHistory.NonMotorConvictions}\n" +
      "[CLAIMS] Claims History:\n" +
      "   Fault Accidents: ${claimsHistory.FaultAccidents}\n" +
      "   Non-Fault Accidents: ${claimsHistory.NonFaultAccidents}\n"
    print(msg)
    return _inputHandler.askConfirmation("Please review the information above. Is everything correct?")
  }
} 