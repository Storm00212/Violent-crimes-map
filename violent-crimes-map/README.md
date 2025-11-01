# Kenya Violent Crimes Map

An interactive React application that visualizes violent crime data across Kenya's counties using an interactive map. The app parses crime data from an Excel file and displays it as a choropleth map with filtering and export capabilities.

## Features

- **Interactive Map**: Choropleth visualization of Kenya's counties with crime intensity
- **Data Parsing**: Automatically parses Excel data containing crime statistics by county
- **Filtering**: Filter by year, crime type, and search counties
- **Hover Tooltips**: Detailed crime statistics on hover
- **Data Export**: Export filtered data as CSV
- **Responsive Design**: Clean, modern UI built with Tailwind CSS
- **Type Safety**: Built with TypeScript for reliability

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Leaflet & React-Leaflet** for interactive mapping
- **XLSX** for Excel file parsing
- **Tailwind CSS** for styling
- **Kenya Counties GeoJSON** for map boundaries

## Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd violent-crimes-map
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Place the Excel data file:
   - Copy your `Governance-Peace-and-Security.xlsx` file to the `public/` directory

## Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`

## Data Structure

The application expects an Excel file with crime data organized by county and year. The data should include:
- County names
- Year of data
- Male and female offender counts
- Total crime incidents

## Features Overview

### Map Visualization
- Counties are colored based on crime intensity (darker = higher crime rates)
- Hover over counties to see detailed statistics
- Zoom and pan controls for navigation

### Filtering Options
- **Year Selection**: Choose from available years (2019-2023)
- **Crime Type**: Filter by total crimes, male offenders, or female offenders
- **County Search**: Search and highlight specific counties

### Data Export
- Export current filtered data as CSV file
- Includes county name, year, and crime statistics

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Project Structure

```
src/
├── components/
│   ├── CrimeMap.tsx      # Main map component
│   ├── Filters.tsx       # Filtering controls
│   ├── Legend.tsx        # Map legend
│   └── ExportButton.tsx  # Data export functionality
├── types.ts              # TypeScript type definitions
├── App.tsx               # Main application component
└── index.css             # Global styles with Tailwind
```

## Data Source

Crime data is sourced from the Kenya National Police Service statistics. The application uses county-level aggregation from the provided Excel file.

## License

This project is for educational and informational purposes. Please ensure compliance with data usage policies and local regulations.
