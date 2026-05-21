import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { EmptyState } from '../../components/ui/EmptyState';
import { useFarmStore } from '../../stores/farm';
import { useHealthStore, HealthEvent } from '../../stores/health';
import { Colors, Spacing, Radius } from '../../constants/theme';
import { formatDateAr } from '../../constants/arabic';

const FILTERS = [
  { key: 'all', label: 'الكل' },
  { key: 'vaccine', label: '💉 تطعيمات' },
  { key: 'treatment', label: '🏥 علاج' },
  { key: 'examination', label: '🔍 فحص' },
  { key: 'preventive', label: '💊 وقاية' },
];

const EVENT_CONFIG: Record<string, { icon: string; color: string; label: string }> = {
  vaccine: { icon: '💉', color: Colors.primary, label: 'تطعيم' },
  treatment: { icon: '🏥', color: Colors.danger, label: 'علاج' },
  examination: { icon: '🔍', color: Colors.warning, label: 'فحص' },
  preventive: { icon: '💊', color: '#0097A7', label: 'وقاية' },
};

function EventItem({ event, onDelete }: { event: HealthEvent; onDelete: () => void }) {
  const cfg = EVENT_CONFIG[event.event_type] ?? EVENT_CONFIG.vaccine;
  return (
    <Pressable
      onLongPress={() =>
        Alert.alert('حذف الحدث', 'هل تريد حذف هذا الحدث الصحي؟', [
          { text: 'إلغاء', style: 'cancel' },
          { text: 'حذف', style: 'destructive', onPress: onDelete },
        ])
      }
      style={({ pressed }) => ({
        backgroundColor: Colors.surface,
        borderRadius: Radius.lg,
        marginBottom: 10,
        flexDirection: 'row-reverse',
        overflow: 'hidden',
        opacity: pressed ? 0.88 : 1,
        shadowColor: '#1A2E1B',
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
      })}
    >
      {/* colored side bar */}
      <View style={{ width: 4, backgroundColor: cfg.color }} />
      <View style={{ flex: 1, padding: 14 }}>
        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 8, flex: 1 }}>
            <Text style={{ fontSize: 20 }}>{cfg.icon}</Text>
            <View style={{ flex: 1 }}>
              <Text weight="semiBold" size="sm">{event.name}</Text>
              <Text size="xs" color={Colors.textSecondary} style={{ marginTop: 2 }}>
                {cfg.label} · {formatDateAr(new Date(event.event_date))}
              </Text>
              {event.vet_name && (
                <Text size="xs" color={Colors.textTertiary} style={{ marginTop: 2 }}>
                  د. {event.vet_name}
                </Text>
              )}
              {event.diagnosis && (
                <Text size="xs" color={Colors.textSecondary} style={{ marginTop: 2 }}>
                  {event.diagnosis}
                </Text>
              )}
            </View>
          </View>
          <View style={{ alignItems: 'flex-start' }}>
            {event.cost > 0 && (
              <Text size="sm" weight="semiBold" color={Colors.expense}>
                {event.cost.toLocaleString('ar-EG')} ج
              </Text>
            )}
            {event.next_dose_date && (
              <Text size="xs" color={Colors.primary} style={{ marginTop: 4 }}>
                🔔 {formatDateAr(new Date(event.next_dose_date))}
              </Text>
            )}
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export default function HealthRecordScreen() {
  const insets = useSafeAreaInsets();
  const { farm } = useFarmStore();
  const { events, isLoading, load, deleteEvent } = useHealthStore();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (farm) load(farm.id);
  }, [farm]);

  const filtered = events.filter(
    (e) => filter === 'all' || e.event_type === filter
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
          <Text weight="bold" size="xl">السجل الصحي</Text>
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="close" size={24} color={Colors.textPrimary} />
          </Pressable>
        </View>

        {/* Filter chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {FILTERS.map((chip) => (
            <Pressable
              key={chip.key}
              onPress={() => setFilter(chip.key)}
              style={{
                paddingHorizontal: 14,
                paddingVertical: 7,
                borderRadius: Radius.full,
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

      <ScrollView
        contentContainerStyle={{ padding: Spacing.base, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats row */}
        {events.length > 0 && (
          <View style={{ flexDirection: 'row-reverse', gap: 10, marginBottom: 16 }}>
            {(['vaccine', 'treatment', 'examination', 'preventive'] as const).map((type) => {
              const count = events.filter((e) => e.event_type === type).length;
              if (count === 0) return null;
              const cfg = EVENT_CONFIG[type];
              return (
                <View
                  key={type}
                  style={{
                    flex: 1,
                    backgroundColor: Colors.surface,
                    borderRadius: Radius.lg,
                    padding: 12,
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <Text style={{ fontSize: 18 }}>{cfg.icon}</Text>
                  <Text weight="bold" size="md">{count}</Text>
                  <Text size="xs" color={Colors.textTertiary}>{cfg.label}</Text>
                </View>
              );
            })}
          </View>
        )}

        {filtered.length === 0 ? (
          <EmptyState
            icon="🏥"
            title="لا أحداث صحية"
            message="سيظهر هنا تاريخ التطعيمات والعلاجات بعد تسجيلها"
            actionLabel="تسجيل حدث صحي"
            onAction={() => router.push('/health/add-event')}
          />
        ) : (
          filtered.map((event) => (
            <EventItem
              key={event.id}
              event={event}
              onDelete={() => deleteEvent(event.id)}
            />
          ))
        )}
      </ScrollView>

      {/* FAB */}
      <Pressable
        onPress={() => router.push('/health/add-event')}
        style={({ pressed }) => ({
          position: 'absolute',
          bottom: insets.bottom + 24,
          left: 24,
          width: 56,
          height: 56,
          borderRadius: 28,
          backgroundColor: Colors.primary,
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#1A2E1B',
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 6,
          opacity: pressed ? 0.88 : 1,
        })}
      >
        <Ionicons name="add" size={28} color="#fff" />
      </Pressable>
    </View>
  );
}
