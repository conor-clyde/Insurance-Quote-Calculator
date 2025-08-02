package domain

/**
 * VehicleOption data model for selectable vehicle options in the insurance quote process.
 *
 * Stores make and model for vehicle selection.
 */
class VehicleOption {
  var _make: String as Make
  var _model: String as Model
 
  construct(make: String, model: String) {
    _make = make
    _model = model
  }
} 