package scratch

uses java.util.Scanner

/**
 * ChatBot class provides the user interface for the insurance quote calculator.
 * Handles data collection, validation, and user interaction through a conversational interface.
 */
class ChatBot {
  
  // Data models for collecting user information
  private var _newCustomer = new Customer()
  private var _newAddress = new Address()
  private var _newVehicle = new Vehicle()
  private var _newDrivingHistory = new DrivingHistory()
  private var _newClaimsHistory = new ClaimsHistory()
  private var _scanner = new Scanner(System.in)

  /**
   * Displays welcome message and application introduction.
   */
  function welcome() {
    print("Insurance Quote Calculator")
    print("=========================")
    print("Please enter the requested details to calculate your quote.")
    print("")
  }

  /**
   * Performs pre-qualification checks to determine if the user is eligible for a quote.
   * 
   * @return Boolean indicating if user meets pre-qualification criteria
   */
  function preQualifications(): boolean {
    print("Pre-Qualification Check:")
    print("------------------------")
    
    // Age check
    print("Are you between 21-85 years old? (True/False)")
    if (not Validation.getValidatedBoolean()) {
      print("Sorry, you must be between 21-85 years old to qualify.")
      return false
    }

    // Occupation check
    print("Are you a professional gambler? (True/False)")
    if (Validation.getValidatedBoolean()) {
      print("Sorry, professional gamblers are not eligible for quotes.")
      return false
    }

    // Geographic check
    print("Does your postcode begin with BT47 or BT48? (True/False)")
    if (not Validation.getValidatedBoolean()) {
      print("Sorry, we only provide quotes for BT47/BT48 postcodes.")
      return false
    }

    // Risk assessment check
    print("Do any of the following statements apply to you?")
    print("  - I have more than six penalty points")
    print("  - I have one or more non-motoring convictions")
    print("  - I have four or more non-fault accidents in the past five years")
    print("  - I have three or more fault accidents in the past five years")
    print("(True/False)")
    
    if (Validation.getValidatedBoolean()) {
      print("Sorry, you do not meet our risk criteria.")
      return false
    }

    print("Pre-qualification passed! Proceeding to quote calculation...")
    print("")
    return true
  }

  /**
   * Collects customer information and validates the data.
   * 
   * @return Customer object with validated information
   */
  function partOne(): Customer {
    print("Customer Information:")
    print("-------------------")
    
    _newCustomer.Name = askStringQuestion("Name")
    _newCustomer.Gender = askStringQuestion("Gender")
    _newCustomer.Age = askIntQuestion("Age")
    _newCustomer.DrivingYears = askIntQuestion("Years of driving experience")
    _newCustomer.Occupation = askStringQuestion("Occupation")
    
    print("Please confirm your details:")
    print(_newCustomer.toString())
    
    if (confirmDetails(_newCustomer)) {
      return _newCustomer
    } else {
      print("Please re-enter your details.")
      return partOne()
    }
  }

  /**
   * Collects address information and validates the data.
   * 
   * @return Address object with validated information
   */
  function partTwo(): Address {
    print("Address Information:")
    print("------------------")
    
    _newAddress.HouseNo = askIntQuestion("House/Flat number")
    _newAddress.Street = askStringQuestion("Street name")
    _newAddress.Postcode = askStringQuestion("Postcode")

    print("Please confirm your address details:")
    print(_newAddress.toString())
    
    if (Validation.getValidatedBoolean()) {
      return _newAddress
    } else {
      print("Please re-enter your address details.")
      return partTwo()
    }
  }

  /**
   * Collects vehicle information and validates the data.
   * 
   * @return Vehicle object with validated information
   */
  function partThree(): Vehicle {
    print("Vehicle Information:")
    print("------------------")
    
    _newVehicle.Make = askStringQuestion("Vehicle make and model")
    _newVehicle.Year = askIntQuestion("Vehicle year")
    _newVehicle.Reg = askStringQuestion("Registration number")
    _newVehicle.Value = askIntQuestion("Vehicle value (£)")
    
    _scanner.nextLine() // Clear buffer
    print("Does your vehicle have a tracking device? (True/False)")
    _newVehicle.HasTracker = Validation.getValidatedBoolean()

    print("Please confirm your vehicle details:")
    _newVehicle.printInfo()
    
    if (Validation.getValidatedBoolean()) {
      return _newVehicle
    } else {
      print("Please re-enter your vehicle details.")
      return partThree()
    }
  }

  /**
   * Collects driving history information and validates the data.
   * 
   * @return DrivingHistory object with validated information
   */
  function partFour(): DrivingHistory {
    print("Driving History:")
    print("---------------")
    
    _newDrivingHistory.PenaltyPoints = askIntQuestion("Number of penalty points")
    _newDrivingHistory.NonMotorConvictions = askIntQuestion("Number of non-motoring convictions")
    _scanner.nextLine() // Clear buffer
    
    print("Please confirm your driving history:")
    _newDrivingHistory.printInfo()

    if (Validation.getValidatedBoolean()) {
      return _newDrivingHistory
    } else {
      print("Please re-enter your driving history.")
      return partFour()
    }
  }

  /**
   * Collects claims history information and validates the data.
   * 
   * @return ClaimsHistory object with validated information
   */
  function partFive(): ClaimsHistory {
    print("Claims History:")
    print("--------------")
    
    _newClaimsHistory.FaultAccidents = askIntQuestion("Number of accidents you caused in the last 5 years")
    _newClaimsHistory.NonFaultAccidents = askIntQuestion("Number of accidents caused by others in the last 5 years")
    _scanner.nextLine() // Clear buffer
  
    print("Please confirm your claims history:")
    print(_newClaimsHistory.toString())
    
    if (Validation.getValidatedBoolean()) {
      return _newClaimsHistory
    } else {
      print("Please re-enter your claims history.")
      return partFive()
    }
  }
  
  /**
   * Prompts user for a boolean response with validation.
   * 
   * @param question The question to ask the user
   * @return Boolean response from user
   */
  private function askBooleanQuestion(question: String): boolean {
    print("${question} (True/False)")
    return Validation.getValidatedBoolean()
  }

  /**
   * Prompts user for a string response.
   * 
   * @param question The question to ask the user
   * @return String response from user
   */
  private function askStringQuestion(question: String): String {
    print("${question}: ")
    return _scanner.nextLine()
  } 
  
  /**
   * Prompts user for an integer response with validation.
   * 
   * @param question The question to ask the user
   * @return Integer response from user
   */
  private function askIntQuestion(question: String): int {
    print("${question}: ")
    return Validation.getValidatedInt()
  }
  
  /**
   * Confirms details with the user.
   * 
   * @param details Object containing details to confirm
   * @return Boolean indicating if details are confirmed
   */
  private function confirmDetails(details: Object): boolean {
    return askBooleanQuestion("Are the following details correct? ${details}")
  }
}
