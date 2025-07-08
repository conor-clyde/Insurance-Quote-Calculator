package scratch

var chatBot = new ChatBot()
var newQuote = new Quote()
chatBot.welcome()

if(chatBot.preQualifications()) {
  newQuote.NewCustomer = chatBot.partOne()
  newQuote.NewAddress = chatBot.partTwo()
  newQuote.NewVehicle = chatBot.partThree()
  newQuote.NewDrivingHistory = chatBot.partFour()
  newQuote.NewClaimsHistory = chatBot.partFive()
  newQuote.calcPremium()

  print("Total Premium: ${newQuote.TotalPremium}")
} else {
   print("Sorry, you do not meet the pre-qualifications.")
}
