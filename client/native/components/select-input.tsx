import React, { Dispatch, SetStateAction, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { MaterialIcons } from "@expo/vector-icons";

type DropdownProps = {
  label: string;
  value: string | null;
  items: { label: string; value: string }[];
  placeholder?: string;
  zIndex?: number;
  setValue: Dispatch<SetStateAction<string | null>>;
};

const Dropdown = ({
  label,
  value,
  items,
  placeholder,
  zIndex,
  setValue,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <View style={{ zIndex }}>
      <Text style={styles.label}>{label}</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        placeholder={placeholder}
        style={styles.dropdownInput}
        placeholderStyle={{ color: "#535C91" }}
        showArrowIcon
        ArrowDownIconComponent={() => (
          <MaterialIcons name="keyboard-arrow-down" size={24} color="#9290C3" />
        )}
        ArrowUpIconComponent={() => (
          <MaterialIcons name="keyboard-arrow-up" size={24} color="#9290C3" />
        )}
        dropDownContainerStyle={{ zIndex: 1000 }}
        labelStyle={{ color: "#9290C3" }}
      />
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  dropdownInput: {
    backgroundColor: "#070F2B",
    borderColor: "#9290C3",
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
    zIndex: 1000,
  },
  label: {
    color: "#9290C3",
    fontSize: 16,
    marginBottom: 2,
  },
});
