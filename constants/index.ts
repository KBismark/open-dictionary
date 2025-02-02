import { Dimensions, Platform } from "react-native";

export const isAndroid = Platform.OS === 'android'
export const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('screen')
export const screenTopPadding = isAndroid?40:SCREEN_HEIGHT*0.045;
