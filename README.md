# 💰 ExpenseFlow - Advanced Expense Tracker

A beautiful, modern expense tracking application with real-time analytics and stunning UI/UX.

## ✨ Features

- 📊 **Real-time Dashboard** - Live income, expenses, and balance tracking
- 📈 **Visual Analytics** - Area charts, pie charts, and bar graphs
- 💰 **Budget Management** - Set and monitor monthly budgets
- 🎯 **8 Categories** - Food, Transport, Coffee, Dining, Healthcare, Entertainment, Travel, Housing
- 📱 **Fully Responsive** - Works on all devices
- 🎨 **Beautiful UI** - Modern gradients and smooth animations

## 🚀 Quick Start

```bash
# Install dependencies
npm install react react-dom recharts lucide-react

# Start development server
npm run dev

# Open browser
http://localhost:5173
```

## 📦 Tech Stack

- **React 18** - UI framework
- **Recharts** - Data visualization
- **Lucide Icons** - Icon library
- **Tailwind CSS** - Styling

## 💻 Usage

1. **Add Transaction** - Click the floating + button
2. **View Analytics** - Switch between Overview, Analytics, Transactions, Categories tabs
3. **Filter Data** - Use category dropdown to filter transactions
4. **Track Budget** - Monitor spending against your monthly budget

## 🎨 Key Components

- `ExpenseTrackerApp` - Main application component
- `StatCards` - Income, Expenses, Balance, Budget cards
- `Charts` - Area, Pie, and Bar visualizations
- `TransactionList` - Filterable transaction history
- `AddModal` - Transaction input form

## 📊 Data Structure

```javascript
{
  id: 1,
  category: 'Food',
  amount: 45.50,
  description: 'Grocery shopping',
  date: '2024-12-10',
  type: 'expense' // or 'income'
}
```

## 🔧 Customization

### Change Colors
```javascript
// Update gradient classes
from-purple-500 to-pink-500
```

### Add Categories
```javascript
const newCategory = {
  name: 'Education',
  icon: BookOpen,
  color: '#6366f1',
  gradient: 'from-indigo-400 to-indigo-600'
};
```

### Modify Budget
```javascript
const [budget, setBudget] = useState(5000); // Change amount
```

## 📈 Future Features

- [ ] LocalStorage persistence
- [ ] Dark mode
- [ ] Export to CSV
- [ ] Multi-currency support
- [ ] Backend integration
- [ ] Mobile app

## 📄 License

MIT License - feel free to use for personal or commercial projects.

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a PR.

---

Made with ❤️ using React & Tailwind CSS
