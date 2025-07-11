# 🏆 Alchemy Insurance Quote Calculator

> **Winner of Alchemy Graduate Training Hackathon**  
> A sophisticated insurance premium calculator built in Gosu during a 2-day hackathon challenge.

[![Gosu](https://img.shields.io/badge/Language-Gosu-blue.svg)](https://gosu-lang.github.io/)
[![Java](https://img.shields.io/badge/Java-1.8-orange.svg)](https://www.oracle.com/java/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Completed-brightgreen.svg)]()

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Architecture](#architecture)
- [Installation](#installation)
- [Usage](#usage)
- [Technical Details](#technical-details)
- [Learning Outcomes](#learning-outcomes)
- [Team](#team)

## 🎯 Overview

This project demonstrates rapid learning and application of **Gosu**, Guidewire's proprietary programming language, in a real-world insurance domain. Built during a graduate training hackathon at Alchemy, this application processes customer data and calculates insurance premiums with complex business rules.

### 🏆 Achievement
- **1st Place** in Alchemy Graduate Training Hackathon
- **2-day development** following 1 week of Gosu training
- **Team of 4** demonstrating collaboration and rapid prototyping

## ✨ Features

### 🎯 Core Functionality
- **Interactive Chatbot Interface** - Collects customer data through conversational prompts
- **Comprehensive Data Validation** - Ensures data integrity and business rule compliance
- **Dynamic Premium Calculation** - Real-time premium calculation with multiple factors
- **Business Rule Engine** - Implements complex insurance underwriting rules

### 📊 Premium Calculation Factors
- **Customer Profile**: Age, occupation, driving experience
- **Geographic Location**: Postcode-based pricing (BT47/BT48 areas)
- **Vehicle Assessment**: Make, model, value, security features
- **Risk Assessment**: Driving history, claims history, convictions
- **Discounts**: Professional occupations, experience-based reductions

### 🛡️ Business Rules
- **Age Range**: 21-85 years inclusive
- **Geographic Coverage**: BT47/BT48 postcodes only
- **Vehicle Security**: High-value vehicles require tracking devices
- **Risk Management**: Automatic decline for high-risk profiles

## 🎮 Demo

```
Insurance Quote:
---------------------
Please enter the requested details to calculate your quote.

Pre-Qualification:
Are you between 21-85 years old? (True/False)
> true

Are you a professional gambler? (True/False)
> false

Does your postcode begin with BT47 or BT48? (True/False)
> true

Customer Information:
Name: John Smith
Gender: Male
Age: 30
License Age: 8
Occupation: Doctor

Vehicle Information
Make/Model: Ford Focus
Year: 2020
Registration No.: AB12 CDE
Value: 15000
Does your car have a tracker? (True/False): false

Total Premium: £336.00
```

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   ChatBot.gs    │    │   Customer.gs   │    │   Address.gs    │
│  (UI Layer)     │◄──►│  (Data Model)   │◄──►│  (Data Model)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Quote.gs      │    │  Validation.gs  │    │  Constants.gs   │
│ (Business Logic)│◄──►│ (Input Validation)│◄──►│ (Configuration) │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │
         ▼                       ▼
┌─────────────────┐    ┌─────────────────┐
│ Vehicle.gs      │    │DrivingHistory.gs│
│ (Data Model)    │    │ (Data Model)    │
└─────────────────┘    └─────────────────┘
```

## 🚀 Installation

### Prerequisites
- **Java JDK 1.8** - [Download here](https://www.oracle.com/java/technologies/javase/javase8-archive-downloads.html)
- **Gosu Lab IDE** - [Download here](https://gosu-lang.github.io/quickstart.html)

### Setup Instructions

1. **Install Java JDK 1.8**
   ```bash
   # Set JAVA_HOME environment variable
   export JAVA_HOME=/path/to/jdk1.8.0_xxx
   ```

2. **Download Gosu Lab**
   ```bash
   # Download and extract Gosu distribution
   wget https://gosu-lang.github.io/quickstart.html
   # Follow installation instructions
   ```

3. **Clone and Open Project**
   ```bash
   git clone https://github.com/yourusername/insurance-quote-calculator.git
   cd insurance-quote-calculator
   # Open in Gosu Lab IDE
   ```

## 💻 Usage

### Running the Application

1. **Open Gosu Lab IDE**
2. **Navigate to**: `src/main/gosu/scratch/`
3. **Open**: `RunMe.gsp`
4. **Run the script** to start the interactive chatbot

### Example Session

```bash
# Start the application
> Run the RunMe.gsp script

# Follow the interactive prompts
Pre-Qualification: Are you between 21-85 years old? (True/False)
> true

# Continue through all sections...
# View calculated premium
Total Premium: £336.00
```

## 🔧 Technical Details

### 🛠️ Tech Stack
- **Language**: Gosu 1.14.16
- **Platform**: Guidewire Insurance Suite
- **IDE**: Gosu Lab
- **Java**: JDK 1.8

### 📁 Project Structure
```
src/main/gosu/scratch/
├── RunMe.gsp              # Main entry point
├── ChatBot.gs             # User interface layer
├── Quote.gs               # Business logic & premium calculation
├── Customer.gs            # Customer data model
├── Address.gs             # Address data model
├── Vehicle.gs             # Vehicle data model
├── DrivingHistory.gs      # Driving history data model
├── ClaimsHistory.gs       # Claims history data model
├── Validation.gs          # Input validation utilities
└── Constants.gs           # Application constants
```

### 🎯 Key Components

#### ChatBot.gs
- **Purpose**: User interface and data collection
- **Features**: Interactive prompts, data validation, user confirmation
- **Methods**: `welcome()`, `preQualifications()`, `partOne()` through `partFive()`

#### Quote.gs
- **Purpose**: Premium calculation engine
- **Features**: Discount calculation, penalty assessment, final premium computation
- **Methods**: `calcDiscounts()`, `calcPenalties()`, `calcPremium()`

#### Validation.gs
- **Purpose**: Input validation and data sanitization
- **Features**: Boolean validation, integer validation, error handling
- **Methods**: `getValidatedBoolean()`, `getValidatedInt()`

## 📈 Learning Outcomes

### 🎓 Technical Skills Demonstrated
- **Rapid Language Learning**: Mastered Gosu in 1 week
- **Domain Modeling**: Designed comprehensive data models
- **Business Logic Implementation**: Complex premium calculation algorithms
- **Input Validation**: Robust data validation and error handling
- **User Experience Design**: Intuitive chatbot interface

### 🚀 Soft Skills Developed
- **Team Leadership**: Organized team, delegated tasks, supported members
- **Project Management**: Requirements analysis, integration, presentation
- **Communication**: Technical and business presentation skills
- **Problem Solving**: Complex business rule implementation
- **Time Management**: Delivered working solution in 2 days

### 🏆 Professional Achievements
- **Competition Winner**: 1st place in graduate training hackathon
- **Technical Excellence**: Demonstrated advanced programming concepts
- **Business Acumen**: Applied insurance domain knowledge
- **Innovation**: Creative solution to complex business requirements

## 👥 Team

**Alchemy Graduate Training Hackathon Team**
- **Role**: Team Lead & Technical Lead
- **Responsibilities**: 
  - Project architecture and design
  - Core business logic implementation
  - Team coordination and task delegation
  - Technical mentoring and support
  - Final presentation and Q&A

## 📊 Business Impact

### 🎯 Real-World Application
- **Insurance Domain**: Practical application in Guidewire ecosystem
- **Business Rules**: Complex underwriting logic implementation
- **User Experience**: Professional-grade chatbot interface
- **Scalability**: Modular design for future enhancements

### 💼 Employment Value
- **Guidewire Expertise**: Demonstrated proficiency in insurance platform
- **Rapid Learning**: Ability to master new technologies quickly
- **Problem Solving**: Complex business requirement implementation
- **Leadership**: Team coordination and project delivery

## 🤝 Contributing

This project was developed as part of a hackathon challenge. For questions or collaboration opportunities, please reach out via:

- **LinkedIn**: [Your LinkedIn Profile]
- **Email**: [your.email@example.com]
- **GitHub**: [Your GitHub Profile]

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- **Alchemy Team**: For the opportunity to participate in the hackathon
- **Team Members**: For collaboration and support during development
- **Guidewire**: For providing the Gosu platform and training resources

---

<div align="center">
  <strong>Built with ❤️ during Alchemy Graduate Training Hackathon</strong>
</div> 
