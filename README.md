# Freelance Time Tracker

A modern, minimal time tracking application for freelancers with TurboTax-inspired design.

## Features

- **Time Tracking**: Start, pause, and stop time tracking sessions
- **Rate Calculation**: Set your hourly rate and see earnings calculated in real-time
- **Session History**: View and manage all your completed sessions
- **Invoice Generation**: Create professional invoices from your tracked sessions
- **Screenshot Upload**: Attach work screenshots to document your progress
- **Persistent Storage**: All data is saved to localStorage for convenience

## Technology Stack

- **React**: UI library for building the interface
- **TypeScript**: Type-safe JavaScript for better development experience
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Lucide Icons**: Modern icon set for the UI elements
- **Vite**: Fast, modern frontend build tool

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

## Usage

1. Enter your project details and hourly rate
2. Use the timer controls to track your work sessions
3. View your session history and total earnings
4. Generate invoices to send to clients

## About the CSS in Invoice Component

The hardcoded CSS in the Invoice component is specifically for the print and download functionality. Here's why:

1. **Print Context**: When generating a printable invoice or downloadable HTML file, the content is rendered in a new window or context that doesn't have access to our Tailwind styles.

2. **Self-Contained**: The invoice needs to be self-contained with all styling included, so it renders correctly when printed or viewed as a standalone file.

3. **Print-Specific Styles**: Some styles are specifically for print media (like `@media print` rules) which are easier to manage as direct CSS.

4. **Consistent Rendering**: This ensures the invoice looks the same when printed or downloaded, regardless of the user's browser or system.

For the main application UI, we consistently use Tailwind as our design system. The hardcoded CSS is only used for generated content that needs to exist outside of our main application context.

## Design Philosophy

The application follows a TurboTax-inspired design philosophy:

- Clean, minimal interface with plenty of whitespace
- Card-based layout with subtle shadows and borders
- Rounded corners and pill-shaped buttons
- Icon-forward design with colored accent backgrounds
- Clear visual hierarchy and intuitive navigation

## Project Structure

```
freelance-time-tracker/
├── src/
│   ├── components/         # React components
│   │   ├── Timer.tsx       # Timer display and controls
│   │   ├── RateInput.tsx   # Hourly rate and project details input
│   │   ├── SessionSummary.tsx  # Current session summary
│   │   ├── SessionHistory.tsx  # History of completed sessions
│   │   ├── Invoice.tsx     # Invoice generation and display
│   │   ├── InvoiceForm.tsx # Form for invoice details
│   │   └── ScreenshotUploader.tsx # Upload and manage screenshots
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts        # Shared types for the application
│   ├── utils/              # Utility functions
│   │   └── timeUtils.ts    # Time formatting and calculations
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── index.html              # HTML template
├── tailwind.config.js      # Tailwind CSS configuration
├── vite.config.ts          # Vite configuration
└── package.json            # Project dependencies and scripts
```

## Features in Detail

### Time Tracking

- Start, pause, and stop work sessions
- Real-time timer display
- Automatic calculation of elapsed time

### Rate Calculation

- Set custom hourly rates for different projects
- Real-time calculation of earnings based on time worked
- Support for decimal rates (e.g., $50.50/hour)

### Session History

- View all completed work sessions
- Sort and filter sessions by project, date, or duration
- Calculate total time worked and earnings across sessions

### Invoice Generation

- Create professional invoices from tracked sessions
- Customize invoice details (client info, payment terms, etc.)
- Include screenshots of completed work
- Print or download invoices for sharing

## Future Improvements

- Cloud synchronization for working across devices
- Team collaboration features
- Expanded invoice customization options
- Export to PDF functionality
- Integration with payment processors

## License

MIT
