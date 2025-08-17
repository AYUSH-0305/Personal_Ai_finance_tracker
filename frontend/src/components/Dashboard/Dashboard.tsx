import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { SummaryCard } from './SummaryCard';
import { FinancialHealthScore } from './FinancialHealthScore';
import { AIInsightCard } from './AIInsightCard';
import { ExpenseChart } from './ExpenseChart';
import { RecentTransactions } from './RecentTransactions';
import { AddTransactionFAB } from './AddTransactionFAB';
import { AddTransactionModal } from '@/components/AddTransactionModal';
import { AllTransactionsModal } from '@/components/AllTransactionsModal';
import { useAuth } from '@/contexts/AuthContext';
import { useApi } from '@/hooks/useApi';
import { TrendingUp, DollarSign, Wallet, LogOut } from 'lucide-react';

interface DashboardData {
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  healthScore: number;
  expenseByCategory: Array<{
    category: string;
    amount: number;
    percentage: number;
  }>;
  aiInsight: string;
}

interface Transaction {
  _id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

export const Dashboard = () => {
  const { user, logout } = useAuth();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [allTransactionsOpen, setAllTransactionsOpen] = useState(false);
  
  const apiCall = useApi();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [dashboardResponse, transactionsResponse] = await Promise.all([
        apiCall('/api/insights/summary'),
        apiCall('/api/transactions'),
      ]);
      
      setDashboardData(dashboardResponse);
      setTransactions(transactionsResponse || []);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleTransactionSuccess = () => {
    fetchDashboardData();
  };

  const handleLogout = () => {
    logout();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-4 animate-pulse glow"></div>
          <p className="text-muted-foreground">Loading your financial dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center glow">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient-primary">Zenith Finance</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid gap-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SummaryCard
              title="Total Income"
              value={dashboardData?.totalIncome || 0}
              type="income"
              delay={0}
              icon={<TrendingUp className="h-4 w-4" />}
            />
            <SummaryCard
              title="Total Expenses"
              value={dashboardData?.totalExpense || 0}
              type="expense"
              delay={200}
              icon={<DollarSign className="h-4 w-4" />}
            />
            <SummaryCard
              title="Net Balance"
              value={dashboardData?.netBalance || 0}
              type="balance"
              delay={400}
              icon={<Wallet className="h-4 w-4" />}
            />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              <FinancialHealthScore score={dashboardData?.healthScore || 0} />
              <AIInsightCard insight={dashboardData?.aiInsight || ''} />
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2">
              <ExpenseChart data={dashboardData?.expenseByCategory || []} />
            </div>
          </div>

          {/* Recent Transactions */}
          <RecentTransactions
            transactions={transactions}
            onViewAll={() => setAllTransactionsOpen(true)}
          />
        </div>
      </main>

      {/* Floating Action Button */}
      <AddTransactionFAB onClick={() => setAddModalOpen(true)} />

      {/* Modals */}
      <AddTransactionModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSuccess={handleTransactionSuccess}
      />

      <AllTransactionsModal
        isOpen={allTransactionsOpen}
        onClose={() => setAllTransactionsOpen(false)}
        transactions={transactions}
        onTransactionDeleted={handleTransactionSuccess}
      />
    </div>
  );
};