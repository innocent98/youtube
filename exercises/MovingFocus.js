import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableHighlight,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";

const MovingFocus = () => {
  const textInputRef = useRef([]);

  const [nextPage, setNextPage] = useState(false);
  const [number, setNumber] = useState("");
  const [error, setError] = useState(false);
  const [inputValues, setInputsValues] = useState(["", "", "", ""]);

  const handleChange = (value) => {
    setNumber(value);
  };

  const submitForm = () => {
    Alert.alert("Form submitted! Thank you dude.");
    setNextPage(false);
  };

  const handleFocusChange = (index, text) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputsValues(newInputValues);

    // move focus to the next line
    if (text.length === 1 && index < inputValues.length - 1) {
      textInputRef.current[index + 1].focus();
    }

    // submit if last input is filled
    if (text.length === 1 && index === inputValues.length - 1) {
      submitForm();
    }
  };

  return (
    // first we will start by making a validation form
    <SafeAreaView style={styles.safeArea}>
      {!nextPage && (
        <View style={styles.container}>
          <Text style={styles.title}>Please Input you something!</Text>
          <TextInput
            placeholder="Enter a number"
            style={styles.input}
            inputMode="numeric"
            onChangeText={handleChange}
          />
          <TouchableHighlight
            style={styles.button}
            onPress={() => {
              if (!number) {
                setError(true);
              } else {
                setNextPage(true);
              }
            }}
          >
            <Text style={styles.buttonText}>Validate</Text>
          </TouchableHighlight>

          {error && (
            <Text style={styles.errorText}>Input field is required!</Text>
          )}
        </View>
      )}

      {/* Next page which will be our moving focus page */}
      {nextPage && (
        <View style={styles.container}>
          <Text style={styles.title}>Please Input you something!</Text>

          <View style={styles.inputContainer}>
            {inputValues.map((value, index) => (
              <TextInput
                style={styles.input2}
                inputMode="numeric"
                onChangeText={(text) => handleFocusChange(index, text)}
                key={index}
                ref={(ref) => (textInputRef.current[index] = ref)}
                value={value}
                maxLength={1}
              />
            ))}
          </View>

          <TouchableHighlight style={styles.button} onPress={submitForm}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableHighlight>
        </View>
      )}
    </SafeAreaView>
  );
};

export default MovingFocus;

const styles = StyleSheet.create({
  safeArea: { flex: 1, alignItems: "center", justifyContent: "center" },
  container: { width: "100%", paddingHorizontal: 20, gap: 10 },
  title: { textAlign: "center", fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
    borderColor: "lightgray",
    color: "gray",
  },

  button: {
    backgroundColor: "teal",
    padding: 8,
    borderRadius: 10,
    paddingVertical: 10,
  },

  buttonText: { color: "white", textAlign: "center" },

  errorText: { color: "red", textAlign: "center" },

  inputContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  input2: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 10,
    borderColor: "lightgray",
    color: "gray",
    width: "23%",
    textAlign: "center",
  },
});
