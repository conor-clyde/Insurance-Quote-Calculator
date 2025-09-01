package domain;

import java.time.LocalDate;
import java.time.Period;
import constants.Constants;

/**
 * Customer data model for the insurance quote process.
 *
 * Stores personal details, occupation, and driving licence information.
 */
public class Customer {
    private String firstName;
    private String lastName;
    private String gender;
    private LocalDate dateOfBirth;
    private LocalDate dateOfLicence;
    private int age;
    private int drivingYears;
    private String occupation;

    public Customer() {}

    public Customer(String firstName, String lastName, String gender, LocalDate dateOfBirth, LocalDate dateOfLicence, String occupation) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.dateOfLicence = dateOfLicence;
        this.occupation = occupation;
        calculateAgeAndDrivingYears();
    }

    /**
     * Calculates age and driving years from dates.
     */
    public void calculateAgeAndDrivingYears() {
        if (dateOfBirth != null && dateOfLicence != null) {
            LocalDate today = LocalDate.now();
            
            Period agePeriod = Period.between(dateOfBirth, today);
            age = agePeriod.getYears();
            
            Period drivingPeriod = Period.between(dateOfLicence, today);
            drivingYears = drivingPeriod.getYears();
        }
    }

    /**
     * Updates date of birth and recalculates age.
     */
    public void updateDateOfBirth(LocalDate dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
        calculateAgeAndDrivingYears();
    }

    /**
     * Updates date of licence and recalculates driving years.
     */
    public void updateDateOfLicence(LocalDate dateOfLicence) {
        this.dateOfLicence = dateOfLicence;
        calculateAgeAndDrivingYears();
    }

    /**
     * Gets the full name as a single string.
     */
    public String getFullName() {
        return (firstName + " " + lastName).trim();
    }

    /**
     * Sets the full name by splitting into first and last name.
     */
    public void setFullName(String fullName) {
        String[] nameParts = fullName.trim().split("\\s+");
        if (nameParts.length >= 2) {
            firstName = nameParts[0];
            lastName = nameParts[1];
        } else if (nameParts.length == 1) {
            firstName = nameParts[0];
            lastName = "";
        }
    }

    @Override
    public String toString() {
        return "Name: " + getFullName() + ", Gender: " + gender + ", Date of Birth: " + dateOfBirth + 
               ", Date of Licence: " + dateOfLicence + ", Age: " + age + ", Driving Years: " + drivingYears + 
               ", Occupation: " + occupation;
    }

    /**
     * Validates age is within acceptable range (21-85).
     */
    public boolean validateAge() {
        return age >= Constants.MIN_AGE && age <= Constants.MAX_AGE;
    }

    /**
     * Validates driving years are reasonable.
     */
    public boolean validateDrivingYears() {
        // Driving years must be positive and reasonable
        // Allow driving years up to (age - 16) to account for early driving licenses
        return drivingYears > 0 && drivingYears <= (age - 16);
    }

    /**
     * Validates occupation is not excluded.
     */
    public boolean validateOccupation() {
        return occupation != null && !occupation.toLowerCase().equals("professional gambler");
    }

    /**
     * Validates dates are logical.
     */
    public boolean validateDates() {
        return dateOfLicence != null && dateOfBirth != null && dateOfLicence.isAfter(dateOfBirth);
    }

    /**
     * Validates all customer data meets business rules.
     */
    public boolean isValidCustomer() {
        return validateAge() && validateDrivingYears() && validateOccupation() && validateDates();
    }

    // Getters and Setters
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    
    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }
    
    public LocalDate getDateOfBirth() { return dateOfBirth; }
    
    public LocalDate getDateOfLicence() { return dateOfLicence; }
    
    public int getAge() { return age; }
    
    public int getDrivingYears() { return drivingYears; }
    
    public String getOccupation() { return occupation; }
    public void setOccupation(String occupation) { this.occupation = occupation; }
}
