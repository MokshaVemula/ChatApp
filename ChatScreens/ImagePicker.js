
//main code




import React, {useEffect, useState} from "react";
import {View, Text, StyleSheet, Image, TouchableHighlight, ToastAndroid, Alert, Platform, PermissionsAndroid,TextInput } from 'react-native'
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { Avatar, Button } from "react-native-paper";
import auth from '@react-native-firebase/auth';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from "@react-native-async-storage/async-storage";



const ImagePickerComponent = () => {

  const user =  auth().currentUser
  const email = user.email;
  const index = (email.indexOf("@"))
  const [Pic, SetPic] = useState('')
  
  //const [Pic, SetPic] = useState('https://media.istockphoto.com/photos/renewable-energy-and-sustainable-development-picture-id1186330948?k=20&m=1186330948&s=612x612&w=0&h=5aNPCcQ8FcZraX44PEhb2mqcHkow2xMITJMHdh28xNg=')
  

  const setToastMsg = msg => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
  };

  useEffect(()=>{
    getData()
  },[])
  
  const uploadImage = ()=>{
    let options = {
      mediaType : 'photo',
      quality:1,
      includeBase64:true,
      storageOptions: {
        skipBackup: true
      }
    };
    launchImageLibrary(options, response=>{
      if(response.didCancel){
        setToastMsg('Cancelled image selection')
      }else if(response.errorCode=='permission'){
        setToastMsg('permissions not satisfied')
      }else if(response.errorCode=='other'){
        setToastMsg(response.errorMessage)
      }else if(response.assets[0].fileSize > 2097152){
        alert.alert('Maximum size exceeded', 'Please choose image under 3 MB',[{text:'ok'}],);

      }else{
        SetPic(response.assets[0].base64)
        console.log(response.assets[0].base64)
        try {
          AsyncStorage.setItem('ProfilePic', response.assets[0].base64)
         console.log(AsyncStorage.getItem('ProfilePic'))
        } catch (e) {
          // saving error
          console.log('rejected:'+e)
        }
   
      }
    })
  }

  const selectCamera = ()=>{
    let options = {
      mediaType : 'photo',
      quality:1,
      includeBase64:true,
      storageOptions: {
        skipBackup: true
      }
    };
    launchCamera(options, response=>{
      if(response.didCancel){
        setToastMsg('Cancelled image selection')
      }else if(response.errorCode=='permission'){
        setToastMsg('permissions not satisfied')
      }else if(response.errorCode=='other'){
        setToastMsg(response.errorMessage)
      }else if(response.assets[0].fileSize > 2097152){
        alert.alert('Maximum size exceeded', 'Please choose image under 3 MB',[{text:'ok'}],);

      }else{
        SetPic(response.assets[0].base64)
        console.log(response.assets[0].base64)
        try {
          AsyncStorage.setItem('ProfilePic', response.assets[0].base64)
          console.log(AsyncStorage.getItem('ProfilePic'))
        } catch (e) {
          // saving error
          console.log('rejected:'+e)
        }
      }
    })
  }
  
  // let valueEl = 'data:image/png;base64,'+Pic

  // const storeData = async (valueEl) => {
  //   console.log(valueEl,"element")
  //   try {
  //     await AsyncStorage.setItem('@storage_Key', valueEl)
  //     console.log(AsyncStorage.getItem('@storage_Key'))
  //   } catch (e) {
  //     // saving error
  //     console.log('rejected:'+e)
  //   }
  // }

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('ProfilePic')
      if(value !== null) {
        // value previously stored
        SetPic(value)
      }
    } catch(e) {
      // error reading value
      console.log(e)
    }
  }


  const saveData = ()=>{
    return(
      storeData()
    )
  }
  

  const removeImage = ()=>{
    SetPic('')
    setToastMsg('image removed')
  }
  return(
    

      <View style={[styles.bgColor,{flex:1,justifyContent:'space-between'}]}>
        
        
        <View style={styles.centerContent}>
          <TouchableHighlight
            onPress={()=>alert('pressed')}
            underlayColor='black'
          >

            <Avatar.Image
              size={120}
              source = {{uri:'data:image/png;base64,'+Pic}}
            />

          </TouchableHighlight>
          <Text style={{paddingTop:20, color:'white', fontSize:20}}>Email : {email}</Text>
          <Text style={{color:'white', fontSize:20}}>UserName : {email.slice(0,index)}</Text>
          
          <View style={[styles.centerContent,{marginTop:25}]}>

          <Button style={{marginTop:15,width:'50%'}}  mode='contained' onPress={() => selectCamera()}>
            choose camera
          </Button>
          <Button style={{marginTop:15,width:'50%'}} mode='contained' onPress={()=>uploadImage()}>
            Upload    Image 
          </Button>
          
          
          <Button style={{marginTop:15,width:'50%'}}  mode='contained' onPress={()=>removeImage()}>
            Remove   Image 
          </Button>
          
        </View>
        </View>
        
        <View style={styles.button}>
          <Button onPress={() => auth().signOut()} style={styles.signOut}>Sign Out</Button>
        </View>
      </View>
    
    
  )
}

export default ImagePickerComponent

const styles = StyleSheet.create({
  centerContent:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:50,
  },
  button:{
    backgroundColor:'Blue',
    color:'white',
    alignItems:'center',
    marginBottom:20
  },
  signOut:{
    backgroundColor:'green',
    width:'40%'
  },
  bgColor:{
    backgroundColor:'black'
  },
  chatApp:{
    color:'grey',
    fontWeight:'900',
    fontSize:26,
    padding:10,
    fontFamily:'Roboto',
    justifyContent:'flex-start',
    margin:10
    
  },
  screen: {
    //flex: 1,
    //justifyContent: 'flex-start',
    //alignItems: 'center',
    backgroundColor:"#000000",
  },
  imageBox:{
    height:100,
    width:100,
    
  }
  
})


























// import React, { createRef } from "react"

// import {View, Text, StyleSheet, Image, Button, } from 'react-native'
// // import { Avatar,Button } from "react-native-paper";
// import auth from '@react-native-firebase/auth';


// const ImagePicker = () => {
//     const user = auth().currentUser;7 

//     return(
//         <View style={{flex:1,justifyContent:'space-between',alignItems:'center'}}>
//             <View style={styles.imageContainer}>
//                 <Image
//                 style={styles.tinyLogo}
//                 source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}
//                 />
//                 <Text style={{marginTop:10, marginBottom:25}}>{user.email}</Text>
                
//                 <Button title="change Profile"
//                 />
//             </View>
            
//             <View style={styles.button}>
//                 <Button title="Signout" onPress={() => auth().signOut()} />
//             </View>
            
//         </View>
//     )
// }

// export default ImagePicker

// const styles = StyleSheet.create({
    
//     imageContainer:{
//       justifyContent:'center',
//       alignItems:'center'
//     },
//     tinyLogo: {
//       width: 120,
//       height: 120,
//       borderRadius:60
//     },
    
//     button:{
//       backgroundColor:'blue',
//       width:'30%',
//       padding:15,
//       borderRadius:10,
//       alignItems:'center',
//       justifyContent:'center',
//       marginBottom:'10%'
  
//     },
    
  
// })




// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Alert, Image, StyleSheet } from 'react-native';

// import ImagePicker from 'react-native-image-picker';

// export default function ImagePickerComponent() {
//   const [imageSource, setImageSource] = useState(null);

//   function selectImage() {
//     let options = {
//       title: 'You can choose one image',
//       maxWidth: 256,
//       maxHeight: 256,
//       noData: true,
//       mediaType: 'photo',
//       storageOptions: {
//         skipBackup: true
//       }
//     };

//     ImagePicker.showImagePicker(options, response => {
//       if (response.didCancel) {
//         console.log('User cancelled photo picker');
//         Alert.alert('You did not select any image');
//       } else if (response.error) {
//         console.log('ImagePicker Error: ', response.error);
//       } else if (response.customButton) {
//         console.log('User tapped custom button: ', response.customButton);
//       } else {
//         let source = { uri: response.uri };

//         // ADD THIS
//         setImageSource(source.uri);
//       }
//     });
//   }

//   return (
//     <View
//       style={[
//         STYLES.flex,
//         STYLES.centerContainer,
//         { backgroundColor: 'green' }
//       ]}
//     >
//       <Text style={[STYLES.title, { color: 'pink' }]}>
//         Simple Image Picker
//       </Text>
//       {/* ADD THIS */}
//       <View style={STYLES.imageContainer}>
//         {imageSource === null ? (
//           <Image
//           source={{uri: 'https://reactnative.dev/img/tiny_logo.png',}}
//             style={STYLES.imageBox}
//             resizeMode='contain'
//           />
//         ) : (
//           <Image
//             source={{ uri: imageSource }}
//             style={STYLES.imageBox}
//             resizeMode='contain'
//           />
//         )}
//       </View>
//       <TouchableOpacity
//         onPress={selectImage}
//         style={[
//           STYLES.selectButtonContainer,
//           { backgroundColor: 'yellow' }
//         ]}
//       >
//         <Text style={STYLES.selectButtonTitle}>Pick an image</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }


// const STYLES = StyleSheet.create({
//   // rest of the styles remain same
//   // ADD BELOW
//   imageContainer: {
//     marginVertical: 20,
//     borderWidth: 5,
//     borderColor: '#ff5555'
//   },
//   imageBox: {
//     width: 256,
//     height: 256
//   },
//   title: {
//     fontSize: 22
//   },
//   flex: {
//     flex: 1
//   },
//   centerContainer: {
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
//   selectButtonContainer: {
//     margin: 20,
//     borderRadius: 5
//   },
//   selectButtonTitle: {
//     padding: 10,
//     fontSize: 18
//   }
// });


// const captureImage = async () => {
//   let options = {

//     mediaType: 'photo',
//     maxWidth: 300,
//     maxHeight: 550,
//     quality: 1,
//     videoQuality: 'low',
//     durationLimit: 30, //Video max duration in seconds
//     saveToPhotos: true,
//     includeBase64:true,
//     storageOptions: {
//       skipBackup: true
//     }
//   };
//   let isCameraPermitted = await requestCameraPermission();
//   let isStoragePermitted = await requestExternalWritePermission();
//   if (isCameraPermitted && isStoragePermitted) {
//     launchCamera(options, (response) => {
//       console.log('Response = ', response);

//       if(response.didCancel){
//         setToastMsg('Cancelled image selection')
//       }else if(response.errorCode=='permission'){
//         setToastMsg('permissions not satisfied')
//       }else if(response.errorCode=='other'){
//         setToastMsg(response.errorMessage)
//       }else if(response.assets[0].fileSize > 2097152){
//         alert.alert('Maximum size exceeded', 'Please choose image under 3 MB',[{text:'ok'}],);

//       }else{
//         SetPic(response.assets[0].fileName)
//         console.log(response.assets[0].base64)
   
//       }
//     })

      
//   }
// };


// const requestCameraPermission = async () => {
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         {
//           title: 'Camera Permission',
//           message: 'App needs camera permission',
//         },
//       );
//       // If CAMERA Permission is granted
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   } else return true;
// };

// const requestExternalWritePermission = async () => {
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         {
//           title: 'External Storage Write Permission',
//           message: 'App needs write permission',
//         },
//       );
//       // If WRITE_EXTERNAL_STORAGE Permission is granted
//       return granted === PermissionsAndroid.RESULTS.GRANTED;
//     } catch (err) {
//       console.warn(err);
//       alert('Write permission err', err);
//     }
//     return false;
//   } else return true;
// };
