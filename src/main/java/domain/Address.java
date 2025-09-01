package domain;

/**
 * Address data model for the insurance quote process.
 *
 * Stores house number, street, and postcode.
 */
public class Address {
    private String houseNumber;
    private String street;
    private String postcode;

    public Address() {}

    public Address(String houseNumber, String street, String postcode) {
        this.houseNumber = houseNumber;
        this.street = street;
        this.postcode = postcode;
    }

    /**
     * Gets the full address line combining house number and street.
     */
    public String getAddressLine1() {
        return (houseNumber + " " + street).trim();
    }

    @Override
    public String toString() {
        return "Address: " + getAddressLine1() + ", " + postcode;
    }

    // Getters and Setters
    public String getHouseNumber() { return houseNumber; }
    public void setHouseNumber(String houseNumber) { this.houseNumber = houseNumber; }
    
    public String getStreet() { return street; }
    public void setStreet(String street) { this.street = street; }
    
    public String getPostcode() { return postcode; }
    public void setPostcode(String postcode) { this.postcode = postcode; }
}
