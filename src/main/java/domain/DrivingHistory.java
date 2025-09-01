package domain;

import constants.Constants;

/**
 * DrivingHistory data model for the insurance quote process.
 * 
 * Stores penalty points and non-motoring convictions.
 */
public class DrivingHistory {
    private int penaltyPoints;
    private int nonMotorConvictions;

    public DrivingHistory() {}
    
    /**
     * Constructor with driving history details.
     * 
     * @param penaltyPoints Number of penalty points on license
     * @param nonMotorConvictions Number of non-motoring convictions
     */
    public DrivingHistory(int penaltyPoints, int nonMotorConvictions) {
        this.penaltyPoints = penaltyPoints;
        this.nonMotorConvictions = nonMotorConvictions;
    }
    
    /**
     * Validates that driving history meets insurance requirements.
     * Maximum 6 penalty points and maximum 1 non-motoring conviction allowed.
     * 
     * @return Boolean indicating if driving history is acceptable
     */
    public boolean isValidDrivingHistory() {
        return penaltyPoints <= Constants.MAX_PENALTY_POINTS && nonMotorConvictions <= Constants.DECLINE_NON_MOTOR_CONVICTIONS;
    }

    /**
     * Calculates premium penalty based on penalty points.
     * 3-5 points: 20% penalty, 6 points: 50% penalty.
     * 
     * @return Penalty percentage as a decimal (0.0, 0.2, or 0.5)
     */
    public double calcDrivingPenalty() {
        if (penaltyPoints >= Constants.PENALTY_POINTS_THRESHOLD && penaltyPoints < Constants.PENALTY_POINTS_HIGH) {
            return Constants.PENALTY_RATE_MEDIUM;
        } else if (penaltyPoints == Constants.PENALTY_POINTS_HIGH) {
            return Constants.PENALTY_RATE_HIGH;
        }
        return 0;
    }
    
    /**
     * Prints driving history information in a formatted display.
     * Used for user confirmation during quote process.
     */
    public void printInfo() {
        System.out.println("Penalty Points: " + penaltyPoints);
        System.out.println("Non-Motor Convictions: " + nonMotorConvictions);
    }
    
    /**
     * Returns a formatted string representation of driving history.
     * 
     * @return Formatted driving history string
     */
    @Override
    public String toString() {
        return "Penalty Points: " + penaltyPoints + ", Non-Motor Convictions: " + nonMotorConvictions;
    }

    // Getters and Setters
    public int getPenaltyPoints() { return penaltyPoints; }
    public void setPenaltyPoints(int penaltyPoints) { this.penaltyPoints = penaltyPoints; }
    
    public int getNonMotorConvictions() { return nonMotorConvictions; }
    public void setNonMotorConvictions(int nonMotorConvictions) { this.nonMotorConvictions = nonMotorConvictions; }
}
