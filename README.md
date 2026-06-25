# Doctosmart_R2

## Project Overview
Doctosmart_R2 is a professional frontend dashboard for patient management. It provides a sleek, modern UI for viewing patient data, with dynamic statistics, interactive modals, and efficient CSV exports.

## Features
- **Dashboard Overview**: Dynamic statistics cards showing total patients and gender distribution.
- **Patient Management**: Tabular view of patient records.
- **Search & Filter**: Client-side search (by name, ID, mobile) and filtering by gender.
- **Patient Details**: Interactive modal for viewing extended patient details.
- **CSV Export**: Instantly export the current patient view into a CSV file.
- **Dark Mode**: Integrated dark mode support with sleek design aesthetics.

## Tech Stack
- **React 19**
- **Vite**
- **Tailwind CSS v3**
- **Axios**
- **React Router DOM**
- **Lucide React** (Icons)

## API Information
The application fetches patient data using Basic Authentication from the following endpoint:
`https://demo.lupinary.com/api/patients?user_id=1&clinic_id=1&page_no=0`

The application acts as a direct window to this single API call without fetching additional pages.

## Environment Variables
The application uses environment variables for secure API communication. 
Refer to `.env.example` for the required keys. Do NOT commit the actual `.env` file containing real credentials.

Required variables:
- `VITE_API_BASE_URL`
- `VITE_API_USERNAME`
- `VITE_API_PASSWORD`

## Folder Structure
```
src/
├── assets/             # Static assets like images and icons
├── components/
│   ├── common/         # Reusable UI components (Loaders, SearchBars, Pagination)
│   ├── layout/         # Structural components (Navbar, Sidebar)
│   └── patients/       # Patient-specific features (Tables, Cards, Modals)
├── context/            # Global context providers (ThemeContext)
├── hooks/              # Custom React hooks (usePatients)
├── pages/              # Main view components (Dashboard, Patients, NotFound)
├── routes/             # React Router configuration
├── services/           # Axios API configuration and service calls
└── utils/              # Helper functions and constants
```

## Setup Instructions
1. Clone the repository to your local machine.
2. Copy `.env.example` to `.env` and fill in the required Basic Authentication credentials.
3. Install dependencies and start the development server.

## Installation
Run the following command to install the required dependencies:
```bash
npm install
```

## Run Commands
To start the local development server:
```bash
npm run dev
```

To build the application for production:
```bash
npm run build
```
