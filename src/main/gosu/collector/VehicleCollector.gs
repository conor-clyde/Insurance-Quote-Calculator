package collector

uses service.ValidationEngine
uses util.InputHandler
uses domain.Vehicle
uses domain.VehicleOption
uses constants.Constants

/**
 * VehicleCollector handles the collection and validation of vehicle information.
 */
class VehicleCollector {
  private var _inputHandler: InputHandler
  private var _validationEngine: ValidationEngine
  
  /**
   * Constructs a VehicleCollector with the given InputHandler.
   * 
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
   * Collects and validates vehicle information.
   * 
   * @return Vehicle object if valid, null if cancelled
   */
  function collectVehicleData(): Vehicle {
    
    print("Vehicle Information:")
    print("------------------")
    print("Please provide your vehicle details.")
    print("[NOTE] This application only covers specific vehicles - all others must be declined.")
    print("[NOTE] You can type 'cancel' at any time to start over")

    var vehicle = new Vehicle()

    var vehicleOptions = {
      new VehicleOption("Ford", "Focus"),
      new VehicleOption("BMW", "3 Series"),
      new VehicleOption("Tesla", "Model S"),
      new VehicleOption("Ferrari", "F430"),
      new VehicleOption("Rolls Royce", "Phantom")
    }
    
    print("Please select from the following covered vehicles:")
    print("0. Cancel/Back")
    for (i in 0..(vehicleOptions.Count-1)) {
      print("${i+1}. ${vehicleOptions[i].Make} ${vehicleOptions[i].Model}")
    }
    print("[NOTE] Only these specific vehicles are covered. All other vehicles will be declined.")

    while (true) {
      var vehicleChoice = _inputHandler.askIntQuestion("Enter your choice (0-${vehicleOptions.Count})")
      if (vehicleChoice == null) {
        return null
      }
      if (vehicleChoice == 0) {
        return null
      }
      if (vehicleChoice >= 1 && vehicleChoice <= vehicleOptions.Count) {
        var selected = vehicleOptions[vehicleChoice-1]
        vehicle.Make = selected.Make
        vehicle.Model = selected.Model
        break
      }
      print("[X] Invalid choice. Please enter a number between 0 and ${vehicleOptions.Count}.")
    }

    if (!isVehicleCovered(vehicle.Make, vehicle.Model)) {
      var retryResult = _validationEngine.handleBusinessRuleViolation(
        "Sorry, we don't provide coverage for ${vehicle.Make} ${vehicle.Model}.\nWe only cover: Ford Focus, BMW 3 Series, Tesla Model S, Ferrari F430, Rolls Royce Phantom",
        \-> collectVehicleData()
      )
      if (retryResult == null) {
        return null
      }
      return null
    }

    var year = _validationEngine.getValidatedVehicleYear("Vehicle year:", _inputHandler)
    if (year == null) {
      return null
    }
    vehicle.Year = year

    var reg = _validationEngine.getValidatedRegistration("Registration number:", _inputHandler)
    if (reg == null) {
      return null
    }
    vehicle.Reg = reg

    var value = _validationEngine.getValidatedVehicleValue("Vehicle value:", _inputHandler)
    if (value == null) {
      return null
    }
    vehicle.Value = value

    vehicle.HasTracker = collectTrackerInformation(value)

    return _validationEngine.validateAndConfirmVehicle(vehicle, \-> collectVehicleData())
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
  private function isVehicleCovered(make: String, model: String): boolean {
    var makeModel = "${make.trim()} ${model.trim()}"
    return _validationEngine.isVehicleCovered(make, model)
  }

  /**
   * Collects tracker information for high-value vehicles.
   * 
   * @param value Vehicle value in pounds
   * @return Boolean indicating if vehicle has tracker
   */
  private function collectTrackerInformation(value: int): boolean {
    if (value > Constants.TRACKER_REQUIRED_VALUE) {
      print("")
              print("Your vehicle is worth over GBP${Constants.TRACKER_REQUIRED_VALUE}.")
      print("A tracking device is required for vehicles of this value.")
      print("")
      var hasTracker = _validationEngine.getValidatedBoolean("Does your vehicle have a tracking device? (Yes/No)", _inputHandler)
      if (hasTracker == null) {
        return false // User cancelled
      }
      if (!hasTracker) {
        print("")
        print("Sorry, vehicles worth over GBP${Constants.TRACKER_REQUIRED_VALUE} must have a tracking device.")
        print("Please install a tracker and try again, or choose a different vehicle.")
        print("")
        var retry = _validationEngine.getValidatedBoolean("Would you like to try a different vehicle? (Yes/No)", _inputHandler)
        if (retry == null) {
          return false // User cancelled
        }
        if (retry) {
          var newVehicle = collectVehicleData()
          if (newVehicle == null) {
            return false // User cancelled
          }
          return newVehicle.HasTracker
        } else {
          return false
        }
      }
      return hasTracker
    } else {
      print("")
      var hasTracker = _validationEngine.getValidatedBoolean("Does your vehicle have a tracking device? (Yes/No)", _inputHandler)
      if (hasTracker == null) {
        return false // User cancelled
      }
      return hasTracker
    }
  }
} 