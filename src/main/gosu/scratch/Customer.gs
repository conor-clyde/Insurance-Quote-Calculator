package scratch

uses java.time.LocalDate
uses java.time.Period

/**
 * Customer class represents customer information with date-based calculations.
 * Calculates age and driving years from date of birth and date of licence.
 */
class Customer {
  var _name: String as Name
  var _gender: String as Gender
  var _dateOfBirth: LocalDate as DateOfBirth
  var _dateOfLicence: LocalDate as DateOfLicence
  var _age: int as Age
  var _drivingYears: int as DrivingYears
  var _occupation: String as Occupation

  construct() {}

  construct(name: String, gender: String, dateOfBirth: LocalDate, dateOfLicence: LocalDate, occupation: String) {
    _name = name
    _gender = gender
    _dateOfBirth = dateOfBirth
    _dateOfLicence = dateOfLicence
    _occupation = occupation
    calculateAgeAndDrivingYears()
  }

  /**
   * Calculates age and years driving from date of birth and date of licence.
   */
  function calculateAgeAndDrivingYears() {
    var today = LocalDate.now()
    
    // Calculate age
    var agePeriod = Period.between(_dateOfBirth, today)
    _age = agePeriod.getYears()
    
    // Calculate years driving
    var drivingPeriod = Period.between(_dateOfLicence, today)
    _drivingYears = drivingPeriod.getYears()
  }

  /**
   * Sets date of birth and recalculates age.
   * 
   * @param dateOfBirth The customer's date of birth
   */
  function setDateOfBirth(dateOfBirth: LocalDate) {
    _dateOfBirth = dateOfBirth
    calculateAgeAndDrivingYears()
  }

  /**
   * Sets date of licence and recalculates driving years.
   * 
   * @param dateOfLicence The customer's date of licence
   */
  function setDateOfLicence(dateOfLicence: LocalDate) {
    _dateOfLicence = dateOfLicence
    calculateAgeAndDrivingYears()
  }

  override function toString(): String {
    return "Name: ${_name}, Gender: ${_gender}, Date of Birth: ${_dateOfBirth}, Date of Licence: ${_dateOfLicence}, Age: ${_age}, Driving Years: ${_drivingYears}, Occupation: ${_occupation}"
  }

  /**
   * Validates that the customer's age is within acceptable range (21-85).
   * 
   * @return Boolean indicating if age is valid
   */
  function validateAge(): boolean {
    return _age >= 21 and _age <= 85
  }

  /**
   * Validates that the driving years are reasonable (positive and not more than age - 17).
   * 
   * @return Boolean indicating if driving years are valid
   */
  function validateDrivingYears(): boolean {
    return _drivingYears > 0 and _drivingYears <= (_age - 17)
  }

  /**
   * Validates that the occupation is acceptable (not Professional Gambler).
   * 
   * @return Boolean indicating if occupation is valid
   */
  function validateOccupation(): boolean {
    return _occupation != "Professional Gambler"
  }

  /**
   * Validates that the date of licence is not before the date of birth.
   * 
   * @return Boolean indicating if dates are valid
   */
  function validateDates(): boolean {
    return _dateOfLicence.isAfter(_dateOfBirth)
  }

  /**
   * Comprehensive validation of all customer information.
   * 
   * @return Boolean indicating if customer is valid
   */
  function isValidCustomer(): boolean {
    return validateAge() && validateDrivingYears() && validateOccupation() && validateDates()
  }
}