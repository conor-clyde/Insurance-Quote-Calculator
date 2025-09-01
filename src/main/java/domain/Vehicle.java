package domain;

import constants.Constants;

/**
 * Vehicle data model for the insurance quote process.
 *
 * Stores vehicle details and provides validation and premium calculation methods.
 */
public class Vehicle {
    private String make;
    private String model;
    private int year;
    private String reg;
    private double value;
    private boolean hasTracker;

    /**
     * Default constructor.
     */
    public Vehicle() {}
    
    /**
     * Constructor with all vehicle details.
     * 
     * @param make Vehicle make (e.g., "Ford", "BMW")
     * @param model Vehicle model (e.g., "Focus", "3 Series")
     * @param year Manufacturing year
     * @param reg Registration number
     * @param value Vehicle value in pounds
     * @param hasTracker Whether vehicle has tracking device
     */
    public Vehicle(String make, String model, int year, String reg, double value, boolean hasTracker) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.reg = reg;
        this.value = value;
        this.hasTracker = hasTracker;
    }

    /**
     * Calculates vehicle-specific premium adjustments based on make and model.
     * Higher-value vehicles have higher premium multipliers.
     * 
     * @return Premium multiplier as a decimal (0.0 to 5.0)
     */
    public double calculateVehiclePremium() {
        switch (make) {
            case "BMW 3 Series":
                return Constants.VEHICLE_MULTIPLIER_BMW;
            case "Tesla Model S":
                return Constants.VEHICLE_MULTIPLIER_TESLA;
            case "Ferrari F430":
                return Constants.VEHICLE_MULTIPLIER_FERRARI;
            case "Rolls Royce Phantom":
                return Constants.VEHICLE_MULTIPLIER_ROLLS;
            default:
                return Constants.VEHICLE_MULTIPLIER_FOCUS;
        } 
    }
    
    /**
     * Prints vehicle information in a formatted display.
     * Used for user confirmation during quote process.
     */
    public void printInfo() {
        System.out.println("Make: " + make);
        System.out.println("Model: " + model);
        System.out.println("Year: " + year);
        System.out.println("Registration: " + reg);
        System.out.println("Value: GBP" + value);
        System.out.println("Has Tracker: " + hasTracker);
    }
    
    /**
     * Returns a concise string representation of the vehicle.
     * 
     * @return Formatted vehicle string
     */
    @Override
    public String toString() {
        return make + " " + model + " (" + year + ") - " + reg + " - GBP" + value;
    }
    
    /**
     * Validates that all vehicle information is complete and reasonable.
     * 
     * @return Boolean indicating if vehicle data is valid
     */
    public boolean isValid() {
        return make != null && !make.trim().isEmpty() &&
               model != null && !model.trim().isEmpty() &&
               year >= Constants.MIN_VEHICLE_YEAR && year <= Constants.MAX_VEHICLE_YEAR &&
               reg != null && !reg.trim().isEmpty() &&
               value > 0;
    }

    // Getters and Setters
    public String getMake() { return make; }
    public void setMake(String make) { this.make = make; }
    
    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }
    
    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }
    
    public String getReg() { return reg; }
    public void setReg(String reg) { this.reg = reg; }
    
    public double getValue() { return value; }
    public void setValue(double value) { this.value = value; }
    
    public boolean isHasTracker() { return hasTracker; }
    public void setHasTracker(boolean hasTracker) { this.hasTracker = hasTracker; }
}
