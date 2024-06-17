import { useFonts } from "expo-font";
import { RobotoMono_500Medium } from "@expo-google-fonts/dev";

export const loadFonts = () => {
  let [fontsLoaded] = useFonts({
    RobotoMono_500Medium,
  });

  return fontsLoaded;
};
