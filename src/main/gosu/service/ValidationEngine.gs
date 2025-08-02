package service

uses java.util.InputMismatchException
uses java.util.Scanner
uses java.time.LocalDate
uses java.time.format.DateTimeFormatter
uses java.time.format.DateTimeParseException
uses java.util.regex.Pattern
uses util.InputHandler
uses domain.Customer
uses domain.Address
uses domain.Vehicle
uses domain.DrivingHistory
uses domain.ClaimsHistory
uses constants.Constants

/**
 * ValidationEngine unifies all validation logic for user input and business rules, ensuring
 * data quality, consistency, and compliance before quote calculation.
 */
class ValidationEngine {
  private var _inputHandler: InputHandler

  construct(inputHandler: InputHandler) {
    _inputHandler = inputHandler
  }

  static var dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy")
  static var postcodePattern = Pattern.compile(Constants.POSTCODE_PATTERN)
  static var registrationPattern = Pattern.compile(Constants.REGISTRATION_PATTERN)

  static function getValidatedBoolean(inputHandler: InputHandler): Boolean {
    return getValidatedBoolean("Yes/No (y/n):", inputHandler)
  }

  static function getValidatedBoolean(prompt: String, inputHandler: InputHandler): Boolean {
    while (true) {
      var input = inputHandler.askStringQuestion(prompt)
      if (input == null) {
        inputHandler.lastInputWasCancel = true
        return null
      }
      inputHandler.lastInputWasCancel = false
      input = input.trim().toLowerCase()
      if (input == "yes" || input == "y" || input == "true" || input == "1") {
        return true
      } else if (input == "no" || input == "n" || input == "false" || input == "0") {
        return false
      }
      print("Please enter Yes/No (y/n), True/False, or 1/0, or 'cancel' to start over.")
    }
  }

  static function getValidatedInt(prompt: String, inputHandler: InputHandler, min: Integer = null, max: Integer = null): Integer {
    while (true) {
      var value = inputHandler.askIntQuestion(prompt)
      if (value == null) {
        inputHandler.lastInputWasCancel = true
        return null
      }
      inputHandler.lastInputWasCancel = false
      if ((min == null || value >= min) && (max == null || value <= max)) {
        return value
      } else {
        var errorMessage = buildBoundsErrorMessage(min, max)
        print(errorMessage)
      }
    }
  }

  static function buildBoundsErrorMessage(min: Integer, max: Integer): String {
    if (min != null && max != null) {
      return "Please enter a number between ${min} and ${max}."
    } else if (min != null) {
      return "Please enter a number greater than or equal to ${min}."
    } else if (max != null) {
      return "Please enter a number less than or equal to ${max}."
    } else {
      return "Please enter a valid number."
    }
  }

  static function getValidatedDate(prompt: String, inputHandler: InputHandler): LocalDate {
    while (true) {
      try {
        var input = inputHandler.askStringQuestion("${prompt} (dd/mm/yyyy): ")
        if (input == null) {
          inputHandler.lastInputWasCancel = true
          return null
        }
        
        inputHandler.lastInputWasCancel = false
        input = input.trim()
        var date = LocalDate.parse(input, dateFormatter)
        if (!isDateNotInFuture(date)) {
          print("Date cannot be in the future. Please enter a valid date.")
          continue
        }
        
        if (!isDateReasonable(date)) {
          print("Date seems too far in the past. Please check and re-enter.")
          continue
        }
        
        return date
      } catch (DateTimeParseException) {
        print("Invalid date format. Please use dd/MM/yyyy (e.g., 15/03/1990)")
      }
    }
  }

  static function isDateNotInFuture(date: LocalDate): boolean {
    return date.isBefore(LocalDate.now()) || date.isEqual(LocalDate.now())
  }

  static function isDateReasonable(date: LocalDate): boolean {
    var minDate = LocalDate.now().minusYears(120)
    return date.isAfter(minDate)
  }

  static function getValidatedString(prompt: String, inputHandler: InputHandler, minLength: Integer = 1, maxLength: Integer = null): String {
    while (true) {
      var input = inputHandler.askStringQuestion(prompt)
      if (input == null) {
        inputHandler.lastInputWasCancel = true
        return null
      }
      inputHandler.lastInputWasCancel = false
      input = input.trim()
      if (input.length() < minLength) {
        print("Input must be at least ${minLength} character(s) long.")
        continue
      }
      if (maxLength != null && input.length() > maxLength) {
        print("Input must be no more than ${maxLength} character(s) long.")
        continue
      }
      return input
    }
  }

  static function getValidatedName(prompt: String, inputHandler: InputHandler): String {
    while (true) {
      var name = getValidatedString(prompt, inputHandler, 2, 50)
      if (name == null) return null
      if (name.matches("^[a-zA-Z\\s\\-']+$")) {
        return name
      } else {
        print("Name can only contain letters, spaces, hyphens, and apostrophes.")
      }
    }
  }

  static function getValidatedPostcode(prompt: String, inputHandler: InputHandler): String {
    while (true) {
      var postcode = getValidatedString(prompt, inputHandler, 5, 10)
      if (postcode == null) return null
      postcode = postcode.toUpperCase().replaceAll("\\s+", " ")
      if (!postcodePattern.matcher(postcode).matches()) {
        print("Invalid postcode format. Examples: BT47 1AB, BT48 2CD")
        continue
      }
      var isValidPrefix = false
      for (prefix in Constants.VALID_POSTCODE_PREFIXES) {
        if (postcode.startsWith(prefix)) {
          isValidPrefix = true
          break
        }
      }
      if (!isValidPrefix) {
        print("Sorry, we only cover BT47 and BT48 postcodes. Examples: BT47 1AB, BT48 2CD")
        continue
      }
      return postcode
    }
  }

  static function getValidatedRegistration(prompt: String, inputHandler: InputHandler): String {
    while (true) {
      var registration = getValidatedString(prompt, inputHandler, 5, 10)
      if (registration == null) return null
      registration = registration.toUpperCase().replaceAll("\\s+", " ")
      if (!registrationPattern.matcher(registration).matches()) {
        print("Invalid registration format. Please use format: AB12 CDE")
        print("Examples: AB12 CDE, XY34 FGH, LM56 PQR")
        print("Format: 2 letters, 2 numbers, optional space, 3 letters")
        continue
      }
      return registration
    }
  }

  static function getValidatedVehicleValue(prompt: String, inputHandler: InputHandler): Integer {
    return getValidatedInt(prompt, inputHandler, Constants.MIN_VEHICLE_VALUE, Constants.MAX_VEHICLE_VALUE)
  }

  static function getValidatedVehicleYear(prompt: String, inputHandler: InputHandler): Integer {
    return getValidatedInt(prompt, inputHandler, Constants.MIN_VEHICLE_YEAR, Constants.MAX_VEHICLE_YEAR)
  }

  static function isVehicleCovered(make: String, model: String): boolean {
    if (make == null || model == null) return false
    var makeModel = "${make.trim()} ${model.trim()}"
    return Constants.VEHICLE_COVERED_LIST.contains(makeModel)
  }

  function validateAndConfirmCustomer(customer: Customer, dob: java.time.LocalDate, occupation: String, retryFunction: block(): Customer): Customer {
    var validationResult = validateData(
      \-> validateCustomerData(customer),
      retryFunction
    )
    if (validationResult == null) {
      return null // User cancelled or retry function handled it
    }
    if (!validationResult) {
      return null
    }
    var confirmResult = confirmData(
      "customer details",
      \-> displayCustomerData(customer),
      retryFunction
    )
    if (confirmResult == null) {
      return null 
    }
    if (confirmResult) {
      return customer
    } else {
      return null
    }
  }

  private function validateCustomerData(customer: Customer): String {
    if (!customer.isValidCustomer()) {
      var errors = new StringBuilder()
      if (!customer.validateAge()) {
        errors.append("  - Age must be between ${Constants.MIN_AGE} and ${Constants.MAX_AGE} years (you are ${customer.Age})\n")
      }
      if (!customer.validateDrivingYears()) {
        errors.append("  - Driving years must be positive and reasonable (you have ${customer.DrivingYears} years)\n")
      }
      if (!customer.validateOccupation()) {
        errors.append("  - Professional gamblers are not eligible\n")
      }
      if (!customer.validateDates()) {
        errors.append("  - Date of licence must be after date of birth\n")
      }
      return errors.toString()
    }
    return null
  }

  private function displayCustomerData(customer: Customer) {
    print("Name: ${customer.FirstName} ${customer.LastName}, Gender: ${customer.Gender}, Date of Birth: ${customer.DateOfBirth}, Date of Licence: ${customer.DateOfLicence}, Occupation: ${customer.Occupation}")
  }

  function validateAndConfirmAddress(address: Address, postcode: String, retryFunction: block(): Address): Address {
    var validationResult = validateData(
      \-> validateAddressData(address),
      retryFunction
    )
    if (validationResult == null) {
      return null // User cancelled or retry function handled it
    }
    if (!validationResult) {
      return null
    }
    var confirmResult = confirmData(
      "address details",
      \-> print(address.toString()),
      retryFunction
    )
    if (confirmResult == null) {
      return null // User cancelled or retry function handled it
    }
    if (confirmResult) {
      return address
    } else {
      return null
    }
  }

  private function validateAddressData(address: Address): String {
    if (!address.Postcode.startsWith("BT47") && !address.Postcode.startsWith("BT48")) {
      return "Sorry, we only provide quotes for BT47/BT48 postcodes.\nYour postcode: ${address.Postcode}"
    }
    return null
  }

  function validateAndConfirmVehicle(vehicle: Vehicle, retryFunction: block(): Vehicle): Vehicle {
    var confirmResult = confirmData(
      "vehicle details",
      \-> vehicle.printInfo(),
      retryFunction
    )
    if (confirmResult == null) {
      return null 
    }
    if (confirmResult) {
      return vehicle
    } else {
      return null
    }
  }

  function validateAndConfirmDrivingHistory(drivingHistory: DrivingHistory, retryFunction: block(): DrivingHistory): DrivingHistory {
    print("")
    print("Please confirm your driving history:")
    drivingHistory.printInfo()
    print("")
    var confirm = ValidationEngine.getValidatedBoolean("Are these details correct? (Yes/No)", _inputHandler)
    if (confirm == null) {
      return null // User cancelled
    }
    if (confirm) {
      return drivingHistory
    } else {
      print("")
      print("Since these details were collected during pre-qualification, you'll need to restart from the beginning to change them.")
      var restart = ValidationEngine.getValidatedBoolean("Would you like to restart from pre-qualification? (Yes/No)", _inputHandler)
      if (restart == null) {
        return null // User cancelled
      }
      if (restart) {
        // Signal that user wants to restart from pre-qualification
        _inputHandler.lastInputWasCancel = true
        return null
      } else {
        // User chose not to restart, so we'll continue with current values
        return drivingHistory
      }
    }
  }

  function validateAndConfirmClaimsHistory(claimsHistory: ClaimsHistory, retryFunction: block(): ClaimsHistory): ClaimsHistory {
    var confirmResult = confirmData(
      "claims history",
      \-> print(claimsHistory.toString()),
      retryFunction
    )
    if (confirmResult == null) {
      return null 
    }
    if (confirmResult) {
      return claimsHistory
    } else {
      return null
    }
  }

  private function validateData<T>(validationFunction: block(): String, retryFunction: block(): T): Boolean {
    var errorMessage = validationFunction()
    if (errorMessage != null) {
      print("")
      print("Invalid information:")
      print(errorMessage)
      print("")
      var retry = ValidationEngine.getValidatedBoolean("Would you like to re-enter your details? (Yes/No)", _inputHandler)
      if (retry == null) {
        return null 
      }
      if (retry) {
        retryFunction()
        return null
      } else {
        return false
      }
    }
    return true
  }

  private function confirmData<T>(dataName: String, dataDisplay: block(), retryFunction: block(): T): Boolean {
    print("")
    print("Please confirm your ${dataName}:")
    dataDisplay()
    print("")
    var confirm = ValidationEngine.getValidatedBoolean("Are these details correct? (Yes/No)", _inputHandler)
    if (confirm == null) {
      return null 
    }
    if (confirm) {
      return true
    } else {
      print("")
      var retry = ValidationEngine.getValidatedBoolean("Would you like to re-enter your ${dataName}? (Yes/No)", _inputHandler)
      if (retry == null) {
        return null 
      }
      if (retry) {
        retryFunction()
        return null
      } else {
        // User chose not to re-enter details - this is a cancellation
        _inputHandler.lastInputWasCancel = true
        return false
      }
    }
  }

  function handleBusinessRuleViolation<T>(errorMessage: String, retryFunction: block(): T): Boolean {
    print("")
    print(errorMessage)
    print("")
    var retry = ValidationEngine.getValidatedBoolean("Would you like to try again with different information? (Yes/No)", _inputHandler)
    if (retry == null) {
      return null 
    }
    if (retry) {
      retryFunction()
      return null 
    } else {
      return false
    }
  }
} 