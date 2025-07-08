package scratch

class Address {
  var _houseNo : int as HouseNo
  var _street : String as Street
  var _postcode : String as Postcode

  construct() {}

  construct(houseNo : int, street : String, postcode : String) {
    _houseNo = houseNo
    _street = street
    _postcode = postcode
  }

  function calcPostcodeDis() : double {
    return (Postcode.startsWith("BT47")) ? 0.05 : 0.0
  }

  function calcPostcodePel() : double {
    if (Postcode.startsWith("BT48 6")) {
      return 0.15
    } else if (Postcode.startsWith("BT48")) {
      return 0.10
    }
    return 0.0
  }
  
  override function toString() : String { 
    return "House Number: ${_houseNo}, Street: ${_street}, Postcode: ${_postcode}"
  }
}
