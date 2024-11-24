import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { forwardRef, useCallback } from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { Colors } from '@src/styles/colors';

export type BottomModalRefType = React.RefObject<BottomSheetModalMethods>;

interface FilterModalProps {
  title: string;
  children: React.ReactNode;
  snapPoints: string[] | number[];
  onClear: () => void;
  onDismiss: () => void;
}

const FilterModal = forwardRef<BottomSheetModal, FilterModalProps>(
  ({ title, children, snapPoints, onClear, onDismiss }, ref) => {
    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          opacity={0.4}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          {...props}
        />
      ),
      []
    );

    return (
      <BottomSheetModal
        ref={ref}
        snapPoints={snapPoints}
        style={s.container}
        onDismiss={onDismiss}
        backdropComponent={renderBackdrop}
      >
        <View style={s.header}>
          <Text style={s.title}>{title}</Text>
          <Pressable onPress={onClear}>
            <Text style={s.clear}>Clear all</Text>
          </Pressable>
        </View>
        <BottomSheetScrollView style={s.scroll}>
          {children}
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

export default FilterModal;

const s = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginBottom: 16
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  clear: {
    color: Colors.GRAPHITE
  },
  scroll: {
    marginTop: 20,
    marginBottom: 30
  }
});
