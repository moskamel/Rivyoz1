import { Tabs } from 'expo-router';
import { View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../components/ui/Text';
import { Colors, Shadow, Typography } from '../../constants/theme';
import { useAlertsStore } from '../../stores/alerts';

function TabIcon({ name, label, focused }: { name: any; label: string; focused: boolean }) {
  return (
    <View style={{ alignItems: 'center', gap: 2, paddingTop: 4 }}>
      <Ionicons
        name={focused ? name : `${name}-outline` as any}
        size={22}
        color={focused ? Colors.primary : Colors.textTertiary}
      />
      <Text
        size="xs"
        weight={focused ? 'semiBold' : 'regular'}
        color={focused ? Colors.primary : Colors.textTertiary}
        align="center"
      >
        {label}
      </Text>
    </View>
  );
}

function FABTab({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -16,
        ...Shadow.lg,
        opacity: pressed ? 0.88 : 1,
        transform: [{ scale: pressed ? 0.96 : 1 }],
      })}
    >
      <Ionicons name="add" size={28} color="#fff" />
    </Pressable>
  );
}

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { unreadCount } = useAlertsStore();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 64 + insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: Colors.surface,
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          ...Shadow.sm,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="home" label="الرئيسية" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="animals"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="paw" label="قطيعي" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          tabBarButton: (props) => <FABTab onPress={props.onPress as (() => void) | undefined} />,
        }}
      />
      <Tabs.Screen
        name="finance"
        options={{
          tabBarIcon: ({ focused }) => <TabIcon name="cash" label="المالية" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="health"
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <TabIcon name="medkit" label="صحة" focused={focused} />
              {unreadCount > 0 && (
                <View style={{
                  position: 'absolute', top: 2, right: -4,
                  width: 16, height: 16, borderRadius: 8,
                  backgroundColor: Colors.danger,
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <Text size="xs" color="#fff" weight="bold" align="center">
                    {unreadCount > 9 ? '9+' : String(unreadCount)}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
