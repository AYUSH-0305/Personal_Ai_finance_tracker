import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownRight, Receipt, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Transaction {
  _id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
  onViewAll: () => void;
}

export const RecentTransactions: React.FC<RecentTransactionsProps> = ({
  transactions,
  onViewAll,
}) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const getTransactionIcon = (type: 'income' | 'expense') => {
    return type === 'income' ? (
      <ArrowDownRight className="h-4 w-4 text-income" />
    ) : (
      <ArrowUpRight className="h-4 w-4 text-expense" />
    );
  };

  const recentTransactions = transactions.slice(0, 5);

  return (
    <Card className="hover-scale transition-all duration-300 shadow-card hover:shadow-elegant bg-gradient-card">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <div className="text-primary">
            <Receipt className="h-5 w-5" />
          </div>
          Recent Transactions
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={onViewAll}
          className="flex items-center gap-2 hover-scale"
        >
          <Eye className="h-4 w-4" />
          View All
        </Button>
      </CardHeader>
      <CardContent>
        {recentTransactions && recentTransactions.length > 0 ? (
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <div
                key={transaction._id}
                className={cn(
                  "flex items-center justify-between p-3 rounded-lg transition-all duration-200",
                  "border border-border/50 hover:border-border hover:bg-muted/20",
                  "fade-in"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">
                      {transaction.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="secondary"
                        className="text-xs px-2 py-0"
                      >
                        {transaction.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(transaction.date)}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={cn(
                      'font-semibold',
                      transaction.type === 'income' ? 'text-income' : 'text-expense'
                    )}
                  >
                    {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Receipt className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No transactions yet</p>
            <p className="text-sm text-muted-foreground">Start adding transactions to track your finances</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};