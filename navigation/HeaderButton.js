import { Pressable } from "react-native";
import { Ionicons } from '@expo/vector-icons';

export default function HeaderButton({ onPress, title }) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={10}
      Style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1
      })}>
        <Ionicons name={icon} size={24} colo={color}/>
      </Pressable>
  );
}