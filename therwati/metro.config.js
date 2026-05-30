const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

const originalResolveRequest = config.resolver.resolveRequest;

// Redirect react-native-screens' Screen.js to a patched version that omits
// sheetAllowedDetents for non-formSheet screens, preventing a Fabric crash in
// Expo Go SDK 54 (iOS expects Float, Android expects Array, string 'large' fails both).
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (
    context.originModulePath.includes('/react-native-screens/') &&
    (moduleName === './components/Screen' || moduleName === '../components/Screen')
  ) {
    return {
      filePath: path.resolve(__dirname, 'src/patches/ScreenPatch.js'),
      type: 'sourceFile',
    };
  }
  if (originalResolveRequest) {
    return originalResolveRequest(context, moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;
