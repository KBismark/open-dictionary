import React, { useMemo } from "react";
import { useTheme } from "../utils/theme";
import { isSearchableWord } from "@/utils/helper";
import { StyleProp, StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { router } from "expo-router";

const SearchableWords = ({words, styles, treatAsOne}: {words: string, treatAsOne?: boolean, styles?: StyleProp<TextStyle>})=>{
    const {colors} = useTheme(); // Needed for the text color change on new theme set
    const data = treatAsOne? [words.trim()] : words.split(" ").map((word)=>word.trim());
    if(data.length === 0) return null;

    return (
        data.map((word, index)=>{
            const onPress = isSearchableWord(word) ? ()=>{
                // Remove any non-alphabetic characters from the start and end of the word
                const filteredWord = word.replace(/^[^a-zA-Z]+/, '').replace(/([^a-zA-Z]+)$/, '');

                // Navigate to the word
                router.push(`/${filteredWord}` as any);

            } : undefined;

            return  (
                <TouchableOpacity key={`${word}-${index}`} style={style.container} onPress={onPress}>
                    <Text style={[styles, style.text]}>{`${word} `}</Text>
                </TouchableOpacity> 
            )
            
        })
    )
}

export const ToSearchableWords = React.memo(SearchableWords, (prevProps, nextProps)=>{ 
    // Ignore style prop changes and only re-render if the words change
    return prevProps.words === nextProps.words;
 });

 const style = StyleSheet.create({
    container: {margin: 0, padding:0},
    text: {paddingTop: 5},
 })