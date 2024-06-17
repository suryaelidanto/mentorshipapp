import { createTheme, lightColors } from "@rneui/themed";
import { Platform } from "react-native";

export const RNETheme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
    primary: "#00ADB5",
    secondary: "#393E46",
    grey0: "#EEEEEE",
    black: "#222831",
    background: "#FFFFFF",
  },
  components: {
    Text: {
      style: {
        fontFamily: "RobotoMono_500Medium",
        color: "#222831",
      },
    },
    Button: {
      style: {
        backgroundColor: "#00ADB5",
      },
    },
  },
});
