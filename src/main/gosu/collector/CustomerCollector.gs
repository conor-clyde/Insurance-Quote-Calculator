package collector

uses util.InputHandler
uses service.ValidationEngine
uses domain.Customer
uses constants.Constants
uses java.time.LocalDate

/**
 * CustomerCollector handles the collection and validation of customer information.
 */
class CustomerCollector {
  private var _inputHandler: InputHandler
  private var _validationEngine: ValidationEngine
  
  /**
   * Constructs a CustomerCollector with the given InputHandler.
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
   * Collects and validates customer information.
   * 
   * @param dob Date of birth from pre-qualification
   * @param occupation Occupation from pre-qualification
   * @return Customer object if valid, null if cancelled
   */
  function collectCustomerData(dob: LocalDate, occupation: String): Customer {
    
    print("Customer Information:")
    print("-------------------")
    print("Please provide your personal details.")
    print("[NOTE] You can type 'cancel' at any time to start over")

    var customer = new Customer()

    var firstName = _validationEngine.getValidatedName("First Name:", _inputHandler)
    if (firstName == null) {
      return null
    }
    customer.FirstName = firstName

    var lastName = _validationEngine.getValidatedName("Last Name:", _inputHandler)
    if (lastName == null) {
      return null
    }
    customer.LastName = lastName

    var gender = collectGender()
    if (gender == null) {
      return null
    }
    customer.Gender = gender

    customer.updateDateOfBirth(dob)
    customer.Occupation = occupation

    var dateOfLicence = collectDrivingLicenceDate(dob)
    if (dateOfLicence == null) {
      return null
    }
    customer.updateDateOfLicence(dateOfLicence)

    return _validationEngine.validateAndConfirmCustomer(customer, dob, occupation, \-> collectCustomerData(dob, occupation))
  }

  // ============================================================================
  // PRIVATE COLLECTION METHODS
  // ============================================================================
  
  /**
   * Collects and validates gender information.
   * 
   * @return Gender string if valid, null if cancelled
   */
  private function collectGender(): String {
    while (true) {
      var gender = _validationEngine.getValidatedString("What is your preferred gender? (Male/Female/Other)", _inputHandler)
      if (gender == null) {
        return null
      }
      
      var genderLower = gender.toLowerCase()
      if (genderLower == "m") genderLower = "male"
      if (genderLower == "f") genderLower = "female"
      
      var validGenders = {"male", "female", "other"}
      if (validGenders.contains(genderLower)) {
        // Capitalize first letter for consistency
        return genderLower.substring(0, 1).toUpperCase() + genderLower.substring(1)
      }
      
      print("")
      print("Invalid gender. Please enter Male, Female, or Other.")
      print("")
    }
  }

  /**
   * Collects and validates driving licence date.
   * 
   * @param dob Date of birth for validation
   * @return LocalDate if valid, null if cancelled
   */
  private function collectDrivingLicenceDate(dob: LocalDate): LocalDate {
    var dateOfLicence = _validationEngine.getValidatedDate("What is your driving licence date?", _inputHandler)
    if (dateOfLicence == null) {
      return null
    }

    // Validate the date
    while (!ValidationEngine.isDateNotInFuture(dateOfLicence) ||
           !ValidationEngine.isDateReasonable(dateOfLicence) ||
           dateOfLicence.isBefore(dob)) {
      print("Invalid date. Please enter a valid date of licence (not in the future, not too far in the past, and after date of birth).")
      dateOfLicence = _validationEngine.getValidatedDate("Date of licence", _inputHandler)
      if (dateOfLicence == null) {
        return null
      }
    }

    return dateOfLicence
  }
} 