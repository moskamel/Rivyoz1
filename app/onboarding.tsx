import React, { useState } from 'react';
import { View, ScrollView, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../components/ui/Text';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { useFarmStore } from '../stores/farm';
import { useAnimalsStore } from '../stores/animals';
import { Colors, Spacing, Radius } from '../constants/theme';
import { ANIMAL_TYPES, GOVERNORATES } from '../constants/arabic';

type Step = 1 | 2 | 3;
type AnimalTypeKey = keyof typeof ANIMAL_TYPES;

function StepIndicator({ current, total }: { current: Step; total: number }) {
  return (
    <View style={{ flexDirection: 'row-reverse', gap: 6, justifyContent: 'center', marginBottom: 32 }}>
      {Array.from({ length: total }, (_, i) => (
        <View
          key={i}
          style={{
            height: 4,
            width: current > i ? 32 : 16,
            borderRadius: 2,
            backgroundColor: current > i ? Colors.primary : Colors.border,
          }}
        />
      ))}
    </View>
  );
}

// Step 1 — Select Animal Types
function Step1({ selected, onToggle, onNext }: {
  selected: AnimalTypeKey[];
  onToggle: (k: AnimalTypeKey) => void;
  onNext: () => void;
}) {
  return (
    <View style={{ flex: 1 }}>
      <Text weight="extraBold" size="xxl" style={{ marginBottom: 8 }}>مرحباً! ماذا تربي؟</Text>
      <Text size="base" color={Colors.textSecondary} style={{ marginBottom: 32 }}>
        اختر ما تربيه (يمكنك تحديد أكثر من نوع)
      </Text>

      <View style={{ flexDirection: 'row-reverse', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
        {(Object.entries(ANIMAL_TYPES) as [AnimalTypeKey, typeof ANIMAL_TYPES[AnimalTypeKey]][]).map(([key, val]) => {
          const isSelected = selected.includes(key);
          return (
            <Pressable
              key={key}
              onPress={() => onToggle(key)}
              style={({ pressed }) => ({
                width: '45%',
                paddingVertical: 20,
                borderRadius: Radius.xl,
                backgroundColor: isSelected ? val.color + '18' : Colors.surface,
                borderWidth: 2, borderColor: isSelected ? val.color : Colors.border,
                alignItems: 'center', gap: 8,
                opacity: pressed ? 0.88 : 1,
              })}
            >
              <Text style={{ fontSize: 36 }}>{val.icon}</Text>
              <Text weight={isSelected ? 'bold' : 'regular'} color={isSelected ? val.color : Colors.textPrimary}>
                {val.label}
              </Text>
              {isSelected && (
                <View style={{ position: 'absolute', top: 10, left: 10, width: 22, height: 22, borderRadius: 11, backgroundColor: val.color, alignItems: 'center', justifyContent: 'center' }}>
                  <Ionicons name="checkmark" size={14} color="#fff" />
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      <Text size="xs" color={Colors.textTertiary} align="center" style={{ marginBottom: 24 }}>
        يمكنك إضافة أنواع أخرى لاحقاً
      </Text>

      <Button label="التالي ←" onPress={onNext} disabled={selected.length === 0} />
    </View>
  );
}

// Step 2 — Farm Data
function Step2({ onNext, onSkip }: { onNext: (name: string, gov: string, city?: string) => void; onSkip: () => void }) {
  const [name, setName] = useState('');
  const [governorate, setGovernorate] = useState('');
  const [city, setCity] = useState('');
  const [showGovPicker, setShowGovPicker] = useState(false);

  const canContinue = name.trim().length >= 2 && governorate;

  return (
    <View style={{ flex: 1 }}>
      <Text weight="extraBold" size="xxl" style={{ marginBottom: 8 }}>ما اسم مزرعتك؟</Text>
      <Text size="base" color={Colors.textSecondary} style={{ marginBottom: 32 }}>
        15 ثانية فقط — 3 حقول بسيطة
      </Text>

      <Input
        label="اسم المزرعة"
        required
        value={name}
        onChangeText={setName}
        placeholder="مزرعة الحاج أبو محمد"
        error={name.length > 0 && name.length < 2 ? 'الاسم قصير جداً' : undefined}
      />

      {/* Governorate Picker */}
      <Text weight="medium" size="sm" color={Colors.textSecondary} style={{ marginBottom: 6 }}>
        المحافظة <Text weight="bold" color={Colors.danger}>*</Text>
      </Text>
      <Pressable
        onPress={() => setShowGovPicker(!showGovPicker)}
        style={{
          borderWidth: 1.5, borderColor: governorate ? Colors.primary : Colors.border,
          borderRadius: Radius.lg, paddingHorizontal: 16, paddingVertical: 14,
          flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center',
          backgroundColor: Colors.surface, marginBottom: 12,
        }}
      >
        <Text color={governorate ? Colors.textPrimary : Colors.textPlaceholder}>
          {governorate || 'اختر المحافظة'}
        </Text>
        <Ionicons name={showGovPicker ? 'chevron-up' : 'chevron-down'} size={18} color={Colors.textTertiary} />
      </Pressable>

      {showGovPicker && (
        <View style={{
          borderWidth: 1, borderColor: Colors.border,
          borderRadius: Radius.lg, backgroundColor: Colors.surface,
          maxHeight: 200, marginBottom: 12,
        }}>
          <ScrollView>
            {GOVERNORATES.map((gov) => (
              <Pressable
                key={gov}
                onPress={() => { setGovernorate(gov); setShowGovPicker(false); }}
                style={({ pressed }) => ({
                  paddingHorizontal: 16, paddingVertical: 12,
                  backgroundColor: pressed ? Colors.primaryFaded : 'transparent',
                  borderBottomWidth: 1, borderBottomColor: Colors.divider,
                })}
              >
                <Text size="sm" color={governorate === gov ? Colors.primary : Colors.textPrimary}
                  weight={governorate === gov ? 'semiBold' : 'regular'}>
                  {gov}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}

      <Input
        label="المدينة / القرية"
        value={city}
        onChangeText={setCity}
        placeholder="اختياري"
      />

      <View style={{ gap: 10, marginTop: 8 }}>
        <Button label="التالي ←" onPress={() => onNext(name.trim(), governorate, city.trim() || undefined)} disabled={!canContinue} />
        <Button label="تخطي" variant="ghost" onPress={onSkip} />
      </View>
    </View>
  );
}

// Step 3 — Add First Animal
function Step3({ onFinish, onSkip }: { onFinish: () => void; onSkip: () => void }) {
  const { farm } = useFarmStore();
  const { addAnimal, animals } = useAnimalsStore();
  const [type, setType] = useState<AnimalTypeKey | null>(null);
  const [gender, setGender] = useState<'male' | 'female' | null>(null);
  const [tag, setTag] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!farm || !type || !gender || !tag.trim()) return;
    setLoading(true);
    try {
      await addAnimal(farm.id, { tag_number: tag.trim(), animal_type: type, gender });
      onFinish();
    } catch {
      Alert.alert('خطأ', 'حدث خطأ أثناء الإضافة');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text weight="extraBold" size="xxl" style={{ marginBottom: 8 }}>أضف أول حيوان</Text>
      <Text size="base" color={Colors.textSecondary} style={{ marginBottom: 24 }}>
        3 حقول فقط — الباقي تضيفه لاحقاً
      </Text>

      {/* Type */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }} contentContainerStyle={{ gap: 10 }}>
        {(Object.entries(ANIMAL_TYPES) as [AnimalTypeKey, typeof ANIMAL_TYPES[AnimalTypeKey]][]).map(([key, val]) => (
          <Pressable
            key={key}
            onPress={() => setType(key)}
            style={({ pressed }) => ({
              padding: 12, borderRadius: Radius.lg,
              backgroundColor: type === key ? val.color + '18' : Colors.surface,
              borderWidth: 2, borderColor: type === key ? val.color : Colors.border,
              alignItems: 'center', gap: 4, minWidth: 72,
              opacity: pressed ? 0.88 : 1,
            })}
          >
            <Text size="xl">{val.icon}</Text>
            <Text size="xs" weight={type === key ? 'semiBold' : 'regular'}
              color={type === key ? val.color : Colors.textSecondary} align="center">
              {val.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* Gender */}
      <View style={{ flexDirection: 'row-reverse', gap: 10, marginBottom: 16 }}>
        {[{ k: 'female' as const, l: '♀ أنثى' }, { k: 'male' as const, l: '♂ ذكر' }].map(({ k, l }) => (
          <Pressable
            key={k}
            onPress={() => setGender(k)}
            style={({ pressed }) => ({
              flex: 1, paddingVertical: 14, borderRadius: Radius.lg,
              backgroundColor: gender === k ? Colors.primary : Colors.surface,
              alignItems: 'center', borderWidth: 2,
              borderColor: gender === k ? Colors.primary : Colors.border,
              opacity: pressed ? 0.88 : 1,
            })}
          >
            <Text weight="bold" color={gender === k ? '#fff' : Colors.textSecondary}>{l}</Text>
          </Pressable>
        ))}
      </View>

      <Input
        label="رقم أو اسم الحيوان"
        required
        value={tag}
        onChangeText={setTag}
        placeholder="001 أو بقرة حمدي"
      />

      <View style={{ gap: 10, marginTop: 8 }}>
        <Button
          label="حفظ وابدأ 🎉"
          onPress={handleAdd}
          loading={loading}
          disabled={!type || !gender || !tag.trim()}
        />
        <Button label="تخطي" variant="ghost" onPress={onSkip} />
      </View>
    </View>
  );
}

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const { createFarm } = useFarmStore();
  const [step, setStep] = useState<Step>(1);
  const [selectedTypes, setSelectedTypes] = useState<AnimalTypeKey[]>([]);

  const toggleType = (key: AnimalTypeKey) => {
    setSelectedTypes((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleFarmCreated = async (name: string, gov: string, city?: string) => {
    await createFarm({ name, governorate: gov, city });
    setStep(3);
  };

  const finish = () => router.replace('/(tabs)');

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView
        contentContainerStyle={{
          paddingTop: insets.top + 24,
          paddingHorizontal: Spacing.lg,
          paddingBottom: insets.bottom + 40,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Logo */}
        <View style={{ flexDirection: 'row-reverse', alignItems: 'center', gap: 10, marginBottom: 32 }}>
          <View style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: Colors.primary, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 26 }}>🐄</Text>
          </View>
          <Text weight="extraBold" size="xl" color={Colors.primary}>ثروتي</Text>
        </View>

        <StepIndicator current={step} total={3} />

        {step === 1 && (
          <Step1
            selected={selectedTypes}
            onToggle={toggleType}
            onNext={() => setStep(2)}
          />
        )}
        {step === 2 && (
          <Step2
            onNext={handleFarmCreated}
            onSkip={async () => {
              await createFarm({ name: 'مزرعتي', governorate: 'غير محدد' });
              setStep(3);
            }}
          />
        )}
        {step === 3 && (
          <Step3 onFinish={finish} onSkip={finish} />
        )}
      </ScrollView>
    </View>
  );
}
