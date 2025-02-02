import { useColorScheme } from "react-native";

const darkTheme = {
    isDark: true,
    colors: {
      background: "#050505",
      text: "#FFFFFF",
      primary: "#2FE7A4",
      lightPrimary: "#153F38",
      secondary: "#757575",
      border: "#3A3A3A"
    },
  };

  const lightTheme = {
    isDark: false,
    colors: {
      background: "#FFFFFF",
      text: "#2D2D2D",
      primary: "#2FE7A4",
      lightPrimary:"#D1FBF1",
      secondary: "#757575",
      border: "#F4F4F4"
    },
  };
export const useTheme = () => {
  const systemTheme = useColorScheme();
  return systemTheme === "dark"? darkTheme: lightTheme;
};
