package scratch

class Quote {	
  var _customer : Customer as NewCustomer;
  var _address : Address as NewAddress;
  var _vehicle : Vehicle as NewVehicle;
  var _drivingHistory : DrivingHistory as NewDrivingHistory;
  var _claimsHistory : ClaimsHistory as NewClaimsHistory;
  var _discounts : double as Discounts
  var _penalties : double as Penalties
  var _totalPremium : double as TotalPremium

  construct() {}

  construct(customer : Customer, address : Address, drivingHistory : DrivingHistory, claimsHistory : ClaimsHistory, vehicle : Vehicle ) {
  _customer = customer
  _address = address
  _drivingHistory = drivingHistory
  _claimsHistory = claimsHistory
  _vehicle = vehicle
  }

  function calcDiscounts() : double {
    var discount = 0.0;

    if (_customer.Occupation.equals("Doctor") || _customer.Occupation.equals("Nurse") || _customer.Occupation.equals("Teacher")) {
      discount += 0.10;
    }

    if (_customer.DrivingYears >=5) {
      discount +=0.05
    }

    discount += _address.calcPostcodeDis();

    return discount; 

  }

  function calcPenalties() : double {
  var penalty = 0.0

  penalty += _drivingHistory.calcDrivingPenalty();
  penalty += _claimsHistory.calcClaimsPenalty();
  penalty += _vehicle.calculateVehiclePremium();
  penalty += _address.calcPostcodePel();

  return penalty;
  }

  function calcPremium() {
  Discounts = calcDiscounts();
  _penalties = calcPenalties();
  TotalPremium = Constants.MIN_PREMIUM + (Constants.MIN_PREMIUM * _penalties) - (Constants.MIN_PREMIUM * Discounts);

  if (TotalPremium < 300) {
  TotalPremium = 300
  }

  TotalPremium += TotalPremium * Constants.IPT;
  }
  

}
