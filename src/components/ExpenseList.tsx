import { useState } from 'react';
import { Expense, ExpenseCategory } from '../types/expense';
import { deleteExpense, updateExpense } from '../utils/storage';

interface ExpenseListProps {
  expenses: Expense[];
  onExpenseChanged: () => void;
}

const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  '食費': 'bg-green-100 text-green-800',
  '交通費': 'bg-blue-100 text-blue-800',
  '事務用品費': 'bg-purple-100 text-purple-800',
  '通信費': 'bg-yellow-100 text-yellow-800',
  '研修費': 'bg-pink-100 text-pink-800',
  'その他': 'bg-gray-100 text-gray-800'
};

export default function ExpenseList({ expenses, onExpenseChanged }: ExpenseListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Expense>>({});

  const sortedExpenses = [...expenses].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleDelete = (id: string) => {
    if (confirm('本当に削除しますか？')) {
      deleteExpense(id);
      onExpenseChanged();
    }
  };

  const handleEdit = (expense: Expense) => {
    setEditingId(expense.id);
    setEditForm(expense);
  };

  const handleSaveEdit = () => {
    if (editingId) {
      updateExpense(editingId, editForm);
      setEditingId(null);
      setEditForm({});
      onExpenseChanged();
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatAmount = (amount: number) => {
    return `¥${amount.toLocaleString()}`;
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-500">
        まだ経費が記録されていません
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold p-6 border-b text-gray-800">記録一覧</h2>
      
      <div className="divide-y">
        {sortedExpenses.map((expense) => (
          <div key={expense.id} className="p-4 hover:bg-gray-50">
            {editingId === expense.id ? (
              <div className="space-y-2">
                <input
                  type="number"
                  value={editForm.amount || ''}
                  onChange={(e) => setEditForm({ ...editForm, amount: parseInt(e.target.value) })}
                  className="w-full px-3 py-1 border rounded"
                  placeholder="金額"
                />
                <input
                  type="text"
                  value={editForm.location || ''}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                  className="w-full px-3 py-1 border rounded"
                  placeholder="場所"
                />
                <input
                  type="text"
                  value={editForm.memo || ''}
                  onChange={(e) => setEditForm({ ...editForm, memo: e.target.value })}
                  className="w-full px-3 py-1 border rounded"
                  placeholder="メモ"
                />
                <select
                  value={editForm.category || ''}
                  onChange={(e) => setEditForm({ ...editForm, category: e.target.value as ExpenseCategory })}
                  className="w-full px-3 py-1 border rounded"
                >
                  <option value="食費">食費</option>
                  <option value="交通費">交通費</option>
                  <option value="事務用品費">事務用品費</option>
                  <option value="通信費">通信費</option>
                  <option value="研修費">研修費</option>
                  <option value="その他">その他</option>
                </select>
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveEdit}
                    className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    保存
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                  >
                    キャンセル
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-gray-500">{formatDate(expense.date)}</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${CATEGORY_COLORS[expense.category]}`}>
                      {expense.category}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-gray-800">{formatAmount(expense.amount)}</div>
                  <div className="text-sm text-gray-600">
                    {expense.location}
                    {expense.memo && ` - ${expense.memo}`}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(expense)}
                    className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => handleDelete(expense.id)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
                  >
                    削除
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
