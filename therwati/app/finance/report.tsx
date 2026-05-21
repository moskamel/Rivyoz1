import React, { useState } from 'react';
import { View, ScrollView, Pressable, Platform, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useFarmStore } from '../../stores/farm';
import { useFinanceStore } from '../../stores/finance';
import { Colors, Spacing, Radius } from '../../constants/theme';
import { formatEGP, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../constants/arabic';

const MONTHS_AR = [
  'يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

function CategoryBar({
  label, icon, amount, total, color,
}: {
  label: string; icon: string; amount: number; total: number; color: string;
}) {
  const pct = total > 0 ? Math.min((amount / total) * 100, 100) : 0;
  return (
    <View style={{ marginBottom: 14 }}>
      <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 5 }}>
        <Text size="sm">{icon}  {label}</Text>
        <Text size="sm" weight="semiBold" color={color}>{formatEGP(amount)}</Text>
      </View>
      <View style={{ height: 6, backgroundColor: Colors.background, borderRadius: 3, overflow: 'hidden' }}>
        <View style={{ height: 6, width: `${pct}%` as any, backgroundColor: color, borderRadius: 3 }} />
      </View>
      <Text size="xs" color={Colors.textTertiary} style={{ marginTop: 3 }}>
        {Math.round(pct)}٪ من الإجمالي
      </Text>
    </View>
  );
}

export default function MonthlyReportScreen() {
  const insets = useSafeAreaInsets();
  const { farm } = useFarmStore();
  const { transactions } = useFinanceStore();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [exporting, setExporting] = useState(false);

  const changeMonth = (delta: number) => {
    const d = new Date(selectedDate);
    d.setMonth(d.getMonth() + delta);
    setSelectedDate(d);
  };

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;
  const monthLabel = `${MONTHS_AR[selectedDate.getMonth()]} ${year}`;

  const monthTxs = transactions.filter((t) => {
    const d = new Date(t.transaction_date);
    return d.getFullYear() === year && d.getMonth() + 1 === month;
  });

  const income = monthTxs.filter((t) => t.transaction_type === 'income').reduce((s, t) => s + t.amount, 0);
  const expenses = monthTxs.filter((t) => t.transaction_type === 'expense').reduce((s, t) => s + t.amount, 0);
  const profit = income - expenses;

  // Build category breakdowns
  const incomeByCategory = Object.entries(INCOME_CATEGORIES)
    .map(([key, val]) => ({
      key,
      label: val.label,
      icon: val.icon,
      amount: monthTxs.filter((t) => t.transaction_type === 'income' && t.category === key).reduce((s, t) => s + t.amount, 0),
    }))
    .filter((c) => c.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  const expenseByCategory = Object.entries(EXPENSE_CATEGORIES)
    .map(([key, val]) => ({
      key,
      label: val.label,
      icon: val.icon,
      amount: monthTxs.filter((t) => t.transaction_type === 'expense' && t.category === key).reduce((s, t) => s + t.amount, 0),
    }))
    .filter((c) => c.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  const exportPDF = async () => {
    setExporting(true);
    try {
      const html = `
        <html dir="rtl">
        <head>
          <meta charset="UTF-8">
          <style>
            body { font-family: Arial, sans-serif; direction: rtl; padding: 32px; color: #1A2E1B; }
            h1 { color: #1B5E20; font-size: 28px; margin-bottom: 4px; }
            h2 { color: #5C7A5E; font-size: 16px; font-weight: normal; margin-bottom: 24px; }
            h3 { color: #1B5E20; font-size: 18px; margin: 20px 0 10px; border-bottom: 2px solid #E8F5E9; padding-bottom: 6px; }
            .summary { display: flex; gap: 16px; margin-bottom: 24px; }
            .box { flex: 1; padding: 16px; border-radius: 12px; text-align: center; }
            .income-box { background: #E8F5E9; }
            .expense-box { background: #FFEBEE; }
            .profit-box { background: ${profit >= 0 ? '#E8F5E9' : '#FFEBEE'}; }
            .amount { font-size: 22px; font-weight: bold; }
            .income { color: #1B5E20; }
            .expense { color: #C62828; }
            .label { font-size: 13px; color: #5C7A5E; margin-bottom: 4px; }
            .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #F0F4F1; }
            .footer { margin-top: 32px; font-size: 12px; color: #8FA890; text-align: center; }
          </style>
        </head>
        <body>
          <h1>ثروتي — التقرير الشهري</h1>
          <h2>${farm?.name ?? 'مزرعتي'} · ${monthLabel}</h2>
          <div class="summary">
            <div class="box income-box">
              <div class="label">الإيرادات</div>
              <div class="amount income">${formatEGP(income)}</div>
            </div>
            <div class="box expense-box">
              <div class="label">المصاريف</div>
              <div class="amount expense">${formatEGP(expenses)}</div>
            </div>
            <div class="box profit-box">
              <div class="label">صافي الربح</div>
              <div class="amount ${profit >= 0 ? 'income' : 'expense'}">${formatEGP(profit)}</div>
            </div>
          </div>
          ${incomeByCategory.length > 0 ? `
            <h3>تفاصيل الإيرادات</h3>
            ${incomeByCategory.map((c) => `
              <div class="row">
                <span>${c.icon} ${c.label}</span>
                <span class="income" style="font-weight:bold">${formatEGP(c.amount)}</span>
              </div>
            `).join('')}
          ` : ''}
          ${expenseByCategory.length > 0 ? `
            <h3>تفاصيل المصاريف</h3>
            ${expenseByCategory.map((c) => `
              <div class="row">
                <span>${c.icon} ${c.label}</span>
                <span class="expense" style="font-weight:bold">${formatEGP(c.amount)}</span>
              </div>
            `).join('')}
          ` : ''}
          <div class="footer">تم الإنشاء بواسطة تطبيق ثروتي · ${new Date().toLocaleDateString('ar-EG')}</div>
        </body>
        </html>
      `;

      if (Platform.OS === 'web') {
        const win = window.open('', '_blank');
        if (win) {
          win.document.write(html);
          win.document.close();
          win.print();
        }
        return;
      }

      const Print = await import('expo-print');
      const Sharing = await import('expo-sharing');
      const { uri } = await Print.printToFileAsync({ html });
      const canShare = await Sharing.isAvailableAsync();
      if (canShare) {
        await Sharing.shareAsync(uri, {
          mimeType: 'application/pdf',
          dialogTitle: `تقرير ${monthLabel}`,
        });
      } else {
        Alert.alert('تم', `تم حفظ التقرير في: ${uri}`);
      }
    } catch (e) {
      Alert.alert('خطأ', 'تعذّر إنشاء ملف PDF');
    } finally {
      setExporting(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      {/* Header */}
      <View style={{
        paddingTop: insets.top + 12,
        paddingHorizontal: Spacing.base,
        paddingBottom: 16,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Text weight="bold" size="xl">التقرير الشهري</Text>
        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 12 }}>
          <Pressable onPress={exportPDF} hitSlop={8}>
            <Ionicons name="share-outline" size={24} color={Colors.primary} />
          </Pressable>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="close" size={24} color={Colors.textPrimary} />
          </Pressable>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: Spacing.base, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Month selector */}
        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', gap: 20, marginBottom: 20 }}>
          <Pressable onPress={() => changeMonth(1)} hitSlop={12}>
            <Ionicons name="chevron-back" size={22} color={Colors.primary} />
          </Pressable>
          <Text weight="bold" size="lg">{monthLabel}</Text>
          <Pressable onPress={() => changeMonth(-1)} hitSlop={12}>
            <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
          </Pressable>
        </View>

        {/* Profit card */}
        <View style={{
          backgroundColor: Colors.primary,
          borderRadius: Radius.xl,
          padding: 20,
          marginBottom: 16,
        }}>
          <Text size="sm" color="rgba(255,255,255,0.8)" align="center" style={{ marginBottom: 8 }}>
            صافي الربح — {monthLabel}
          </Text>
          <Text weight="extraBold" size="xxl" color="#fff" align="center">
            {formatEGP(profit)}
          </Text>
          <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-around', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.2)' }}>
            <View style={{ alignItems: 'center' }}>
              <Text size="xs" color="rgba(255,255,255,0.7)">الإيرادات</Text>
              <Text weight="semiBold" size="md" color="#fff">{formatEGP(income)}</Text>
            </View>
            <View style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.2)' }} />
            <View style={{ alignItems: 'center' }}>
              <Text size="xs" color="rgba(255,255,255,0.7)">المصاريف</Text>
              <Text weight="semiBold" size="md" color="#fff">{formatEGP(expenses)}</Text>
            </View>
          </View>
        </View>

        {/* Income breakdown */}
        {incomeByCategory.length > 0 && (
          <Card padding={16} style={{ marginBottom: 16 }}>
            <Text weight="bold" size="md" color={Colors.income} style={{ marginBottom: 16 }}>
              📈 تفاصيل الإيرادات
            </Text>
            {incomeByCategory.map((c) => (
              <CategoryBar
                key={c.key}
                label={c.label}
                icon={c.icon}
                amount={c.amount}
                total={income}
                color={Colors.income}
              />
            ))}
          </Card>
        )}

        {/* Expense breakdown */}
        {expenseByCategory.length > 0 && (
          <Card padding={16} style={{ marginBottom: 16 }}>
            <Text weight="bold" size="md" color={Colors.expense} style={{ marginBottom: 16 }}>
              📉 تفاصيل المصاريف
            </Text>
            {expenseByCategory.map((c) => (
              <CategoryBar
                key={c.key}
                label={c.label}
                icon={c.icon}
                amount={c.amount}
                total={expenses}
                color={Colors.expense}
              />
            ))}
          </Card>
        )}

        {monthTxs.length === 0 && (
          <Card padding={20}>
            <View style={{ alignItems: 'center', gap: 8 }}>
              <Text style={{ fontSize: 36 }}>📊</Text>
              <Text weight="semiBold" align="center">لا بيانات لهذا الشهر</Text>
              <Text size="sm" color={Colors.textSecondary} align="center">
                ابدأ بتسجيل الإيرادات والمصاريف لرؤية التقرير
              </Text>
            </View>
          </Card>
        )}

        <Button
          label={exporting ? 'جاري التصدير...' : 'تصدير PDF 📄'}
          onPress={exportPDF}
          loading={exporting}
          style={{ marginTop: 8 }}
        />
      </ScrollView>
    </View>
  );
}
