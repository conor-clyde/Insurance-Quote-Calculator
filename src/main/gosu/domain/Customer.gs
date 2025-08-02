package domain

uses java.time.LocalDate
uses java.time.Period
uses constants.Constants

/**
 * Customer data model for the insurance quote process.
 *
 * Stores personal details, occupation, and driving licence information.
 */
class Customer {
  var _firstName: String as FirstName
  var _lastName: String as LastName
  var _gender: String as Gender
  var _dateOfBirth: LocalDate as DateOfBirth
  var _dateOfLicence: LocalDate as DateOfLicence
  var _age: int as Age
  var _drivingYears: int as DrivingYears
  var _occupation: String as Occupation

  construct() {}

  construct(firstName: String, lastName: String, gender: String, dateOfBirth: LocalDate, dateOfLicence: LocalDate, occupation: String) {
    _firstName = firstName
    _lastName = lastName
    _gender = gender
    _dateOfBirth = dateOfBirth
    _dateOfLicence = dateOfLicence
    _occupation = occupation
    calculateAgeAndDrivingYears()
  }

  /**
   * Calculates age and driving years from dates.
   */
  function calculateAgeAndDrivingYears() {
    if (_dateOfBirth != null and _dateOfLicence != null) {
      var today = LocalDate.now()
      
      var agePeriod = Period.between(_dateOfBirth, today)
      _age = agePeriod.getYears()
      
      var drivingPeriod = Period.between(_dateOfLicence, today)
      _drivingYears = drivingPeriod.getYears()
    }
  }

  /**
   * Updates date of birth and recalculates age.
   */
  function updateDateOfBirth(dateOfBirth: LocalDate) {
    _dateOfBirth = dateOfBirth
    calculateAgeAndDrivingYears()
  }

  /**
   * Updates date of licence and recalculates driving years.
   */
  function updateDateOfLicence(dateOfLicence: LocalDate) {
    _dateOfLicence = dateOfLicence
    calculateAgeAndDrivingYears()
  }

  /**
   * Gets the full name as a single string.
   */
  function getFullName(): String {
    return "${_firstName} ${_lastName}".trim()
  }

  /**
   * Sets the full name by splitting into first and last name.
   */
  function setFullName(fullName: String) {
    var nameParts = fullName.trim().split("\\s+")
    if (nameParts.length >= 2) {
      _firstName = nameParts[0]
      _lastName = nameParts[1]
    } else if (nameParts.length == 1) {
      _firstName = nameParts[0]
      _lastName = ""
    }
  }

  override function toString(): String {
    return "Name: ${getFullName()}, Gender: ${_gender}, Date of Birth: ${_dateOfBirth}, Date of Licence: ${_dateOfLicence}, Age: ${_age}, Driving Years: ${_drivingYears}, Occupation: ${_occupation}"
  }

  /**
   * Validates age is within acceptable range (21-85).
   */
  function validateAge(): boolean {
    return _age >= Constants.MIN_AGE and _age <= Constants.MAX_AGE
  }

  /**
   * Validates driving years are reasonable.
   */
  function validateDrivingYears(): boolean {
    // Driving years must be positive and reasonable
    // Allow driving years up to (age - 16) to account for early driving licenses
    return _drivingYears > 0 and _drivingYears <= (_age - 16)
  }

  /**
   * Validates occupation is not excluded.
   */
  function validateOccupation(): boolean {
    return _occupation != null and _occupation.toLowerCase() != "professional gambler"
  }

  /**
   * Validates dates are logical.
   */
  function validateDates(): boolean {
    return _dateOfLicence != null and _dateOfBirth != null and _dateOfLicence.isAfter(_dateOfBirth)
  }

  /**
   * Validates all customer data meets business rules.
   */
  function isValidCustomer(): boolean {
    return validateAge() && validateDrivingYears() && validateOccupation() && validateDates()
  }
}