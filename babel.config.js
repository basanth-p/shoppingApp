module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Required for expo-router
      'expo-router/babel',
      // Temporarily disabled react-native-reanimated plugin due to compatibility issues
      // 'react-native-reanimated/plugin',
    ],
  };
};