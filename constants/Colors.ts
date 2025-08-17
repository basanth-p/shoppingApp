/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const primaryBlue = '#3B82F6'; // Main blue color
const primaryOrange = '#FB923C'; // Main orange color
const tintColorLight = primaryBlue;
const tintColorDark = '#fff';

export const Colors = {
  primary: {
    blue: primaryBlue,
    orange: primaryOrange,
    blueLight: '#60A5FA',
    blueDark: '#1E40AF',
    orangeLight: '#FED7AA',
    orangeDark: '#EA580C',
  },
  light: {
    text: '#11181C',
    background: '#fff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    primary: primaryBlue,
    secondary: primaryOrange,
    textSecondary: '#6B7280',
    cardBackground: '#F9FAFB',
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
    primary: primaryBlue,
    secondary: primaryOrange,
    textSecondary: '#9CA3AF',
    cardBackground: '#1F2937',
  },
};
