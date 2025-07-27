const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');

const defaultConfig = getDefaultConfig(__dirname);

// Add SVG transformer
const { assetExts, sourceExts } = defaultConfig.resolver;
defaultConfig.resolver.assetExts = assetExts.filter(ext => ext !== 'svg');
defaultConfig.resolver.sourceExts = [...sourceExts, 'svg'];
defaultConfig.transformer = {
  ...defaultConfig.transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};

module.exports = withNativeWind(defaultConfig, { input: './app/globals.css' })
