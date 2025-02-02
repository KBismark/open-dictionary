export interface Phonetic {
  text: string;
  audio?: string;
}

export interface Definition {
  definition: string;
  example?: string;
}

export interface Meaning {
  partOfSpeech: string;
  definitions: Definition[];
  synonyms?: string[];
  antonyms?: string[];
}

export interface DictionaryEntry {
  word: string;
  phonetics: Phonetic[];
  meanings: Meaning[];
}

