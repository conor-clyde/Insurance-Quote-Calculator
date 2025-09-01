package service;

import util.InputHandler;
import collector.CustomerCollector;
import collector.AddressCollector;
import collector.VehicleCollector;
import domain.Customer;
import domain.Address;
import domain.Vehicle;
import domain.DrivingHistory;
import domain.ClaimsHistory;
import domain.PreQualResult;
import constants.Constants;
import java.time.LocalDate;

/**
 * QuoteDataOrchestrator coordinates the collection of all data required for insurance quotes.
 * 
 * QuoteDataOrchestrator coordinates the collection of all data by delegating to specialized
 * collector classes for each data domain. It provides a unified interface for collecting
 * all quote-related information while maintaining separation of concerns.
 */
public class QuoteDataOrchestrator {
    private CustomerCollector customerCollector;
    private AddressCollector addressCollector;
    private VehicleCollector vehicleCollector;

    /**
     * Constructs a QuoteDataOrchestrator with the given InputHandler.
     * Initializes all specialized collectors.
     * 
     * @param inputHandler The input handler to use for user prompts and input
     */
    public QuoteDataOrchestrator(InputHandler inputHandler) {
        customerCollector = new CustomerCollector(inputHandler);
        addressCollector = new AddressCollector(inputHandler);
        vehicleCollector = new VehicleCollector(inputHandler);
    }
    
    /**
     * Collects all customer data including personal information and driving details.
     * 
     * @param dob Date of birth from pre-qualification
     * @param occupation Occupation from pre-qualification
     * @return Customer object if valid, null if cancelled
     */
    public Customer collectCustomerData(LocalDate dob, String occupation) {
        return customerCollector.collectCustomerData(dob, occupation);
    }

    /**
     * Collects all address information including house details and postcode validation.
     * 
     * @param postcode Postcode from pre-qualification
     * @return Address object if valid, null if cancelled
     */
    public Address collectAddressData(String postcode) {
        return addressCollector.collectAddressData(postcode);
    }

    /**
     * Collects all vehicle information including make, model, and security features.
     * 
     * @return Vehicle object if valid, null if cancelled
     */
    public Vehicle collectVehicleData() {
        return vehicleCollector.collectVehicleData();
    }

    /**
     * Creates driving history from pre-qualification data.
     */
    public DrivingHistory createDrivingHistory(PreQualResult preQualResult) {
        return new DrivingHistory(preQualResult.getPenaltyPoints(), preQualResult.getNonMotorConvictions());
    }

    /**
     * Creates claims history from pre-qualification data.
     */
    public ClaimsHistory createClaimsHistory(PreQualResult preQualResult) {
        return new ClaimsHistory(preQualResult.getNonFaultAccidents(), preQualResult.getFaultAccidents());
    }
    
    /**
     * Validates that all collected data is complete and consistent.
     * 
     * @param customer Customer data
     * @param address Address data
     * @param vehicle Vehicle data
     * @param drivingHistory Driving history data
     * @param claimsHistory Claims history data
     * @return true if all data is valid, false otherwise
     */
    public boolean validateAllData(Customer customer, Address address, Vehicle vehicle, 
                                  DrivingHistory drivingHistory, ClaimsHistory claimsHistory) {
        
        if (customer == null || address == null || vehicle == null || 
            drivingHistory == null || claimsHistory == null) {
            return false;
        }
        
        // Validate each component
        boolean customerValid = customer.isValidCustomer();
        boolean addressValid = address.getPostcode().startsWith("BT47") || address.getPostcode().startsWith("BT48");
        boolean vehicleValid = vehicle.getValue() >= Constants.MIN_VEHICLE_VALUE && vehicle.getValue() <= Constants.MAX_VEHICLE_VALUE;
        boolean drivingValid = drivingHistory.getPenaltyPoints() <= Constants.MAX_PENALTY_POINTS;
        boolean claimsValid = claimsHistory.getFaultAccidents() < Constants.DECLINE_FAULT_ACCIDENTS && 
                             claimsHistory.getNonFaultAccidents() <= Constants.MAX_NON_FAULT_ACCIDENTS;
        
        boolean allValid = customerValid && addressValid && vehicleValid && drivingValid && claimsValid;
        
        return allValid;
    }
}
