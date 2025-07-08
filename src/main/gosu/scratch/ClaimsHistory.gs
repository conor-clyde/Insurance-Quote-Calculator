package scratch

class ClaimsHistory {
  var _nonFaultAccidents : int as NonFaultAccidents
  var _faultAccidents : int as FaultAccidents

  construct() {
    _nonFaultAccidents = 0
    _faultAccidents = 0
  }

  construct (nonFaultAccidents : int, faultAccidents : int) {
    _nonFaultAccidents = nonFaultAccidents
    _faultAccidents = faultAccidents
  }

  function isClaimHistoryValid() : boolean {
    return NonFaultAccidents <= 3 and FaultAccidents < 3;
  }

  function calcClaimsPenalty() : double {
    switch (_faultAccidents) {
      case 1:
        return 0.5
      case 2:
        return 1.0
      default:
        return 0   
    }
  }
  
    override function toString() : String {
      return "Non Fault Accidents: ${_nonFaultAccidents}, Fault Accidents: ${_faultAccidents}"
  }
}
