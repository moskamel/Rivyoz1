import React, { useState } from 'react';
import { View, ScrollView, Pressable, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../components/ui/Text';
import { EmptyState } from '../../components/ui/EmptyState';
import { useFinanceStore } from '../../stores/finance';
import { Colors, Spacing, Radius, Typography } from '../../constants/theme';
import { formatEGP, formatDateAr, EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../constants/arabic';

const TYPE_FILTERS = [
  { key: 'all', label: 'الكل' },
  { key: 'expense', label: 'مصاريف' },
  { key: 'income', label: 'إيرادات' },
];

const MONTHS_AR = [
  'يناير', 'فبراير', 'مارس', 'إبريل', 'مايو', 'يونيو',
  'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر',
];

function getCategoryInfo(type: 'income' | 'expense', category: string) {
  const cats = type === 'expense' ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
  return (cats as any)[category] ?? { label: category, icon: '⋯' };
}

export default function TransactionsScreen() {
  const insets = useSafeAreaInsets();
  const { transactions, deleteTransaction } = useFinanceStore();
  const [typeFilter, setTypeFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const changeMonth = (delta: number) => {
    const d = new Date(selectedDate);
    d.setMonth(d.getMonth() + delta);
    setSelectedDate(d);
  };

  const monthLabel = `${MONTHS_AR[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`;

  const filtered = transactions.filter((t) => {
    const d = new Date(t.transaction_date);
    if (d.getFullYear() !== selectedDate.getFullYear()) return false;
    if (d.getMonth() !== selectedDate.getMonth()) return false;
    if (typeFilter !== 'all' && t.transaction_type !== typeFilter) return false;
    if (search) {
      const q = search.toLowerCase();
      return (
        (t.description ?? '').toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalIncome = filtered.filter((t) => t.transaction_type === 'income').reduce((s, t) => s + t.amount, 0);
  const totalExpense = filtered.filter((t) => t.transaction_type === 'expense').reduce((s, t) => s + t.amount, 0);

  const confirmDelete = (id: string) => {
    Alert.alert('حذف المعاملة', 'هل تريد حذف هذه المعاملة؟', [
      { text: 'إلغاء', style: 'cancel' },
      { text: 'حذف', style: 'destructive', onPress: () => deleteTransaction(id) },
    ]);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      {/* Header */}
      <View style={{
        paddingTop: insets.top + 12,
        paddingHorizontal: Spacing.base,
        paddingBottom: 12,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
      }}>
        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Text weight="bold" size="xl">المعاملات</Text>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="close" size={24} color={Colors.textPrimary} />
          </Pressable>
        </View>

        {/* Month navigator */}
        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 12 }}>
          <Pressable onPress={() => changeMonth(1)} hitSlop={12}>
            <Ionicons name="chevron-back" size={22} color={Colors.primary} />
          </Pressable>
          <Text weight="semiBold" size="md">{monthLabel}</Text>
          <Pressable onPress={() => changeMonth(-1)} hitSlop={12}>
            <Ionicons name="chevron-forward" size={22} color={Colors.primary} />
          </Pressable>
        </View>

        {/* Summary */}
        <View style={{ flexDirection: 'row-reverse', gap: 10, marginBottom: 12 }}>
          <View style={{ flex: 1, backgroundColor: Colors.infoLight, borderRadius: Radius.md, padding: 10, alignItems: 'center' }}>
            <Text size="xs" color={Colors.textSecondary}>إيرادات</Text>
            <Text weight="bold" size="sm" color={Colors.income}>{formatEGP(totalIncome)}</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: Colors.dangerLight, borderRadius: Radius.md, padding: 10, alignItems: 'center' }}>
            <Text size="xs" color={Colors.textSecondary}>مصاريف</Text>
            <Text weight="bold" size="sm" color={Colors.expense}>{formatEGP(totalExpense)}</Text>
          </View>
          <View style={{ flex: 1, backgroundColor: Colors.background, borderRadius: Radius.md, padding: 10, alignItems: 'center' }}>
            <Text size="xs" color={Colors.textSecondary}>صافي</Text>
            <Text weight="bold" size="sm" color={totalIncome - totalExpense >= 0 ? Colors.income : Colors.expense}>
              {formatEGP(totalIncome - totalExpense)}
            </Text>
          </View>
        </View>

        {/* Search */}
        <View style={{
          flexDirection: 'row-reverse',
          alignItems: 'center',
          backgroundColor: Colors.background,
          borderRadius: Radius.lg,
          paddingHorizontal: 12,
          marginBottom: 10,
          borderWidth: 1,
          borderColor: Colors.border,
        }}>
          <Ionicons name="search" size={18} color={Colors.textTertiary} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="ابحث بالوصف أو الفئة"
            placeholderTextColor={Colors.textPlaceholder}
            textAlign="right"
            style={{
              flex: 1,
              paddingVertical: 10,
              paddingHorizontal: 8,
              fontFamily: Typography.fontFamily.regular,
              fontSize: Typography.size.sm,
              color: Colors.textPrimary,
            }}
          />
          {search.length > 0 && (
            <Pressable onPress={() => setSearch('')} hitSlop={8}>
              <Ionicons name="close-circle" size={18} color={Colors.textTertiary} />
            </Pressable>
          )}
        </View>

        {/* Type filter chips */}
        <View style={{ flexDirection: 'row-reverse', gap: 8 }}>
          {TYPE_FILTERS.map((chip) => (
            <Pressable
              key={chip.key}
              onPress={() => setTypeFilter(chip.key as any)}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 6,
                borderRadius: Radius.full,
                backgroundColor: typeFilter === chip.key ? Colors.primary : Colors.surface,
                borderWidth: 1,
                borderColor: typeFilter === chip.key ? Colors.primary : Colors.border,
              }}
            >
              <Text
                size="sm"
                weight={typeFilter === chip.key ? 'semiBold' : 'regular'}
                color={typeFilter === chip.key ? '#fff' : Colors.textSecondary}
              >
                {chip.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: Spacing.base, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {filtered.length === 0 ? (
          <EmptyState
            icon="💰"
            title="لا معاملات"
            message="لم يتم تسجيل أي معاملات في هذا الشهر"
            actionLabel="إضافة مصروف"
            onAction={() => router.push('/finance/add-expense')}
          />
        ) : (
          filtered.map((tx) => {
            const cat = getCategoryInfo(tx.transaction_type, tx.category);
            const isIncome = tx.transaction_type === 'income';
            return (
              <Pressable
                key={tx.id}
                onLongPress={() => confirmDelete(tx.id)}
                style={({ pressed }) => ({
                  backgroundColor: Colors.surface,
                  borderRadius: Radius.lg,
                  marginBottom: 8,
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                  padding: 14,
                  gap: 12,
                  opacity: pressed ? 0.88 : 1,
                  shadowColor: '#1A2E1B',
                  shadowOpacity: 0.05,
                  shadowRadius: 3,
                  elevation: 1,
                })}
              >
                {/* Icon */}
                <View style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: isIncome ? Colors.infoLight : Colors.dangerLight,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Text style={{ fontSize: 18 }}>{cat.icon}</Text>
                </View>

                {/* Info */}
                <View style={{ flex: 1 }}>
                  <Text weight="semiBold" size="sm">{cat.label}</Text>
                  {tx.description && (
                    <Text size="xs" color={Colors.textSecondary} style={{ marginTop: 1 }}>
                      {tx.description}
                    </Text>
                  )}
                  <Text size="xs" color={Colors.textTertiary} style={{ marginTop: 2 }}>
                    {formatDateAr(new Date(tx.transaction_date))}
                  </Text>
                </View>

                {/* Amount */}
                <Text weight="bold" size="md" color={isIncome ? Colors.income : Colors.expense}>
                  {isIncome ? '+' : '-'}{formatEGP(tx.amount)}
                </Text>
              </Pressable>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}
