# 🚗 Insurance Quote Calculator
[![Language](https://img.shields.io/badge/Gosu-1.14.16-blue.svg)](https://gosu-lang.github.io/)
[![Runtime](https://img.shields.io/badge/JDK-11+-green.svg)](https://openjdk.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Completed-brightgreen.svg)]()

A console-based insurance quote calculator built with Gosu. It models real-world insurance rules such as **eligibility, vehicle configuration, accident history, and premium calculations** — with a clean, structured flow.  
Originally developed during a graduate program, later refined to demonstrate **professional-grade validation, business rules, and user experience**.

## ✨ Highlights
- **End-to-End User Journey** — from pre-qualification to premium breakdown  
- **Comprehensive Validation** — catches invalid inputs & enforces rules  
- **Premium Calculator** — applies discounts, penalties, and taxes  
- **User-Friendly Flow** — step-by-step data collection with clear errors  
- **Clean Structure** — separation of layers and maintainable codebase  

## 🎬 Demo & Screenshots
### Application Demo
<img src="docs/images/demo-complete.gif" alt="Application Demo" width="850">

### User Journey Screenshots
*Complete walkthrough of the insurance quote process:*

<table>
  <tr>
    <th>Step</th>
    <th>Screenshot</th>
  </tr>
  <tr>
    <td><strong>1. Pre-Qualification</strong><br><em>Eligibility check: age, occupation, risk factors</em></td>
    <td><img src="docs/images/pre-qualification.png" width="800" alt="Pre-qualification screen showing inputs for age, occupation, and risk factors"></td>
  </tr>
  <tr>
    <td><strong>2. Customer Info</strong><br><em>Collects personal details</em></td>
    <td><img src="docs/images/data-collection1.png" width="800" alt="Customer information collection screen with personal details form"></td>
  </tr>
  <tr>
    <td><strong>3. Vehicle Configuration</strong><br><em>Configure vehicle details & options</em></td>
    <td><img src="docs/images/data-collection2.png" width="800" alt="Vehicle configuration screen with make, model, and option selection"></td>
  </tr>
  <tr>
    <td><strong>4. Summary & Confirmation</strong><br><em>Review all collected data</em></td>
    <td><img src="docs/images/information-summary.png" width="800" alt="Information summary screen showing all collected data for review"></td>
  </tr>
  <tr>
    <td><strong>5. Quote Calculation</strong><br><em>Detailed premium breakdown</em></td>
    <td><img src="docs/images/quote-results.png" width="800" alt="Quote results screen showing premium breakdown and calculations"></td>
  </tr>
</table>

## 🛡️ Validation & Error Handling
Includes **comprehensive input validation** (dates, names, postcodes, vehicle ranges, and options) and **strict business rule enforcement** — preventing invalid or ineligible entries.

![Validation Example](docs/images/validation-example.png)

## 🚀 Quick Start
### Prerequisites
- **JDK 11+** — [Download](https://adoptium.net/)  
- **Gosu 1.14.16** — [Download](https://gosu-lang.github.io/downloads.html)

### Run the Project
```bash
git clone https://github.com/conor-clyde/alchemy-gosu-hackathon.git
cd alchemy-gosu-hackathon
# Open Hackathon.prj in Gosu IDE and run RunMe.gsp
```

## 📄 License
MIT License — see [LICENSE](LICENSE) file for details.

Originally built during a graduate program, later refined into a professional-grade showcase of clean architecture and real-world business rules.
