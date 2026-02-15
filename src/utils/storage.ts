import { Expense } from '../types/expense';

const STORAGE_KEY = 'hitokoto-keihi-expenses';

/**
 * 全経費記録を取得
 */
export function getAllExpenses(): Expense[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

/**
 * 経費記録を保存
 */
export function saveExpenses(expenses: Expense[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

/**
 * 経費記録を追加
 */
export function addExpense(expense: Expense): void {
  const expenses = getAllExpenses();
  expenses.push(expense);
  saveExpenses(expenses);
}

/**
 * 経費記録を更新
 */
export function updateExpense(id: string, updated: Partial<Expense>): void {
  const expenses = getAllExpenses();
  const index = expenses.findIndex(e => e.id === id);
  if (index === -1) return;
  
  expenses[index] = {
    ...expenses[index],
    ...updated,
    updatedAt: new Date().toISOString()
  };
  saveExpenses(expenses);
}

/**
 * 経費記録を削除
 */
export function deleteExpense(id: string): void {
  const expenses = getAllExpenses();
  const filtered = expenses.filter(e => e.id !== id);
  saveExpenses(filtered);
}

/**
 * UUID v4 生成
 */
export function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
