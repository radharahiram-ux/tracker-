# ExpenseFlow - Smart Financial Tracker

A modern, feature-rich expense tracking application built with React, Tailwind CSS, and Recharts.

## Features

- 📊 **Dashboard Overview** - View your income, expenses, balance, and budget at a glance
- 📈 **Analytics** - Detailed charts showing spending patterns and trends
- 💳 **Transaction Management** - Add, view, and delete transactions easily
- 🏷️ **Category Tracking** - Organize expenses by category (Food, Transport, etc.)
- 🎯 **Budget Management** - Set and track your monthly budget
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

## Installation

1. **Clone the repository**
   ```bash
   cd "tracker app"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Tailwind CSS**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   ```

## Running the App

Start the development server:

```bash
npm start
```

The app will open automatically in your browser at:
```
http://localhost:3000
```

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Technologies Used

- **React 18** - UI framework
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons
- **React Scripts** - Build tools

## Project Structure

```
.
├── public/
│   └── index.html
├── src/
│   ├── App.js
│   ├── index.js
│   └── index.css
├── .env
├── package.json
├── tailwind.config.js
└── README.md
```

## Configuration

Update the `.env` file with your API key:

```
REACT_APP_API_KEY=your_api_key_here_12345678901234567890
REACT_APP_API_URL=https://api.example.com
REACT_APP_ENV=development
```

## Available Views

- **Overview** - Main dashboard with charts and stats
- **Analytics** - Weekly comparison and performance metrics
- **Transactions** - List of all income and expense transactions
- **Categories** - Breakdown of spending by category

## License

MIT License - feel free to use this project for personal or commercial use.
