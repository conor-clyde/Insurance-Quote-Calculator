# 🚗 Insurance Quote Calculator
[![Language](https://img.shields.io/badge/Gosu-1.14.16-blue.svg)](https://gosu-lang.github.io/)
[![Java](https://img.shields.io/badge/Java-11+-green.svg)](https://openjdk.java.net/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Completed-brightgreen.svg)]()

Insurance quote calculator that demonstrates business logic implementation, data validation and professional software architecture. Built as a learning project to understand the Gosu programming language while implementing real-world insurance industry rules and calculations.

## 🎬 Demo & Screenshots

### **Complete Application Demo**
![Application Demo](docs/images/demo-complete.gif)<br>
*Full walkthrough of the optimized insurance quote calculation process*

### **User Journey Screenshots**

#### **1. Pre-Qualification & Risk Assessment**
<img src="docs/images/pre-qualification.png" alt="Pre-Qualification" width="600"><br>
*Comprehensive eligibility check with age, occupation, and risk validation*

#### **2. Customer Information Collection**
<img src="docs/images/data-collection1.png" alt="Customer Data Collection" width="600"><br>
*Streamlined personal details collection with validation*

#### **3. Vehicle Configuration**
<img src="docs/images/data-collection2.png" alt="Vehicle Data Collection" width="600"><br>
*Vehicle selection and configuration with enhanced validation*

#### **4. Information Summary & Confirmation**
<img src="docs/images/information-summary.png" alt="Information Summary" width="600"><br>
*Complete data review with risk assessment from pre-qualification*

#### **5. Quote Calculation & Results**
<img src="docs/images/quote-results.png" alt="Quote Results" width="600"><br>
*Detailed premium breakdown with accurate calculations*

### **Technical Features**

#### **Validation & Error Handling**

**Pre-Qualification Validation**
<img src="docs/images/validation-pre-qual.png" alt="Pre-Qualification Validation" width="600"><br>
*Input format validation and business rule enforcement during pre-qualification*

**Vehicle Configuration Validation**
<img src="docs/images/validation-vehicle.png" alt="Vehicle Validation" width="600"><br>
*Range validation and option selection validation for vehicle configuration*



---

## 🚀 Quick Start

### Prerequisites

- **Java 11 or higher**
- **Gosu 1.14.16** - [Download here](https://gosu-lang.github.io/downloads.html)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/conor-clyde/alchemy-gosu-hackathon.git
   cd Hackathon
   ```

2. **Open in Gosu IDE**
   - Launch **Gosu IDE**
   - Go to **File → Open Project**
   - Navigate to the cloned `Hackathon` folder
   - Select the `Hackathon.prj` file and click **Open**

3. **Run the application**
   - In Gosu IDE, use the **Run** button in the toolbar
   - Or run the `RunMe.gsp` file directly

## 📁 Project Structure

```
src/main/gosu/
├── app/                          # Application layer
│   ├── ApplicationController.gs  # Main application orchestrator
│   ├── QuoteFlowController.gs    # Optimized quote collection workflow
│   └── RunMe.gsp                 # Application entry point
├── collector/                    # Data collection layer
│   ├── AddressCollector.gs       # Address data collection
│   ├── CustomerCollector.gs      # Customer data collection
│   └── VehicleCollector.gs       # Vehicle data collection
├── constants/                    # Configuration
│   └── Constants.gs              # Business rules and constants
├── domain/                       # Data models
│   ├── Address.gs                # Address entity
│   ├── ClaimsHistory.gs          # Claims history entity
│   ├── Customer.gs               # Customer entity
│   ├── DrivingHistory.gs         # Driving history entity
│   ├── PreQualResult.gs          # Pre-qualification result (single source of truth)
│   ├── Quote.gs                  # Quote and premium calculation
│   ├── Vehicle.gs                # Vehicle entity
│   └── VehicleOption.gs          # Vehicle options
├── service/                      # Business logic layer
│   ├── BusinessRuleValidator.gs  # Business rule validation
│   ├── QuoteDataOrchestrator.gs  # Streamlined data orchestration
│   └── ValidationEngine.gs       # Input validation engine
└── util/                         # Utilities
    └── InputHandler.gs           # User input handling
```

## 🏗️ Architecture & Design Patterns

### **MVC Pattern**
- **Model**: Domain entities (`Customer`, `Vehicle`, `Quote`, etc.)
- **View**: Console-based user interface
- **Controller**: `ApplicationController` and `QuoteFlowController`

### **Factory Pattern**
- `VehicleOption` factory for creating vehicle selections
- `PreQualResult` factory for pre-qualification outcomes

### **Strategy Pattern**
- Validation strategies in `ValidationEngine`
- Business rule strategies in `BusinessRuleValidator`

### **Orchestrator Pattern**
- `QuoteDataOrchestrator` coordinates streamlined data collection
- `PreQualResult` serves as single source of truth for all risk assessment data

### **Optimized Data Flow**
- **Pre-Qualification** - Collects all risk assessment data (penalty points, convictions, accidents) in one step
- **Streamlined Collection** - Customer, address, and vehicle data without redundancy
- **Single Source of Truth** - Risk data flows from pre-qualification to final quote
- **Eliminated Duplication** - No separate driving/claims history collection steps

## 💼 Business Rules & Features

### **Pre-Qualification Checks**
- ✅ Age validation (21-85 years)
- ✅ Geographic restrictions (BT47/BT48 postcodes only)
- ✅ Penalty points validation (≤ 6 points)
- ✅ Non-motoring convictions check
- ✅ Accident history validation
- ✅ Occupation restrictions

### **Premium Calculation**
- **Base Premium**: £300 minimum
- **Discounts**: Professional occupation (10%), driving experience (5%), postcode (5%)
- **Penalties**: Penalty points (20-50%), vehicle type (0-500%), accidents (50-100%)
- **Tax**: Insurance Premium Tax (12%)

### **Vehicle Coverage**
- **Covered Vehicles**: Ford Focus, BMW 3 Series, Tesla Model S, Ferrari F430, Rolls Royce Phantom
- **Tracker Requirements**: Vehicles over £100,000 must have tracking devices
- **Value Limits**: £1,000 - £1,000,000

### **Risk Assessment**
- **Penalty Points**: 0-6 points allowed, surcharges apply
- **Accidents**: 0-3 non-fault, 0-2 fault accidents allowed
- **Convictions**: No non-motoring convictions allowed
- **Age Restrictions**: 21-85 years old

## 🎮 User Experience Features

### **Optimized Flow**
1. **Pre-Qualification** - Comprehensive eligibility check with risk assessment
2. **Data Collection** - Streamlined information gathering with pre-populated data
3. **Confirmation** - Review and confirm all details with restart options
4. **Quote Calculation** - Premium calculation with accurate breakdown
5. **Acceptance** - Quote acceptance or restart options

### **Enhanced Error Handling**
- **Graceful Cancellation** - Users can cancel at any time
- **Clear Error Messages** - Specific validation feedback
- **Retry Options** - Restart from any point
- **Data Persistence** - No data loss during retries

### **User-Friendly Features**
- **Input Validation** - Real-time format checking
- **Confirmation Steps** - Review before proceeding
- **Restart Capability** - Start over from pre-qualification
- **Clear Messaging** - Professional, informative prompts

## 🔧 Technical Implementation

### **Language Features Used**
- **Gosu Classes** - Object-oriented design
- **Type Safety** - Strong typing throughout
- **Exception Handling** - Comprehensive error management
- **Collections** - Lists, Maps, and Sets
- **Date/Time** - LocalDate for age and license calculations

### **Key Algorithms**
- **Premium Calculation**: Base + discounts - penalties + tax (with accurate display)
- **Age Calculation**: Period.between() for accurate age computation
- **Validation Logic**: Regex patterns and business rule enforcement
- **Data Flow**: Optimized orchestrated collection with single source of truth

### **Performance Considerations**
- **Efficient Validation** - Early exit on validation failures
- **Memory Management** - Optimized object lifecycle with minimal variables
- **User Experience** - Minimal input requirements, smart defaults
- **Data Efficiency** - Single source of truth eliminates redundancy

## 🧪 Testing & Validation

### **Input Validation**
- **Date Formats** - DD/MM/YYYY validation
- **Postcodes** - UK postcode format validation
- **Names** - Character and length validation
- **Numbers** - Range and type validation

### **Business Rule Validation**
- **Age Requirements** - 21-85 years old
- **Geographic Coverage** - BT47/BT48 postcodes only
- **Risk Assessment** - Penalty points, convictions, accidents
- **Vehicle Coverage** - Specific makes and models only

## 📈 Project Evolution

### **Development Phases**
1. **Initial Development** - Basic quote calculator during graduate program
2. **Architecture Refinement** - Improved code structure and patterns
3. **User Experience Enhancement** - Better flow and error handling
4. **Business Logic Completion** - Comprehensive validation and calculation
5. **Performance Optimization** - Streamlined data flow and reduced complexity
6. **Final Polish** - Documentation and code cleanup

### **Recent Optimizations (Latest)**
- **Streamlined Data Collection** - Eliminated redundant RiskAssessmentData class and removed duplicate driving/claims history collection steps
- **Code Cleanup** - Removed unused DrivingHistoryCollector and ClaimsHistoryCollector files
- **Single Source of Truth** - PreQualResult serves as central data store
- **Minimal Variable Usage** - Reduced from 25+ to ~15 essential variables
- **Streamlined Validation** - Direct integer comparisons instead of boolean flags
- **Enhanced Data Flow** - Cleaner pre-qualification to domain object transfer
- **Fixed Premium Calculation** - Corrected display logic to match Quote calculations

### **Key Improvements Made**
- ✅ **Eliminated Redundant Input** - Pre-qualification data flows through the system
- ✅ **Enhanced Error Messages** - Clear, actionable feedback
- ✅ **Improved User Flow** - Logical progression with confirmation steps
- ✅ **Better Architecture** - Clean separation of concerns
- ✅ **Comprehensive Validation** - Robust business rule enforcement
- ✅ **Optimized Data Flow** - Single source of truth with PreQualResult
- ✅ **Reduced Complexity** - Eliminated redundant RiskAssessmentData class and streamlined data collection flow
- ✅ **Minimal Variables** - Streamlined data structures for better performance
- ✅ **Accurate Calculations** - Fixed premium calculation display logic

## 🎯 Learning Outcomes

### **Technical Skills**
- **Gosu Language Mastery** - Advanced language features and best practices
- **Software Architecture** - Design patterns and clean code principles
- **Business Logic Implementation** - Real-world rule engine development
- **User Experience Design** - Console-based application UX
- **Error Handling** - Comprehensive exception management

### **Professional Development**
- **Project Management** - Self-directed development and iteration
- **Code Quality** - Refactoring and continuous improvement
- **Documentation** - Clear, comprehensive project documentation
- **Problem Solving** - Debugging and issue resolution

## 🤝 Contributing

This project was developed as a learning exercise and is currently in a completed state. However, if you're interested in the codebase or have suggestions, feel free to:

- **Fork the repository** for your own learning
- **Open issues** for bugs or improvements
- **Submit pull requests** for enhancements
- **Use as reference** for Gosu development

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Gosu Language Team** - For the excellent programming language
- **Graduate Program** - For the initial project opportunity
- **Insurance Industry** - For the business domain knowledge
- **Open Source Community** - For inspiration and best practices

---

**Built with ❤️ during a graduate program and refined through continuous learning and improvement.**

*This project demonstrates professional software development practices while providing a practical, real-world application of insurance quote calculation with optimized architecture and streamlined user experience.* 
