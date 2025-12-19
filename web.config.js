const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function(env, argv) {
  const config = await createExpoWebpackConfigAsync({
    ...env,
    babel: {
      dangerouslyAddModulePathsToTranspile: ['@expo/vector-icons']
    }
  }, argv);

  // Add CSS for proper scrolling and touch handling
  config.module.rules.push({
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
  });

  return config;
};
