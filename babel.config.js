module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Enable absolute imports
      ['module-resolver', {
        root: ['./src'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@services': './src/services',
          '@utils': './src/utils',
          '@hooks': './src/hooks',
          '@contexts': './src/contexts',
          '@assets': './src/assets'
        }
      }],
      // React Native Reanimated plugin (must be last)
      'react-native-reanimated/plugin'
    ]
  };
};
