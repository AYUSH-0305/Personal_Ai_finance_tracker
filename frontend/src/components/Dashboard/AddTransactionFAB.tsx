import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface AddTransactionFABProps {
  onClick: () => void;
}

export const AddTransactionFAB: React.FC<AddTransactionFABProps> = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-primary hover:opacity-90 shadow-elegant hover:shadow-glow transition-all duration-300 float z-50"
      size="icon"
    >
      <Plus className="h-6 w-6 text-white" />
      <span className="sr-only">Add Transaction</span>
    </Button>
  );
};