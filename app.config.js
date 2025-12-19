export default {
  expo: {
    name: "WakeWatch",
    slug: "wakewatch",
    version: "1.0.0",
    orientation: "portrait",
    userInterfaceStyle: "light",
    splash: {
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true
    },
    android: {
      adaptiveIcon: {
        backgroundColor: "#FFFFFF"
      }
    },
    web: {
      display: "standalone",
      orientation: "portrait",
      startUrl: "/",
      backgroundColor: "#ffffff",
      themeColor: "#ffffff",
      name: "WakeWatch",
      shortName: "WakeWatch",
      description: "Progressive Web App for sleep tracking and wellness",
      lang: "en",
      scope: "/",
      bundler: "webpack",
      config: {
        webpack: {
          mode: "production"
        }
      }
    }
  }
};
