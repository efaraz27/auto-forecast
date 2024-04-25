import { StatusBar } from "expo-status-bar";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTextInput from "../components/text-input";
import CustomSelectInput from "../components/select-input";
import { useState } from "react";
import { ScrollView } from "react-native";
import { useRouter } from "expo-router";

const allowedBrands = [
  "Select Brand",
  "Maruti",
  "Hyundai",
  "Honda",
  "Audi",
  "Nissan",
  "Toyota",
  "Volkswagen",
  "Tata",
  "Land",
  "Mitsubishi",
  "Renault",
  "Mercedes-Benz",
  "BMW",
  "Mahindra",
  "Ford",
  "Porsche",
  "Datsun",
  "Jaguar",
  "Volvo",
  "Chevrolet",
  "Skoda",
  "Mini",
  "Fiat",
  "Jeep",
];
const allowedLocations = [
  "Select Location",
  "Mumbai",
  "Pune",
  "Chennai",
  "Coimbatore",
  "Hyderabad",
  "Jaipur",
  "Kochi",
  "Kolkata",
  "Delhi",
  "Bangalore",
  "Ahmedabad",
];
const allowedFuelTypes = ["Select Fuel Type", "CNG", "Diesel", "Petrol", "LPG"];
const allowedTransmissions = ["Select Transmission", "Manual", "Automatic"];
const allowedOwnerTypes = [
  "Select Owner Type",
  "First",
  "Second",
  "Fourth & Above",
  "Third",
];

const brandItems = allowedBrands.map((brand) => ({
  label: brand,
  value: brand,
}));
const locationItems = allowedLocations.map((location) => ({
  label: location,
  value: location,
}));
const fuelTypeItems = allowedFuelTypes.map((fuelType) => ({
  label: fuelType,
  value: fuelType,
}));
const transmissionItems = allowedTransmissions.map((transmission) => ({
  label: transmission,
  value: transmission,
}));
const ownerTypeItems = allowedOwnerTypes.map((ownerType) => ({
  label: ownerType,
  value: ownerType,
}));

export default function Predict() {
  const router = useRouter();

  const [brand, setBrand] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [year, setYear] = useState<number | undefined>(undefined);
  const [kmsDriven, setKmsDriven] = useState<number | undefined>(undefined);
  const [fuelType, setFuelType] = useState<string | null>(null);
  const [transmission, setTransmission] = useState<string | null>(null);
  const [ownerType, setOwnerType] = useState<string | null>(null);
  const [mileage, setMileage] = useState<number | undefined>(undefined);
  const [engine, setEngine] = useState<number | undefined>(undefined);
  const [maxPower, setMaxPower] = useState<number | undefined>(undefined);
  const [seats, setSeats] = useState<number | undefined>(undefined);
  const [carAge, setCarAge] = useState<number | undefined>(undefined);

  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setPredictedPrice(null);
    setLoading(true);
    if (brand === "") {
      setError("Please select a brand");
      return;
    }
    if (location === "") {
      setError("Please select a location");
      return;
    }
    if (year === 0) {
      setError("Please enter year");
      return;
    }
    if (kmsDriven === 0) {
      setError("Please enter kilometers driven");
      return;
    }
    if (fuelType === "") {
      setError("Please select fuel type");
      return;
    }
    if (transmission === "") {
      setError("Please select transmission");
      return;
    }
    if (ownerType === "") {
      setError("Please select owner type");
      return;
    }
    if (mileage === 0) {
      setError("Please enter mileage");
      return;
    }
    if (engine === 0) {
      setError("Please enter engine");
      return;
    }
    if (maxPower === 0) {
      setError("Please enter power");
      return;
    }
    if (seats === 0) {
      setError("Please enter seats");
      return;
    }
    if (carAge === 0) {
      setError("Please enter car age");
      return;
    }
    await fetch("https://auto-forecast.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: brand,
        location,
        year,
        kilometers_driven: kmsDriven,
        fuel_type: fuelType,
        transmission,
        owner_type: ownerType,
        mileage,
        engine,
        max_power: maxPower,
        seats,
        age: carAge,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        if (data.prediction) {
          setPredictedPrice(data.prediction);
          router.push({
            pathname: "/result",
            params: {
              prediction: data.prediction,
              brand,
              location,
              year,
              kmsDriven,
              fuelType,
              transmission,
              ownerType,
              mileage,
              engine,
              maxPower,
              seats,
              carAge,
            },
          });
        } else {
          setError("Error predicting price");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError("Error predicting price");
      });
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
        <Text style={styles.header}>Predict</Text>
        <ScrollView contentContainerStyle={styles.inputs}>
          <CustomSelectInput
            label="Car Brand"
            items={brandItems}
            value={brand}
            setValue={setBrand}
            zIndex={1000}
          />
          <CustomSelectInput
            label="Location"
            items={locationItems}
            value={location}
            setValue={setLocation}
            zIndex={900}
          />
          <CustomTextInput
            placeholder="Year"
            label="Year"
            value={year}
            type="number"
            onChangeText={(text) => setYear(Number(text))}
          />
          <CustomTextInput
            placeholder="Kms Driven"
            label="Kms Driven"
            value={kmsDriven}
            type="number"
            onChangeText={(text) => setKmsDriven(Number(text))}
          />
          <CustomSelectInput
            label="Fuel Type"
            items={fuelTypeItems}
            value={fuelType}
            setValue={setFuelType}
            zIndex={800}
          />
          <CustomSelectInput
            label="Transmission"
            items={transmissionItems}
            value={transmission}
            setValue={setTransmission}
            zIndex={700}
          />
          <CustomSelectInput
            label="Owner Type"
            items={ownerTypeItems}
            value={ownerType}
            setValue={setOwnerType}
            zIndex={600}
          />
          <CustomTextInput
            placeholder="Mileage (Kmpl)"
            label="Mileage (Kmpl)"
            value={mileage}
            type="number"
            onChangeText={(text) => setMileage(Number(text))}
          />
          <CustomTextInput
            placeholder="Engine (CC)"
            label="Engine (CC)"
            value={engine}
            type="number"
            onChangeText={(text) => setEngine(Number(text))}
          />
          <CustomTextInput
            placeholder="Max Power (bhp)"
            label="Max Power (bhp)"
            value={maxPower}
            type="number"
            onChangeText={(text) => setMaxPower(Number(text))}
          />
          <CustomTextInput
            placeholder="Seats"
            label="Seats"
            value={seats}
            type="number"
            onChangeText={(text) => setSeats(Number(text))}
          />
          <CustomTextInput
            placeholder="Car Age (Years)"
            label="Car Age (Years)"
            value={carAge}
            type="number"
            onChangeText={(text) => setCarAge(Number(text))}
          />
        </ScrollView>
        {error && <Text style={{ color: "#FF0000" }}>{error}</Text>}
        <TouchableOpacity
          style={styles.predictBtn}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={{ color: "#FFFFFF" }}>
            {loading ? "Predicting..." : "Predict"}
          </Text>
        </TouchableOpacity>
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
  inputs: {
    gap: 16,
  },
  predictBtn: {
    backgroundColor: "#FF3F02",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 32,
  },
});
