import { useColorScheme } from "react-native";

const darkTheme = {
    isDark: true,
    colors: {
      background: "#050505",
      text: "#FFFFFF",
      primary: "#09c380",
      lightPrimary: "#09c38020",
      secondary: "#757575",
      border: "#3A3A3A"
    },
  };

  const lightTheme = {
    isDark: false,
    colors: {
      background: "#FFFFFF",
      text: "#2D2D2D",
      primary: "#09c380",
      lightPrimary:"#09c38030",
      secondary: "#757575",
      border: "#F4F4F4"
    },
  };
export const useTheme = () => {
  const systemTheme = useColorScheme();
  return systemTheme === "dark"? darkTheme: lightTheme;
};
