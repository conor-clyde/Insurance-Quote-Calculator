package domain

uses java.time.LocalDate

/**
 * PreQualResult data model for pre-qualification results in the insurance quote process.
 *
 * Stores the outcome of pre-qualification checks and relevant user data.
 */
class PreQualResult {
  var _dob: LocalDate as Dob
  var _occupation: String as Occupation
  var _postcode: String as Postcode
  var _faultAccidents: Integer as FaultAccidents
  var _nonFaultAccidents: Integer as NonFaultAccidents
  var _penaltyPoints: Integer as PenaltyPoints
  var _nonMotorConvictions: Integer as NonMotorConvictions

  construct(dob: LocalDate, occupation: String, postcode: String, faultAccidents: Integer, nonFaultAccidents: Integer, penaltyPoints: Integer, nonMotorConvictions: Integer) {
    _dob = dob
    _occupation = occupation
    _postcode = postcode
    _faultAccidents = faultAccidents
    _nonFaultAccidents = nonFaultAccidents
    _penaltyPoints = penaltyPoints
    _nonMotorConvictions = nonMotorConvictions
  }
} 