package scratch

/**
 * Constants class contains all application-wide constants and business rules.
 * Centralizes configuration values for easy maintenance and modification.
 */
public class Constants {
  
  // Tax and Premium Constants
  public final static var IPT: double = 0.12  // Insurance Premium Tax (12%)
  public final static var MIN_PREMIUM: double = 300.0  // Minimum premium amount
  
  // Age Restrictions
  public final static var MIN_AGE: int = 21
  public final static var MAX_AGE: int = 85
  
  // Driving Experience Discount
  public final static var EXPERIENCE_DISCOUNT_THRESHOLD: int = 5  // Years for discount
  public final static var EXPERIENCE_DISCOUNT_RATE: double = 0.05  // 5% discount
  
  // Professional Occupation Discount
  public final static var PROFESSIONAL_DISCOUNT_RATE: double = 0.10  // 10% discount
  
  // Postcode Restrictions
  public final static var VALID_POSTCODE_PREFIXES: String[] = {"BT47", "BT48"}
  
  // Vehicle Value Thresholds
  public final static var TRACKER_REQUIRED_VALUE: int = 100000  // £100,000 threshold
  
  // Risk Assessment Thresholds
  public final static var MAX_PENALTY_POINTS: int = 6
  public final static var MAX_NON_FAULT_ACCIDENTS: int = 3
  public final static var MAX_FAULT_ACCIDENTS: int = 2
  
  // Declined Risk Criteria
  public final static var DECLINE_PENALTY_POINTS: int = 6
  public final static var DECLINE_NON_MOTOR_CONVICTIONS: int = 1
  public final static var DECLINE_NON_FAULT_ACCIDENTS: int = 4
  public final static var DECLINE_FAULT_ACCIDENTS: int = 3
}
