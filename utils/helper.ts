
// Returns true if the word is searchable, false otherwise
// Searchable words are words that contain only letters and no special characters
// and are at least 2 characters long
export function isSearchableWord(word: string) {
    return word.length > 1 && /[^a-zA-Z]*[a-zA-Z'\-]+[^a-zA-Z]*/.test(word);
}