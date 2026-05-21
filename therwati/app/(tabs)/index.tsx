import React, { useEffect } from 'react';
import { ScrollView, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import { useFarmStore } from '../../stores/farm';
import { useAnimalsStore } from '../../stores/animals';
import { useFinanceStore } from '../../stores/finance';
import { useAlertsStore } from '../../stores/alerts';
import { Colors, Spacing } from '../../constants/theme';
import { formatEGP, getGreeting } from '../../constants/arabic';

function ProfitCard({ profit, income, expenses }: { profit: number; income: number; expenses: number }) {
  const isPositive = profit >= 0;
  return (
    <View style={{
      marginHorizontal: Spacing.base, marginBottom: Spacing.md,
      borderRadius: 24, overflow: 'hidden',
      backgroundColor: isPositive ? Colors.primary : Colors.danger,
      padding: 20,
    }}>
      {/* Background pattern */}
      <View style={{
        position: 'absolute', top: -40, left: -40,
        width: 160, height: 160, borderRadius: 80,
        backgroundColor: 'rgba(255,255,255,0.06)',
      }} />
      <View style={{
        position: 'absolute', bottom: -20, right: 20,
        width: 100, height: 100, borderRadius: 50,
        backgroundColor: 'rgba(255,255,255,0.04)',
      }} />

      <Text size="sm" color="rgba(255,255,255,0.8)" weight="medium">ربح الشهر الجاري</Text>
      <Text size="xxxl" color="#fff" weight="extraBold" style={{ marginTop: 4, marginBottom: 12 }}>
        {formatEGP(Math.abs(profit), false)}
        <Text size="lg" color="rgba(255,255,255,0.7)" weight="regular"> جنيه</Text>
      </Text>

      <View style={{ flexDirection: 'row-reverse', gap: 16 }}>
        <View style={{ flex: 1 }}>
          <Text size="xs" color="rgba(255,255,255,0.7)">الإيرادات</Text>
          <Text size="md" color="#fff" weight="semiBold">{formatEGP(income)}</Text>
        </View>
        <View style={{ width: 1, backgroundColor: 'rgba(255,255,255,0.2)' }} />
        <View style={{ flex: 1 }}>
          <Text size="xs" color="rgba(255,255,255,0.7)">المصاريف</Text>
          <Text size="md" color="#fff" weight="semiBold">{formatEGP(expenses)}</Text>
        </View>
      </View>
    </View>
  );
}

function StatCard({ label, value, icon, color }: { label: string; value: string; icon: string; color?: string }) {
  return (
    <Card style={{ flex: 1 }} padding={14}>
      <Text size="xl" align="right" style={{ marginBottom: 4 }}>{icon}</Text>
      <Text size="lg" weight="extraBold" color={color ?? Colors.textPrimary}>{value}</Text>
      <Text size="xs" color={Colors.textSecondary} style={{ marginTop: 2 }}>{label}</Text>
    </Card>
  );
}

function AlertCard({ alert, onPress }: { alert: any; onPress: () => void }) {
  const severityConfig = {
    critical: { bg: Colors.dangerLight, border: Colors.danger, icon: '🔴' },
    warning: { bg: Colors.warningLight, border: Colors.warning, icon: '🟡' },
    info: { bg: Colors.infoLight, border: Colors.primaryLight, icon: '🟢' },
  };
  const config = severityConfig[alert.severity as keyof typeof severityConfig] ?? severityConfig.info;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: config.bg,
        borderRadius: 14, padding: 14,
        borderRightWidth: 3, borderRightColor: config.border,
        marginBottom: 8, opacity: pressed ? 0.88 : 1,
        flexDirection: 'row-reverse', alignItems: 'center', gap: 10,
      })}
    >
      <Text size="md">{config.icon}</Text>
      <View style={{ flex: 1 }}>
        <Text weight="semiBold" size="sm">{alert.title}</Text>
        <Text size="xs" color={Colors.textSecondary} style={{ marginTop: 2 }}>{alert.body}</Text>
      </View>
      <Ionicons name="chevron-back" size={16} color={Colors.textTertiary} />
    </Pressable>
  );
}

function QuickAction({ icon, label, color, onPress }: { icon: any; label: string; color: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flex: 1, backgroundColor: Colors.surface,
        borderRadius: 16, padding: 16, alignItems: 'center', gap: 8,
        shadowColor: '#1A2E1B',
        shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
        opacity: pressed ? 0.88 : 1,
      })}
    >
      <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: color + '18', alignItems: 'center', justifyContent: 'center' }}>
        <Ionicons name={icon} size={22} color={color} />
      </View>
      <Text size="xs" weight="semiBold" align="center">{label}</Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { farm } = useFarmStore();
  const { animals, load: loadAnimals } = useAnimalsStore();
  const { transactions, load: loadFinance, getMonthStats } = useFinanceStore();
  const { alerts, unreadCount, load: loadAlerts } = useAlertsStore();

  useEffect(() => {
    if (farm) {
      loadAnimals(farm.id);
      loadFinance(farm.id);
      loadAlerts(farm.id);
    }
  }, [farm?.id]);

  const now = new Date();
  const stats = farm ? getMonthStats(now.getFullYear(), now.getMonth() + 1) : { income: 0, expenses: 0, profit: 0 };
  const activeAlerts = alerts.filter((a) => !a.is_dismissed).slice(0, 3);
  const sickCount = animals.filter((a) => a.current_condition === 'sick').length;

  if (!farm) return null;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: Colors.background }}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={{
        paddingTop: insets.top + 12,
        paddingHorizontal: Spacing.base,
        paddingBottom: 16,
        backgroundColor: Colors.primary,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
        marginBottom: 16,
      }}>
        <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 10 }}>
            <Text size="sm" color="rgba(255,255,255,0.75)">{getGreeting()}</Text>
            <Pressable onPress={() => router.push('/settings')} hitSlop={8}>
              <Ionicons name="settings-outline" size={20} color="rgba(255,255,255,0.75)" />
            </Pressable>
          </View>
          <View>
            <Text size="xl" weight="bold" color="#fff">{farm.name}</Text>
          </View>
          <Pressable
            onPress={() => router.push('/(tabs)/health')}
            style={{ position: 'relative' }}
          >
            <View style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="notifications-outline" size={22} color="#fff" />
            </View>
            {unreadCount > 0 && (
              <View style={{
                position: 'absolute', top: 0, left: 0,
                width: 18, height: 18, borderRadius: 9,
                backgroundColor: Colors.danger,
                alignItems: 'center', justifyContent: 'center',
                borderWidth: 2, borderColor: Colors.primary,
              }}>
                <Text size="xs" color="#fff" weight="bold" align="center">{unreadCount > 9 ? '9+' : String(unreadCount)}</Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      {/* Profit Card */}
      <ProfitCard profit={stats.profit} income={stats.income} expenses={stats.expenses} />

      {/* Stats Grid */}
      <View style={{ flexDirection: 'row-reverse', gap: 10, marginHorizontal: Spacing.base, marginBottom: Spacing.md }}>
        <StatCard
          label="إجمالي الحيوانات"
          value={String(animals.length)}
          icon="🐄"
        />
        <StatCard
          label={sickCount > 0 ? `${sickCount} مريض` : 'كلهم بخير'}
          value={sickCount > 0 ? '⚠️' : '✓'}
          icon={sickCount > 0 ? '' : ''}
          color={sickCount > 0 ? Colors.warning : Colors.success}
        />
      </View>

      {/* Alerts */}
      {activeAlerts.length > 0 && (
        <View style={{ marginHorizontal: Spacing.base, marginBottom: Spacing.md }}>
          <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <Text weight="bold" size="md">تنبيهات اليوم</Text>
            <Pressable onPress={() => router.push('/(tabs)/health')}>
              <Text size="sm" color={Colors.primary} weight="medium">عرض الكل</Text>
            </Pressable>
          </View>
          {activeAlerts.map((a) => (
            <AlertCard key={a.id} alert={a} onPress={() => router.push('/(tabs)/health')} />
          ))}
        </View>
      )}

      {/* Quick Actions */}
      <View style={{ marginHorizontal: Spacing.base, marginBottom: Spacing.md }}>
        <Text weight="bold" size="md" style={{ marginBottom: 12 }}>إجراءات سريعة</Text>
        <View style={{ flexDirection: 'row-reverse', gap: 10, marginBottom: 10 }}>
          <QuickAction icon="add-circle" label="إضافة حيوان" color={Colors.primary} onPress={() => router.push('/animal/add')} />
          <QuickAction icon="cash-outline" label="تسجيل مصروف" color={Colors.danger} onPress={() => router.push('/finance/add-expense')} />
        </View>
        <View style={{ flexDirection: 'row-reverse', gap: 10 }}>
          <QuickAction icon="medkit-outline" label="تطعيم / علاج" color={Colors.primaryMid} onPress={() => router.push('/health/add-event')} />
          <QuickAction icon="bar-chart-outline" label="التقرير الشهري" color={Colors.warning} onPress={() => router.push('/(tabs)/finance')} />
        </View>
      </View>

      {/* Empty state */}
      {animals.length === 0 && (
        <Card style={{ marginHorizontal: Spacing.base }} padding={24}>
          <Text size="xl" align="center" style={{ marginBottom: 8 }}>🐄</Text>
          <Text weight="bold" align="center" style={{ marginBottom: 6 }}>ابدأ بإضافة أول حيوان</Text>
          <Text size="sm" color={Colors.textSecondary} align="center">
            أضف بيانات حيواناتك لتتبع الربح والتكاليف تلقائياً
          </Text>
        </Card>
      )}
    </ScrollView>
  );
}
