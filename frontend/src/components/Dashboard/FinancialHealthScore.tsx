import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useAnimatedNumber } from '@/hooks/useAnimatedNumber';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FinancialHealthScoreProps {
  score: number;
}

export const FinancialHealthScore: React.FC<FinancialHealthScoreProps> = ({ score }) => {
  const animatedScore = useAnimatedNumber(score, 1500, 300);

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-income';
    if (score >= 40) return 'text-warning';
    return 'text-expense';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 70) return 'from-income to-income/80';
    if (score >= 40) return 'from-warning to-warning/80';
    return 'from-expense to-expense/80';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 70) return <TrendingUp className="h-5 w-5" />;
    if (score >= 40) return <Minus className="h-5 w-5" />;
    return <TrendingDown className="h-5 w-5" />;
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return 'Excellent';
    if (score >= 40) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <Card className="hover-scale transition-all duration-300 shadow-card hover:shadow-elegant bg-gradient-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className={cn('transition-colors', getScoreColor(score))}>
            {getScoreIcon(score)}
          </div>
          Financial Health
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Circular Progress */}
        <div className="relative w-32 h-32 mx-auto">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
            {/* Background circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted"
            />
            {/* Progress circle */}
            <circle
              cx="60"
              cy="60"
              r="50"
              stroke="url(#scoreGradient)"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${(animatedScore / 100) * 314} 314`}
              className="transition-all duration-1000 ease-out"
            />
            {/* Gradient definition */}
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" className={cn('stop-color', getScoreColor(score))} />
                <stop offset="100%" className={cn('stop-color', getScoreColor(score))} stopOpacity="0.6" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Score text in center */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className={cn('text-3xl font-bold counter', getScoreColor(score))}>
                {animatedScore}
              </div>
              <div className="text-xs text-muted-foreground">out of 100</div>
            </div>
          </div>
        </div>

        {/* Score label and description */}
        <div className="text-center space-y-2">
          <div className={cn('text-lg font-semibold', getScoreColor(score))}>
            {getScoreLabel(score)}
          </div>
          <p className="text-sm text-muted-foreground">
            {score >= 70 && "Your finances are in great shape! Keep up the excellent work."}
            {score >= 40 && score < 70 && "You're on the right track. A few improvements could boost your score."}
            {score < 40 && "There's room for improvement. Focus on reducing expenses and increasing savings."}
          </p>
        </div>

        {/* Progress bar alternative for smaller screens */}
        <div className="md:hidden">
          <Progress value={animatedScore} className="h-3" />
        </div>
      </CardContent>
    </Card>
  );
};