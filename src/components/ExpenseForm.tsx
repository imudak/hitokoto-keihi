import { useState } from 'react';
import { Expense } from '../types/expense';
import { parseExpenseInput } from '../utils/parser';
import { inferCategory } from '../utils/categoryInference';
import { addExpense, generateId } from '../utils/storage';

interface ExpenseFormProps {
  onExpenseAdded: () => void;
}

export default function ExpenseForm({ onExpenseAdded }: ExpenseFormProps) {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const parsed = parseExpenseInput(input);
    if (!parsed) {
      alert('入力形式が正しくありません。例: コンビニ 450円 昼食');
      return;
    }

    const category = inferCategory(parsed.location, parsed.memo);
    const now = new Date().toISOString();

    const expense: Expense = {
      id: generateId(),
      date: now,
      amount: parsed.amount,
      location: parsed.location,
      category,
      memo: parsed.memo,
      createdAt: now,
      updatedAt: now
    };

    addExpense(expense);
    setInput('');
    onExpenseAdded();
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('お使いのブラウザは音声入力に対応していません');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'ja-JP';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      alert('音声認識エラーが発生しました');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">経費を記録</h2>
      
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="例: コンビニ 450円 昼食"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="button"
          onClick={handleVoiceInput}
          className={`px-4 py-2 rounded-lg ${
            isListening 
              ? 'bg-red-500 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          disabled={isListening}
        >
          {isListening ? '🎤 録音中...' : '🎤'}
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition"
      >
        記録する
      </button>

      <p className="mt-2 text-sm text-gray-500">
        形式: 場所 金額 メモ（例: コンビニ 450円 昼食）
      </p>
    </form>
  );
}
