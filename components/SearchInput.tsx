import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { useTheme } from "../utils/theme";
import { isAndroid } from "@/constants";

export const SearchInput = ({
  value,
  onChangeText,
  onSubmit,
}: {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.border }]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder="Search for a word..."
        placeholderTextColor={colors.secondary}
        returnKeyType='search'
        style={[styles.input, { color: colors.text }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingVertical: 3,
    // marginTop: 16,
    marginBottom: 5,
    marginHorizontal: 20,
  },
  input: {
    fontSize: 16,
    fontFamily: "System",
    height: 35,
  },
});
