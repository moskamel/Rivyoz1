import React, { useState } from 'react';
import { View, ScrollView, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../../components/ui/Text';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import { useAnimalsStore } from '../../../stores/animals';
import { Colors, Spacing, Radius } from '../../../constants/theme';
import { ANIMAL_TYPES, GOVERNORATES } from '../../../constants/arabic';

const CONDITIONS = [
  { key: 'healthy', label: 'سليم', icon: '✅' },
  { key: 'sick', label: 'مريض', icon: '🤒' },
  { key: 'pregnant', label: 'حامل', icon: '🐄' },
  { key: 'quarantine', label: 'عزل', icon: '⚠️' },
];

export default function EditAnimalScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const { getAnimal, updateAnimal } = useAnimalsStore();

  const animal = getAnimal(id);

  const [name, setName] = useState(animal?.name ?? '');
  const [tagNumber, setTagNumber] = useState(animal?.tag_number ?? '');
  const [breed, setBreed] = useState(animal?.breed ?? '');
  const [birthDate, setBirthDate] = useState(animal?.birth_date ?? '');
  const [purchasePrice, setPurchasePrice] = useState(animal?.purchase_price ? String(animal.purchase_price) : '');
  const [condition, setCondition] = useState(animal?.current_condition ?? 'healthy');
  const [notes, setNotes] = useState(animal?.notes ?? '');
  const [loading, setLoading] = useState(false);

  if (!animal) {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.background, alignItems: 'center', justifyContent: 'center' }}>
        <Text>الحيوان غير موجود</Text>
      </View>
    );
  }

  const typeInfo = ANIMAL_TYPES[animal.animal_type as keyof typeof ANIMAL_TYPES];

  const handleSave = async () => {
    if (!tagNumber.trim()) {
      Alert.alert('', 'رقم التعريف مطلوب');
      return;
    }
    setLoading(true);
    try {
      await updateAnimal(animal.id, {
        name: name.trim() || undefined,
        tag_number: tagNumber.trim(),
        breed: breed.trim() || undefined,
        birth_date: birthDate.trim() || undefined,
        purchase_price: parseFloat(purchasePrice) || animal.purchase_price,
        current_condition: condition,
        notes: notes.trim() || undefined,
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
      {/* Header */}
      <View style={{
        paddingTop: insets.top + 12,
        paddingHorizontal: Spacing.base,
        paddingBottom: 16,
        backgroundColor: Colors.surface,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
      }}>
        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 10 }}>
          <Text style={{ fontSize: 24 }}>{typeInfo?.icon ?? '🐄'}</Text>
          <View>
            <Text weight="bold" size="lg">تعديل بيانات الحيوان</Text>
            <Text size="sm" color={Colors.textSecondary}>{animal.tag_number}</Text>
          </View>
        </View>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="close" size={24} color={Colors.textPrimary} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{ padding: Spacing.base, paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Basic Info */}
        <Card padding={16} style={{ marginBottom: 16 }}>
          <Text weight="semiBold" size="md" style={{ marginBottom: 16 }}>البيانات الأساسية</Text>
          <Input
            label="الاسم"
            value={name}
            onChangeText={setName}
            placeholder="اسم الحيوان (اختياري)"
          />
          <Input
            label="رقم التعريف"
            required
            value={tagNumber}
            onChangeText={setTagNumber}
            placeholder="مثال: COW-001"
          />
          <Input
            label="السلالة"
            value={breed}
            onChangeText={setBreed}
            placeholder="مثال: فريزيان، عواسي"
          />
          <Input
            label="تاريخ الميلاد"
            value={birthDate}
            onChangeText={setBirthDate}
            placeholder="YYYY-MM-DD"
            containerStyle={{ marginBottom: 0 }}
          />
        </Card>

        {/* Condition */}
        <Card padding={16} style={{ marginBottom: 16 }}>
          <Text weight="semiBold" size="md" style={{ marginBottom: 12 }}>الحالة الصحية</Text>
          <View style={{ flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 10 }}>
            {CONDITIONS.map((c) => (
              <Pressable
                key={c.key}
                onPress={() => setCondition(c.key)}
                style={({ pressed }) => ({
                  flexDirection: 'row-reverse',
                  alignItems: 'center',
                  gap: 6,
                  paddingHorizontal: 14,
                  paddingVertical: 10,
                  borderRadius: Radius.full,
                  backgroundColor: condition === c.key ? Colors.primaryFaded : Colors.background,
                  borderWidth: 1.5,
                  borderColor: condition === c.key ? Colors.primary : Colors.border,
                  opacity: pressed ? 0.85 : 1,
                })}
              >
                <Text size="sm">{c.icon}</Text>
                <Text
                  size="sm"
                  weight={condition === c.key ? 'semiBold' : 'regular'}
                  color={condition === c.key ? Colors.primary : Colors.textSecondary}
                >
                  {c.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </Card>

        {/* Financial */}
        <Card padding={16} style={{ marginBottom: 16 }}>
          <Text weight="semiBold" size="md" style={{ marginBottom: 16 }}>المعلومات المالية</Text>
          <Input
            label="سعر الشراء (جنيه)"
            value={purchasePrice}
            onChangeText={setPurchasePrice}
            keyboardType="numeric"
            placeholder="0"
            containerStyle={{ marginBottom: 0 }}
          />
        </Card>

        {/* Notes */}
        <Card padding={16}>
          <Text weight="semiBold" size="md" style={{ marginBottom: 16 }}>ملاحظات</Text>
          <Input
            label=""
            value={notes}
            onChangeText={setNotes}
            placeholder="أي ملاحظات إضافية..."
            multiline
            numberOfLines={4}
            style={{ height: 100 }}
            containerStyle={{ marginBottom: 0 }}
          />
        </Card>
      </ScrollView>

      {/* Save Button */}
      <View style={{
        position: 'absolute',
        bottom: 0, left: 0, right: 0,
        backgroundColor: Colors.surface,
        paddingHorizontal: Spacing.base,
        paddingBottom: insets.bottom + 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: Colors.border,
      }}>
        <Button
          label="حفظ التعديلات"
          onPress={handleSave}
          loading={loading}
          disabled={!tagNumber.trim()}
        />
      </View>
    </View>
  );
}
