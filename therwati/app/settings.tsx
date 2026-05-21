import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Switch, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../components/ui/Text';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useFarmStore } from '../stores/farm';
import { Colors, Spacing, Radius } from '../constants/theme';
import {
  isNotificationsEnabled,
  setNotificationsEnabled,
  requestNotificationPermission,
} from '../services/notifications';

function SectionHeader({ title }: { title: string }) {
  return (
    <Text
      size="sm"
      weight="semiBold"
      color={Colors.textTertiary}
      style={{ marginBottom: 8, marginTop: 4, paddingHorizontal: 4 }}
    >
      {title}
    </Text>
  );
}

function SettingRow({
  icon, label, sublabel, right, onPress, danger,
}: {
  icon: string;
  label: string;
  sublabel?: string;
  right?: React.ReactNode;
  onPress?: () => void;
  danger?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress && !right}
      style={({ pressed }) => ({
        flexDirection: 'row-reverse',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        backgroundColor: pressed ? Colors.background : Colors.surface,
      })}
    >
      <View style={{
        width: 34,
        height: 34,
        borderRadius: 10,
        backgroundColor: danger ? Colors.dangerLight : Colors.primaryFaded,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 12,
      }}>
        <Text style={{ fontSize: 16 }}>{icon}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text size="sm" weight="medium" color={danger ? Colors.danger : Colors.textPrimary}>
          {label}
        </Text>
        {sublabel && (
          <Text size="xs" color={Colors.textTertiary} style={{ marginTop: 2 }}>{sublabel}</Text>
        )}
      </View>
      {right ?? (onPress ? <Ionicons name="chevron-back" size={16} color={Colors.textTertiary} /> : null)}
    </Pressable>
  );
}

function Divider() {
  return <View style={{ height: 1, backgroundColor: Colors.divider, marginHorizontal: 16 }} />;
}

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { farm, updateFarm } = useFarmStore();

  const [notifEnabled, setNotifEnabled] = useState(true);
  const [editingFarm, setEditingFarm] = useState(false);
  const [farmName, setFarmName] = useState(farm?.name ?? '');
  const [farmGov, setFarmGov] = useState(farm?.governorate ?? '');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    isNotificationsEnabled().then(setNotifEnabled);
  }, []);

  const handleNotifToggle = async (val: boolean) => {
    setNotifEnabled(val);
    await setNotificationsEnabled(val);
    if (val) await requestNotificationPermission();
  };

  const handleSaveFarm = async () => {
    if (!farmName.trim()) return;
    setSaving(true);
    await updateFarm({ name: farmName.trim(), governorate: farmGov.trim() });
    setSaving(false);
    setEditingFarm(false);
  };

  const handleReset = () => {
    Alert.alert(
      'مسح بيانات المزرعة',
      'سيتم حذف جميع البيانات المحلية والعودة لشاشة الإعداد. هذا الإجراء لا يمكن التراجع عنه.',
      [
        { text: 'إلغاء', style: 'cancel' },
        {
          text: 'مسح الكل',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.removeItem('isOnboarded');
            router.replace('/onboarding');
          },
        },
      ]
    );
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
        <Text weight="bold" size="xl">الإعدادات</Text>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="close" size={24} color={Colors.textPrimary} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: Spacing.base, paddingBottom: 60 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Farm info */}
        <SectionHeader title="بيانات المزرعة" />
        <Card padding={0} style={{ marginBottom: 20, overflow: 'hidden' }}>
          {!editingFarm ? (
            <SettingRow
              icon="🏡"
              label={farm?.name ?? 'مزرعتي'}
              sublabel={farm?.governorate}
              onPress={() => {
                setFarmName(farm?.name ?? '');
                setFarmGov(farm?.governorate ?? '');
                setEditingFarm(true);
              }}
            />
          ) : (
            <View style={{ padding: 16 }}>
              <Input
                label="اسم المزرعة"
                value={farmName}
                onChangeText={setFarmName}
                placeholder="اسم المزرعة"
              />
              <Input
                label="المحافظة"
                value={farmGov}
                onChangeText={setFarmGov}
                placeholder="المحافظة"
                containerStyle={{ marginBottom: 12 }}
              />
              <View style={{ flexDirection: 'row-reverse', gap: 10 }}>
                <Button
                  label="حفظ"
                  onPress={handleSaveFarm}
                  loading={saving}
                  style={{ flex: 1 }}
                  size="sm"
                />
                <Button
                  label="إلغاء"
                  variant="ghost"
                  onPress={() => setEditingFarm(false)}
                  style={{ flex: 1 }}
                  size="sm"
                />
              </View>
            </View>
          )}
        </Card>

        {/* Notifications */}
        <SectionHeader title="الإشعارات" />
        <Card padding={0} style={{ marginBottom: 20, overflow: 'hidden' }}>
          <SettingRow
            icon="🔔"
            label="تنبيهات التطعيمات والصحة"
            sublabel="إشعار قبل يوم من موعد التطعيم"
            right={
              <Switch
                value={notifEnabled}
                onValueChange={handleNotifToggle}
                trackColor={{ false: Colors.border, true: Colors.primaryMid }}
                thumbColor={notifEnabled ? Colors.primary : '#fff'}
              />
            }
          />
        </Card>

        {/* App info */}
        <SectionHeader title="عن التطبيق" />
        <Card padding={0} style={{ marginBottom: 20, overflow: 'hidden' }}>
          <SettingRow icon="📱" label="الإصدار" sublabel="1.0.0" />
          <Divider />
          <SettingRow
            icon="🐄"
            label="ثروتي"
            sublabel="تطبيق إدارة الثروة الحيوانية للمزارعين المصريين"
          />
        </Card>

        {/* Danger zone */}
        <SectionHeader title="منطقة الخطر" />
        <Card padding={16} style={{ marginBottom: 20 }}>
          <Text size="sm" color={Colors.textSecondary} style={{ marginBottom: 12, lineHeight: 20 }}>
            مسح جميع بيانات المزرعة المحلية والعودة لشاشة الإعداد الأولي. لا يمكن التراجع عن هذا الإجراء.
          </Text>
          <Button
            label="🗑️  مسح بيانات المزرعة"
            variant="danger"
            onPress={handleReset}
          />
        </Card>
      </ScrollView>
    </View>
  );
}
