import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Brain, Lightbulb } from 'lucide-react';

interface AIInsightCardProps {
  insight: string;
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({ insight }) => {
  return (
    <Card className="hover-scale transition-all duration-300 shadow-card hover:shadow-elegant bg-gradient-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <div className="text-primary">
            <Brain className="h-5 w-5" />
          </div>
          AI-Powered Insight
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
            <Lightbulb className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-sm leading-relaxed text-foreground/90">
              {insight || "Track your expenses regularly and set monthly budgets to improve your financial health. Consider automating savings to build an emergency fund."}
            </p>
          </div>
        </div>
        
        {/* Visual accent */}
        <div className="mt-6 h-1 w-full bg-gradient-to-r from-primary/20 via-primary to-primary/20 rounded-full"></div>
      </CardContent>
    </Card>
  );
};