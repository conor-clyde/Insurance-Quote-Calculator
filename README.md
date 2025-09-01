# Insurance Quote Calculator

A comprehensive insurance quote calculation application originally developed in **Gosu** during a hackathon for my job, now **migrated to Java 21** with significant improvements and enhancements.

## 🚀 **Project Evolution**

- **Origin**: Started as a **Gosu/GuideWire hackathon project** for insurance industry work
- **Migration**: **Completely converted** from Gosu to pure Java 21
- **Improvements**: Enhanced architecture, better error handling, and modern Java practices
- **Current State**: **Standalone Java application** with no external dependencies

## ✨ **Key Improvements Made During Migration**

- **Modern Java Architecture**: Clean separation of concerns with dedicated packages
- **Enhanced Error Handling**: Comprehensive validation and user recovery options
- **Improved User Experience**: Better prompts, clearer error messages, and graceful cancellation
- **Code Quality**: Full JavaDoc documentation, proper exception handling, and clean OOP patterns
- **Performance**: Optimized for Java 21 with latest language features

## 🎯 **Features**

- **Customer Management**: Collect and validate customer information including age, occupation, and driving history
- **Risk Assessment**: Comprehensive pre-qualification checks for insurance eligibility
- **Vehicle Coverage**: Support for specific vehicle makes and models with premium adjustments
- **Premium Calculation**: Advanced premium calculation including discounts, penalties, and IPT
- **Business Rules**: Sophisticated validation rules for postcodes, age limits, and risk factors
- **User Experience**: Interactive console interface with validation and error handling

## 🏗️ **Project Structure**
```
src/main/java/
├── app/                    # Main application controllers
│   ├── ApplicationController.java
│   ├── QuoteFlowController.java
│   └── RunMe.java
├── collector/              # Data collection classes
│   ├── AddressCollector.java
│   ├── CustomerCollector.java
│   └── VehicleCollector.java
├── constants/              # Application constants
│   └── Constants.java
├── domain/                 # Data models
│   ├── Address.java
│   ├── ClaimsHistory.java
│   ├── Customer.java
│   ├── DrivingHistory.java
│   ├── PreQualResult.java
│   ├── Quote.java
│   ├── Vehicle.java
│   └── VehicleOption.java
├── service/                # Business logic services
│   ├── BusinessRuleValidator.java
│   └── QuoteDataOrchestrator.java
└── util/                   # Utility classes
    └── InputHandler.java
```

## 📋 **Prerequisites**

- **Java 21** or higher (latest LTS version)
- **Maven 3.6** or higher (optional - can run directly with Java)

## 🛠️ **Building the Project**

```bash
# Clean and compile
mvn clean compile

# Create executable JAR
mvn package
```

## 🚀 **Running the Application**

### **Option 1: Direct Java (Recommended)**
```bash
# Navigate to source directory
cd src/main/java

# Compile all Java files
javac -cp . app/*.java collector/*.java constants/*.java domain/*.java service/*.java util/*.java

# Run the application
java app.RunMe
```

### **Option 2: With Maven**
```bash
# Run with Maven
mvn exec:java -Dexec.mainClass="app.RunMe"

# Or run the JAR file
java -jar target/insurance-quote-calculator-1.0.0.jar
```

## 💼 **Business Rules**

### **Coverage Limits**
- **Age Range**: 21-85 years old
- **Postcodes**: Only BT47 and BT48 areas
- **Vehicles**: Specific makes/models only (Ford Focus, BMW 3 Series, Tesla Model S, Ferrari F430, Rolls Royce Phantom)

### **Premium Factors**
- **Base Premium**: £300 minimum
- **Discounts**: Professional occupation (10%), driving experience (5%), BT47 postcode (5%)
- **Penalties**: Vehicle-specific multipliers, penalty points, accident history, postcode surcharges
- **Tax**: 12% Insurance Premium Tax (IPT)

### **Risk Assessment**
- **Maximum Penalty Points**: 6
- **Maximum Accidents**: 3 non-fault, 2 fault
- **Excluded Occupations**: Professional gamblers

## 📖 **Usage**

1. **Start the application** - Run `RunMe.java` or use Maven
2. **Complete pre-qualification** - Enter age, occupation, postcode, and risk factors
3. **Provide customer details** - Name, gender, driving license date
4. **Enter address information** - House number, street, postcode
5. **Select vehicle details** - Choose from covered vehicles, enter year, registration, value
6. **Review quote** - See calculated premium with breakdown of discounts and penalties

## 🏗️ **Development Highlights**

This project demonstrates:
- **Migration Success**: Complete conversion from Gosu to Java with zero functionality loss
- **Clean Architecture**: Separation of concerns with dedicated packages
- **Business Logic**: Complex insurance calculations and validation rules preserved
- **User Input Handling**: Robust input validation and error handling
- **Object-Oriented Design**: Proper encapsulation and inheritance patterns
- **Exception Handling**: Comprehensive error management and user recovery
- **Modern Java**: Leverages Java 21 features and best practices

## 🔄 **Migration Benefits**

- **No Vendor Lock-in**: Pure Java with no GuideWire dependencies
- **Better Performance**: Native Java execution
- **Easier Deployment**: Standard JAR file deployment
- **Wider Developer Pool**: Any Java developer can work on this
- **Future-Proof**: Latest Java features and long-term support

## 🤝 **Contributing**

For issues or questions, please check the existing issues or create a new one in the repository.

---

*This project represents a successful migration from enterprise Gosu/GuideWire technology to modern, standalone Java, demonstrating the value of technology modernization while preserving business logic and user experience.*
