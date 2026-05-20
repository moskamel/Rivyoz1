import React, { useState } from 'react';
import { View, ScrollView, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../components/ui/Text';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useFarmStore } from '../../stores/farm';
import { useFinanceStore } from '../../stores/finance';
import { useAlertsStore } from '../../stores/alerts';
import { Colors, Spacing, Radius } from '../../constants/theme';
import { getDatabase, generateId } from '../../db/database';

const EVENT_TYPES = [
  { key: 'vaccine', label: 'تطعيم', icon: '💉' },
  { key: 'treatment', label: 'علاج / مرض', icon: '🏥' },
  { key: 'examination', label: 'فحص', icon: '🔍' },
  { key: 'preventive', label: 'وقاية', icon: '💊' },
];

export default function AddHealthEventScreen() {
  const insets = useSafeAreaInsets();
  const { farm } = useFarmStore();
  const { addTransaction } = useFinanceStore();
  const { addAlert } = useAlertsStore();

  const [eventType, setEventType] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');
  const [vet, setVet] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [medicine, setMedicine] = useState('');
  const [withdrawalDays, setWithdrawalDays] = useState('');
  const [nextDoseDate, setNextDoseDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!farm || !eventType || !name) return;
    setLoading(true);
    try {
      const db = await getDatabase();
      const id = generateId();
      await db.runAsync(
        `INSERT INTO health_events (id, farm_id, event_type, name, event_date, cost, vet_name, diagnosis, withdrawal_days, next_dose_date)
         VALUES (?,?,?,?,date('now'),?,?,?,?,?)`,
        [id, farm.id, eventType, name, parseFloat(cost) || 0,
         vet || null, diagnosis || null,
         parseInt(withdrawalDays) || 0, nextDoseDate || null]
      );

      // Auto-create expense if cost > 0
      if (parseFloat(cost) > 0) {
        await addTransaction(farm.id, {
          transaction_type: 'expense',
          category: 'medicine',
          amount: parseFloat(cost),
          description: name,
        });
      }

      // Auto-create next dose alert
      if (nextDoseDate && eventType === 'vaccine') {
        await addAlert(farm.id, {
          alert_type: 'vaccine_due',
          title: `موعد تطعيم: ${name}`,
          body: `الجرعة التالية من ${name} في ${nextDoseDate}`,
          severity: 'warning',
          due_date: nextDoseDate,
        });
      }

      // Auto-create withdrawal alert
      if (parseInt(withdrawalDays) > 0) {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + parseInt(withdrawalDays));
        await addAlert(farm.id, {
          alert_type: 'withdrawal_end',
          title: 'انتهاء فترة السحب',
          body: `تنتهي فترة سحب ${name} في ${endDate.toLocaleDateString('ar-EG')}`,
          severity: 'warning',
          due_date: endDate.toISOString().split('T')[0],
        });
      }

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
        <Text weight="bold" size="lg">إضافة حدث صحي</Text>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="close" size={24} color={Colors.textPrimary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: Spacing.base, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        {/* Event Type */}
        <Text weight="semiBold" size="sm" color={Colors.textSecondary} style={{ marginBottom: 12 }}>
          نوع الحدث
        </Text>
        <View style={{ flexDirection: 'row-reverse', gap: 10, marginBottom: 24 }}>
          {EVENT_TYPES.map((type) => (
            <Pressable
              key={type.key}
              onPress={() => setEventType(type.key)}
              style={({ pressed }) => ({
                flex: 1, padding: 12, borderRadius: Radius.lg,
                backgroundColor: eventType === type.key ? Colors.infoLight : Colors.surface,
                borderWidth: 2, borderColor: eventType === type.key ? Colors.primary : Colors.border,
                alignItems: 'center', gap: 4,
                opacity: pressed ? 0.88 : 1,
              })}
            >
              <Text size="xl">{type.icon}</Text>
              <Text size="xs" weight={eventType === type.key ? 'semiBold' : 'regular'}
                color={eventType === type.key ? Colors.primary : Colors.textSecondary} align="center">
                {type.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Common Fields */}
        <Input label="الاسم" required value={name} onChangeText={setName} placeholder="اسم التطعيم أو الدواء" />
        <Input label="التكلفة (جنيه)" value={cost} onChangeText={setCost} keyboardType="numeric" placeholder="0" />
        <Input label="اسم البيطري" value={vet} onChangeText={setVet} placeholder="اختياري" />

        {/* Treatment-specific */}
        {eventType === 'treatment' && (
          <>
            <Input label="التشخيص" value={diagnosis} onChangeText={setDiagnosis} placeholder="وصف الحالة" />
            <Input label="الدواء" value={medicine} onChangeText={setMedicine} placeholder="اسم الدواء والجرعة" />
            <Input
              label="فترة السحب (أيام)"
              value={withdrawalDays}
              onChangeText={setWithdrawalDays}
              keyboardType="numeric"
              placeholder="0"
            />
          </>
        )}

        {/* Vaccine next dose */}
        {eventType === 'vaccine' && (
          <Input
            label="تاريخ الجرعة التالية"
            value={nextDoseDate}
            onChangeText={setNextDoseDate}
            placeholder="YYYY-MM-DD (اختياري)"
          />
        )}

        {/* Info Card */}
        <Card style={{ marginTop: 8 }} padding={14}>
          <View style={{ flexDirection: 'row-reverse', gap: 10, alignItems: 'flex-start' }}>
            <Ionicons name="information-circle-outline" size={20} color={Colors.primary} />
            <Text size="xs" color={Colors.textSecondary} style={{ flex: 1, lineHeight: 20 }}>
              عند حفظ الحدث — التكلفة تُضاف تلقائياً للمصاريف، وإن كانت هناك جرعة تالية أو فترة سحب يُنشأ تنبيه تلقائياً
            </Text>
          </View>
        </Card>
      </ScrollView>

      <View style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: Colors.surface, paddingHorizontal: Spacing.base,
        paddingBottom: insets.bottom + 12, paddingTop: 12,
        borderTopWidth: 1, borderTopColor: Colors.border,
      }}>
        <Button
          label="حفظ الحدث الصحي"
          onPress={handleSave}
          loading={loading}
          disabled={!eventType || !name}
        />
      </View>
    </View>
  );
}
