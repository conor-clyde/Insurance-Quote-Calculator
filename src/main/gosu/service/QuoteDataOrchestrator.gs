package service

uses util.InputHandler
uses collector.CustomerCollector
uses collector.AddressCollector
uses collector.VehicleCollector
uses collector.DrivingHistoryCollector
uses collector.ClaimsHistoryCollector
uses domain.Customer
uses domain.Address
uses domain.Vehicle
uses domain.DrivingHistory
uses domain.ClaimsHistory
uses constants.Constants
uses java.time.LocalDate

/**
 * QuoteDataOrchestrator coordinates the collection of all data required for insurance quotes.
 * 
 * QuoteDataOrchestrator coordinates the collection of all data by delegating to specialized
 * collector classes for each data domain. It provides a unified interface for collecting
 * all quote-related information while maintaining separation of concerns.
 */
class QuoteDataOrchestrator {
  private var _customerCollector: CustomerCollector
  private var _addressCollector: AddressCollector
  private var _vehicleCollector: VehicleCollector
  private var _drivingHistoryCollector: DrivingHistoryCollector
  private var _claimsHistoryCollector: ClaimsHistoryCollector

  /**
   * Constructs a QuoteDataOrchestrator with the given InputHandler.
   * Initializes all specialized collectors.
   * 
   * @param inputHandler The input handler to use for user prompts and input
   */
  construct(inputHandler: InputHandler) {
    _customerCollector = new CustomerCollector(inputHandler)
    _addressCollector = new AddressCollector(inputHandler)
    _vehicleCollector = new VehicleCollector(inputHandler)
    _drivingHistoryCollector = new DrivingHistoryCollector(inputHandler)
    _claimsHistoryCollector = new ClaimsHistoryCollector(inputHandler)
  }
  
  /**
   * Collects all customer data including personal information and driving details.
   * 
   * @param dob Date of birth from pre-qualification
   * @param occupation Occupation from pre-qualification
   * @return Customer object if valid, null if cancelled
   */
  function collectCustomerData(dob: LocalDate, occupation: String): Customer {
    return _customerCollector.collectCustomerData(dob, occupation)
  }

  /**
   * Collects all address information including house details and postcode validation.
   * 
   * @param postcode Postcode from pre-qualification
   * @return Address object if valid, null if cancelled
   */
  function collectAddressData(postcode: String): Address {
    return _addressCollector.collectAddressData(postcode)
  }

  /**
   * Collects all vehicle information including make, model, and security features.
   * 
   * @return Vehicle object if valid, null if cancelled
   */
  function collectVehicleData(): Vehicle {
    return _vehicleCollector.collectVehicleData()
  }

  /**
   * Collects all driving history information including penalty points and convictions.
   * 
   * @param preQualPenaltyPoints Penalty points from pre-qualification
   * @param preQualNonMotorConvictions Non-motor convictions from pre-qualification
   * @return DrivingHistory object if valid, null if cancelled
   */
  function collectDrivingHistoryData(preQualPenaltyPoints: int, preQualNonMotorConvictions: int): DrivingHistory {
    return _drivingHistoryCollector.collectDrivingHistoryData(preQualPenaltyPoints, preQualNonMotorConvictions)
  }

  /**
   * Collects all claims history information including accident details.
   * 
   * @param preQualFaultAccidents Fault accidents from pre-qualification
   * @param preQualNonFaultAccidents Non-fault accidents from pre-qualification
   * @return ClaimsHistory object if valid, null if cancelled
   */
  function collectClaimsHistoryData(preQualFaultAccidents: int, preQualNonFaultAccidents: int): ClaimsHistory {
    return _claimsHistoryCollector.collectClaimsHistoryData(preQualFaultAccidents, preQualNonFaultAccidents)
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
  function validateAllData(customer: Customer, address: Address, vehicle: Vehicle, 
                          drivingHistory: DrivingHistory, claimsHistory: ClaimsHistory): boolean {
    
    if (customer == null || address == null || vehicle == null || 
        drivingHistory == null || claimsHistory == null) {
      return false
    }
    
    // Validate each component
    var customerValid = customer.isValidCustomer()
    var addressValid = address.Postcode.startsWith("BT47") || address.Postcode.startsWith("BT48")
    var vehicleValid = vehicle.Value >= Constants.MIN_VEHICLE_VALUE && vehicle.Value <= Constants.MAX_VEHICLE_VALUE
    var drivingValid = drivingHistory.PenaltyPoints <= Constants.MAX_PENALTY_POINTS
    var claimsValid = claimsHistory.FaultAccidents < Constants.DECLINE_FAULT_ACCIDENTS && 
                     claimsHistory.NonFaultAccidents <= Constants.MAX_NON_FAULT_ACCIDENTS
    
    var allValid = customerValid && addressValid && vehicleValid && drivingValid && claimsValid
    
    return allValid
  }
  
  /**
   * Generates a summary of all collected data for user confirmation.
   * 
   * @param customer Customer data
   * @param address Address data
   * @param vehicle Vehicle data
   * @param drivingHistory Driving history data
   * @param claimsHistory Claims history data
   * @return Formatted summary string
   */
  function generateDataSummary(customer: Customer, address: Address, vehicle: Vehicle, 
                              drivingHistory: DrivingHistory, claimsHistory: ClaimsHistory): String {
    var sb = new StringBuilder()
    sb.append("Data Collection Summary\n")
    sb.append("======================\n")
    sb.append("Customer: ${customer.FirstName} (${customer.Age} years, ${customer.DrivingYears} years driving)\n")
    sb.append("Address: ${address.HouseNumber} ${address.Street}, ${address.Postcode}\n")
    sb.append("Vehicle: ${vehicle.Year} ${vehicle.Make} ${vehicle.Model} (${vehicle.Reg})\n")
    sb.append("Driving History: ${drivingHistory.PenaltyPoints} penalty points, ${drivingHistory.NonMotorConvictions} non-motor convictions\n")
    sb.append("Claims History: ${claimsHistory.FaultAccidents} fault accidents, ${claimsHistory.NonFaultAccidents} non-fault accidents\n")
    return sb.toString()
  }
} 