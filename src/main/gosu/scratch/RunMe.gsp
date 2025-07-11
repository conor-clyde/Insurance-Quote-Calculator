package scratch

/**
 * Main entry point for the Insurance Quote Calculator application.
 * Orchestrates the entire quote calculation process from data collection to final premium.
 */

// Initialize application components
var chatBot = new ChatBot()
var newQuote = new Quote()

// Display welcome message
chatBot.welcome()

if (chatBot.preQualifications()) {
  print("Starting quote calculation process...")
  print("=====================================")
  
  try {
    // Collect customer information
    newQuote.NewCustomer = chatBot.partOne()
    
    // Collect address information
    newQuote.NewAddress = chatBot.partTwo()
    
    // Collect vehicle information
    newQuote.NewVehicle = chatBot.partThree()
    
    // Collect driving history
    newQuote.NewDrivingHistory = chatBot.partFour()
    
    // Collect claims history
    newQuote.NewClaimsHistory = chatBot.partFive()
    
    // Calculate final premium
    newQuote.calcPremium()
    
    // Display results
    print("")
    print("Quote Calculation Complete!")
    print("==========================")
    print("Total Premium: £${newQuote.TotalPremium}")
    print("")
    print("Thank you for using our Insurance Quote Calculator!")
    
  } catch (e: Exception) {
    print("An error occurred during quote calculation: ${e.Message}")
    print("Please try again.")
  }
  
} else {
  print("")
  print("Quote Application Declined")
  print("=========================")
  print("Sorry, you do not meet our pre-qualification criteria.")
  print("Please contact our customer service for alternative options.")
}
