import { useMemo } from 'react';
import { Expense, ExpenseCategory } from '../types/expense';

interface MonthlySummaryProps {
  expenses: Expense[];
}

const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  '食費': '#10B981',
  '交通費': '#3B82F6',
  '事務用品費': '#A855F7',
  '通信費': '#F59E0B',
  '研修費': '#EC4899',
  'その他': '#6B7280'
};

export default function MonthlySummary({ expenses }: MonthlySummaryProps) {
  const currentMonth = useMemo(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }, []);

  const monthlyExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const expenseMonth = expense.date.substring(0, 7);
      return expenseMonth === currentMonth;
    });
  }, [expenses, currentMonth]);

  const categorySummary = useMemo(() => {
    const summary: Record<ExpenseCategory, number> = {
      '食費': 0,
      '交通費': 0,
      '事務用品費': 0,
      '通信費': 0,
      '研修費': 0,
      'その他': 0
    };

    monthlyExpenses.forEach(expense => {
      summary[expense.category] += expense.amount;
    });

    return summary;
  }, [monthlyExpenses]);

  const totalAmount = useMemo(() => {
    return Object.values(categorySummary).reduce((sum, amount) => sum + amount, 0);
  }, [categorySummary]);

  const categoryPercentages = useMemo(() => {
    if (totalAmount === 0) return {};
    
    const percentages: Record<string, number> = {};
    Object.entries(categorySummary).forEach(([category, amount]) => {
      percentages[category] = (amount / totalAmount) * 100;
    });
    return percentages;
  }, [categorySummary, totalAmount]);

  const formatAmount = (amount: number) => {
    return `¥${amount.toLocaleString()}`;
  };

  if (monthlyExpenses.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
        今月の記録がありません
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold p-6 border-b text-gray-800">月次サマリー</h2>
      
      <div className="p-6">
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">{currentMonth}</p>
          <p className="text-3xl font-bold text-gray-800">{formatAmount(totalAmount)}</p>
        </div>

        {/* 簡易棒グラフ */}
        <div className="mb-6 space-y-3">
          {Object.entries(categorySummary)
            .filter(([_, amount]) => amount > 0)
            .sort(([_, a], [__, b]) => b - a)
            .map(([category, amount]) => {
              const percentage = categoryPercentages[category] || 0;
              const bgColor = CATEGORY_COLORS[category as ExpenseCategory];
              
              return (
                <div key={category}>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{category}</span>
                    <span className="text-sm text-gray-600">
                      {formatAmount(amount)} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full transition-all"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: bgColor
                      }}
                    />
                  </div>
                </div>
              );
            })}
        </div>

        {/* カテゴリ別詳細 */}
        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-800">カテゴリ別詳細</h3>
          <div className="space-y-2">
            {Object.entries(categorySummary)
              .filter(([_, amount]) => amount > 0)
              .sort(([_, a], [__, b]) => b - a)
              .map(([category, amount]) => (
                <div key={category} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-4 h-4 rounded"
                      style={{ backgroundColor: CATEGORY_COLORS[category as ExpenseCategory] }}
                    />
                    <span className="text-gray-700">{category}</span>
                  </div>
                  <span className="font-semibold text-gray-800">{formatAmount(amount)}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
