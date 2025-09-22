module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Temporarily disabled react-native-reanimated plugin due to compatibility issues
      // 'react-native-reanimated/plugin',
    ],
  };
};