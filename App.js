import React, {useState, useEffect} from "react";

import auth from '@react-native-firebase/auth'
import Profile from "./ChatScreens/Profile";
import SignIn from "./ChatScreens/SignIn";
import SignUp from './ChatScreens/SignUp'
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";



export default function App() {

  const [user, setUser] = useState();
  const Stack = createNativeStackNavigator()
  const Tab = createBottomTabNavigator()

  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const User = auth().currentUser;
  // return <View>{User ? <Profile /> : <SignIn />}</View>;

  const UserSignIn = ()=>{
    return(
      <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown:false}} initialRouteName="SignIn">
        <Tab.Screen name='signIn' component={SignIn}/>
        <Tab.Screen name='SignUp' component={SignUp}/>
      </Tab.Navigator>
    </NavigationContainer>
    )
  }

  
  
  if(user){
    return <Profile/>
  
  }
   return < UserSignIn/>
// }
  //  return (
  // //   // <NavigationContainer>
  // //   //   <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown:false}}>
  // //   //     <Stack.Screen name='signIn' component={SignIn}/>
  // //   //     <Stack.Screen name='SignUp' component={SignUp}/>
  // //   //   </Stack.Navigator>
  // //   // </NavigationContainer>
  //   <NavigationContainer>
  //     <Tab.Navigator screenOptions={{headerShown:false}} initialRouteName="SignUp">
  //       <Tab.Screen name='signIn' component={SignIn}/>
  //       <Tab.Screen name='SignUp' component={SignUp}/>
  //     </Tab.Navigator>
  //   </NavigationContainer>
  //  )
}













