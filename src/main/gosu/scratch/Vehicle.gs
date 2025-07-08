package scratch

class Vehicle {
  var _make : String as Make
  var _model : String as Model
  var _year : int as Year
  var _reg : String as Reg
  var _value : double as Value
  var _hasTracker : boolean as HasTracker

  function calculateVehiclePremium() : double {
    switch (Make) {
      case "BMW 3 Series":
      return 0.15;
      case "Tesla Model S":
      return 0.50;
      case "Ferrari F430":
      return 1.00;
      case "Rolls Royce Phantom":
      return 5.00;
      default:
      return 0.0;
    } 
  }
  
  function printInfo() {
    print("Make: ${_make}")
   }
}
