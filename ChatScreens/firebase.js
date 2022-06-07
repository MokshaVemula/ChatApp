import auth from '@react-native-firebase/auth';
import React from 'react';
import NativeAccessibilityInfo from 'react-native/Libraries/Components/AccessibilityInfo/NativeAccessibilityInfo';
import {Alert} from 'react-native';

export const handleSignIn = async (email, password) => {
  
    await auth().signInWithEmailAndPassword(email, password)
      .then(function(result){
        return(console.log(result.user.email))
      })
      .catch((error) => {
        if (error.code==="auth/user-not-found"){
          return(Alert.alert("In correct email"))
        }else if(error.code==="auth/wrong-password"){
          return(Alert.alert("The password is invalid"))
        }else if(error.code==="auth/invalid-email"){
          return(Alert.alert("Enter valid email"))

        }
        else{
          return(console.log(error.message),Alert.alert(error.mesage))
        }

      });
};

export const handleSignUp = async (email, password) => {
    await auth().createUserWithEmailAndPassword(email, password)
      .then(function(result) {
        
        return(console.log(result.user.email))
      })
      .catch(function(error)  {
        if (error.code === 'auth/invalid-email') {
          return(Alert.alert("Enter valid email"))
        }else if(error.code==="auth/weak-password"){
          return(Alert.alert("Password is short"))
        }else if(error.code==="auth/email-already-in-use"){
          return(Alert.alert("email-already-in-use"))
        }else{
          return(console.log(error.message))
        }
      });
  };