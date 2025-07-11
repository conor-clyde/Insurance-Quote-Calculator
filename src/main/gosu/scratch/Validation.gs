package scratch

uses java.util.InputMismatchException
uses java.util.Scanner
uses java.time.LocalDate
uses java.time.format.DateTimeFormatter
uses java.time.format.DateTimeParseException

/**
 * Validation utility class for input validation and data sanitization.
 * Provides methods to validate boolean, integer, and date inputs with proper error handling.
 */
class Validation {
  
  private static var scanner = new Scanner(System.in)
  private static var dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy")
  
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

  /**
   * Validates and returns a date input from the user.
   * Accepts dates in dd/MM/yyyy format.
   * 
   * @param prompt The prompt to display to the user
   * @return LocalDate value based on user input
   */
  static function getValidatedDate(prompt: String): LocalDate {
    while (true) {
      try {
        print("${prompt} (dd/MM/yyyy): ")
        var input = scanner.nextLine().trim()
        return LocalDate.parse(input, dateFormatter)
      } catch (DateTimeParseException) {
        print("Invalid date format. Please use dd/MM/yyyy (e.g., 15/03/1990)")
      }
    }
  }

  /**
   * Validates that a date is not in the future.
   * 
   * @param date The date to validate
   * @return Boolean indicating if date is not in the future
   */
  static function isDateNotInFuture(date: LocalDate): boolean {
    return date.isBefore(LocalDate.now()) || date.isEqual(LocalDate.now())
  }

  /**
   * Validates that a date is reasonable (not too far in the past).
   * 
   * @param date The date to validate
   * @return Boolean indicating if date is reasonable
   */
  static function isDateReasonable(date: LocalDate): boolean {
    var minDate = LocalDate.now().minusYears(100)
    return date.isAfter(minDate)
  }
}
