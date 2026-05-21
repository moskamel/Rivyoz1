import React, { useState } from 'react';
import { View, ScrollView, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../components/ui/Text';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { useFarmStore } from '../../stores/farm';
import { useFinanceStore } from '../../stores/finance';
import { Colors, Spacing, Radius } from '../../constants/theme';
import { EXPENSE_CATEGORIES } from '../../constants/arabic';

type CategoryKey = keyof typeof EXPENSE_CATEGORIES;

export default function AddExpenseScreen() {
  const insets = useSafeAreaInsets();
  const { farm } = useFarmStore();
  const { addTransaction } = useFinanceStore();

  const [category, setCategory] = useState<CategoryKey | null>(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const PLACEHOLDERS: Record<string, string> = {
    feed: 'ذرة صفراء 200 كجم',
    medicine: 'فيتامين ب مركب',
    labor: 'أجر العمال',
    electricity: 'فاتورة الكهرباء',
    water: 'فاتورة المياه',
    transport: 'نقل الحيوانات',
    animal_purchase: 'شراء عجل',
  };

  const handleSave = async () => {
    if (!farm || !category || !amount) return;
    setLoading(true);
    try {
      await addTransaction(farm.id, {
        transaction_type: 'expense',
        category,
        amount: parseFloat(amount),
        description: description.trim() || undefined,
      });
      router.back();
    } catch {
      Alert.alert('خطأ', 'حدث خطأ أثناء الحفظ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={{
        paddingTop: insets.top + 12, paddingHorizontal: Spacing.base,
        paddingBottom: 16, backgroundColor: Colors.surface,
        flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between',
        borderBottomWidth: 1, borderBottomColor: Colors.border,
      }}>
        <Text weight="bold" size="lg">إضافة مصروف</Text>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="close" size={24} color={Colors.textPrimary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: Spacing.base, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <Text weight="semiBold" size="sm" color={Colors.textSecondary} style={{ marginBottom: 12 }}>
          اختر التصنيف
        </Text>

        <View style={{ flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
          {(Object.entries(EXPENSE_CATEGORIES) as [CategoryKey, { label: string; icon: string }][]).map(([key, val]) => (
            <Pressable
              key={key}
              onPress={() => { setCategory(key); setDescription(''); }}
              style={({ pressed }) => ({
                flexBasis: '47%', padding: 14, borderRadius: Radius.lg,
                backgroundColor: category === key ? Colors.dangerLight : Colors.surface,
                borderWidth: 2, borderColor: category === key ? Colors.danger : Colors.border,
                alignItems: 'center', gap: 6,
                opacity: pressed ? 0.88 : 1,
              })}
            >
              <Text size="xl">{val.icon}</Text>
              <Text size="sm" weight={category === key ? 'semiBold' : 'regular'}
                color={category === key ? Colors.danger : Colors.textSecondary} align="center">
                {val.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {category && (
          <>
            <Input
              label="المبلغ (جنيه)"
              required
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="0"
            />
            <Input
              label="الوصف"
              value={description}
              onChangeText={setDescription}
              placeholder={PLACEHOLDERS[category] ?? 'وصف المصروف'}
            />
          </>
        )}
      </ScrollView>

      <View style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: Colors.surface, paddingHorizontal: Spacing.base,
        paddingBottom: insets.bottom + 12, paddingTop: 12,
        borderTopWidth: 1, borderTopColor: Colors.border,
      }}>
        <Button
          label="حفظ المصروف"
          onPress={handleSave}
          loading={loading}
          disabled={!category || !amount}
          variant="danger"
        />
      </View>
    </View>
  );
}
