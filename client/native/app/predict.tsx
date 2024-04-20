import { StatusBar } from "expo-status-bar";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTextInput from "../components/text-input";
import CustomSelectInput from "../components/select-input";
import { useState } from "react";
import { ScrollView } from "react-native";

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
  const [brand, setBrand] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [year, setYear] = useState<number>(0);
  const [kmsDriven, setKmsDriven] = useState<number>(0);
  const [fuelType, setFuelType] = useState<string | null>(null);
  const [transmission, setTransmission] = useState<string | null>(null);
  const [ownerType, setOwnerType] = useState<string | null>(null);
  const [mileage, setMileage] = useState<number>(0);
  const [engine, setEngine] = useState<number>(0);
  const [maxPower, setMaxPower] = useState<number>(0);
  const [seats, setSeats] = useState<number>(0);
  const [carAge, setCarAge] = useState<number>(0);

  const [predictedPrice, setPredictedPrice] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <>
      <SafeAreaView style={styles.container}>
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
            placeholder="Mileage"
            label="Mileage"
            value={mileage}
            type="number"
            onChangeText={(text) => setMileage(Number(text))}
          />
          <CustomTextInput
            placeholder="Engine"
            label="Engine"
            value={engine}
            type="number"
            onChangeText={(text) => setEngine(Number(text))}
          />
          <CustomTextInput
            placeholder="Max Power"
            label="Max Power"
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
            placeholder="Car Age"
            label="Car Age"
            value={carAge}
            type="number"
            onChangeText={(text) => setCarAge(Number(text))}
          />
        </ScrollView>
        <Text style={{ color: "#FF0000" }}>{error}</Text>
        <Text style={{ color: "#FF0000" }}>{predictedPrice}</Text>
        <TouchableOpacity style={styles.predictBtn}>
          <Text style={{ color: "#FFFFFF" }}>Predict</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070F2B",
    padding: 16,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#9290C3",
    marginTop: 32,
    marginBottom: 48,
  },
  inputs: {
    gap: 16,
  },
  predictBtn: {
    backgroundColor: "#FF204E",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 32,
  },
});
