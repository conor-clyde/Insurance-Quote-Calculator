package collector;

import util.InputHandler;
import domain.Customer;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

/**
 * CustomerCollector handles the collection and validation of customer information.
 */
public class CustomerCollector {
    private InputHandler inputHandler;
    
    /**
     * Constructs a CustomerCollector with the given InputHandler.
     * 
     * @param inputHandler The input handler to use for user prompts and input
     */
    public CustomerCollector(InputHandler inputHandler) {
        this.inputHandler = inputHandler;
    }

    // ============================================================================
    // MAIN COLLECTION METHOD
    // ============================================================================
    
    /**
     * Collects and validates customer information.
     * 
     * @param dob Date of birth from pre-qualification
     * @param occupation Occupation from pre-qualification
     * @return Customer object if valid, null if cancelled
     */
    public Customer collectCustomerData(LocalDate dob, String occupation) {
        
        System.out.println("Customer Information:");
        System.out.println("-------------------");
        System.out.println("Please provide your personal details.");
        System.out.println("[NOTE] You can type 'cancel' at any time to start over");

        Customer customer = new Customer();

        String firstName = getValidatedName("First Name:");
        if (firstName == null) {
            return null;
        }
        customer.setFirstName(firstName);

        String lastName = getValidatedName("Last Name:");
        if (lastName == null) {
            return null;
        }
        customer.setLastName(lastName);

        String gender = collectGender();
        if (gender == null) {
            return null;
        }
        customer.setGender(gender);

        customer.updateDateOfBirth(dob);
        customer.setOccupation(occupation);

        LocalDate dateOfLicence = collectDrivingLicenceDate(dob);
        if (dateOfLicence == null) {
            return null;
        }
        customer.updateDateOfLicence(dateOfLicence);

        // Add confirmation step like in original Gosu version
        if (!confirmCustomerDetails(customer)) {
            return null;
        }

        return customer;
    }

    // ============================================================================
    // PRIVATE COLLECTION METHODS
    // ============================================================================
    
    /**
     * Collects and validates gender information.
     * 
     * @return Gender string if valid, null if cancelled
     */
    private String collectGender() {
        while (true) {
            String gender = inputHandler.askStringQuestion("What is your preferred gender? (Male/Female/Other)");
            if (gender == null) {
                return null;
            }
            
            String genderLower = gender.toLowerCase();
            if (genderLower.equals("m")) genderLower = "male";
            if (genderLower.equals("f")) genderLower = "female";
            
            List<String> validGenders = Arrays.asList("male", "female", "other");
            if (validGenders.contains(genderLower)) {
                // Capitalize first letter for consistency
                return genderLower.substring(0, 1).toUpperCase() + genderLower.substring(1);
            }
            
            System.out.println("");
            System.out.println("Invalid gender. Please enter Male, Female, or Other.");
            System.out.println("");
        }
    }

    /**
     * Collects and validates driving licence date.
     * 
     * @param dob Date of birth for validation
     * @return LocalDate if valid, null if cancelled
     */
    private LocalDate collectDrivingLicenceDate(LocalDate dob) {
        // Simplified date collection - in a real implementation, you'd want proper date parsing
        System.out.println("Please enter your driving licence date (YYYY-MM-DD format):");
        String dateStr = inputHandler.askStringQuestion("Date of licence:");
        if (dateStr == null) {
            return null;
        }

        try {
            LocalDate dateOfLicence = LocalDate.parse(dateStr);
            
            // Validate the date
            while (dateOfLicence.isAfter(LocalDate.now()) ||
                   dateOfLicence.isBefore(dob)) {
                System.out.println("Invalid date. Please enter a valid date of licence (not in the future and after date of birth).");
                dateStr = inputHandler.askStringQuestion("Date of licence:");
                if (dateStr == null) {
                    return null;
                }
                dateOfLicence = LocalDate.parse(dateStr);
            }

            return dateOfLicence;
        } catch (Exception e) {
            System.out.println("Invalid date format. Please use YYYY-MM-DD format.");
            return collectDrivingLicenceDate(dob);
        }
    }

    /**
     * Gets validated name input from user.
     */
    private String getValidatedName(String prompt) {
        return inputHandler.askStringQuestion(prompt);
    }

    /**
     * Confirms customer details with the user.
     */
    private boolean confirmCustomerDetails(Customer customer) {
        System.out.println("Please confirm your customer details:");
        System.out.println("Name: " + customer.getFullName() + 
                          ", Gender: " + customer.getGender() + 
                          ", Date of Birth: " + customer.getDateOfBirth() + 
                          ", Date of Licence: " + customer.getDateOfLicence() + 
                          ", Occupation: " + customer.getOccupation());
        
        Boolean isCorrect = inputHandler.askBooleanQuestion("Are these details correct? (Yes/No)");
        return isCorrect != null && isCorrect;
    }
}
