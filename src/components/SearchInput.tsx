import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import React, { useState } from 'react';
import Animated from 'react-native-reanimated';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Colors } from '@src/styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

interface SearchInputProps {
  onSearch: (text: string) => void;
  onFilterPress: () => void;
  placeholder?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  onSearch,
  onFilterPress,
  placeholder
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { top } = useSafeAreaInsets();
  const { t } = useTranslation();

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <Animated.View style={[s.container, { paddingTop: top }]}>
      <View style={s.searchWrapper}>
        <FontAwesome
          name="search"
          size={20}
          color={Colors.SILVER}
          style={s.icon}
        />
        <TextInput
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
          placeholder={placeholder}
          placeholderTextColor={Colors.SAND_YELLOW}
          style={s.searchInput}
          numberOfLines={1}
          onEndEditing={handleSearch}
          autoCapitalize="none"
          returnKeyType="search"
        />
      </View>

      <TouchableOpacity
        style={[s.actionButton, s.filterButton]}
        onPress={onFilterPress}
      >
        <FontAwesome name="filter" size={18} color={Colors.SILVER} />
        <Text style={s.actionText}>{t('filter')}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default SearchInput;

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: Colors.OBSIDIAN,
    borderRadius: 16,
    shadowColor: Colors.BLACK,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    marginVertical: 16
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.GRAPHITE,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8
  },
  icon: {
    marginRight: 8
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.TEXT_WHITE
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginLeft: 6
  },
  actionText: {
    fontSize: 14,
    marginLeft: 6,
    fontWeight: '600'
  },
  filterButton: {
    backgroundColor: Colors.BURGUNDY
  }
});
