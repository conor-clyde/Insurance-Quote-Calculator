package scratch

uses java.util.InputMismatchException
uses java.util.Scanner

/**
 * Validation utility class for input validation and data sanitization.
 * Provides methods to validate boolean and integer inputs with proper error handling.
 */
class Validation {
  
  private static var scanner = new Scanner(System.in)
  
  /**
   * Validates and returns a boolean input from the user.
   * Accepts "true", "t", "false", "f" (case insensitive).
   * 
   * @return Boolean value based on user input
   */
  static function getValidatedBoolean(): Boolean {
    while (true) {
      var input = scanner.nextLine().trim().toLowerCase() 
      if (input == "true" or input == "t") {
        return true
      } else if (input == "false" or input == "f") {
        return false
      } else {
        print("Invalid input. Please enter True or False.")
      }
    }
  }

  /**
   * Validates and returns an integer input from the user.
   * Handles InputMismatchException and prompts for valid input.
   * 
   * @return Integer value based on user input
   */
  static function getValidatedInt(): int {
    while (true) {
      try {
        var input = scanner.nextInt()
        return input
      } catch (InputMismatchException) { 
        print("Invalid input. Please enter an integer.")
        scanner.next() // Clear the invalid input
      }
    }
  }
}
