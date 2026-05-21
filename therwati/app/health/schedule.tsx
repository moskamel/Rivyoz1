import React, { useEffect } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { EmptyState } from '../../components/ui/EmptyState';
import { useFarmStore } from '../../stores/farm';
import { useHealthStore } from '../../stores/health';
import { Colors, Spacing, Radius } from '../../constants/theme';
import { formatDateAr } from '../../constants/arabic';

const VACCINE_TEMPLATES = [
  { name: 'حمى قلاعية', animal: 'أبقار / جاموس', interval: 'كل 6 أشهر' },
  { name: 'طاعون الأبقار', animal: 'أبقار / جاموس', interval: 'سنوي' },
  { name: 'طاعون العجول (PPR)', animal: 'أغنام / ماعز', interval: 'سنوي' },
  { name: 'جدري الأغنام', animal: 'أغنام', interval: 'سنوي' },
  { name: 'نيوكاسل', animal: 'دواجن', interval: 'كل 3 أشهر' },
  { name: 'غامبورو', animal: 'دواجن', interval: 'كل 3 أشهر' },
];

function daysUntil(dateStr: string): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - now.getTime()) / 86400000);
}

function urgencyColor(days: number): string {
  if (days < 0) return Colors.danger;
  if (days <= 7) return '#E65100';
  return Colors.primary;
}

function urgencyLabel(days: number): string {
  if (days < 0) return `متأخر ${Math.abs(days)} يوم`;
  if (days === 0) return 'اليوم';
  if (days === 1) return 'غداً';
  return `بعد ${days} يوم`;
}

export default function VaccineScheduleScreen() {
  const insets = useSafeAreaInsets();
  const { farm } = useFarmStore();
  const { events, load, getUpcoming } = useHealthStore();

  useEffect(() => {
    if (farm) load(farm.id);
  }, [farm]);

  const upcoming = getUpcoming(60);

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
        <Text weight="bold" size="xl">جدول التطعيمات</Text>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="close" size={24} color={Colors.textPrimary} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: Spacing.base, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Upcoming section */}
        <Text weight="bold" size="md" style={{ marginBottom: 12 }}>
          المواعيد القادمة
        </Text>

        {upcoming.length === 0 ? (
          <Card padding={20} style={{ marginBottom: 20 }}>
            <View style={{ alignItems: 'center', gap: 8 }}>
              <Text style={{ fontSize: 36 }}>✅</Text>
              <Text weight="semiBold" align="center">لا مواعيد قادمة</Text>
              <Text size="sm" color={Colors.textSecondary} align="center">
                سيظهر هنا موعد الجرعة التالية عند تسجيل تطعيم بتاريخ جرعة مستقبلية
              </Text>
            </View>
          </Card>
        ) : (
          upcoming.map((event) => {
            const days = daysUntil(event.next_dose_date!);
            const color = urgencyColor(days);
            return (
              <View
                key={event.id}
                style={{
                  backgroundColor: Colors.surface,
                  borderRadius: Radius.lg,
                  marginBottom: 10,
                  flexDirection: 'row-reverse',
                  overflow: 'hidden',
                  shadowColor: '#1A2E1B',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.06,
                  shadowRadius: 4,
                  elevation: 2,
                }}
              >
                <View style={{ width: 4, backgroundColor: color }} />
                <View style={{ flex: 1, padding: 14, flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between' }}>
                  <View style={{ flex: 1 }}>
                    <Text weight="semiBold" size="sm">💉 {event.name}</Text>
                    <Text size="xs" color={Colors.textSecondary} style={{ marginTop: 2 }}>
                      {formatDateAr(new Date(event.next_dose_date!))}
                    </Text>
                  </View>
                  <View style={{
                    backgroundColor: color + '18',
                    borderRadius: Radius.full,
                    paddingHorizontal: 12,
                    paddingVertical: 5,
                  }}>
                    <Text size="xs" weight="semiBold" color={color}>
                      {urgencyLabel(days)}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })
        )}

        {/* Templates */}
        <Text weight="bold" size="md" style={{ marginTop: 8, marginBottom: 12 }}>
          نماذج التطعيمات الشائعة
        </Text>
        <Card padding={0} style={{ marginBottom: 20, overflow: 'hidden' }}>
          {VACCINE_TEMPLATES.map((tpl, i) => (
            <Pressable
              key={tpl.name}
              onPress={() =>
                router.push({
                  pathname: '/health/add-event',
                  params: { prefillName: tpl.name },
                })
              }
              style={({ pressed }) => ({
                flexDirection: 'row-reverse',
                alignItems: 'center',
                padding: 14,
                borderBottomWidth: i < VACCINE_TEMPLATES.length - 1 ? 1 : 0,
                borderBottomColor: Colors.divider,
                backgroundColor: pressed ? Colors.background : Colors.surface,
              })}
            >
              <View style={{ flex: 1 }}>
                <Text weight="semiBold" size="sm">💉 {tpl.name}</Text>
                <Text size="xs" color={Colors.textSecondary} style={{ marginTop: 2 }}>
                  {tpl.animal} · {tpl.interval}
                </Text>
              </View>
              <Ionicons name="chevron-back" size={16} color={Colors.textTertiary} />
            </Pressable>
          ))}
        </Card>

        <Button
          label="تسجيل تطعيم جديد"
          onPress={() => router.push('/health/add-event')}
        />
      </ScrollView>
    </View>
  );
}
