# Bone Density Monitor

Lightweight, acoustic-based bone health monitoring system for astronauts and aging populations.

## MedTech Hack @ Georgia Tech
**Team:** ChocoChip Circuits  
**Thread:** Health Monitoring

## Problem Statement
Traditional bone densitometers are bulky and impractical for space missions. Aging populations need accessible bone health monitoring to prevent osteoporosis.

## Our Solution
A wearable device using acoustic technology to assess bone health through:
- Vibration motors generating controlled bone vibrations
- Piezoelectric sensors detecting acoustic responses
- Real-time analysis and health status display

## Technologies Used
- **Hardware:** ESP32 S3 DevKitC, Piezoelectric Film Sensor, Vibration Motors
- **Backend:** Spring Boot, Java 17
- **Frontend:** HTML5, CSS3, JavaScript, Chart.js
- **Database:** H2 (development)

## Setup Instructions

### Prerequisites
- JDK 17 or higher
- Maven
- IntelliJ IDEA (recommended)

### Running Locally
1. Clone the repository
```bash
   git clone https://github.com/yourusername/bone-density-monitor.git
```
2. Open in IntelliJ IDEA
3. Run `BoneDensityMonitorApplication.java`
4. Navigate to `http://localhost:8080`

## Features
- Real-time bone density monitoring
- Historical data tracking with visual charts
- Health status indicators (Healthy/Warning/Concerning)
- Responsive web dashboard
- Future: Mobile app integration

## Applications
- **Space Exploration:** Monitor bone adaptation in astronauts
- **Healthcare:** Early osteoporosis detection
- **Elderly Care:** Regular bone health monitoring

## Team Members
- Yadiel Narvaez Hernandez
- Madhumitha Rangaraj
- Reyna Torrado-Rivera
- Grace Wang
- Ka Yi Zheng

## License
MIT License - see LICENSE file for details (to be added)

## Acknowledgments
- MedTech Hack organizers
- Georgia Tech
- Research papers on acoustic bone monitoring
  - [ASME Digitial Collection: Low-Frequency Acoustic Sweep Monitoring of Bone Integrity and Osteoporosis](https://asmedigitalcollection.asme.org/biomechanical/article-abstract/121/4/423/398104/Low-Frequency-Acoustic-Sweep-Monitoring-of-Bone?redirectedFrom=fulltext)
  - [National Library of Medicine: Trabecular Bone Score—An Emerging Tool in the Management of Osteoporosis](https://pmc.ncbi.nlm.nih.gov/articles/PMC7539023/)
  - [MDPI: Predicting Bone Adaptation in Astronauts during and after Spaceflight](https://www.mdpi.com/2075-1729/13/11/2183)
