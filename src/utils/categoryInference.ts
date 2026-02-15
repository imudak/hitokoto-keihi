import { ExpenseCategory } from '../types/expense';

const CATEGORY_KEYWORDS: Record<ExpenseCategory, string[]> = {
  '食費': ['コンビニ', 'スーパー', 'カフェ', '昼食', '夕食', 'ランチ', 'ディナー', '朝食', 'セブン', 'ローソン', 'ファミマ', 'レストラン', '居酒屋'],
  '交通費': ['電車', 'バス', 'タクシー', 'ガソリン', '駐車場', 'Suica', 'ICOCA', 'Uber', '高速'],
  '事務用品費': ['Amazon', 'ヨドバシ', 'マウス', 'キーボード', '文房具', 'ペン', 'ノート', 'プリンタ', 'インク'],
  '通信費': ['携帯', 'スマホ', 'WiFi', 'インターネット', 'サーバー', 'ドメイン', 'クラウド', 'AWS', 'GCP'],
  '研修費': ['書籍', 'Kindle', 'Udemy', 'セミナー', '勉強会', 'カンファレンス', '技術書'],
  'その他': []
};

/**
 * 場所とメモからカテゴリを推定
 */
export function inferCategory(location: string, memo: string): ExpenseCategory {
  const text = `${location} ${memo}`.toLowerCase();

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (category === 'その他') continue;
    
    for (const keyword of keywords) {
      if (text.includes(keyword.toLowerCase())) {
        return category as ExpenseCategory;
      }
    }
  }

  return 'その他';
}
