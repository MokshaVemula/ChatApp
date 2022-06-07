import React,{useState,useCallback} from 'react';
import { Button, StyleSheet, Text, View,FlatList,Image,TouchableHighlight,LogBox} from 'react-native';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GiftedChat } from 'react-native-gifted-chat';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ModalElement from './ImagePicker';
import ImagePickerComponent from './ImagePicker';
import { color } from 'react-native-reanimated';


const data = [
  { id: '1', name: 'Moksha',url:'https://media.istockphoto.com/photos/renewable-energy-and-sustainable-development-picture-id1186330948?k=20&m=1186330948&s=612x612&w=0&h=5aNPCcQ8FcZraX44PEhb2mqcHkow2xMITJMHdh28xNg='},
  { id: '2', name: 'Vemula',url:'https://images.edexlive.com/uploads/user/imagelibrary/2020/2/27/original/nature_and_child.jpg?w=400&dpr=2.6'},
  { id: '3', name: 'Monika',url:'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201510/thumb_647_102915112526.jpg?size=1200:675'},
  { id: '4', name: 'Leela',url:'https://www.outsideonline.com/wp-content/uploads/2022/03/sitting-by-lake-maine_h.jpg?crop=25:14&width=500&enable=upscale'},
  { id: '5', name: 'Karthik',url:'https://media.gettyimages.com/photos/connection-with-nature-picture-id1174472274?s=612x612'},
  { id: '6', name: 'Laxmi',url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgdZTHAbNzO7AxU1tpTYk25E2WK2q1G1RDXtr5KxMAjcJViQ9QYrpyyrAuPafTC1289ek&usqp=CAU'},
  { id: '7', name: 'Moksha',url:'https://media.istockphoto.com/photos/renewable-energy-and-sustainable-development-picture-id1186330948?k=20&m=1186330948&s=612x612&w=0&h=5aNPCcQ8FcZraX44PEhb2mqcHkow2xMITJMHdh28xNg='},
  { id: '8', name: 'Vemula',url:'https://images.edexlive.com/uploads/user/imagelibrary/2020/2/27/original/nature_and_child.jpg?w=400&dpr=2.6'},
  { id: '9', name: 'Monika',url:'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201510/thumb_647_102915112526.jpg?size=1200:675'},
  { id: '10', name: 'Leela',url:'https://www.outsideonline.com/wp-content/uploads/2022/03/sitting-by-lake-maine_h.jpg?crop=25:14&width=500&enable=upscale'},
  { id: '11', name: 'Karthik',url:'https://media.gettyimages.com/photos/connection-with-nature-picture-id1174472274?s=612x612'},
  { id: '12', name: 'Laxmi',url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgdZTHAbNzO7AxU1tpTYk25E2WK2q1G1RDXtr5KxMAjcJViQ9QYrpyyrAuPafTC1289ek&usqp=CAU'},

];
const user = auth().currentUser;

function Profile({ navigation }) {
  return (
    
    <View style={styles.screen}>
      <Text style={styles.chatApp}>ChatApp</Text>
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableHighlight onPress={() => navigation.navigate('Chat')}>
            <View style={styles.imgContainer}>
              <Image style={styles.logo} source={{uri:item.url}}/>
              <Text style={{color:'white', paddingLeft:20, fontFamily:'Roboto', fontSize:22, fontWeight:'bold'}}>{item.name}</Text>
            </View>
      
          </TouchableHighlight>
          
        )}
      />
      
    </View>
  );
}

const ChatScreen = () => {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: 'Hello developer',
      createdAt: new Date(),
      user: { _id: 2, name: 'Name' },
    },
  ]);

  const onSend = useCallback((newMessages) => {
    setMessages(prevMessages => [...newMessages, ...prevMessages])
    }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={newMessage => onSend(newMessage)}
      user={{
        _id: 1,
      }}
    />
  );
};
const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator()

const ProfileUpdate = () =>{
  return(
    <ImagePickerComponent />
  )
}

const TabScreen = ()=>{
  return(
    <Tab.Navigator >
      <Tab.Screen name='chatList' component={Profile} options={{headerShown: false}}/>
      <Tab.Screen name='ProfileUpdate' options={{headerShown: false}} component={ProfileUpdate}/>
    </Tab.Navigator>
  )
}

function SignOut() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Home" component={TabScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
      </NavigationContainer>
  );
}
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

export default SignOut



const styles = StyleSheet.create({
      container:{
        margin:20,
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center'
      },
      imageContainer:{
        justifyContent:'center',
        alignItems:'center'
      },
      tinyLogo: {
        width: 120,
        height: 120,
        borderRadius:60
      },
      buttonContainer:{
        width:'60%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:40
      },
      button:{
        backgroundColor:'blue',
        width:'30%',
        padding:15,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:'10%'
    
      },
      logo:{
        width: 50,
        height: 50,
        borderRadius:25,
      },
      
      imgContainer:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        padding:20,
      },
      imgBox:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
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
    
})





























