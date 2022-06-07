import React, {useState} from 'react';
import {Text, View, StyleSheet, KeyboardAvoidingView, TextInput,TouchableOpacity} from 'react-native';


const Login = (props) =>{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return(
    <KeyboardAvoidingView behavior='padding' style ={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput
                placeholder='Email'
                value={email}
                onChangeText={setEmail}
                style={styles.input}
            >

            </TextInput>
            <TextInput
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            >

            </TextInput>
        </View>
        <View style = {styles.buttonContainer}>
            <TouchableOpacity onPress={() => props.signin(email, password)} style = {styles.button}>
                <Text style = {styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>props.createUser(email, password)} style = {[styles.button, styles.buttonOutline]}>
                <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>
        </View>
    </KeyboardAvoidingView>
        
    )
  }


  const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    inputContainer:{
        width:'80%',
    },
    input:{
        backgroundColor:'white',
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10,
        marginTop:5

    },
    buttonContainer:{
        width:'60%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:40
    },
    button:{
        backgroundColor:'blue',
        width:'100%',
        padding:15,
        borderRadius:10,
        alignItems:'center'

    },
    buttonOutline:{
        backgroundColor:'white',
        marginTop:5,
        borderColor:'blue',
        borderWidth:2
    },
    buttonText:{
        color:'white',
        fontWeight:'700',
        fontSize:10,

    },
    buttonOutlineText:{
        color:'blue',
        fontWeight:'700',
        fontSize:10,
    }

  })

  export default Login