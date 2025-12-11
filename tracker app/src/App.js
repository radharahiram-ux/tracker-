import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LineChart, Line, Area, AreaChart } from 'recharts';
import { Wallet, TrendingUp, TrendingDown, DollarSign, ShoppingCart, Home, Car, Coffee, Utensils, Heart, Plane, Gift, Plus, X, Calendar, Filter, Download, Upload, Settings, Bell, User, CreditCard, Receipt, Target, Award, Activity } from 'lucide-react';

const ExpenseTrackerApp = () => {
  const [expenses, setExpenses] = useState([
    { id: 1, category: 'Food', amount: 45.50, description: 'Grocery shopping', date: '2024-12-10', type: 'expense', icon: 'ShoppingCart' },
    { id: 2, category: 'Transport', amount: 25.00, description: 'Uber ride', date: '2024-12-10', type: 'expense', icon: 'Car' },
    { id: 3, category: 'Salary', amount: 3500.00, description: 'Monthly salary', date: '2024-12-01', type: 'income', icon: 'DollarSign' },
    { id: 4, category: 'Coffee', amount: 5.80, description: 'Starbucks', date: '2024-12-09', type: 'expense', icon: 'Coffee' },
    { id: 5, category: 'Dining', amount: 67.30, description: 'Restaurant', date: '2024-12-08', type: 'expense', icon: 'Utensils' },
    { id: 6, category: 'Healthcare', amount: 120.00, description: 'Doctor visit', date: '2024-12-07', type: 'expense', icon: 'Heart' },
    { id: 7, category: 'Freelance', amount: 500.00, description: 'Web design project', date: '2024-12-05', type: 'income', icon: 'DollarSign' },
    { id: 8, category: 'Entertainment', amount: 45.00, description: 'Movie tickets', date: '2024-12-06', type: 'expense', icon: 'Gift' },
  ]);

  const [budget, setBudget] = useState(5000);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeView, setActiveView] = useState('overview');
  const [filterCategory, setFilterCategory] = useState('all');
  const [newExpense, setNewExpense] = useState({
    category: 'Food',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense'
  });

  const categories = [
    { name: 'Food', icon: ShoppingCart, color: '#ef4444', gradient: 'from-red-400 to-red-600' },
    { name: 'Transport', icon: Car, color: '#3b82f6', gradient: 'from-blue-400 to-blue-600' },
    { name: 'Coffee', icon: Coffee, color: '#f59e0b', gradient: 'from-amber-400 to-amber-600' },
    { name: 'Dining', icon: Utensils, color: '#ec4899', gradient: 'from-pink-400 to-pink-600' },
    { name: 'Healthcare', icon: Heart, color: '#10b981', gradient: 'from-emerald-400 to-emerald-600' },
    { name: 'Entertainment', icon: Gift, color: '#8b5cf6', gradient: 'from-purple-400 to-purple-600' },
    { name: 'Travel', icon: Plane, color: '#06b6d4', gradient: 'from-cyan-400 to-cyan-600' },
    { name: 'Housing', icon: Home, color: '#f97316', gradient: 'from-orange-400 to-orange-600' },
  ];

  const totalIncome = expenses.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
  const totalExpenses = expenses.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncome - totalExpenses;
  const budgetUsed = (totalExpenses / budget) * 100;

  const categoryData = categories.map(cat => {
    const total = expenses
      .filter(e => e.category === cat.name && e.type === 'expense')
      .reduce((sum, e) => sum + e.amount, 0);
    return { name: cat.name, value: total, color: cat.color };
  }).filter(item => item.value > 0);

  const last7Days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const dayExpenses = expenses
      .filter(e => e.date === dateStr && e.type === 'expense')
      .reduce((sum, e) => sum + e.amount, 0);
    const dayIncome = expenses
      .filter(e => e.date === dateStr && e.type === 'income')
      .reduce((sum, e) => sum + e.amount, 0);
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      expenses: dayExpenses,
      income: dayIncome
    };
  }).reverse();

  const addExpense = () => {
    if (!newExpense.amount || !newExpense.description) return;

    const expense = {
      id: Date.now(),
      ...newExpense,
      amount: parseFloat(newExpense.amount),
      icon: categories.find(c => c.name === newExpense.category)?.icon.name || 'DollarSign'
    };

    setExpenses([expense, ...expenses]);
    setShowAddModal(false);
    setNewExpense({
      category: 'Food',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      type: 'expense'
    });
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const filteredExpenses = filterCategory === 'all' 
    ? expenses 
    : expenses.filter(e => e.category === filterCategory);

  const IconComponent = ({ name, size = 20 }) => {
    const icons = { ShoppingCart, Car, Coffee, Utensils, Heart, Gift, Plane, Home, DollarSign };
    const Icon = icons[name] || DollarSign;
    return <Icon size={size} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl shadow-lg">
                <Wallet className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  ExpenseFlow
                </h1>
                <p className="text-xs text-gray-500">Smart Financial Tracker</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-all">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-all">
                <Settings size={20} className="text-gray-600" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-3 rounded-xl">
                <TrendingUp className="text-white" size={24} />
              </div>
              <span className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                +12.5%
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-1">Total Income</p>
            <p className="text-3xl font-bold text-gray-800">${totalIncome.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-red-400 to-rose-500 p-3 rounded-xl">
                <TrendingDown className="text-white" size={24} />
              </div>
              <span className="text-sm font-semibold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                {budgetUsed.toFixed(1)}%
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-1">Total Expenses</p>
            <p className="text-3xl font-bold text-gray-800">${totalExpenses.toLocaleString()}</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-blue-400 to-indigo-500 p-3 rounded-xl">
                <Wallet className="text-white" size={24} />
              </div>
              <span className={`text-sm font-semibold ${balance >= 0 ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'} px-3 py-1 rounded-full`}>
                {balance >= 0 ? 'Positive' : 'Negative'}
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-1">Balance</p>
            <p className={`text-3xl font-bold ${balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${Math.abs(balance).toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-purple-400 to-pink-500 p-3 rounded-xl">
                <Target className="text-white" size={24} />
              </div>
              <span className="text-sm font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                ${budget - totalExpenses}
              </span>
            </div>
            <p className="text-gray-500 text-sm mb-1">Budget Left</p>
            <p className="text-3xl font-bold text-gray-800">${budget.toLocaleString()}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-lg p-2 mb-8 flex gap-2 overflow-x-auto">
          {['overview', 'analytics', 'transactions', 'categories'].map(view => (
            <button
              key={view}
              onClick={() => setActiveView(view)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                activeView === view
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {view.charAt(0).toUpperCase() + view.slice(1)}
            </button>
          ))}
        </div>

        {/* Overview View */}
        {activeView === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Spending by Category */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">Spending Overview</h2>
                <select className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>This Year</option>
                </select>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={last7Days}>
                    <defs>
                      <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#888" style={{ fontSize: '12px' }} />
                    <YAxis stroke="#888" style={{ fontSize: '12px' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px',
                        padding: '12px'
                      }}
                    />
                    <Area type="monotone" dataKey="expenses" stroke="#ef4444" fillOpacity={1} fill="url(#colorExpenses)" />
                    <Area type="monotone" dataKey="income" stroke="#10b981" fillOpacity={1} fill="url(#colorIncome)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Pie Chart */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-6">By Category</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                {categoryData.slice(0, 5).map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></div>
                      <span className="text-sm text-gray-600">{cat.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">${cat.value.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Analytics View */}
        {activeView === 'analytics' && (
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Weekly Comparison</h2>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={last7Days}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" stroke="#888" />
                    <YAxis stroke="#888" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: '1px solid #e5e7eb',
                        borderRadius: '12px'
                      }}
                    />
                    <Bar dataKey="expenses" fill="#ef4444" radius={[8, 8, 0, 0]} />
                    <Bar dataKey="income" fill="#10b981" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg">
                <Award className="mb-4" size={32} />
                <h3 className="text-lg font-semibold mb-2">Savings Goal</h3>
                <p className="text-3xl font-bold mb-2">${(totalIncome - totalExpenses).toFixed(2)}</p>
                <p className="text-sm opacity-90">Keep it up! You're on track</p>
              </div>

              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg">
                <Activity className="mb-4" size={32} />
                <h3 className="text-lg font-semibold mb-2">Avg. Daily Spend</h3>
                <p className="text-3xl font-bold mb-2">${(totalExpenses / 30).toFixed(2)}</p>
                <p className="text-sm opacity-90">Based on last 30 days</p>
              </div>

              <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg">
                <TrendingUp className="mb-4" size={32} />
                <h3 className="text-lg font-semibold mb-2">Growth</h3>
                <p className="text-3xl font-bold mb-2">+12.5%</p>
                <p className="text-sm opacity-90">Compared to last month</p>
              </div>
            </div>
          </div>
        )}

        {/* Transactions View */}
        {activeView === 'transactions' && (
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
              <div className="flex gap-2">
                <select 
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm"
                >
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
                  <Download size={16} />
                  Export
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {filteredExpenses.map(expense => {
                const category = categories.find(c => c.name === expense.category);
                return (
                  <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className={`bg-gradient-to-br ${category?.gradient || 'from-gray-400 to-gray-600'} p-3 rounded-xl`}>
                        <IconComponent name={expense.icon} size={20} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{expense.description}</p>
                        <p className="text-sm text-gray-500">{expense.category} • {expense.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className={`text-lg font-bold ${expense.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {expense.type === 'income' ? '+' : '-'}${expense.amount.toFixed(2)}
                      </p>
                      <button 
                        onClick={() => deleteExpense(expense.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 hover:bg-red-100 rounded-lg transition-all"
                      >
                        <X size={16} className="text-red-500" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Categories View */}
        {activeView === 'categories' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map(cat => {
              const total = expenses
                .filter(e => e.category === cat.name && e.type === 'expense')
                .reduce((sum, e) => sum + e.amount, 0);
              const Icon = cat.icon;
              return (
                <div key={cat.name} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
                  <div className={`bg-gradient-to-br ${cat.gradient} p-4 rounded-xl mb-4 inline-block`}>
                    <Icon className="text-white" size={28} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{cat.name}</h3>
                  <p className="text-3xl font-bold text-gray-900 mb-2">${total.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">
                    {expenses.filter(e => e.category === cat.name).length} transactions
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Floating Add Button */}
      <button
        onClick={() => setShowAddModal(true)}
        className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all transform hover:scale-110"
      >
        <Plus size={28} />
      </button>

      {/* Add Transaction Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Add Transaction</h2>
              <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X size={24} className="text-gray-600" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setNewExpense({ ...newExpense, type: 'expense' })}
                    className={`py-3 rounded-xl font-semibold transition-all ${
                      newExpense.type === 'expense'
                        ? 'bg-red-500 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    Expense
                  </button>
                  <button
                    onClick={() => setNewExpense({ ...newExpense, type: 'income' })}
                    className={`py-3 rounded-xl font-semibold transition-all ${
                      newExpense.type === 'income'
                        ? 'bg-green-500 text-white shadow-lg'
                        : 'bg-100 text-gray-600'
                    }`}
                  >
                    Income
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {categories.map(cat => (
                    <option key={cat.name} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500 text-lg">$</span>
                  <input
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-8 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="What did you spend on?"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <button
                onClick={addExpense}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105"
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseTrackerApp;
