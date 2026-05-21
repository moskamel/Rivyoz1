import React, { useState, useMemo } from 'react';
import { View, ScrollView, TextInput, Pressable, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../components/ui/Text';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { EmptyState } from '../../components/ui/EmptyState';
import { useAnimalsStore, Animal } from '../../stores/animals';
import { useFarmStore } from '../../stores/farm';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { ANIMAL_TYPES, animalAgeAr } from '../../constants/arabic';

const FILTER_CHIPS = [
  { key: 'all', label: 'الكل' },
  { key: 'cow', label: 'أبقار' },
  { key: 'buffalo', label: 'جاموس' },
  { key: 'sheep', label: 'أغنام' },
  { key: 'poultry', label: 'دواجن' },
  { key: 'sick', label: 'مريض 🔴' },
];

function AnimalCard({ animal, onPress }: { animal: Animal; onPress: () => void }) {
  const typeInfo = ANIMAL_TYPES[animal.animal_type as keyof typeof ANIMAL_TYPES];
  const color = typeInfo?.color ?? Colors.primary;
  const icon = typeInfo?.icon ?? '🐄';

  const conditionBadge = () => {
    if (animal.current_condition === 'sick') return <Badge label="مريض" variant="danger" />;
    if (animal.current_condition === 'pregnant') return <Badge label="حامل" variant="warning" />;
    return null;
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        backgroundColor: Colors.surface,
        borderRadius: 18,
        overflow: 'hidden',
        marginBottom: 10,
        opacity: pressed ? 0.92 : 1,
        shadowColor: '#1A2E1B',
        shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
      })}
    >
      {/* Color bar */}
      <View style={{ height: 4, backgroundColor: color }} />

      <View style={{ padding: 14, flexDirection: 'row-reverse', alignItems: 'center', gap: 12 }}>
        {/* Icon circle */}
        <View style={{
          width: 48, height: 48, borderRadius: 24,
          backgroundColor: color + '18',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <Text size="xl">{icon}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text weight="bold" size="md">{animal.name ?? animal.tag_number}</Text>
            {conditionBadge()}
          </View>
          <View style={{ flexDirection: 'row-reverse', gap: 8, marginTop: 4, alignItems: 'center' }}>
            <Text size="xs" color={Colors.textSecondary}>
              {animal.gender === 'female' ? '♀ أنثى' : '♂ ذكر'}
            </Text>
            {animal.name && (
              <Text size="xs" color={Colors.textTertiary}>• {animal.tag_number}</Text>
            )}
            {animal.birth_date && (
              <Text size="xs" color={Colors.textTertiary}>
                • {animalAgeAr(new Date(animal.birth_date))}
              </Text>
            )}
          </View>
        </View>

        <Ionicons name="chevron-back" size={18} color={Colors.textTertiary} />
      </View>
    </Pressable>
  );
}

export default function AnimalsScreen() {
  const insets = useSafeAreaInsets();
  const { farm } = useFarmStore();
  const { animals } = useAnimalsStore();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  const filtered = useMemo(() => {
    return animals.filter((a) => {
      const matchSearch = !search ||
        a.tag_number.includes(search) ||
        (a.name?.includes(search) ?? false) ||
        (a.breed?.includes(search) ?? false);

      const matchFilter =
        filter === 'all' ? true :
        filter === 'sick' ? a.current_condition === 'sick' :
        a.animal_type === filter;

      return matchSearch && matchFilter;
    });
  }, [animals, search, filter]);

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
          <Text weight="bold" size="xl">قطيعي</Text>
          <View style={{ flexDirection: 'row-reverse', gap: 8, alignItems: 'center' }}>
            <Badge label={`${animals.length} رأس`} variant="info" />
            <Pressable
              onPress={() => router.push('/animal/add')}
              style={{
                width: 36, height: 36, borderRadius: 18,
                backgroundColor: Colors.primary,
                alignItems: 'center', justifyContent: 'center',
              }}
            >
              <Ionicons name="add" size={22} color="#fff" />
            </Pressable>
          </View>
        </View>

        {/* Search */}
        <View style={{
          flexDirection: 'row-reverse',
          alignItems: 'center',
          backgroundColor: Colors.background,
          borderRadius: 14,
          paddingHorizontal: 12,
          gap: 8,
          borderWidth: 1,
          borderColor: Colors.border,
          marginBottom: 12,
        }}>
          <Ionicons name="search-outline" size={18} color={Colors.textTertiary} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="ابحث برقم أو اسم..."
            placeholderTextColor={Colors.textPlaceholder}
            textAlign="right"
            style={{
              flex: 1, paddingVertical: 10,
              fontFamily: Typography.fontFamily.regular,
              fontSize: Typography.size.base,
              color: Colors.textPrimary,
            }}
          />
        </View>

        {/* Filter Chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
          {FILTER_CHIPS.map((chip) => (
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

      {/* List */}
      {filtered.length === 0 ? (
        <EmptyState
          icon="🐄"
          title={animals.length === 0 ? 'لا حيوانات بعد' : 'لا نتائج'}
          message={animals.length === 0
            ? 'أضف أول حيوان وابدأ تتبع أرباحك تلقائياً'
            : 'جرب بحثاً مختلفاً أو فلتراً آخر'}
          actionLabel={animals.length === 0 ? 'إضافة حيوان' : undefined}
          onAction={animals.length === 0 ? () => router.push('/animal/add') : undefined}
        />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(a) => a.id}
          renderItem={({ item }) => (
            <AnimalCard
              animal={item}
              onPress={() => router.push(`/animal/${item.id}`)}
            />
          )}
          contentContainerStyle={{
            padding: Spacing.base,
            paddingBottom: 100,
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
