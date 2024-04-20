import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

type CustomTextInputProps = {
  label: string;
  type: "text" | "number";
  placeholder?: string;
  editable?: boolean;
  value?: string | number;
  style?: any;
  onChangeText?: (text: string | number) => void;
};

export default function CustomTextInput({
  label,
  type,
  placeholder,
  editable = true,
  value,
  style,
  onChangeText,
}: CustomTextInputProps) {
  const handleChangeText = (text: string) => {
    let sanitizedText = text;
    if (type === "number") {
      sanitizedText = text.replace(/[^0-9]/g, "");
      onChangeText && onChangeText(Number(sanitizedText));
    }
    onChangeText && onChangeText(text);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={style}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.textInput}>
          <TextInput
            keyboardType={type === "number" ? "numeric" : "default"}
            placeholder={placeholder}
            editable={editable}
            value={value?.toString()}
            onChangeText={handleChangeText}
            placeholderTextColor="#535C91"
            style={{ color: "#9290C3", width: "100%" }}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderColor: "#9290C3",
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
  },
  label: {
    color: "#9290C3",
    fontSize: 16,
    marginBottom: 2,
  },
});
