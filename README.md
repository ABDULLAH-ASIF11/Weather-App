# ⚡️ Live Weather Dashboard - Neo-Brutalist Edition

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Netlify](https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7)

A highly interactive, real-time weather application built with React and Tailwind CSS. Moving away from standard UI patterns, this project features a strict **Neo-Brutalist** design language with heavy typography, solid borders, and dynamic color-shifting backgrounds based on real-time weather data.

**🔗 [View Live Demo on Netlify](https://live-weather-checking.netlify.app/)**

---

## 🎨 Design Showcase

| Clear / Default | Sunny / Bright |
| :---: | :---: |
| ![Clear](https://github.com/user-attachments/assets/44aa7791-d7aa-4292-98fa-b743f02b417b) | ![Sunny](https://github.com/user-attachments/assets/22353676-1a6b-4433-9b2b-10271ce3f8ee) |

| Rainy / Wet | Error State |
| :---: | :---: |
| ![Rainy](https://github.com/user-attachments/assets/4a1aa811-06ea-4ef1-810a-0d41c5588940) | ![Error](https://github.com/user-attachments/assets/d1be24c8-bc70-4556-b632-aa928780cc09) |
---

## ✨ Key Features

- **Dynamic Theming:** The entire UI conditionally renders distinct background colors (Yellow, Blue, Gray, Red) based on the live weather condition or error states.
- **Global Unit Toggle:** Implemented Context API (`TemperatureContext`) to instantly swap all displayed metrics between Celsius and Fahrenheit globally.
- **Custom Data Fetching:** Built a robust `useWeather` custom hook to abstract OpenWeather API calls, loading states, and error handling.
- **Ref-Based DOM Manipulation:** Utilizes `useRef` to auto-focus the search bar on mount and snap focus back immediately after clearing the input.
- **Responsive Neo-Brutalist UI:** Custom CSS patterns and Tailwind classes ensure the brutalist aesthetic (thick borders, uppercase text, high contrast) holds up on mobile and desktop.

---

## 🛠️ Tech Stack

- **Framework:** React (Hooks: `useState`, `useEffect`, `useRef`, `useContext`)
- **Styling:** Tailwind CSS (with custom utility classes in `index.css`)
- **Icons:** Lucide-React
- **API:** OpenWeather API
- **Deployment:** Netlify

---

## 🚀 Getting Started locally

If you'd like to run this project locally on your machine, follow these steps:

### Prerequisites
- Node.js installed on your machine
- A free API key from [OpenWeatherMap](https://openweathermap.org/api)

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/ABDULLAH-ASIF11/live-weather-dashboard.git](https://github.com/ABDULLAH-ASIF11/live-weather-dashboard.git)
2. **Navigate to the project directory:**   
   ```bash
   cd live-weather-dashboard
3. **Install dependencies:**   
   ```bash
   npm install
4. **Set up Environment Variables:** 
Create a .env file in the root of your project.
Add your OpenWeather API key:
VITE_OPENWEATHER_API_KEY=your_api_key_here
(Note: Update the base44Client.js file to reference this .env variable instead of the hardcoded key).
5. **Start the development server:** 
   ```bash
   npm run dev


---
## 👨‍💻 THE CREATOR

| ABDULLAH ASIF |
| :---: |
| React / Front-End Developer |
| [![LinkedIn](https://img.shields.io/badge/LINKEDIN-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/abdullah-asif-bhatti/) [![GitHub](https://img.shields.io/badge/GITHUB-%23100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ABDULLAH-ASIF11) |
