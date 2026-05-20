// Arabic helpers — Egyptian dialect formatting

export const GOVERNORATES = [
  'القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'الشرقية',
  'القليوبية', 'كفر الشيخ', 'الغربية', 'المنوفية', 'البحيرة',
  'الإسماعيلية', 'السويس', 'بورسعيد', 'دمياط', 'الفيوم',
  'بني سويف', 'المنيا', 'أسيوط', 'سوهاج', 'قنا',
  'الأقصر', 'أسوان', 'البحر الأحمر', 'الوادي الجديد', 'مطروح',
  'شمال سيناء', 'جنوب سيناء',
];

export const ANIMAL_TYPES = {
  cow: { label: 'أبقار', icon: '🐄', color: '#3B6D11' },
  buffalo: { label: 'جاموس', icon: '🐃', color: '#1D9E75' },
  sheep: { label: 'أغنام', icon: '🐑', color: '#BA7517' },
  goat: { label: 'ماعز', icon: '🐐', color: '#BA7517' },
  poultry: { label: 'دواجن', icon: '🐔', color: '#D85A30' },
  camel: { label: 'إبل', icon: '🐪', color: '#888780' },
  horse: { label: 'خيول', icon: '🐎', color: '#5C4A2A' },
  rabbit: { label: 'أرانب', icon: '🐇', color: '#9C7B6E' },
} as const;

export const EXPENSE_CATEGORIES = {
  feed: { label: 'علف', icon: '🌾' },
  medicine: { label: 'دواء / تطعيم', icon: '💊' },
  labor: { label: 'عمالة', icon: '👷' },
  animal_purchase: { label: 'شراء حيوان', icon: '🐄' },
  electricity: { label: 'كهرباء', icon: '⚡' },
  water: { label: 'مياه', icon: '💧' },
  transport: { label: 'نقل', icon: '🚛' },
  other_expense: { label: 'أخرى', icon: '⋯' },
} as const;

export const INCOME_CATEGORIES = {
  animal_sale: { label: 'بيع حيوان', icon: '🐄' },
  milk_sale: { label: 'بيع ألبان', icon: '🥛' },
  poultry_sale: { label: 'بيع دواجن', icon: '🐔' },
  egg_sale: { label: 'بيع بيض', icon: '🥚' },
  wool_sale: { label: 'صوف / جلود', icon: '🧶' },
  government_support: { label: 'دعم حكومي', icon: '🏛️' },
  other_income: { label: 'أخرى', icon: '⋯' },
} as const;

// Format number as Egyptian Pounds
export function formatEGP(amount: number, showSign = false): string {
  const abs = Math.abs(amount);
  const formatted = abs.toLocaleString('ar-EG', { maximumFractionDigits: 0 });
  if (showSign) {
    return amount >= 0 ? `+${formatted} ج` : `-${formatted} ج`;
  }
  return `${formatted} ج`;
}

// Format large numbers compactly
export function formatCompact(amount: number): string {
  if (Math.abs(amount) >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1)} م`;
  }
  if (Math.abs(amount) >= 1_000) {
    return `${(amount / 1_000).toFixed(1)} ألف`;
  }
  return amount.toLocaleString('ar-EG');
}

// Arabic month names
const MONTHS_AR = [
  'يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

export function formatDateAr(date: Date): string {
  const d = date.getDate();
  const m = MONTHS_AR[date.getMonth()];
  const y = date.getFullYear();
  return `${d} ${m} ${y}`;
}

export function formatMonthYearAr(date: Date): string {
  return `${MONTHS_AR[date.getMonth()]} ${date.getFullYear()}`;
}

// Relative time in Arabic
export function timeAgoAr(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'الآن';
  if (diffMins < 60) return `منذ ${diffMins} د`;
  if (diffHours < 24) return `منذ ${diffHours} س`;
  if (diffDays === 1) return 'أمس';
  if (diffDays < 7) return `منذ ${diffDays} أيام`;
  return formatDateAr(date);
}

// Animal age in Arabic
export function animalAgeAr(birthDate: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - birthDate.getTime();
  const diffDays = Math.floor(diffMs / 86400000);
  const months = Math.floor(diffDays / 30);
  const years = Math.floor(months / 12);
  const remMonths = months % 12;

  if (diffDays < 30) return `${diffDays} يوم`;
  if (months < 12) return `${months} شهر`;
  if (remMonths === 0) return `${years} سنة`;
  return `${years} سنة و${remMonths} شهر`;
}

// Greeting based on time
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'صباح الخير';
  if (hour < 17) return 'مساء الخير';
  return 'مساء النور';
}
