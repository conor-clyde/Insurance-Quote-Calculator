
package domain

/**
 * Address data model for the insurance quote process.
 *
 * Stores house number, street, and postcode.
 */
class Address {
  var _houseNumber: String as HouseNumber
  var _street: String as Street
  var _postcode: String as Postcode

  construct() {}

  construct(houseNumber: String, street: String, postcode: String) {
    _houseNumber = houseNumber
    _street = street
    _postcode = postcode
  }

  /**
   * Gets the full address line combining house number and street.
   */
  function getAddressLine1(): String {
    return "${_houseNumber} ${_street}".trim()
  }

  override function toString(): String {
    return "Address: ${getAddressLine1()}, ${_postcode}"
  }
}
