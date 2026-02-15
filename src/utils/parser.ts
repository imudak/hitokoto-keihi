export interface ParsedInput {
  location: string;
  amount: number;
  memo: string;
}

/**
 * 一言入力をパース
 * 例: "コンビニ 450円 昼食" → { location: "コンビニ", amount: 450, memo: "昼食" }
 */
export function parseExpenseInput(input: string): ParsedInput | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  // 金額を抽出（数字 + 「円」オプション）
  const amountMatch = trimmed.match(/(\d+)円?/);
  if (!amountMatch) return null;

  const amount = parseInt(amountMatch[1], 10);
  const amountText = amountMatch[0];

  // 金額部分を除去
  const withoutAmount = trimmed.replace(amountText, '').trim();

  // 残りを空白で分割
  const parts = withoutAmount.split(/\s+/).filter(p => p.length > 0);

  if (parts.length === 0) {
    return { location: '不明', amount, memo: '' };
  } else if (parts.length === 1) {
    return { location: parts[0], amount, memo: '' };
  } else {
    // 最初の部分を場所、残りをメモとする
    return {
      location: parts[0],
      amount,
      memo: parts.slice(1).join(' ')
    };
  }
}
