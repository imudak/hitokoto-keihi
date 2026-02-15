import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import MonthlySummary from './components/MonthlySummary';
import { getAllExpenses } from './utils/storage';
import { Expense } from './types/expense';

type Tab = 'list' | 'summary';

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>('list');

  const loadExpenses = () => {
    setExpenses(getAllExpenses());
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* ヘッダー */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">💰 ひとこと経費記録</h1>
          <p className="text-gray-600">一言で経費を記録、簡単管理</p>
        </header>

        {/* 入力フォーム */}
        <ExpenseForm onExpenseAdded={loadExpenses} />

        {/* 合計表示 */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6 text-center">
          <p className="text-sm text-gray-500 mb-1">全期間の合計</p>
          <p className="text-3xl font-bold text-indigo-600">
            ¥{totalAmount.toLocaleString()}
          </p>
        </div>

        {/* タブ切り替え */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setActiveTab('list')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
              activeTab === 'list'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📝 記録一覧
          </button>
          <button
            onClick={() => setActiveTab('summary')}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition ${
              activeTab === 'summary'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            📊 月次サマリー
          </button>
        </div>

        {/* コンテンツ */}
        {activeTab === 'list' ? (
          <ExpenseList expenses={expenses} onExpenseChanged={loadExpenses} />
        ) : (
          <MonthlySummary expenses={expenses} />
        )}

        {/* フッター */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>データはブラウザに保存されます（サーバー送信なし）</p>
          <p className="mt-1">© 2026 ひとこと経費記録 v0.1.0</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
