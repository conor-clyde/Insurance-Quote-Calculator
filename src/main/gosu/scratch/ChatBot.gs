package scratch

class ChatBot {
  var _newCustomer = new Customer()
  var _newAddress = new Address()
  var _newVehicle = new Vehicle()
  var _newDrivingHistory = new DrivingHistory()
  var _newClaimsHistory = new ClaimsHistory()
  var _scanner = new Scanner(System.in)

  function welcome() {
    print("Insurance Quote:\n" + "---------------------\nPlease enter the requested details to calculate your quote.\n")
  }

  function preQualifications() : boolean {
    print("Pre-Qualification:\nAre you between 21-85 years old? (True/False)")
    if (not Validation.getValidatedBoolean()) {
      return false
    }

    print("Are you a professional gambler? (True/False)")
      if (Validation.getValidatedBoolean()) {
      return false
    }

    print("Does your postcode begin with BT47 or BT48? (True/False)")
    if (not Validation.getValidatedBoolean()) {
      return false
    }

    print("Do any of the following statements apply to you?\n " +
    "     -I have more than six penalty points.\n " +
    "     -I have one or more non-motoring convictions.\n " +
    "     -I have four or more non-fault accidents in the past five years.\n " +
    "     -I have three or more fault accidents in the past five years.")
    if (Validation.getValidatedBoolean()) {
      return false
    }

    return true
  }

  function partOne() : Customer {
    print("Customer Information:")
    _newCustomer.Name =  askStringQuestion("Name")
    _newCustomer.Gender = askStringQuestion("Gender")
    _newCustomer.Age = askIntQuestion("Age")
    _newCustomer.DrivingYears = askIntQuestion("License Age")
    _newCustomer.Occupation = askStringQuestion("Occupation")
    
     if (confirmDetails(_newCustomer)) {
             return _newCustomer
    } else {
      print("Please re-enter details.")
      return partOne()
    }

  }

  function partTwo() : Address {
    print("Address Information:")
    _newAddress.HouseNo = askIntQuestion("House No.")
    _newAddress.Street = askStringQuestion("Street")
    _newAddress.Postcode = askStringQuestion("Postcode")

    print("Are the followingdDetails correct? (True/False)")
    _newAddress.toString()
    
    if (not Validation.getValidatedBoolean()){
      partOne()
    } else {
      return _newAddress
    }
    
  return null
  }

  function partThree() : Vehicle{
    print("Vehicle Information")
    _newVehicle.Make = askStringQuestion("Make/Model")
    _newVehicle.Year = askIntQuestion("Year")
    _newVehicle.Reg = askStringQuestion("Registration No.")
    _newVehicle.Value = askIntQuestion("Value")
    _scanner.nextLine()
    print("Does your car have a tracker? (True/False):")
    _newVehicle.HasTracker =  Validation.getValidatedBoolean()

    print("Are the following details correct? (True/False)")
    _newVehicle.printInfo()
    if (not Validation.getValidatedBoolean()){
      partOne()
    } else {
      return _newVehicle
    }
  
    return null
  }

  function partFour() : DrivingHistory {
    _newDrivingHistory.PenaltyPoints = askIntQuestion("Number of motoring convictions")
    _newDrivingHistory.NonMotorConvictions = askIntQuestion("Number of non-motoring convictions")
    _scanner.nextLine()
    
    print("Are the following details correct? (True/False)")
    _newDrivingHistory.printInfo()

    if (not Validation.getValidatedBoolean()){
      partOne()
    } else {
      return _newDrivingHistory
    }

    return null
  }

  function partFive() : ClaimsHistory {
    _newClaimsHistory.FaultAccidents = askIntQuestion("Number of accidents caused by you in the last five years")
    _newClaimsHistory.NonFaultAccidents = askIntQuestion("Number of accidents caused to you by a third party in the last five years:")
    _scanner.nextLine()
  
    print("Are these details correct? (True/False)")
    _newClaimsHistory.toString()
    if (not Validation.getValidatedBoolean()){
      partOne()
    } else {
      return _newClaimsHistory
    }

    return null
  }
  
  private function askBooleanQuestion(question: String): boolean {
    print("${question} (True/False)")
    return Validation.getValidatedBoolean()
  }

  private function askStringQuestion (question : String) : String {
    print("${question}: ")
    return _scanner.nextLine()
  } 
  
   private function askIntQuestion(question: String): int {
     print("${question}:")
     return Validation.getValidatedInt()
  }
  
  private function confirmDetails(details: Object) : boolean {
    return askBooleanQuestion("Are the following details correct? ${details}")
  }
  
  
}
