import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import { cn } from '@/lib/utils';

interface SummaryCardProps {
  title: string;
  value: number;
  type: 'income' | 'expense' | 'balance';
  delay?: number;
  icon: React.ReactNode;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  type,
  delay = 0,
  icon,
}) => {
  const animatedValue = useAnimatedNumber(Math.abs(value), 1200, delay);
  const isNegative = value < 0;

  const getCardStyles = () => {
    switch (type) {
      case 'income':
        return 'border-income/20 bg-gradient-to-br from-card to-income/5 hover:from-income/5 hover:to-income/10';
      case 'expense':
        return 'border-expense/20 bg-gradient-to-br from-card to-expense/5 hover:from-expense/5 hover:to-expense/10';
      case 'balance':
        return isNegative
          ? 'border-expense/20 bg-gradient-to-br from-card to-expense/5 hover:from-expense/5 hover:to-expense/10'
          : 'border-income/20 bg-gradient-to-br from-card to-income/5 hover:from-income/5 hover:to-income/10';
      default:
        return '';
    }
  };

  const getValueColor = () => {
    switch (type) {
      case 'income':
        return 'text-income';
      case 'expense':
        return 'text-expense';
      case 'balance':
        return isNegative ? 'text-expense' : 'text-income';
      default:
        return 'text-foreground';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'income':
        return 'text-income';
      case 'expense':
        return 'text-expense';
      case 'balance':
        return isNegative ? 'text-expense' : 'text-income';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatValue = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <Card className={cn(
      'hover-scale transition-all duration-300 cursor-pointer shadow-card hover:shadow-elegant',
      getCardStyles()
    )}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn('transition-colors', getIconColor())}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn(
          'text-2xl font-bold counter transition-all duration-300',
          getValueColor()
        )}>
          {isNegative ? '-' : ''}{formatValue(animatedValue)}
        </div>
      </CardContent>
    </Card>
  );
};