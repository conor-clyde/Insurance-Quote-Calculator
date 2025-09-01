package collector;

import util.InputHandler;
import domain.Address;

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
 *   AddressCollector collector = new AddressCollector(inputHandler);
 *   Address address = collector.collectAddressData(postcode);
 *
 * @author Conor Clyde
 * @version 2.0
 */
public class AddressCollector {
    private InputHandler inputHandler;
    
    /**
     * Constructs an AddressCollector with the given InputHandler.
     * @param inputHandler The input handler to use for user prompts and input
     */
    public AddressCollector(InputHandler inputHandler) {
        this.inputHandler = inputHandler;
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
    public Address collectAddressData(String postcode) {
        
        System.out.println("Address Information:");
        System.out.println("------------------");
        System.out.println("Please provide your address details.");
        System.out.println("[NOTE] You can type 'cancel' at any time to start over");

        Address address = new Address();

        String houseNumber = getValidatedString("House number:", 1, 10);
        if (houseNumber == null) {
            return null;
        }
        address.setHouseNumber(houseNumber);

        String street = getValidatedString("Street name:", 3, 50);
        if (street == null) {
            return null;
        }
        address.setStreet(street);

        // Use the postcode from pre-qualification instead of asking again
        address.setPostcode(postcode);
        System.out.println("Postcode: " + postcode);

        // Add confirmation step like in original Gosu version
        if (!confirmAddressDetails(address)) {
            return null;
        }

        return address;
    }

    /**
     * Gets validated string input from user with length constraints.
     */
    private String getValidatedString(String prompt, int minLength, int maxLength) {
        while (true) {
            String input = inputHandler.askStringQuestion(prompt);
            if (input == null) {
                return null;
            }
            
            if (input.length() >= minLength && input.length() <= maxLength) {
                return input;
            }
            
            System.out.println("Input must be between " + minLength + " and " + maxLength + " characters long.");
        }
    }

    /**
     * Confirms the collected address details with the user.
     * @param address The address object to confirm
     * @return true if confirmed, false if cancelled
     */
    private boolean confirmAddressDetails(Address address) {
        System.out.println("\nPlease review your address details:");
        System.out.println("House Number: " + address.getHouseNumber());
        System.out.println("Street: " + address.getStreet());
        System.out.println("Postcode: " + address.getPostcode());
        System.out.println("------------------");

        String confirmation = inputHandler.askStringQuestion("Is this address correct? (yes/no): ");
        if (confirmation == null) {
            return false; // User cancelled
        }
        return confirmation.equalsIgnoreCase("yes");
    }
}
