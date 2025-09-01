package domain;

import java.time.LocalDate;

/**
 * PreQualResult data model for pre-qualification results in the insurance quote process.
 *
 * Stores the outcome of pre-qualification checks and relevant user data.
 */
public class PreQualResult {
    private LocalDate dob;
    private String occupation;
    private String postcode;
    private Integer faultAccidents;
    private Integer nonFaultAccidents;
    private Integer penaltyPoints;
    private Integer nonMotorConvictions;

    public PreQualResult(LocalDate dob, String occupation, String postcode, Integer faultAccidents, Integer nonFaultAccidents, Integer penaltyPoints, Integer nonMotorConvictions) {
        this.dob = dob;
        this.occupation = occupation;
        this.postcode = postcode;
        this.faultAccidents = faultAccidents;
        this.nonFaultAccidents = nonFaultAccidents;
        this.penaltyPoints = penaltyPoints;
        this.nonMotorConvictions = nonMotorConvictions;
    }

    // Getters and Setters
    public LocalDate getDob() { return dob; }
    public void setDob(LocalDate dob) { this.dob = dob; }
    
    public String getOccupation() { return occupation; }
    public void setOccupation(String occupation) { this.occupation = occupation; }
    
    public String getPostcode() { return postcode; }
    public void setPostcode(String postcode) { this.postcode = postcode; }
    
    public Integer getFaultAccidents() { return faultAccidents; }
    public void setFaultAccidents(Integer faultAccidents) { this.faultAccidents = faultAccidents; }
    
    public Integer getNonFaultAccidents() { return nonFaultAccidents; }
    public void setNonFaultAccidents(Integer nonFaultAccidents) { this.nonFaultAccidents = nonFaultAccidents; }
    
    public Integer getPenaltyPoints() { return penaltyPoints; }
    public void setPenaltyPoints(Integer penaltyPoints) { this.penaltyPoints = penaltyPoints; }
    
    public Integer getNonMotorConvictions() { return nonMotorConvictions; }
    public void setNonMotorConvictions(Integer nonMotorConvictions) { this.nonMotorConvictions = nonMotorConvictions; }
}
