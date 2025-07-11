# Technical Documentation

## 🏗️ Architecture Overview

The Insurance Quote Calculator follows a modular, layered architecture designed for maintainability and extensibility. The application implements the **Model-View-Controller (MVC)** pattern adapted for Gosu development.

### Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    Presentation Layer                      │
│  ┌─────────────────┐  ┌─────────────────┐                │
│  │   ChatBot.gs    │  │   RunMe.gsp     │                │
│  │  (User Interface)│  │ (Entry Point)   │                │
│  └─────────────────┘  └─────────────────┘                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   Business Logic Layer                     │
│  ┌─────────────────┐  ┌─────────────────┐                │
│  │   Quote.gs      │  │  Validation.gs  │                │
│  │ (Premium Calc)  │  │ (Input Validation)│              │
│  └─────────────────┘  └─────────────────┘                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Data Model Layer                       │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │
│  │ Customer.gs │ │ Address.gs  │ │ Vehicle.gs  │        │
│  └─────────────┘ └─────────────┘ └─────────────┘        │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐        │
│  │DrivingHistory│ │ClaimsHistory│ │ Constants.gs│        │
│  └─────────────┘ └─────────────┘ └─────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow

### 1. User Input Collection
```
User → ChatBot.gs → Validation.gs → Data Models
```

### 2. Business Logic Processing
```
Data Models → Quote.gs → Premium Calculation → Results
```

### 3. Output Generation
```
Results → ChatBot.gs → User Interface → User
```

## 🔧 Core Components

### ChatBot.gs - User Interface Layer

**Purpose**: Manages all user interactions and data collection

**Key Features**:
- Interactive conversational interface
- Progressive data collection
- Real-time validation feedback
- User confirmation workflows

**Methods**:
- `welcome()`: Application introduction
- `preQualifications()`: Eligibility screening
- `partOne()` through `partFive()`: Data collection phases
- `askStringQuestion()`, `askIntQuestion()`: Input helpers

**Design Patterns**:
- **Template Method**: Structured data collection process
- **Strategy**: Different validation strategies per data type

### Quote.gs - Business Logic Engine

**Purpose**: Central calculation engine for premium computation

**Key Features**:
- Complex business rule implementation
- Multi-factor premium calculation
- Discount and penalty processing
- Tax application

**Methods**:
- `calcDiscounts()`: Professional and experience-based discounts
- `calcPenalties()`: Risk-based penalty calculations
- `calcPremium()`: Final premium computation

**Business Rules Implemented**:
```gosu
// Professional discount (10%)
if (occupation in ["Doctor", "Nurse", "Teacher"]) {
  discount += 0.10
}

// Experience discount (5% for 5+ years)
if (drivingYears >= 5) {
  discount += 0.05
}

// Minimum premium enforcement
if (premium < 300) {
  premium = 300
}
```

### Validation.gs - Input Validation

**Purpose**: Ensures data integrity and user input validation

**Key Features**:
- Robust error handling
- Input sanitization
- User-friendly error messages
- Infinite retry loops for invalid input

**Methods**:
- `getValidatedBoolean()`: Boolean input with multiple formats
- `getValidatedInt()`: Integer input with exception handling

**Error Handling Strategy**:
```gosu
while (true) {
  try {
    return scanner.nextInt()
  } catch (InputMismatchException) {
    print("Invalid input. Please enter an integer.")
    scanner.next() // Clear invalid input
  }
}
```

## 🎯 Business Logic Implementation

### Premium Calculation Algorithm

```gosu
// Base calculation
premium = MIN_PREMIUM + (MIN_PREMIUM * penalties) - (MIN_PREMIUM * discounts)

// Minimum premium enforcement
if (premium < MIN_PREMIUM) {
  premium = MIN_PREMIUM
}

// Tax application
premium += premium * IPT_RATE
```

### Risk Assessment Matrix

| Factor | Low Risk | Medium Risk | High Risk | Decline |
|--------|----------|-------------|-----------|---------|
| Age | 21-85 | N/A | N/A | <21 or >85 |
| Penalty Points | 0-2 | 3-5 | 6 | >6 |
| Fault Accidents | 0 | 1-2 | 3+ | 3+ |
| Non-Fault Accidents | 0-3 | N/A | 4+ | 4+ |

### Vehicle Rating System

| Vehicle Type | Premium Adjustment | Tracker Required |
|--------------|-------------------|------------------|
| Ford Focus | 0% | No |
| BMW 3 Series | +15% | No |
| Tesla Model S | +50% | Yes (>£100k) |
| Ferrari F430 | +100% | Yes (>£100k) |
| Rolls Royce Phantom | +500% | Yes (>£100k) |

## 🛡️ Data Validation Strategy

### Input Validation Layers

1. **Type Validation**: Ensure correct data types
2. **Range Validation**: Check value boundaries
3. **Business Rule Validation**: Apply domain-specific rules
4. **Cross-Field Validation**: Validate relationships between fields

### Validation Examples

```gosu
// Age validation
if (age < MIN_AGE || age > MAX_AGE) {
  return false
}

// Postcode validation
if (!postcode.startsWith("BT47") && !postcode.startsWith("BT48")) {
  return false
}

// Vehicle value validation
if (value > TRACKER_REQUIRED_VALUE && !hasTracker) {
  return false
}
```

## 🔄 State Management

### Application State Flow

```
Initialization → Pre-Qualification → Data Collection → Calculation → Results
     ↓              ↓                    ↓              ↓           ↓
   Welcome      Eligibility         User Input    Business      Display
   Message        Check              Validation    Logic        Results
```

### Data Persistence

- **In-Memory Storage**: All data stored in object instances
- **Session-Based**: Data persists for single quote calculation
- **No Persistence**: Data cleared after each session

## 🧪 Testing Strategy

### Manual Testing Scenarios

1. **Pre-Qualification Tests**
   - Age boundary conditions
   - Occupation restrictions
   - Geographic limitations
   - Risk factor combinations

2. **Premium Calculation Tests**
   - Known input/output combinations
   - Edge case scenarios
   - Discount/penalty combinations
   - Tax calculation accuracy

3. **Input Validation Tests**
   - Invalid data types
   - Boundary values
   - Empty/null inputs
   - Special characters

### Test Data Examples

```gosu
// Valid customer profile
Customer: {
  name: "John Smith",
  age: 30,
  occupation: "Doctor",
  drivingYears: 8
}

// Expected premium calculation
Base Premium: £300
Professional Discount: -£30 (10%)
Experience Discount: -£15 (5%)
Total Discounts: -£45
Final Premium: £255 + IPT = £285.60
```

## 🚀 Performance Considerations

### Optimization Strategies

1. **Efficient Data Structures**: Simple object models
2. **Minimal Memory Usage**: No unnecessary object creation
3. **Fast Calculation**: Direct mathematical operations
4. **Responsive UI**: Immediate validation feedback

### Scalability Considerations

- **Modular Design**: Easy to extend with new features
- **Configurable Constants**: Business rules in Constants.gs
- **Separation of Concerns**: Clear component boundaries
- **Extensible Architecture**: Ready for additional modules

## 🔧 Development Environment

### Required Tools

- **Java JDK 1.8**: Runtime environment
- **Gosu Lab IDE**: Development environment
- **Gosu 1.14.16**: Programming language

### Project Structure

```
src/main/gosu/scratch/
├── RunMe.gsp              # Application entry point
├── ChatBot.gs             # User interface controller
├── Quote.gs               # Business logic engine
├── Validation.gs          # Input validation utilities
├── Constants.gs           # Configuration constants
├── Customer.gs            # Customer data model
├── Address.gs             # Address data model
├── Vehicle.gs             # Vehicle data model
├── DrivingHistory.gs      # Driving history model
└── ClaimsHistory.gs       # Claims history model
```

## 📈 Learning Outcomes Demonstrated

### Technical Skills

1. **Rapid Language Learning**: Mastered Gosu in 1 week
2. **Domain Modeling**: Comprehensive data model design
3. **Business Logic Implementation**: Complex calculation algorithms
4. **Input Validation**: Robust error handling and user feedback
5. **User Experience Design**: Intuitive conversational interface

### Software Engineering Practices

1. **Modular Architecture**: Clear separation of concerns
2. **Code Documentation**: Comprehensive comments and documentation
3. **Error Handling**: Graceful failure management
4. **Testing Strategy**: Systematic validation approach
5. **Version Control**: Proper project organization

### Business Acumen

1. **Insurance Domain Knowledge**: Understanding of underwriting principles
2. **Regulatory Compliance**: Tax and legal requirement implementation
3. **Risk Assessment**: Multi-factor risk evaluation
4. **Customer Experience**: User-friendly interaction design

## 🔮 Future Enhancements

### Potential Improvements

1. **Database Integration**: Persistent data storage
2. **Web Interface**: Browser-based user interface
3. **API Development**: RESTful service endpoints
4. **Advanced Analytics**: Quote analysis and reporting
5. **Multi-User Support**: Concurrent user handling
6. **Integration Testing**: Automated test suite
7. **Performance Monitoring**: Application metrics
8. **Security Enhancements**: Data encryption and validation

### Scalability Considerations

- **Microservices Architecture**: Service decomposition
- **Cloud Deployment**: Scalable infrastructure
- **Caching Strategy**: Performance optimization
- **Load Balancing**: High availability design

---

This technical documentation demonstrates the comprehensive understanding of software architecture, business logic implementation, and professional development practices achieved during the hackathon project. 