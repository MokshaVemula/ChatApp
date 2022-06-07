import React, { useState } from "react";
import { Pressable, StyleSheet,Text, TextInput, View, Button,Alert } from "react-native";
import { handleSignIn } from "./firebase";
import SignUp from "./SignUp";


const SignIn=({navigation})=>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  


  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSubmit = async () => {
    if (email === "" || password === "") {
      
      Alert.alert("Invalid credentials")
    } else {
      try {
        await handleSignIn(email, password);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text
          style={{
            fontSize: 40,
            fontFamily: "Roboto",
            color: "#fff",
          }}
        >
          Sign in
        </Text>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.email}
          defaultValue={email}
          onChangeText={handleEmailChange}
          textContentType="emailAddress"
          placeholder="Email Address"
          placeholderTextColor="grey"
          returnKeyType="next"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.password}
            defaultValue={password}
            onChangeText={handlePasswordChange}
            placeholder="Enter Password"
            placeholderTextColor="grey"
            returnKeyType="go"
            secureTextEntry
            textContentType="password"
            keyboardType="default"
            autoCorrect={false}
          />
        </View>
        <Pressable style={styles.forgotContainer}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={handleSubmit}>
          <Text style={{ fontFamily: "Roboto", fontSize: 20 }}>SIGN IN</Text>
        </Pressable>
        <Pressable
          style={{
            alignItems: "center",
            justifyContent: "center",
            top: "50%",
            height: 30,
            onPress:(()=>navigation.navigate('SignUp'))
        
          }}
        >
          <Text
            style={{
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Roboto",
              fontSize: 16,
              color: "white",
            }}
          >
            Do not have an account? Register
          </Text>
        </Pressable>
        {/* <Button
        style={{
          marginTop:50,
          height: 30,
          alignItems: "flex-end",
          justifyContent: "center",
          fontFamily: "Roboto",
          fontSize: 16,
          color: "white",
        }}
        title="Do not have an account? Register"
        onPress={() => navigation.navigate('SignIn')}
      /> */}
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#0C0C1C",
  },
  headerContainer: {
    flexDirection: "row",
    width: "80%",
    height: 50,
    marginBottom: 40,
    top: -20,
  },
  form: {
    width: "80%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    top: -40,
  },
  email: {
    width: "100%",
    height: 60,
    backgroundColor: "#0ff1",
    borderRadius: 5,
    marginBottom: 35,
    padding: 10,
    fontSize: 18,
    fontFamily: "QuicksandBold",
    color: "#fff",
  },
  password: {
    width: "85%",
    height: 60,
    borderRadius: 5,
    marginBottom: 35,
    padding: 10,
    fontSize: 18,
    fontFamily: "QuicksandBold",
    color: "#fff",
  },

  passwordContainer: {
    flexDirection: "row",
    width: "100%",
    height: 60,
    backgroundColor: "#0ff1",
    borderRadius: 5,
    marginBottom: 35,
  },


  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#1da",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    top: 30,
    padding: 10,
  },



});


