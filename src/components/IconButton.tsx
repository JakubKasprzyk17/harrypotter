import React from 'react';
import { Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native';

interface IconButtonProps extends PressableProps {
  icon: React.ReactElement<{ color: string; width: number; height: number }>;
  onPress?: () => void;
  disabled?: boolean;
  style?: ViewStyle;
}

const IconButton = ({ icon, onPress, disabled, style }: IconButtonProps) => {
  return (
    <Pressable
      style={style}
      disabled={disabled}
      onPress={onPress}
      hitSlop={{ top: 5, bottom: 5, left: 5, right: 5 }}
    >
      {icon}
    </Pressable>
  );
};

export default IconButton;

const s = StyleSheet.create({});
