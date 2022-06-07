import React, { useState } from "react";
import { Pressable, StyleSheet,Alert, Text, TextInput, Image, View,Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { handleSignUp } from "./firebase";
import { handleSignIn } from "./firebase";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignIn from "./SignIn";


const SignUp = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
  
    
    const handleEmailChange = (text) => {
      setEmail(text);
    };
  
    
    const handlePasswordChange = (text) => {
      setPassword(text);
    };
  
    
  
  
    const handleSubmit = async() => {
      if (email=== '' || password==='') {
        Alert.alert("Invalid Credentials");
      } else {
        try {
          await handleSignUp(email, password);
        } catch (error) {
          console.error(error);
        }
      }
    };
  
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={{ fontSize: 40, fontFamily: "Roboto", color: "#fff" }}>Create Account</Text>
          
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.email}
            defaultValue={email}
            onChangeText={handleEmailChange}
            textContentType="emailAddress"
            placeholder="Email Address"
            placeholderTextColor="grey"
            keyboardType="email-address"
            returnKeyType="next"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.password}
              defaultValue={password}
              onChangeText={handlePasswordChange}
              placeholder="Enter Password"
              placeholderTextColor="grey"
              returnKeyType="next"
              secureTextEntry
              textContentType="password"
              keyboardType="default"
              autoCorrect={false}
            />
          </View>
          
          <Pressable
            style={styles.registerContainer}
            onPress={()=>navigation.navigate('SignIn')}
            
          >
            <Text style={styles.register}>want to sign in?</Text>
          </Pressable>
          {/* <Button title="want to sign in?" onPress={()=>Navigation.navigate('SignIn')}/> */}
          
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={{ fontFamily: "QuicksandBold", fontSize: 20 }}>SIGN UP</Text>
          </Pressable>
        </View>
        
      </View>
    );
};
  
  

export default SignUp


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
  eyeContainer: {
    position: "absolute",
    right: 10,
    top: 20,
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

  register: {
    fontFamily: "QuicksandBold",
    color: "#fff",
    fontSize: 18,
  },
  registerContainer: {
    top: -20,
    flexDirection: "row",
    alignSelf: "flex-end",
  },
});









