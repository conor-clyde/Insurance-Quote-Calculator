# Alchemy Hackathon Insurance App (Gosu)

## Overview
This project was developed as part of a hackathon during my graduate training at Alchemy, a company specializing in insurance software and the Guidewire Insurance Suite. The challenge was to build an insurance-related application using Gosu in just two days following one week of Gosu training. My team of four won the competition, demonstrating rapid learning, teamwork, and adaptability.

## Project Context
- **Event:** Alchemy Graduate Training Hackathon
- **Business Domain:** Insurance quoting and policy management
- **Tech Stack:** Gosu (Guidewire platform language)
- **Team:** 4 members (including myself)
- **Duration:** 2 days

## Specification
- **Chatbot MVP:** Collects customer data, processes it, and quotes a premium inclusive of Insurance Premium Tax (IPT).
- **Required Information:**
  - Customer: Name, preferred gender, date of birth (for age), date of licence (for years driving), occupation
  - Address: House/flat number, street, postcode (only BT47/BT48 in Derry City, NI)
  - Driving history: Motoring and non-motoring convictions
  - Claims history: Fault and non-fault claims
  - Vehicle: Only specific makes/models covered; must provide make, model, year, registration, value
- **Summary & Confirmation:** User must confirm all info; if incorrect, quote is cancelled and process restarts.
- **Premium Calculation:**
  - Minimum premium: £300 + IPT (12%)
  - Vehicle rating: Ford Focus (0%), BMW 3 Series (+15%), Tesla Model S (+50%), Ferrari F430 (+100%), Rolls Royce Phantom (+500%)
  - Vehicles >£100,000 require a tracker; if not fitted, user must agree to fit one or quote is declined
- **Customer Acceptance:**
  - Age: 21–85 inclusive
  - Occupation: All except Professional Gambler; Doctors, Nurses, Teachers get -10% discount
  - Licence: 5+ years driving gets -5% discount
- **Address Acceptance:**
  - Only BT47/BT48 postcodes
  - BT47: -5% discount
  - BT48: +10% surcharge; BT48 6XX: +15% surcharge
- **Driving History:**
  - 3 penalty points: +20% premium
  - 6 penalty points: +50% premium
  - 6 penalty points or any non-motoring conviction: quote declined
- **Claims History:**
  - ≤3 non-fault accidents: no penalty; >3: quote declined
  - 1 fault accident: +50%; 2: +100%; 3+: quote declined
- **User Flow:**
  - User confirms info, sees premium, can accept or decline quote

## 🛠️ Tech Stack
- **Gosu** (Guidewire’s proprietary language)
- Gosu Lab 1.14.16 IDE

## File Structure
```
src/main/gosu/scratch/
  Address.gs           # Address data and validation
  ChatBot.gs           # Input/output chatbot interface
  ClaimsHistory.gs     # Claims history management
  Constants.gs         # Project-wide constants
  Customer.gs          # Customer data and logic
  DrivingHistory.gs    # Driving history management
  Quote.gs             # Insurance quote calculation
  RunMe.gsp            # Main entry point to run the application
  Validation.gs        # Data validation logic
  Vehicle.gs           # Vehicle data and logic
```

## How to Run

1. **Install Java JDK 1.8:**
   - Download and install Java JDK 1.8 if you do not already have it.
   - Set the `JAVA_HOME` environment variable to point to your JDK 1.8 installation.

2. **Download and Set Up Gosu Lab:**
   - Download the latest Gosu distribution from the [official Gosu Quickstart page](https://gosu-lang.github.io/quickstart.html).
   - Unzip the distribution zip file to your preferred location.
   - Go to the `bin` folder and double-click on `gosu.cmd` (Windows) or run `gosu` (Mac/Linux) to launch Gosu Lab.

3. **Open the Project:**
   - In Gosu Lab, open the project folder.
   - Navigate to `src/main/gosu/scratch/`.

4. **Run the Application:**
   - Open `RunMe.gsp`.
   - Run the script to start the application and interact via the chatbot interface.

> **Note:** For more details, see the [Gosu Quickstart guide](https://gosu-lang.github.io/quickstart.html).

## Learning Outcomes
- Rapidly learned and applied Gosu programming in a real-world context
- Demonstrated leadership by organizing the team, dividing tasks, and supporting less experienced members
- Gained experience in software process, from requirements analysis to integration and presentation
- Practiced clear communication, business and technical presentation skills during the Q&A session

## Acknowledgements
Thanks to my team members for their collaboration and to Alchemy for the opportunity to learn and grow in a fast-paced, supportive environment. 
