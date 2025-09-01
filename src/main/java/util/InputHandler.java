package util;

import java.util.Scanner;

/**
 * InputHandler class encapsulates all user input methods for the insurance quote application.
 */
public class InputHandler {
    private Scanner scanner = new Scanner(System.in);
    private boolean lastInputWasCancel;

    public InputHandler() {
    }

    /**
     * Prompts user for a string response with validation.
     * Returns null if user types 'cancel'.
     * 
     * @param question The question to ask the user
     * @return String response or null if cancelled
     */
    public String askStringQuestion(String question) {
        System.out.println(question);
        String input = scanner.nextLine().trim();
        
        if (input.toLowerCase().equals("cancel")) {
            lastInputWasCancel = true;
            return null;
        }
        
        lastInputWasCancel = false;
        
        if (input.length() == 0) {
            System.out.println("Please provide a response or type 'cancel' to start over.");
            return askStringQuestion(question);
        }
        
        return input;
    }

    /**
     * Prompts user for an integer response with enhanced validation and bounds checking.
     * Returns null if user types 'cancel'.
     * 
     * @param question The question to ask the user
     * @param min Optional minimum value (inclusive)
     * @param max Optional maximum value (inclusive)
     * @return Integer response or null if cancelled
     */
    public Integer askIntQuestion(String question, Integer min, Integer max) {
        while (true) {
            System.out.println(question);
            String input = scanner.nextLine().trim();
            
            if (input.toLowerCase().equals("cancel")) {
                lastInputWasCancel = true;
                return null;
            }
            
            lastInputWasCancel = false;
            
            try {
                int value = Integer.parseInt(input);
                
                // Validate bounds if specified
                if (min != null && value < min) {
                    System.out.println("Please enter a number greater than or equal to " + min + ".");
                    continue;
                }
                
                if (max != null && value > max) {
                    System.out.println("Please enter a number less than or equal to " + max + ".");
                    continue;
                }
                
                return value;
                
            } catch (Exception e) {
                System.out.println("Invalid input. Please enter a valid whole number, or type 'cancel' to start over.");
            }
        }
    }

    /**
     * Prompts user for a boolean response with enhanced validation and multiple formats.
     * Returns null if user types 'cancel'.
     * 
     * @param question The question to ask the user
     * @return Boolean response or null if cancelled
     */
    public Boolean askBooleanQuestion(String question) {
        while (true) {
            System.out.println(question);
            String input = scanner.nextLine().trim().toLowerCase();
            
            if (input.equals("cancel")) {
                lastInputWasCancel = true;
                return null;
            }
            
            lastInputWasCancel = false;
            
            // Accept multiple formats
            if (input.equals("yes") || input.equals("y") || input.equals("true") || input.equals("1")) {
                return true;
            } else if (input.equals("no") || input.equals("n") || input.equals("false") || input.equals("0")) {
                return false;
            } else {
                System.out.println("Please enter Yes/No (y/n), True/False, or 1/0, or type 'cancel' to start over.");
            }
        }
    }

    /**
     * Provides user-friendly confirmation prompt with clear options.
     * 
     * @param message The message to confirm
     * @return Boolean indicating user confirmation or null if cancelled
     */
    public Boolean askConfirmation(String message) {
        System.out.println("Please confirm:");
        System.out.println(message);
        return askBooleanQuestion("Is this correct? (Yes/No)");
    }

    /**
     * Closes the scanner to free resources.
     */
    public void close() {
        scanner.close();
    }

    // Getters and Setters
    public boolean isLastInputWasCancel() { return lastInputWasCancel; }
    public void setLastInputWasCancel(boolean lastInputWasCancel) { this.lastInputWasCancel = lastInputWasCancel; }
}
