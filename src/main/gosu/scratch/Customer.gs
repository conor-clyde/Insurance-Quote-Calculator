package scratch

class Customer {
  var _name : String as Name
  var _gender : String as Gender
  var _age : int as Age
  var _drivingYears : int as DrivingYears
  var _occupation : String as Occupation

  construct() {}

  construct(name : String, gender : String, age : int, drivingYears : int, occupation : String) {
    _name = name
    _gender = gender
    _age = age
    _drivingYears = drivingYears
    _occupation = occupation
  }

  override function toString() : String {
     return "Name: ${_name}, Gender: ${_gender}, Age: ${_age}, Driving Years: ${_drivingYears}, Occupation: ${_occupation}"
  }

  function validateAge() : boolean {
    return _age >= 21 and _age <= 85
  }

  function validateDrivingYears() : boolean {
    return _drivingYears > 0 and _drivingYears <= (_age - 17)
  }

  function validateOccupation() : boolean {
    return _occupation != "Professional Gambler"
  }

  function isValidCustomer() : boolean {
    return validateAge() && validateDrivingYears() && validateOccupation()
  }
}