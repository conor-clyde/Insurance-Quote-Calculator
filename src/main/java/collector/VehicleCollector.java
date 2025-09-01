package collector;

import util.InputHandler;
import domain.Vehicle;
import domain.VehicleOption;
import constants.Constants;
import java.util.Arrays;
import java.util.List;

/**
 * VehicleCollector handles the collection and validation of vehicle information.
 */
public class VehicleCollector {
    private InputHandler inputHandler;
    
    /**
     * Constructs a VehicleCollector with the given InputHandler.
     * 
     * @param inputHandler The input handler to use for user prompts and input
     */
    public VehicleCollector(InputHandler inputHandler) {
        this.inputHandler = inputHandler;
    }

    // ============================================================================
    // MAIN COLLECTION METHOD
    // ============================================================================
    
    /**
     * Collects and validates vehicle information.
     * 
     * @return Vehicle object if valid, null if cancelled
     */
    public Vehicle collectVehicleData() {
        
        System.out.println("Vehicle Information:");
        System.out.println("------------------");
        System.out.println("Please provide your vehicle details.");
        System.out.println("[NOTE] This application only covers specific vehicles - all others must be declined.");
        System.out.println("[NOTE] You can type 'cancel' at any time to start over");

        Vehicle vehicle = new Vehicle();

        List<VehicleOption> vehicleOptions = Arrays.asList(
            new VehicleOption("Ford", "Focus"),
            new VehicleOption("BMW", "3 Series"),
            new VehicleOption("Tesla", "Model S"),
            new VehicleOption("Ferrari", "F430"),
            new VehicleOption("Rolls Royce", "Phantom")
        );
        
        System.out.println("Please select from the following covered vehicles:");
        System.out.println("0. Cancel/Back");
        for (int i = 0; i < vehicleOptions.size(); i++) {
            System.out.println((i + 1) + ". " + vehicleOptions.get(i).getMake() + " " + vehicleOptions.get(i).getModel());
        }
        System.out.println("[NOTE] Only these specific vehicles are covered. All other vehicles will be declined.");

        while (true) {
            Integer vehicleChoice = inputHandler.askIntQuestion("Enter your choice (0-" + vehicleOptions.size() + ")", 0, vehicleOptions.size());
            if (vehicleChoice == null) {
                return null;
            }
            if (vehicleChoice == 0) {
                return null;
            }
            if (vehicleChoice >= 1 && vehicleChoice <= vehicleOptions.size()) {
                VehicleOption selected = vehicleOptions.get(vehicleChoice - 1);
                vehicle.setMake(selected.getMake());
                vehicle.setModel(selected.getModel());
                break;
            }
            System.out.println("[X] Invalid choice. Please enter a number between 0 and " + vehicleOptions.size() + ".");
        }

        if (!isVehicleCovered(vehicle.getMake(), vehicle.getModel())) {
            System.out.println("Sorry, we don't provide coverage for " + vehicle.getMake() + " " + vehicle.getModel() + ".");
            System.out.println("We only cover: Ford Focus, BMW 3 Series, Tesla Model S, Ferrari F430, Rolls Royce Phantom");
            return null;
        }

        Integer year = getValidatedVehicleYear("Vehicle year:");
        if (year == null) {
            return null;
        }
        vehicle.setYear(year);

        String reg = getValidatedRegistration("Registration number:");
        if (reg == null) {
            return null;
        }
        vehicle.setReg(reg);

        Double value = getValidatedVehicleValue("Vehicle value:");
        if (value == null) {
            return null;
        }
        vehicle.setValue(value);

        vehicle.setHasTracker(collectTrackerInformation(value));

        return vehicle;
    }

    // ============================================================================
    // PRIVATE HELPER METHODS
    // ============================================================================
    
    /**
     * Checks if a vehicle is covered by the insurance policy.
     * 
     * @param make Vehicle make
     * @param model Vehicle model
     * @return Boolean indicating if vehicle is covered
     */
    private boolean isVehicleCovered(String make, String model) {
        String makeModel = make.trim() + " " + model.trim();
        for (String coveredVehicle : Constants.VEHICLE_COVERED_LIST) {
            if (coveredVehicle.equalsIgnoreCase(makeModel)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Collects tracker information for high-value vehicles.
     * 
     * @param value Vehicle value in pounds
     * @return Boolean indicating if vehicle has tracker
     */
    private boolean collectTrackerInformation(Double value) {
        if (value > Constants.TRACKER_REQUIRED_VALUE) {
            System.out.println("");
            System.out.println("Your vehicle is worth over GBP" + Constants.TRACKER_REQUIRED_VALUE + ".");
            System.out.println("A tracking device is required for vehicles of this value.");
            System.out.println("");
            Boolean hasTracker = inputHandler.askBooleanQuestion("Does your vehicle have a tracking device? (Yes/No)");
            if (hasTracker == null) {
                return false; // User cancelled
            }
            if (!hasTracker) {
                System.out.println("");
                System.out.println("Sorry, vehicles worth over GBP" + Constants.TRACKER_REQUIRED_VALUE + " must have a tracking device.");
                System.out.println("Please install a tracker and try again, or choose a different vehicle.");
                System.out.println("");
                Boolean retry = inputHandler.askBooleanQuestion("Would you like to try a different vehicle? (Yes/No)");
                if (retry == null) {
                    return false; // User cancelled
                }
                if (retry) {
                    Vehicle newVehicle = collectVehicleData();
                    if (newVehicle == null) {
                        return false; // User cancelled
                    }
                    return newVehicle.isHasTracker();
                } else {
                    return false;
                }
            }
            return hasTracker;
        } else {
            System.out.println("");
            Boolean hasTracker = inputHandler.askBooleanQuestion("Does your vehicle have a tracking device? (Yes/No)");
            if (hasTracker == null) {
                return false; // User cancelled
            }
            return hasTracker;
        }
    }

    /**
     * Gets validated vehicle year input from user.
     */
    private Integer getValidatedVehicleYear(String prompt) {
        while (true) {
            Integer year = inputHandler.askIntQuestion(prompt, Constants.MIN_VEHICLE_YEAR, Constants.MAX_VEHICLE_YEAR);
            if (year == null) {
                return null;
            }
            return year;
        }
    }

    /**
     * Gets validated registration number input from user.
     */
    private String getValidatedRegistration(String prompt) {
        return inputHandler.askStringQuestion(prompt);
    }

    /**
     * Gets validated vehicle value input from user.
     */
    private Double getValidatedVehicleValue(String prompt) {
        while (true) {
            System.out.println(prompt);
            String input = inputHandler.askStringQuestion("Enter value in GBP:");
            if (input == null) {
                return null;
            }
            
            try {
                double value = Double.parseDouble(input);
                if (value >= Constants.MIN_VEHICLE_VALUE && value <= Constants.MAX_VEHICLE_VALUE) {
                    return value;
                }
                System.out.println("Vehicle value must be between GBP" + Constants.MIN_VEHICLE_VALUE + " and GBP" + Constants.MAX_VEHICLE_VALUE + ".");
            } catch (NumberFormatException e) {
                System.out.println("Please enter a valid number.");
            }
        }
    }
}
