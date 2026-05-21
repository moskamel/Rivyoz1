import React, { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { useFarmStore } from '../../stores/farm';
import { useFinanceStore } from '../../stores/finance';
import { Colors, Spacing } from '../../constants/theme';
import { formatEGP, formatDateAr, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../constants/arabic';

const MONTHS_AR = ['يناير','فبراير','مارس','إبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

function ExpenseBar({ label, amount, total }: { label: string; amount: number; total: number }) {
  const pct = total > 0 ? (amount / total) * 100 : 0;
  return (
    <View style={{ marginBottom: 12 }}>
      <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginBottom: 4 }}>
        <Text size="sm" weight="medium">{label}</Text>
        <Text size="sm" color={Colors.textSecondary}>{formatEGP(amount)} • {pct.toFixed(0)}%</Text>
      </View>
      <View style={{ height: 8, backgroundColor: Colors.divider, borderRadius: 4, overflow: 'hidden' }}>
        <View style={{ height: '100%', width: `${pct}%`, backgroundColor: Colors.primary, borderRadius: 4 }} />
      </View>
    </View>
  );
}

function TransactionRow({ tx }: { tx: any }) {
  const isIncome = tx.transaction_type === 'income';
  const cats = { ...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES } as Record<string, { label: string; icon: string }>;
  const cat = cats[tx.category] ?? { label: tx.category, icon: '📋' };

  return (
    <View style={{
      flexDirection: 'row-reverse', alignItems: 'center', gap: 12,
      paddingVertical: 12,
      borderBottomWidth: 1, borderBottomColor: Colors.divider,
    }}>
      <View style={{
        width: 40, height: 40, borderRadius: 20,
        backgroundColor: isIncome ? Colors.infoLight : Colors.dangerLight,
        alignItems: 'center', justifyContent: 'center',
      }}>
        <Text size="lg">{cat.icon}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text weight="medium" size="sm">{tx.description ?? cat.label}</Text>
        <Text size="xs" color={Colors.textSecondary}>{formatDateAr(new Date(tx.transaction_date))}</Text>
      </View>
      <Text
        weight="bold"
        size="md"
        color={isIncome ? Colors.income : Colors.expense}
      >
        {isIncome ? '+' : '-'}{formatEGP(tx.amount)}
      </Text>
    </View>
  );
}

export default function FinanceScreen() {
  const insets = useSafeAreaInsets();
  const { farm } = useFarmStore();
  const { transactions, getMonthStats, getRecentTransactions } = useFinanceStore();
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear] = useState(new Date().getFullYear());

  const stats = getMonthStats(selectedYear, selectedMonth + 1);
  const recent = getRecentTransactions(15);

  const expenseByCategory = transactions
    .filter((t) => {
      const d = new Date(t.transaction_date);
      return t.transaction_type === 'expense' &&
        d.getFullYear() === selectedYear &&
        d.getMonth() === selectedMonth;
    })
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] ?? 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.background }}
      contentContainerStyle={{ paddingBottom: 100 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={{
        paddingTop: insets.top + 12,
        paddingHorizontal: Spacing.base,
        paddingBottom: 16,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
      }}>
        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Text weight="bold" size="xl">المالية</Text>
          <View style={{ flexDirection: 'row-reverse', gap: 8, alignItems: 'center' }}>
            <Pressable onPress={() => setSelectedMonth((m) => Math.max(0, m - 1))}>
              <Ionicons name="chevron-forward" size={22} color={Colors.textSecondary} />
            </Pressable>
            <Text weight="semiBold" size="base">{MONTHS_AR[selectedMonth]} {selectedYear}</Text>
            <Pressable onPress={() => setSelectedMonth((m) => Math.min(11, m + 1))}>
              <Ionicons name="chevron-back" size={22} color={Colors.textSecondary} />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={{ padding: Spacing.base, gap: 16 }}>
        {/* Profit Card */}
        <View style={{
          borderRadius: 24,
          backgroundColor: stats.profit >= 0 ? Colors.primary : Colors.danger,
          padding: 20,
        }}>
          <Text size="sm" color="rgba(255,255,255,0.8)">صافي الربح — {MONTHS_AR[selectedMonth]}</Text>
          <Text size="xxxl" color="#fff" weight="extraBold" style={{ marginVertical: 8 }}>
            {formatEGP(Math.abs(stats.profit))}
          </Text>
          <View style={{ flexDirection: 'row-reverse', gap: 16 }}>
            <View style={{ flex: 1 }}>
              <Text size="xs" color="rgba(255,255,255,0.7)">الإيرادات</Text>
              <Text size="md" color="#fff" weight="semiBold">{formatEGP(stats.income)}</Text>
            </View>
            <View style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.25)' }} />
            <View style={{ flex: 1 }}>
              <Text size="xs" color="rgba(255,255,255,0.7)">المصاريف</Text>
              <Text size="md" color="#fff" weight="semiBold">{formatEGP(stats.expenses)}</Text>
            </View>
          </View>
        </View>

        {/* Quick nav */}
        <View style={{ flexDirection: 'row-reverse', gap: 10, marginBottom: -6 }}>
          <Pressable
            onPress={() => router.push('/finance/report')}
            style={({ pressed }) => ({
              flex: 1, backgroundColor: Colors.surface, borderRadius: 14, padding: 12,
              flexDirection: 'row-reverse', alignItems: 'center', gap: 8,
              opacity: pressed ? 0.88 : 1, borderWidth: 1, borderColor: Colors.border,
            })}
          >
            <Ionicons name="bar-chart-outline" size={18} color={Colors.primary} />
            <Text size="sm" weight="semiBold" color={Colors.primary}>التقرير الشهري</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/finance/transactions')}
            style={({ pressed }) => ({
              flex: 1, backgroundColor: Colors.surface, borderRadius: 14, padding: 12,
              flexDirection: 'row-reverse', alignItems: 'center', gap: 8,
              opacity: pressed ? 0.88 : 1, borderWidth: 1, borderColor: Colors.border,
            })}
          >
            <Ionicons name="list-outline" size={18} color={Colors.primary} />
            <Text size="sm" weight="semiBold" color={Colors.primary}>كل المعاملات</Text>
          </Pressable>
        </View>

        {/* Add buttons */}
        <View style={{ flexDirection: 'row-reverse', gap: 10 }}>
          <Pressable
            onPress={() => router.push('/finance/add-expense')}
            style={({ pressed }) => ({
              flex: 1, backgroundColor: Colors.dangerLight,
              borderRadius: 16, padding: 16,
              alignItems: 'center', flexDirection: 'row-reverse',
              gap: 8, opacity: pressed ? 0.88 : 1,
            })}
          >
            <Ionicons name="remove-circle-outline" size={22} color={Colors.danger} />
            <Text weight="semiBold" color={Colors.danger}>إضافة مصروف</Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/finance/add-income')}
            style={({ pressed }) => ({
              flex: 1, backgroundColor: Colors.infoLight,
              borderRadius: 16, padding: 16,
              alignItems: 'center', flexDirection: 'row-reverse',
              gap: 8, opacity: pressed ? 0.88 : 1,
            })}
          >
            <Ionicons name="add-circle-outline" size={22} color={Colors.primary} />
            <Text weight="semiBold" color={Colors.primary}>إضافة إيراد</Text>
          </Pressable>
        </View>

        {/* Expense Breakdown */}
        {Object.keys(expenseByCategory).length > 0 && (
          <Card>
            <Text weight="bold" size="md" style={{ marginBottom: 16 }}>توزيع المصاريف</Text>
            {Object.entries(expenseByCategory)
              .sort(([, a], [, b]) => b - a)
              .map(([cat, amount]) => {
                const cats = EXPENSE_CATEGORIES as Record<string, { label: string; icon: string }>;
                return (
                  <ExpenseBar
                    key={cat}
                    label={(cats[cat]?.label ?? cat)}
                    amount={amount}
                    total={stats.expenses}
                  />
                );
              })}
          </Card>
        )}

        {/* Recent Transactions */}
        <Card>
          <Text weight="bold" size="md" style={{ marginBottom: 4 }}>آخر المعاملات</Text>
          {recent.length === 0 ? (
            <EmptyState
              icon="💰"
              title="لا معاملات بعد"
              message="ابدأ بتسجيل مصاريف أو إيرادات"
            />
          ) : (
            recent.map((tx) => <TransactionRow key={tx.id} tx={tx} />)
          )}
        </Card>
      </View>
    </ScrollView>
  );
}
