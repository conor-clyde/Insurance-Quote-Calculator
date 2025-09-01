package domain;

import constants.Constants;

/**
 * ClaimsHistory data model for the insurance quote process.
 * 
 * Stores fault and non-fault accident counts.
 */
public class ClaimsHistory {
    private int nonFaultAccidents;
    private int faultAccidents;

    /**
     * Default constructor initializes with zero accidents.
     */
    public ClaimsHistory() {
        nonFaultAccidents = 0;
        faultAccidents = 0;
    }

    /**
     * Constructor with claims history details.
     * 
     * @param nonFaultAccidents Number of non-fault accidents in past 5 years
     * @param faultAccidents Number of fault accidents in past 5 years
     */
    public ClaimsHistory(int nonFaultAccidents, int faultAccidents) {
        this.nonFaultAccidents = nonFaultAccidents;
        this.faultAccidents = faultAccidents;
    }

    /**
     * Validates that claims history meets insurance requirements.
     * Maximum 3 non-fault accidents and maximum 2 fault accidents allowed.
     * 
     * @return Boolean indicating if claims history is acceptable
     */
    public boolean isClaimHistoryValid() {
        return nonFaultAccidents <= Constants.MAX_NON_FAULT_ACCIDENTS && faultAccidents < Constants.DECLINE_FAULT_ACCIDENTS;
    }

    /**
     * Calculates premium penalty based on fault accidents.
     * 1 fault accident: 50% penalty, 2 fault accidents: 100% penalty.
     * 
     * @return Penalty percentage as a decimal (0.0, 0.5, or 1.0)
     */
    public double calcClaimsPenalty() {
        switch (faultAccidents) {
            case 1:
                return 0.5;
            case 2:
                return 1.0;
            default:
                return 0;   
        }
    }
    
    /**
     * Prints claims history information in a formatted display.
     * Used for user confirmation during quote process.
     */
    public void printInfo() {
        System.out.println("Non-Fault Accidents: " + nonFaultAccidents);
        System.out.println("Fault Accidents: " + faultAccidents);
    }
    
    /**
     * Returns a formatted string representation of claims history.
     * 
     * @return Formatted claims history string
     */
    @Override
    public String toString() {
        return "Non Fault Accidents: " + nonFaultAccidents + ", Fault Accidents: " + faultAccidents;
    }
    
    /**
     * Validates that accident counts are non-negative.
     * 
     * @return Boolean indicating if claims data is valid
     */
    public boolean isValid() {
        return nonFaultAccidents >= 0 && faultAccidents >= 0;
    }

    // Getters and Setters
    public int getNonFaultAccidents() { return nonFaultAccidents; }
    public void setNonFaultAccidents(int nonFaultAccidents) { this.nonFaultAccidents = nonFaultAccidents; }
    
    public int getFaultAccidents() { return faultAccidents; }
    public void setFaultAccidents(int faultAccidents) { this.faultAccidents = faultAccidents; }
}
