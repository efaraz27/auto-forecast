import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";
import { SplashScreen, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import { useCallback } from "react";

export default function App() {
  const { push } = useRouter();

  const [fontsLoaded, fontError] = useFonts({
    WorkSans: require("../assets/WorkSans.ttf"),
    PlayFair: require("../assets/Playfair.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handlePress = () => {
    push("predict");
  };

  const { width, height } = Dimensions.get("window");

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
        <Image
          style={{
            opacity: 1,
            flex: 1,
            width,
            height,
            margin: 0,
            padding: 0,
            position: "absolute",
            top: 0,
            left: 0,
          }}
          source={require("../assets/background.png")}
        />
        <Image
          source={require("../assets/mercedes.png")}
          style={styles.image}
        />
        <Text style={styles.punchline}>
          Explore & Find a{" "}
          <Text
            style={{
              color: "#FF3F02",
              fontFamily: "PlayFair",
            }}
          >
            perfect
          </Text>{" "}
          car for you
        </Text>
        <Text style={styles.description}>
          Auto Forecast streamlines your car buying and selling. Get the best
          deals with real-time market insights in just a few taps.
        </Text>
        <TouchableOpacity style={styles.arrow} onPress={handlePress}>
          <AntDesign name="arrowright" size={24} color="white" />
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    alignItems: "center",
  },
  image: {
    marginTop: 48,
    height: 350,
    width: "100%",
    transform: [{ translateX: -190 }],
    overflow: "visible",
  },
  punchline: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 48,
    marginHorizontal: 12,
    color: "#FF3F02",
    fontFamily: "WorkSans",
    letterSpacing: 0.0000000000000000000001,
    alignSelf: "flex-start",
  },
  description: {
    fontSize: 16,
    color: "#ffff",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
    fontFamily: "WorkSans",
  },
  arrow: {
    padding: 16,
    borderRadius: 50,
    backgroundColor: "#FF3F02",
    marginTop: "auto",
    marginLeft: "auto",
    marginBottom: 32,
    marginRight: 16,
  },
});
