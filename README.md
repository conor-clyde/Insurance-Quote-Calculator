# 🚗 Insurance Quote Calculator
[![Language](https://img.shields.io/badge/Gosu-1.14.16-blue.svg)](https://gosu-lang.github.io/)
[![Java](https://img.shields.io/badge/Java-11+-green.svg)](https://openjdk.java.net/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Completed-brightgreen.svg)]()

A **console-based insurance quote calculator** built with Gosu and Java. Implements **real-world insurance rules**, validation, and clean architecture. Developed during a graduate program and refined for professional-grade learning.

## 🎬 Demo & Screenshots

### Complete Application Demo
![Application Demo](docs/images/demo-complete.gif)

### User Journey Screenshots

| Step | Screenshot | Description |
|------|------------|-------------|
| **1. Pre-Qualification** | <img src="docs/images/pre-qualification.png" width="320"> | Eligibility check: **age, occupation, risk factors** |
| **2. Customer Info** | <img src="docs/images/data-collection1.png" width="320"> | Collects **personal details** |
| **3. Vehicle Configuration** | <img src="docs/images/data-collection2.png" width="320"> | Configure **vehicle details & options** |
| **4. Summary & Confirmation** | <img src="docs/images/information-summary.png" width="320"> | Review all collected data |
| **5. Quote Calculation** | <img src="docs/images/quote-results.png" width="320"> | Detailed **premium breakdown** |

### Validation and Error Handling

| Feature | Screenshot | Description |
|---------|------------|-------------|
| Pre-Qualification Validation | <img src="docs/images/validation-pre-qual.png" width="480"> | Validates **dates, names, postcodes**, enforces eligibility rules |
| Vehicle Configuration Validation | <img src="docs/images/validation-vehicle.png" width="480"> | Checks **ranges** and validates vehicle options |

## 🚀 Quick Start

### Prerequisites
- Java 11+  
- Gosu 1.14.16 → [Download](https://gosu-lang.github.io/downloads.html)

### Run the Project
```bash
1. Clone the repo
git clone https://github.com/conor-clyde/alchemy-gosu-hackathon.git
cd Hackathon

2. Open in Gosu IDE
File → Open Project → Select Hackathon.prj

3. Run the app
Run RunMe.gsp
```

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

## ✨ Key Features

- **Pre-qualification System** - Age, postcode, penalty points, accident history validation
- **Premium Calculation** - Base premium with discounts, penalties, and tax
- **Vehicle Coverage** - Multiple vehicle types with tracker requirements
- **Clean Architecture** - MVC, Factory, Strategy, and Orchestrator patterns
- **Comprehensive Validation** - Input format and business rule enforcement
- **User-Friendly Flow** - Streamlined data collection with error handling

## 🏗️ Architecture & Design Patterns

- **MVC Pattern** - Domain entities (Model), Console UI (View), Controllers
- **Factory Pattern** - Vehicle options and pre-qualification results
- **Strategy Pattern** - Validation and business rules
- **Orchestrator Pattern** - QuoteDataOrchestrator coordinates workflow
- **Single Source of Truth** - PreQualResult stores all risk data

## 📄 License

MIT License — see [LICENSE](LICENSE) file for details.

---

**Built with ❤️ during a graduate program. Explore the code to see real-world insurance rules modeled with clean architecture.**
