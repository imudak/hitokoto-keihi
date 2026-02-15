export type ExpenseCategory = 
  | '食費'
  | '交通費'
  | '事務用品費'
  | '通信費'
  | '研修費'
  | 'その他';

export interface Expense {
  id: string;
  date: string; // ISO 8601形式
  amount: number;
  location: string;
  category: ExpenseCategory;
  memo: string;
  createdAt: string;
  updatedAt: string;
}
