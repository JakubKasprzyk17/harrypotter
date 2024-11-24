import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import RNPickerSelect, { Item } from 'react-native-picker-select';
import { Colors } from '@src/styles/colors'; // assuming your colors are imported from this path

interface SelectProps {
  title: string;
  items: Item[];
  value?: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  title,
  items,
  value,
  onValueChange,
  placeholder
}) => {
  const pickerStyle = {
    inputIOS: s.picker,
    inputAndroid: s.picker,
    placeholder: s.placeholder
  };

  return (
    <View style={s.container}>
      <Text style={s.title}>{title}</Text>
      <RNPickerSelect
        style={pickerStyle}
        value={value}
        onValueChange={onValueChange}
        useNativeAndroidPickerStyle={false}
        placeholder={{ label: placeholder || 'Select...', value: null }}
        items={items}
      />
    </View>
  );
};

export default Select;

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 12,
    borderRadius: 10,
    backgroundColor: Colors.BEIGE, // Used Beige for background
    shadowColor: Colors.OBSIDIAN, // Used Obsidian for shadow
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 6,
    borderWidth: 1,
    borderColor: Colors.SILVER // Silver border
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.TEXT_NAVY, // Navy text for the title
    marginBottom: 8
  },
  picker: {
    height: 50,
    borderRadius: 8,
    backgroundColor: Colors.WHITE, // White background for the picker input
    borderWidth: 1,
    borderColor: Colors.GRAPHITE, // Graphite border for picker input
    paddingHorizontal: 12,
    fontSize: 16,
    color: Colors.TEXT_NAVY // Text color as Navy
  },
  placeholder: {
    fontSize: 16,
    color: Colors.ONYX // Placeholder text in Onyx color
  }
});
