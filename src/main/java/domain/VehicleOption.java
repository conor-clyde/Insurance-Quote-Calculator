package domain;

/**
 * VehicleOption data model for selectable vehicle options in the insurance quote process.
 *
 * Stores make and model for vehicle selection.
 */
public class VehicleOption {
    private String make;
    private String model;
 
    public VehicleOption(String make, String model) {
        this.make = make;
        this.model = model;
    }

    // Getters and Setters
    public String getMake() { return make; }
    public void setMake(String make) { this.make = make; }
    
    public String getModel() { return model; }
    public void setModel(String model) { this.model = model; }
}
