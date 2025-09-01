package constants;

/**
 * Constants class contains all application-wide constants and business rules.
 */
public class Constants {
  
    // ============================================================================
    // TAX AND PREMIUM CONSTANTS
    // ============================================================================
    /** Insurance Premium Tax rate (12%) */
    public static final double IPT = 0.12;
    /** Minimum premium amount in GBP */
    public static final double MIN_PREMIUM = 300.0;
    /** Maximum premium amount before manual review */
    public static final double MAX_PREMIUM_THRESHOLD = 10000.0;

    // ============================================================================
    // AGE AND VALIDATION RULES
    // ============================================================================
    /** Minimum age for insurance coverage */
    public static final int MIN_AGE = 21;
    /** Maximum age for insurance coverage */
    public static final int MAX_AGE = 85;
    /** Age offset for calculating maximum driving years */
    public static final int DRIVING_AGE_OFFSET = 17;
    /** Minimum age to obtain a driving license */
    public static final int MIN_LICENSE_AGE = 17;

    // ============================================================================
    // DISCOUNT RATES
    // ============================================================================
    /** Years of driving experience required for discount */
    public static final int EXPERIENCE_DISCOUNT_THRESHOLD = 5;
    /** Discount rate for experienced drivers (5%) */
    public static final double EXPERIENCE_DISCOUNT_RATE = 0.05;
    /** Professional occupation discount rate (10%) */
    public static final double PROFESSIONAL_DISCOUNT_RATE = 0.10;
    /** Postcode discount rate for BT47 (5%) */
    public static final double POSTCODE_DISCOUNT_BT47 = 0.05;

    // ============================================================================
    // PENALTY RATES
    // ============================================================================
    /** Penalty points threshold for medium penalty */
    public static final int PENALTY_POINTS_THRESHOLD = 3;
    /** Penalty points threshold for high penalty */
    public static final int PENALTY_POINTS_HIGH = 6;
    /** Medium penalty rate (20%) */
    public static final double PENALTY_RATE_MEDIUM = 0.2;
    /** High penalty rate (50%) */
    public static final double PENALTY_RATE_HIGH = 0.5;

    // ============================================================================
    // VEHICLE CONFIGURATION
    // ============================================================================
    /** Vehicle value threshold requiring tracker */
    public static final int TRACKER_REQUIRED_VALUE = 100000;
    /** Minimum vehicle year */
    public static final int MIN_VEHICLE_YEAR = 1900;
    /** Maximum vehicle year (current year + 1) */
    public static final int MAX_VEHICLE_YEAR = 2025;
    /** Minimum vehicle value in GBP */
    public static final int MIN_VEHICLE_VALUE = 1000;
    /** Maximum vehicle value in GBP */
    public static final int MAX_VEHICLE_VALUE = 1000000;

    // ============================================================================
    // RISK ASSESSMENT THRESHOLDS
    // ============================================================================
    /** Maximum penalty points before automatic decline */
    public static final int MAX_PENALTY_POINTS = 6;
    /** Maximum non-fault accidents before decline */
    public static final int MAX_NON_FAULT_ACCIDENTS = 3;
    /** Maximum fault accidents before decline */
    public static final int MAX_FAULT_ACCIDENTS = 2;
    /** Penalty points that trigger automatic decline */
    public static final int DECLINE_PENALTY_POINTS = 6;
    /** Non-motor convictions that trigger decline */
    public static final int DECLINE_NON_MOTOR_CONVICTIONS = 1;
    /** Non-fault accidents that trigger decline */
    public static final int DECLINE_NON_FAULT_ACCIDENTS = 4;
    /** Fault accidents that trigger decline */
    public static final int DECLINE_FAULT_ACCIDENTS = 3;

    // ============================================================================
    // POSTCODE RULES
    // ============================================================================
    /** Valid postcode prefixes */
    public static final String[] VALID_POSTCODE_PREFIXES = {"BT47", "BT48"};
    /** Postcode surcharge for BT48 (10%) */
    public static final double POSTCODE_SURCHARGE_BT48 = 0.10;
    /** Postcode surcharge for BT48 6XX (15%) */
    public static final double POSTCODE_SURCHARGE_BT486 = 0.15;

    // ============================================================================
    // VEHICLE PREMIUM MULTIPLIERS
    // ============================================================================
    /** Ford Focus multiplier (no additional premium) */
    public static final double VEHICLE_MULTIPLIER_FOCUS = 0.0;
    /** BMW 3 Series multiplier (15% additional premium) */
    public static final double VEHICLE_MULTIPLIER_BMW = 0.15;
    /** Tesla Model S multiplier (50% additional premium) */
    public static final double VEHICLE_MULTIPLIER_TESLA = 0.50;
    /** Ferrari F430 multiplier (100% additional premium) */
    public static final double VEHICLE_MULTIPLIER_FERRARI = 1.00;
    /** Rolls Royce Phantom multiplier (500% additional premium) */
    public static final double VEHICLE_MULTIPLIER_ROLLS = 5.00;

    // ============================================================================
    // OCCUPATION AND VEHICLE LISTS
    // ============================================================================
    /** List of professional occupations eligible for discount (lowercase) */
    public static final String[] OCCUPATION_DISCOUNT_LIST = {
        "doctor", "nurse", "teacher", "engineer", "scientist", "lawyer", "accountant"
    };
    
    /** List of covered vehicle makes/models */
    public static final String[] VEHICLE_COVERED_LIST = {
        "Ford Focus",
        "BMW 3 Series", 
        "Tesla Model S",
        "Ferrari F430",
        "Rolls Royce Phantom"
    };

    // ============================================================================
    // ERROR MESSAGES
    // ============================================================================
    /** Standard error message for invalid input */
    public static final String ERROR_INVALID_INPUT = "Invalid input. Please try again.";
    /** Error message for age restrictions */
    public static final String ERROR_AGE_RESTRICTION = "Age must be between " + MIN_AGE + " and " + MAX_AGE + " years.";
    /** Error message for postcode restrictions */
    public static final String ERROR_POSTCODE_RESTRICTION = "Only BT47 and BT48 postcodes are covered.";
    /** Error message for vehicle value restrictions */
    public static final String ERROR_VEHICLE_VALUE = "Vehicle value must be between GBP" + MIN_VEHICLE_VALUE + " and GBP" + MAX_VEHICLE_VALUE + ".";
    /** Error message for high-risk profiles */
    public static final String ERROR_HIGH_RISK = "This profile presents too high a risk for coverage.";

    // ============================================================================
    // APPLICATION MESSAGES
    // ============================================================================
    /** Welcome message */
    public static final String WELCOME_MESSAGE = "Welcome to the Insurance Quote Calculator!";
    /** Application title */
    public static final String APP_TITLE = "Insurance Quote Calculator";
    /** Company name */
    public static final String COMPANY_NAME = "Insurance Company";
    
    // ============================================================================
    // VALIDATION PATTERNS
    // ============================================================================
    /** UK postcode pattern */
    public static final String POSTCODE_PATTERN = "^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$";
    /** UK registration number pattern */
    public static final String REGISTRATION_PATTERN = "^[A-Z]{2}[0-9]{2} ?[A-Z]{3}$";
}
