package collector

uses service.ValidationEngine
uses util.InputHandler
uses domain.Address
uses constants.Constants

/**
 * AddressCollector handles the collection and validation of address information.
 * 
 * Responsibilities:
 * - Collects address details (house number, street, postcode)
 * - Validates address data against business rules
 * - Handles user confirmation and retry logic
 * - Ensures data consistency and completeness
 *
 * Usage:
 *   var collector = new AddressCollector(inputHandler)
 *   var address = collector.collectAddressData(postcode)
 *
 * @author Conor Clyde
 * @version 2.0
 */
class AddressCollector {
  private var _inputHandler: InputHandler
  private var _validationEngine: ValidationEngine
  
  /**
   * Constructs an AddressCollector with the given InputHandler.
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
   * Collects and validates address information.
   * 
   * @param postcode Postcode from pre-qualification
   * @return Address object if valid, null if cancelled
   */
  function collectAddressData(postcode: String): Address {
    
    print("Address Information:")
    print("------------------")
    print("Please provide your address details.")
    print("[NOTE] You can type 'cancel' at any time to start over")

    var address = new Address()

    var houseNumber = service.ValidationEngine.getValidatedString("House number:", _inputHandler, 1, 10)
    if (houseNumber == null) {
      return null
    }
    address.HouseNumber = houseNumber

    var street = service.ValidationEngine.getValidatedString("Street name:", _inputHandler, 3, 50)
    if (street == null) {
      return null
    }
    address.Street = street

    // Use the postcode from pre-qualification instead of asking again
    address.Postcode = postcode
    print("Postcode: ${postcode}")

    return _validationEngine.validateAndConfirmAddress(address, address.Postcode, \-> collectAddressData(postcode))
  }
} 