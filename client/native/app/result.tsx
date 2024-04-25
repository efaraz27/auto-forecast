import { useLocalSearchParams } from "expo-router";
import { Image, Dimensions, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome6 } from "@expo/vector-icons";
import { ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function Result() {
  const params = useLocalSearchParams();
  const inputs = {
    Brand: params.brand,
    Location: params.location,
    Year: params.year,
    "Kms Driven": params.kmsDriven,
    "Fuel Type": params.fuelType,
    Transmission: params.transmission,
    "Owner Type": params.ownerType,
    "Mileage (Kmpl)": params.mileage,
    "Engine (CC)": params.engine,
    "Power (bhp)": params.power,
    Seats: params.seats,
    "Car age (Years)": params.carAge,
  };

  const { width, height } = Dimensions.get("window");

  return (
    <>
      <StatusBar style="light" />
      <SafeAreaView style={styles.container}>
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
        <Text style={styles.header}>Result</Text>
        <ScrollView>
          {params.prediction && (
            <View style={styles.resultContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
              >
                <FontAwesome6 name="money-bills" size={24} color="white" />
                <Text style={styles.predictedPrice}>Predicted Price</Text>
              </View>
              <Text style={styles.prediction}>
                ₹ {new Intl.NumberFormat().format(Number(params.prediction))}
              </Text>
            </View>
          )}
          <View style={styles.resultContainer}>
            <Text style={styles.predictedPrice}>Input Parameters</Text>
            {Object.keys(inputs).map((key: string) => (
              <Text style={styles.prediction} key={key}>
                {key}: {inputs[key as keyof typeof inputs]}
              </Text>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#111111",
    padding: 16,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF3F02",
    marginTop: 32,
    marginBottom: 48,
  },
  resultContainer: {
    marginBottom: 32,
    backgroundColor: "#3C140B",
    padding: 16,
    borderRadius: 8,
    borderColor: "#FF3F02",
    borderWidth: 1,
  },
  predictedPrice: {
    fontSize: 36,
    color: "#FFFFFF",
  },
  prediction: {
    marginTop: 16,
    fontSize: 18,
    color: "#FFFFFF",
  },
});
