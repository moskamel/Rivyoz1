import React, { useState } from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import { useFarmStore } from '../../stores/farm';
import { useAlertsStore, Alert } from '../../stores/alerts';
import { Colors, Spacing } from '../../constants/theme';
import { formatDateAr, timeAgoAr } from '../../constants/arabic';

const FILTERS = [
  { key: 'all', label: 'الكل' },
  { key: 'critical', label: '🔴 طارئ' },
  { key: 'warning', label: '🟡 تحذير' },
  { key: 'info', label: '🟢 معلومة' },
];

function AlertItem({ alert, onDismiss }: { alert: Alert; onDismiss: () => void }) {
  const config = {
    critical: { bg: Colors.dangerLight, border: Colors.danger, icon: '🔴' },
    warning: { bg: Colors.warningLight, border: Colors.warning, icon: '🟡' },
    info: { bg: Colors.infoLight, border: Colors.primaryLight, icon: '🟢' },
  }[alert.severity] ?? { bg: Colors.infoLight, border: Colors.primary, icon: '🟢' };

  return (
    <View style={{
      backgroundColor: config.bg,
      borderRadius: 16, padding: 16,
      borderRightWidth: 3, borderRightColor: config.border,
      marginBottom: 10,
      flexDirection: 'row-reverse', gap: 12,
    }}>
      <Text size="lg">{config.icon}</Text>
      <View style={{ flex: 1 }}>
        <Text weight="bold" size="sm">{alert.title}</Text>
        <Text size="xs" color={Colors.textSecondary} style={{ marginTop: 4, lineHeight: 18 }}>{alert.body}</Text>
        <Text size="xs" color={Colors.textTertiary} style={{ marginTop: 6 }}>
          {timeAgoAr(new Date(alert.created_at))}
        </Text>
      </View>
      <Pressable onPress={onDismiss} hitSlop={8}>
        <Ionicons name="close-circle-outline" size={20} color={Colors.textTertiary} />
      </Pressable>
    </View>
  );
}

export default function HealthScreen() {
  const insets = useSafeAreaInsets();
  const { farm } = useFarmStore();
  const { alerts, unreadCount, markAllRead, dismiss } = useAlertsStore();
  const [filter, setFilter] = useState('all');

  const filtered = alerts.filter((a) =>
    !a.is_dismissed &&
    (filter === 'all' || a.severity === filter)
  );

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
          <Text weight="bold" size="xl">الصحة والتنبيهات</Text>
          <View style={{ flexDirection: 'row-reverse', gap: 10, alignItems: 'center' }}>
            {unreadCount > 0 && (
              <Pressable onPress={() => farm && markAllRead(farm.id)}>
                <Text size="sm" color={Colors.primary} weight="medium">تحديد كمقروء</Text>
              </Pressable>
            )}
            <Pressable
              onPress={() => router.push('/health/add-event')}
              style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' }}
            >
              <Ionicons name="add" size={22} color="#fff" />
            </Pressable>
          </View>
        </View>

        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {FILTERS.map((chip) => (
            <Pressable
              key={chip.key}
              onPress={() => setFilter(chip.key)}
              style={{
                paddingHorizontal: 16, paddingVertical: 7,
                borderRadius: 999,
                backgroundColor: filter === chip.key ? Colors.primary : Colors.surface,
                borderWidth: 1,
                borderColor: filter === chip.key ? Colors.primary : Colors.border,
              }}
            >
              <Text
                size="sm"
                weight={filter === chip.key ? 'semiBold' : 'regular'}
                color={filter === chip.key ? '#fff' : Colors.textSecondary}
              >
                {chip.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={{ padding: Spacing.base, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {filtered.length === 0 ? (
          <EmptyState
            icon="✅"
            title="لا تنبيهات اليوم"
            message="كل شيء تحت السيطرة — سيظهر هنا أي تنبيه يتطلب انتباهك"
            actionLabel="إضافة حدث صحي"
            onAction={() => router.push('/health/add-event')}
          />
        ) : (
          filtered.map((alert) => (
            <AlertItem key={alert.id} alert={alert} onDismiss={() => dismiss(alert.id)} />
          ))
        )}

        {/* Quick action card */}
        <Card style={{ marginTop: 8 }} padding={16}>
          <Text weight="bold" size="md" style={{ marginBottom: 12 }}>إجراءات سريعة</Text>
          <View style={{ gap: 10 }}>
            <Pressable
              onPress={() => router.push('/health/add-event')}
              style={({ pressed }) => ({
                flexDirection: 'row-reverse', alignItems: 'center', gap: 12,
                backgroundColor: Colors.primaryFaded, borderRadius: 12, padding: 14,
                opacity: pressed ? 0.88 : 1,
              })}
            >
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="medical" size={18} color="#fff" />
              </View>
              <View style={{ flex: 1 }}>
                <Text weight="semiBold" size="sm">تسجيل تطعيم أو علاج</Text>
                <Text size="xs" color={Colors.textSecondary}>لحيوان فردي أو مجموعة</Text>
              </View>
              <Ionicons name="chevron-back" size={16} color={Colors.textTertiary} />
            </Pressable>

            <Pressable
              onPress={() => router.push('/health/record')}
              style={({ pressed }) => ({
                flexDirection: 'row-reverse', alignItems: 'center', gap: 12,
                backgroundColor: Colors.surface, borderRadius: 12, padding: 14,
                borderWidth: 1, borderColor: Colors.border,
                opacity: pressed ? 0.88 : 1,
              })}
            >
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.primaryFaded, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="document-text-outline" size={18} color={Colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text weight="semiBold" size="sm">السجل الصحي الكامل</Text>
                <Text size="xs" color={Colors.textSecondary}>جميع الأحداث الصحية</Text>
              </View>
              <Ionicons name="chevron-back" size={16} color={Colors.textTertiary} />
            </Pressable>

            <Pressable
              onPress={() => router.push('/health/schedule')}
              style={({ pressed }) => ({
                flexDirection: 'row-reverse', alignItems: 'center', gap: 12,
                backgroundColor: Colors.surface, borderRadius: 12, padding: 14,
                borderWidth: 1, borderColor: Colors.border,
                opacity: pressed ? 0.88 : 1,
              })}
            >
              <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: Colors.primaryFaded, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="calendar-outline" size={18} color={Colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text weight="semiBold" size="sm">جدول التطعيمات</Text>
                <Text size="xs" color={Colors.textSecondary}>المواعيد القادمة والنماذج</Text>
              </View>
              <Ionicons name="chevron-back" size={16} color={Colors.textTertiary} />
            </Pressable>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}
