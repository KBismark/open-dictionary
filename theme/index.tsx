/* ---------- Unused custom theme hooks ---------- */

import { createContext, useContext, useState } from "react";


const themeObject: {lightColors: Theme; darkColors: Theme} = {
    lightColors: {
        mode: 'light',
        colors: {
            primary: '#2667FF', 
            secondary:'#2667FF',
            dark: '#020202',
            white: '#ffffff',
            grey1: '#60636c',
            divider: '#eee',
    
            // gray
            grey3: '#ADD7F6',
            grey4: 'rgba(173, 216, 246, 0.12)',
            grey5: 'rgba(173, 216, 246, 0.12)',

            // danger: 'FF5252'
    
        },
    },
    darkColors: {
        mode: 'dark',
        colors: {
            primary: '#2667FF',
            secondary:'#2667FF',
            dark: '#020202',
            white: '#ffffff',
            grey1: '#60636c',
            divider: '#eee',
    
            // gray
            grey3: '#ADD7F6',
            grey4: 'rgba(173, 216, 246, 0.12)',
            grey5: 'rgba(173, 216, 246, 0.12)'
    
        },
    },
}


const THEME = createContext(themeObject.lightColors)

export const useTheme = (): Theme =>{
    return useContext(THEME);
}

export const useMode = ()=>{
   return useContext(THEME).mode
}

// This function will be reassigned state setter function
// When called, the theme provider component rerenders to apply new theme mode
let globalThemeEventTrigger = (theme: Theme)=>{}

let currentThemeMode: Modes = 'light' // Keeps track of current theme

export const setThemeMode = (mode: Modes)=>{
    if(currentThemeMode===mode) return
    if(mode==='dark'){
        currentThemeMode = 'dark'
        globalThemeEventTrigger(themeObject.darkColors)
    }else{
        currentThemeMode = 'light'
        globalThemeEventTrigger(themeObject.lightColors)
    }
}

export const ThemeProvider = (props: any)=>{
    let theme: Theme;
    [theme, globalThemeEventTrigger] = useState(themeObject.lightColors) as any
    return (
        <THEME.Provider value={theme}>
            {props.children}
        </THEME.Provider>
    )
}


type Theme = {
    colors: {
        primary: string;
        secondary: string;
        dark: string;
        white: string;
        grey1: string;
        divider: string;
        grey3: string;
        grey4: string;
        grey5: string;
    };
    mode: Modes
}

type Modes =  'light'|'dark'