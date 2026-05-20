import React, { useState } from 'react';
import { View, ScrollView, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { useAnimalsStore } from '../../stores/animals';
import { useFinanceStore } from '../../stores/finance';
import { Colors, Spacing } from '../../constants/theme';
import { ANIMAL_TYPES, formatEGP, animalAgeAr, formatDateAr } from '../../constants/arabic';

const TABS = ['صحة', 'مصروفات', 'ملاحظات'];

function InfoRow({ label, value }: { label: string; value: string }) {
  if (!value) return null;
  return (
    <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.divider }}>
      <Text size="sm" color={Colors.textSecondary}>{label}</Text>
      <Text size="sm" weight="medium">{value}</Text>
    </View>
  );
}

export default function AnimalDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { getAnimal, updateStatus } = useAnimalsStore();
  const { transactions } = useFinanceStore();
  const [activeTab, setActiveTab] = useState(0);

  const animal = getAnimal(id);

  if (!animal) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center' }}>
        <Text>الحيوان غير موجود</Text>
      </View>
    );
  }

  const typeInfo = ANIMAL_TYPES[animal.animal_type as keyof typeof ANIMAL_TYPES];
  const animalTxs = transactions.filter((t) => t.animal_id === animal.id);
  const totalCost = animal.purchase_price + animalTxs.filter((t) => t.transaction_type === 'expense').reduce((s, t) => s + t.amount, 0);
  const totalRevenue = animalTxs.filter((t) => t.transaction_type === 'income').reduce((s, t) => s + t.amount, 0);

  const handleStatusChange = (status: 'sold' | 'dead') => {
    if (status === 'sold') {
      Alert.prompt(
        'بيع الحيوان',
        `أدخل سعر البيع (إجمالي التكاليف: ${formatEGP(totalCost)})`,
        [
          { text: 'إلغاء', style: 'cancel' },
          {
            text: 'تأكيد البيع',
            onPress: (price?: string) => {
              const salePrice = parseFloat(price ?? '0') || 0;
              const profit = salePrice - totalCost;
              Alert.alert('', `ربحت ${formatEGP(profit)} من هذا الحيوان 🎉`, [
                { text: 'حفظ', onPress: () => { updateStatus(animal.id, 'sold', salePrice); router.back(); } },
              ]);
            },
          },
        ],
        'plain-text',
        '',
        'numeric'
      );
    } else {
      Alert.alert('تأكيد', 'هل تريد تسجيل نفوق هذا الحيوان؟', [
        { text: 'إلغاء', style: 'cancel' },
        { text: 'تأكيد', style: 'destructive', onPress: () => { updateStatus(animal.id, 'dead'); router.back(); } },
      ]);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      {/* Header */}
      <View style={{
        backgroundColor: typeInfo?.color ?? Colors.primary,
        paddingTop: insets.top + 8,
        paddingHorizontal: Spacing.base,
        paddingBottom: 20,
      }}>
        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="chevron-forward" size={22} color="#fff" />
            </View>
          </Pressable>
          <Text weight="bold" size="lg" color="#fff">بطاقة الحيوان</Text>
          <Pressable hitSlop={12}>
            <Ionicons name="ellipsis-horizontal-circle-outline" size={26} color="#fff" />
          </Pressable>
        </View>

        {/* Animal Identity */}
        <View style={{ alignItems: 'center' }}>
          <View style={{
            width: 80, height: 80, borderRadius: 40,
            backgroundColor: 'rgba(255,255,255,0.2)',
            alignItems: 'center', justifyContent: 'center',
            marginBottom: 10,
          }}>
            <Text style={{ fontSize: 40 }}>{typeInfo?.icon ?? '🐄'}</Text>
          </View>
          <Text weight="extraBold" size="xl" color="#fff">{animal.name ?? animal.tag_number}</Text>
          {animal.name && <Text size="sm" color="rgba(255,255,255,0.8)">{animal.tag_number}</Text>}
          <View style={{ flexDirection: 'row-reverse', gap: 8, marginTop: 8 }}>
            <Badge label={animal.gender === 'female' ? 'أنثى' : 'ذكر'} variant="neutral" />
            <Badge label={typeInfo?.label ?? animal.animal_type} variant="neutral" />
            {animal.current_condition === 'sick' && <Badge label="مريض" variant="danger" />}
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Quick Stats */}
        <View style={{ flexDirection: 'row-reverse', gap: 10, padding: Spacing.base, paddingBottom: 0 }}>
          <Card style={{ flex: 1 }} padding={14}>
            <Text size="xs" color={Colors.textSecondary}>إجمالي التكاليف</Text>
            <Text weight="bold" size="md" color={Colors.expense}>{formatEGP(totalCost)}</Text>
          </Card>
          <Card style={{ flex: 1 }} padding={14}>
            <Text size="xs" color={Colors.textSecondary}>إجمالي الإيرادات</Text>
            <Text weight="bold" size="md" color={Colors.income}>{formatEGP(totalRevenue)}</Text>
          </Card>
        </View>

        {/* Info Card */}
        <Card style={{ margin: Spacing.base, marginBottom: 0 }} padding={16}>
          <Text weight="bold" size="md" style={{ marginBottom: 8 }}>معلومات الحيوان</Text>
          <InfoRow label="الدخول" value={animal.entry_date ? formatDateAr(new Date(animal.entry_date)) : ''} />
          <InfoRow label="العمر" value={animal.birth_date ? animalAgeAr(new Date(animal.birth_date)) : ''} />
          <InfoRow label="السلالة" value={animal.breed ?? ''} />
          <InfoRow label="سعر الشراء" value={animal.purchase_price > 0 ? formatEGP(animal.purchase_price) : ''} />
          <InfoRow label="الحالة" value={animal.current_condition === 'healthy' ? 'سليم' : animal.current_condition === 'sick' ? 'مريض' : animal.current_condition} />
        </Card>

        {/* Tab Bar */}
        <View style={{ flexDirection: 'row-reverse', marginHorizontal: Spacing.base, marginTop: 16, marginBottom: 2, backgroundColor: Colors.surface, borderRadius: 14, padding: 4 }}>
          {TABS.map((tab, i) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(i)}
              style={{
                flex: 1, paddingVertical: 8, borderRadius: 10,
                backgroundColor: activeTab === i ? Colors.primary : 'transparent',
                alignItems: 'center',
              }}
            >
              <Text
                size="sm"
                weight={activeTab === i ? 'semiBold' : 'regular'}
                color={activeTab === i ? '#fff' : Colors.textSecondary}
                align="center"
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Tab Content */}
        <View style={{ margin: Spacing.base }}>
          {activeTab === 0 && (
            <Card padding={16}>
              <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <Text weight="bold">السجل الصحي</Text>
                <Pressable onPress={() => router.push('/health/add-event')}>
                  <Ionicons name="add-circle-outline" size={24} color={Colors.primary} />
                </Pressable>
              </View>
              <Text size="sm" color={Colors.textSecondary} align="center" style={{ paddingVertical: 20 }}>
                لا أحداث صحية مسجلة بعد
              </Text>
            </Card>
          )}

          {activeTab === 1 && (
            <Card padding={16}>
              <Text weight="bold" style={{ marginBottom: 12 }}>المصاريف</Text>
              {animalTxs.length === 0 ? (
                <Text size="sm" color={Colors.textSecondary} align="center" style={{ paddingVertical: 20 }}>
                  لا مصاريف مسجلة على هذا الحيوان
                </Text>
              ) : (
                animalTxs.map((tx) => (
                  <View key={tx.id} style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.divider }}>
                    <Text size="sm">{tx.description ?? tx.category}</Text>
                    <Text size="sm" weight="semiBold" color={tx.transaction_type === 'expense' ? Colors.expense : Colors.income}>
                      {tx.transaction_type === 'expense' ? '-' : '+'}{formatEGP(tx.amount)}
                    </Text>
                  </View>
                ))
              )}
            </Card>
          )}

          {activeTab === 2 && (
            <Card padding={16}>
              <Text weight="bold" style={{ marginBottom: 12 }}>ملاحظات</Text>
              <Text size="sm" color={animal.notes ? Colors.textPrimary : Colors.textTertiary}>
                {animal.notes ?? 'لا ملاحظات مضافة بعد'}
              </Text>
            </Card>
          )}
        </View>

        {/* Action Buttons */}
        <View style={{ marginHorizontal: Spacing.base, gap: 10 }}>
          <Button
            label="تسجيل بيع"
            variant="primary"
            onPress={() => handleStatusChange('sold')}
          />
          <Button
            label="تسجيل نفوق"
            variant="danger"
            onPress={() => handleStatusChange('dead')}
          />
        </View>
      </ScrollView>
    </View>
  );
}
