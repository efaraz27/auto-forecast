import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "expo-image";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const { push } = useRouter();

  const handlePress = () => {
    push("predict");
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Image
          source={require("../assets/mercedes.png")}
          style={styles.image}
        />
        <Text style={styles.punchline}>
          Explore & Find a perfect car for you
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
    backgroundColor: "#070F2B",
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
    marginHorizontal: 4,
    color: "#9290C3",
  },
  description: {
    fontSize: 16,
    color: "#9290C3",
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  arrow: {
    padding: 16,
    borderRadius: 50,
    backgroundColor: "#FF204E",
    marginTop: "auto",
    marginLeft: "auto",
    marginBottom: 32,
    marginRight: 16,
  },
});
