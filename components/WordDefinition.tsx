
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../utils/theme";
import { DictionaryEntry } from "../types";
import { ToSearchableWords } from "./SearchableWord";
import { Audio } from "expo-av";

export const WordDefinition = ({ entry }: { entry: DictionaryEntry }) => {
  const { colors } = useTheme();
   const [sound, setSound] = useState<Audio.Sound>();

   useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playAudio = async (audioUrl: string) => {
     try {
       const { sound } = await Audio.Sound.createAsync( { uri: audioUrl });
       setSound(sound);
      
      // Play the audio
      await sound.playAsync();
      
    } catch (error) {/* Errored: Couldn't play sound */}


  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={[styles.word, { color: colors.text }]}>
            {entry.word}
          </Text>
          <Text style={[styles.phonetic, { color: colors.primary }]}>
            {entry.phonetics[0]?.text}
          </Text>
        </View>
        {entry.phonetics[0]?.audio && (
          <TouchableOpacity
            onPress={() => playAudio(entry.phonetics[0].audio!)}
            style={[styles.playButton, { backgroundColor: colors.lightPrimary }]}
          >
            <Ionicons name="play" size={24} color={colors.primary} />
          </TouchableOpacity>
        )}
      </View>

      {entry.meanings.map((meaning, index) => (
        <View key={index} style={styles.meaningContainer}>
          <Text style={[styles.partOfSpeech, { color: colors.text }]}>{meaning.partOfSpeech}</Text>

          <Text style={[styles.meaningTitle, { color: colors.secondary }]}>Meaning</Text>

          {meaning.definitions.map((def, defIndex) => (
            <View key={defIndex} style={styles.definitionContainer}>
              <View style={styles.actualDefinitionContainer}>
                <Text style={[styles.point, {color: colors.primary, }]}>•</Text>
                <Text><ToSearchableWords words={def.definition} styles={[styles.definition, { color: colors.text }]} /></Text>
              </View>
              {def.example && (
                <Text style={styles.exampleConatiner}><ToSearchableWords words={`"${def.example}"`} styles={[styles.example, { color: colors.secondary }]} /></Text>
              )}
            </View>
          ))}

          {
            (meaning.synonyms && meaning.synonyms.length) &&
            <View style={styles.synonymContainer}>
              <Text style={[styles.synonymHeading, { color: colors.secondary}]}>Synonyms</Text>
              <Text style={{width: '100%'}}>{
                  meaning.synonyms.map((synonym, index) => (
                    <ToSearchableWords treatAsOne={true} key={`${synonym}-${index}`} words={synonym} styles={[styles.definition, styles.synonym, { color: colors.primary }]} />
                  ))
              }</Text>
            </View>
          }

          {
            (meaning.antonyms && meaning.antonyms.length) &&
            <View style={styles.synonymContainer}>
              <Text style={[styles.synonymHeading, { color: colors.secondary }]}> Antonyms</Text>
              <Text style={{width: '100%'}}>{
                  meaning.antonyms.map((antonym, index) => (
                    <ToSearchableWords treatAsOne={true} key={`${antonym}-${index}`} words={antonym} styles={[styles.definition, styles.synonym, { color: colors.primary }]} />

                  ))
              }</Text>
            </View>
          }

        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  word: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
  },
  phonetic: {
    fontSize: 18,
  },
  playButton: {
    padding: 20,
    borderRadius: 50,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  meaningContainer: {
    marginBottom: 24,
  },
  partOfSpeech: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },
  meaningTitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  definitionContainer: {
    marginBottom: 12,
  },
  actualDefinitionContainer: {
    flexDirection: 'row', alignItems: 'flex-start',
  },
  point:{fontSize: 25,marginRight: 8, marginTop: 1},
  definition: {
    fontSize: 16,
    lineHeight: 24,
  },
  exampleConatiner: {
    marginLeft: 15,
    marginTop: 8,
  },
  example: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  synonymContainer: {
    marginTop: 28,
  },
  synonymHeading: {
    marginRight: 8, marginTop: 5, marginBottom: 10, fontSize: 16
  },
  synonym: {
    marginRight: 5,
    fontStyle: 'italic',
  },
});