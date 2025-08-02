package util

uses java.util.Scanner

/**
 * InputHandler class encapsulates all user input methods for the insurance quote application.
 */
class InputHandler {
  private var _scanner = new Scanner(System.in)
  private var _lastInputWasCancel: Boolean as lastInputWasCancel

  construct() {
  }

  /**
   * Prompts user for a string response with validation.
   * Returns null if user types 'cancel'.
   * 
   * @param question The question to ask the user
   * @return String response or null if cancelled
   */
  function askStringQuestion(question: String): String {
    print(question)
    var input = _scanner.nextLine().trim()
    
    if (input.toLowerCase() == "cancel") {
      _lastInputWasCancel = true
      return null
    }
    
    _lastInputWasCancel = false
    
    if (input.length() == 0) {
      print("Please provide a response or type 'cancel' to start over.")
      return askStringQuestion(question)
    }
    
    return input
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
  function askIntQuestion(question: String, min: Integer = null, max: Integer = null): Integer {
    while (true) {
      print(question)
      var input = _scanner.nextLine().trim()
      
      if (input.toLowerCase() == "cancel") {
        _lastInputWasCancel = true
        return null
      }
      
      _lastInputWasCancel = false
      
      try {
        var value = Integer.parseInt(input)
        
        // Validate bounds if specified
        if (min != null && value < min) {
          print("Please enter a number greater than or equal to ${min}.")
          continue
        }
        
        if (max != null && value > max) {
          print("Please enter a number less than or equal to ${max}.")
          continue
        }
        
        return value
        
      } catch (e: Exception) {
        print("Invalid input. Please enter a valid whole number, or type 'cancel' to start over.")
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
  function askBooleanQuestion(question: String): Boolean {
    while (true) {
      print(question)
      var input = _scanner.nextLine().trim().toLowerCase()
      
      if (input == "cancel") {
        _lastInputWasCancel = true
        return null
      }
      
      _lastInputWasCancel = false
      
      // Accept multiple formats
      if (input == "yes" || input == "y" || input == "true" || input == "1") {
        return true
      } else if (input == "no" || input == "n" || input == "false" || input == "0") {
        return false
      } else {
        print("Please enter Yes/No (y/n), True/False, or 1/0, or type 'cancel' to start over.")
      }
    }
  }

  /**
   * Provides user-friendly confirmation prompt with clear options.
   * 
   * @param message The message to confirm
   * @return Boolean indicating user confirmation or null if cancelled
   */
  function askConfirmation(message: String): Boolean {
    print("Please confirm:")
    print(message)
    return askBooleanQuestion("Is this correct? (Yes/No)")
  }

  /**
   * Closes the scanner to free resources.
   */
  function close() {
    _scanner.close()
  }
} 