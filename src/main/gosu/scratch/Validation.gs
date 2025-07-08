package scratch

uses java.util.InputMismatchException

class Validation {
  static var scanner = new Scanner(System.in)
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

  
  static function getValidatedInt() : int {
     
     while(true) {
       try {
          var input = scanner.nextInt()
          return input
         
       } catch (InputMismatchException) { 
          print("Invalid input. Please enter an integer")
          scanner.next()
       }}
       
       
     }
     
     
     
  
}
