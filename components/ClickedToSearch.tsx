import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, ImageBackground, Text, ActivityIndicator, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "../utils/theme";
import { SearchInput } from "./SearchInput";
import { WordDefinition } from "./WordDefinition";
import { DictionaryEntry } from "../types";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ClickedSearch({ word }: { word: string }) {
  const { colors, isDark } = useTheme();
  const [searchTerm, setSearchTerm] = useState(word);
  const [result, setResult] = useState<DictionaryEntry | null>(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    word.length > 0 && searchWord(word);
  }, [word]);

  const searchWord = async (word?: string) => {
    const term = typeof word === 'string' ? word : searchTerm;
    if (!term.trim()) {
      return; // Can't search for empty string
    }
    setResult(null);
    setSearchTerm(term);
    setSearching(true);

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${term.trim()}`
      );
      const data = await response.json();
      if (data && data[0]) {
        setResult(data[0]);
      }
    } catch (error) {/* No results found */ }
    setSearching(false);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={[{ backgroundColor: colors.primary, paddingVertical: 5 }]}>
          <StatusBar style={'light'} />
          <SearchInput
            value={searchTerm}
            onChangeText={setSearchTerm}
            onSubmit={searchWord}
          />
        </View>
        <ScrollView style={styles.scrollView}>
          {
            result ?
              <WordDefinition entry={result} />
              :
              <View style={{ alignSelf: 'center', marginTop: 60, flexDirection: 'column', alignItems: 'center' }}>
                {
                  searching ?
                    <ActivityIndicator size="large" color={Platform.OS === 'android' ? colors.primary : undefined} />
                    :
                    <>
                      <ImageBackground
                        source={isDark ? require('../assets/images/Empty_Dark_Mode.png') : require('../assets/images/Empty_Light_Mode.png')}
                        style={styles.image}
                      />
                      <Text style={[styles.notFoundText, { color: colors.text }]}>

                        {word.length > 0 ? `No results found` : 'Learn new vocabulary everyday.'}
                      </Text>
                      {word.length < 1 && <Text style={[styles.notFoundText, { color: colors.text, marginTop: 2 }]}>Try searching for a word</Text>}
                    </>

                }
              </View>
          }
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  notFoundText: { textAlign: 'center', marginTop: 20 },
  image: { width: 150, height: 137, }
});
