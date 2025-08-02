package constants

/**
 * Constants class contains all application-wide constants and business rules.
 */
public class Constants {
  
  // ============================================================================
  // TAX AND PREMIUM CONSTANTS
  // ============================================================================
  /** Insurance Premium Tax rate (12%) */
  public final static var IPT: double = 0.12
  /** Minimum premium amount in GBP */
  public final static var MIN_PREMIUM: double = 300.0
  /** Maximum premium amount before manual review */
  public final static var MAX_PREMIUM_THRESHOLD: double = 10000.0

  // ============================================================================
  // AGE AND VALIDATION RULES
  // ============================================================================
  /** Minimum age for insurance coverage */
  public final static var MIN_AGE: int = 21
  /** Maximum age for insurance coverage */
  public final static var MAX_AGE: int = 85
  /** Age offset for calculating maximum driving years */
  public final static var DRIVING_AGE_OFFSET: int = 17
  /** Minimum age to obtain a driving license */
  public final static var MIN_LICENSE_AGE: int = 17

  // ============================================================================
  // DISCOUNT RATES
  // ============================================================================
  /** Years of driving experience required for discount */
  public final static var EXPERIENCE_DISCOUNT_THRESHOLD: int = 5
  /** Discount rate for experienced drivers (5%) */
  public final static var EXPERIENCE_DISCOUNT_RATE: double = 0.05
  /** Professional occupation discount rate (10%) */
  public final static var PROFESSIONAL_DISCOUNT_RATE: double = 0.10
  /** Postcode discount rate for BT47 (5%) */
  public final static var POSTCODE_DISCOUNT_BT47: double = 0.05

  // ============================================================================
  // PENALTY RATES
  // ============================================================================
  /** Penalty points threshold for medium penalty */
  public final static var PENALTY_POINTS_THRESHOLD: int = 3
  /** Penalty points threshold for high penalty */
  public final static var PENALTY_POINTS_HIGH: int = 6
  /** Medium penalty rate (20%) */
  public final static var PENALTY_RATE_MEDIUM: double = 0.2
  /** High penalty rate (50%) */
  public final static var PENALTY_RATE_HIGH: double = 0.5

  // ============================================================================
  // VEHICLE CONFIGURATION
  // ============================================================================
  /** Vehicle value threshold requiring tracker */
  public final static var TRACKER_REQUIRED_VALUE: int = 100000
  /** Minimum vehicle year */
  public final static var MIN_VEHICLE_YEAR: int = 1900
  /** Maximum vehicle year (current year + 1) */
  public final static var MAX_VEHICLE_YEAR: int = 2025
  /** Minimum vehicle value in GBP */
  public final static var MIN_VEHICLE_VALUE: int = 1000
  /** Maximum vehicle value in GBP */
  public final static var MAX_VEHICLE_VALUE: int = 1000000

  // ============================================================================
  // RISK ASSESSMENT THRESHOLDS
  // ============================================================================
  /** Maximum penalty points before automatic decline */
  public final static var MAX_PENALTY_POINTS: int = 6
  /** Maximum non-fault accidents before decline */
  public final static var MAX_NON_FAULT_ACCIDENTS: int = 3
  /** Maximum fault accidents before decline */
  public final static var MAX_FAULT_ACCIDENTS: int = 2
  /** Penalty points that trigger automatic decline */
  public final static var DECLINE_PENALTY_POINTS: int = 6
  /** Non-motor convictions that trigger decline */
  public final static var DECLINE_NON_MOTOR_CONVICTIONS: int = 1
  /** Non-fault accidents that trigger decline */
  public final static var DECLINE_NON_FAULT_ACCIDENTS: int = 4
  /** Fault accidents that trigger decline */
  public final static var DECLINE_FAULT_ACCIDENTS: int = 3

  // ============================================================================
  // POSTCODE RULES
  // ============================================================================
  /** Valid postcode prefixes */
  public final static var VALID_POSTCODE_PREFIXES: String[] = {"BT47", "BT48"}
  /** Postcode surcharge for BT48 (10%) */
  public final static var POSTCODE_SURCHARGE_BT48: double = 0.10
  /** Postcode surcharge for BT48 6XX (15%) */
  public final static var POSTCODE_SURCHARGE_BT486: double = 0.15

  // ============================================================================
  // VEHICLE PREMIUM MULTIPLIERS
  // ============================================================================
  /** Ford Focus multiplier (no additional premium) */
  public final static var VEHICLE_MULTIPLIER_FOCUS: double = 0.0
  /** BMW 3 Series multiplier (15% additional premium) */
  public final static var VEHICLE_MULTIPLIER_BMW: double = 0.15
  /** Tesla Model S multiplier (50% additional premium) */
  public final static var VEHICLE_MULTIPLIER_TESLA: double = 0.50
  /** Ferrari F430 multiplier (100% additional premium) */
  public final static var VEHICLE_MULTIPLIER_FERRARI: double = 1.00
  /** Rolls Royce Phantom multiplier (500% additional premium) */
  public final static var VEHICLE_MULTIPLIER_ROLLS: double = 5.00

  // ============================================================================
  // OCCUPATION AND VEHICLE LISTS
  // ============================================================================
  /** List of professional occupations eligible for discount (lowercase) */
  public final static var OCCUPATION_DISCOUNT_LIST: String[] = {
    "doctor", "nurse", "teacher", "engineer", "scientist", "lawyer", "accountant"
  }
  
  /** List of covered vehicle makes/models */
  public final static var VEHICLE_COVERED_LIST: String[] = {
    "Ford Focus",
    "BMW 3 Series", 
    "Tesla Model S",
    "Ferrari F430",
    "Rolls Royce Phantom"
  }

  // ============================================================================
  // ERROR MESSAGES
  // ============================================================================
  /** Standard error message for invalid input */
  public final static var ERROR_INVALID_INPUT: String = "Invalid input. Please try again."
  /** Error message for age restrictions */
  public final static var ERROR_AGE_RESTRICTION: String = "Age must be between ${MIN_AGE} and ${MAX_AGE} years."
  /** Error message for postcode restrictions */
  public final static var ERROR_POSTCODE_RESTRICTION: String = "Only BT47 and BT48 postcodes are covered."
  /** Error message for vehicle value restrictions */
  public final static var ERROR_VEHICLE_VALUE: String = "Vehicle value must be between GBP${MIN_VEHICLE_VALUE} and GBP${MAX_VEHICLE_VALUE}."
  /** Error message for high-risk profiles */
  public final static var ERROR_HIGH_RISK: String = "This profile presents too high a risk for coverage."

  // ============================================================================
  // APPLICATION MESSAGES
  // ============================================================================
  /** Welcome message */
  public final static var WELCOME_MESSAGE: String = "Welcome to the Insurance Quote Calculator!"
  /** Application title */
  public final static var APP_TITLE: String = "Insurance Quote Calculator"
  /** Company name */
  public final static var COMPANY_NAME: String = "Insurance Company"
  
  // ============================================================================
  // VALIDATION PATTERNS
  // ============================================================================
  /** UK postcode pattern */
  public final static var POSTCODE_PATTERN: String = "^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$"
  /** UK registration number pattern */
  public final static var REGISTRATION_PATTERN: String = "^[A-Z]{2}[0-9]{2} ?[A-Z]{3}$"
}
