import { createTheme, lightColors } from "@rneui/themed";
import { Platform } from "react-native";

export const RNETheme = createTheme({
  lightColors: {
    ...Platform.select({
      default: lightColors.platform.android,
      ios: lightColors.platform.ios,
    }),
    primary: "#00ADB5",
    black: "#222831",
    background: "#FFFFFF",
  },
  components: {
    Text: {
      style: {
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

// colors: {
//     text: "#222831",
//     card: "#393E46",
//     primary: "#00ADB5",
//     background: "#FFFFFF",
//   },
