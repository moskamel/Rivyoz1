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
import { useAnimalsStore } from '../../stores/animals';
import { Colors, Spacing, Radius } from '../../constants/theme';
import { ANIMAL_TYPES } from '../../constants/arabic';

type AnimalTypeKey = keyof typeof ANIMAL_TYPES;

const PURPOSES = [
  { key: 'milk', label: '🥛 حليب' },
  { key: 'meat', label: '🥩 لحم' },
  { key: 'both', label: '🌟 اثنين' },
  { key: 'breeding', label: '🐣 تربية' },
];

function TypeButton({ typeKey, selected, onPress }: { typeKey: AnimalTypeKey; selected: boolean; onPress: () => void }) {
  const info = ANIMAL_TYPES[typeKey];
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flexBasis: '30%', aspectRatio: 1,
        borderRadius: Radius.lg,
        backgroundColor: selected ? info.color + '20' : Colors.surface,
        borderWidth: 2,
        borderColor: selected ? info.color : Colors.border,
        alignItems: 'center', justifyContent: 'center', gap: 4,
        opacity: pressed ? 0.88 : 1,
      })}
    >
      <Text size="xxl">{info.icon}</Text>
      <Text size="xs" weight={selected ? 'semiBold' : 'regular'} color={selected ? info.color : Colors.textSecondary} align="center">
        {info.label}
      </Text>
    </Pressable>
  );
}

function GenderButton({ label, icon, selected, onPress }: { label: string; icon: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        flex: 1, paddingVertical: 16, borderRadius: Radius.lg,
        backgroundColor: selected ? Colors.primary : Colors.surface,
        alignItems: 'center', gap: 6,
        borderWidth: 2, borderColor: selected ? Colors.primary : Colors.border,
        opacity: pressed ? 0.88 : 1,
      })}
    >
      <Text size="xl">{icon}</Text>
      <Text weight="semiBold" color={selected ? '#fff' : Colors.textSecondary}>{label}</Text>
    </Pressable>
  );
}

export default function AddAnimalScreen() {
  const insets = useSafeAreaInsets();
  const { farm } = useFarmStore();
  const { addAnimal, animals } = useAnimalsStore();

  const [animalType, setAnimalType] = useState<AnimalTypeKey | null>(null);
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [tagNumber, setTagNumber] = useState('');
  const [name, setName] = useState('');
  const [showExtra, setShowExtra] = useState(false);
  const [purchasePrice, setPurchasePrice] = useState('');
  const [breed, setBreed] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!animalType) errs.type = 'اختر نوع الحيوان';
    if (!gender) errs.gender = 'اختر الجنس';
    if (!tagNumber.trim()) errs.tag = 'أدخل رقم أو اسم الحيوان';
    else {
      const exists = animals.some((a) => a.tag_number === tagNumber.trim());
      if (exists) errs.tag = 'هذا الرقم موجود بالفعل — اختر رقماً آخر';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSave = async () => {
    if (!validate() || !farm || !animalType || !gender) return;
    setLoading(true);
    try {
      await addAnimal(farm.id, {
        tag_number: tagNumber.trim(),
        animal_type: animalType,
        gender,
        name: name.trim() || undefined,
        breed: breed.trim() || undefined,
        purchase_price: parseFloat(purchasePrice) || 0,
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
        borderBottomWidth: 1, borderBottomColor: Colors.border,
      }}>
        <Text weight="bold" size="lg">إضافة حيوان جديد</Text>
        <Pressable onPress={() => router.back()} hitSlop={12}>
          <Ionicons name="close" size={24} color={Colors.textPrimary} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={{ padding: Spacing.base, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <Text size="sm" color={Colors.textSecondary} style={{ marginBottom: 20, textAlign: 'right' }}>
          3 حقول فقط — الباقي تضيفه لاحقاً
        </Text>

        {/* Animal Type */}
        <Text weight="semiBold" size="sm" color={Colors.textSecondary} style={{ marginBottom: 10 }}>
          نوع الحيوان *
        </Text>
        <View style={{ flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 10, marginBottom: 20 }}>
          {(Object.keys(ANIMAL_TYPES) as AnimalTypeKey[]).map((key) => (
            <TypeButton
              key={key}
              typeKey={key}
              selected={animalType === key}
              onPress={() => { setAnimalType(key); setErrors((e) => ({ ...e, type: '' })); }}
            />
          ))}
        </View>
        {errors.type && <Text size="xs" color={Colors.danger} style={{ marginTop: -14, marginBottom: 12 }}>{errors.type}</Text>}

        {/* Gender */}
        <Text weight="semiBold" size="sm" color={Colors.textSecondary} style={{ marginBottom: 10 }}>
          الجنس *
        </Text>
        <View style={{ flexDirection: 'row-reverse', gap: 10, marginBottom: 20 }}>
          <GenderButton label="أنثى" icon="♀️" selected={gender === 'female'} onPress={() => { setGender('female'); setErrors((e) => ({ ...e, gender: '' })); }} />
          <GenderButton label="ذكر" icon="♂️" selected={gender === 'male'} onPress={() => { setGender('male'); setErrors((e) => ({ ...e, gender: '' })); }} />
        </View>
        {errors.gender && <Text size="xs" color={Colors.danger} style={{ marginTop: -14, marginBottom: 12 }}>{errors.gender}</Text>}

        {/* Tag Number */}
        <Input
          label="رقم / اسم الحيوان"
          required
          value={tagNumber}
          onChangeText={(v) => { setTagNumber(v); setErrors((e) => ({ ...e, tag: '' })); }}
          placeholder="001 أو اسم الحيوان"
          error={errors.tag}
        />

        {/* Optional Details Toggle */}
        <Pressable
          onPress={() => setShowExtra(!showExtra)}
          style={{
            flexDirection: 'row-reverse', alignItems: 'center', gap: 8,
            paddingVertical: 12, marginBottom: 4,
          }}
        >
          <Ionicons name={showExtra ? 'chevron-up' : 'chevron-down'} size={18} color={Colors.primary} />
          <Text weight="medium" color={Colors.primary}>
            {showExtra ? 'إخفاء التفاصيل' : '+ إضافة تفاصيل (اختياري)'}
          </Text>
        </Pressable>

        {showExtra && (
          <Card style={{ marginBottom: 16 }} padding={16}>
            <Input
              label="اسم الحيوان"
              value={name}
              onChangeText={setName}
              placeholder="اسم الحيوان (اختياري)"
            />
            <Input
              label="السلالة"
              value={breed}
              onChangeText={setBreed}
              placeholder="بلدي / هولشتاين / ..."
            />
            <Input
              label="سعر الشراء"
              value={purchasePrice}
              onChangeText={setPurchasePrice}
              placeholder="0"
              keyboardType="numeric"
            />
            <Input
              label="ملاحظات"
              value={notes}
              onChangeText={setNotes}
              placeholder="أي ملاحظات إضافية..."
              multiline
              numberOfLines={3}
              containerStyle={{ height: 80 }}
            />
          </Card>
        )}
      </ScrollView>

      {/* Save Button */}
      <View style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        backgroundColor: Colors.surface,
        paddingHorizontal: Spacing.base,
        paddingBottom: insets.bottom + 12,
        paddingTop: 12,
        borderTopWidth: 1, borderTopColor: Colors.border,
      }}>
        <Button
          label="حفظ وإضافة"
          onPress={handleSave}
          loading={loading}
          disabled={!animalType || !gender || !tagNumber.trim()}
        />
      </View>
    </View>
  );
}
