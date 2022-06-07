import React,{useState,useCallback} from 'react';
import { Button, StyleSheet, Text, View,FlatList,Image,TouchableHighlight,LogBox} from 'react-native';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GiftedChat } from 'react-native-gifted-chat';


const data = [
  { id: '1', name: 'Moksha',url:'https://media.istockphoto.com/photos/renewable-energy-and-sustainable-development-picture-id1186330948?k=20&m=1186330948&s=612x612&w=0&h=5aNPCcQ8FcZraX44PEhb2mqcHkow2xMITJMHdh28xNg='
},
  { id: '2', name: 'Vemula',url:'https://images.edexlive.com/uploads/user/imagelibrary/2020/2/27/original/nature_and_child.jpg?w=400&dpr=2.6'},
  { id: '3', name: 'Monika',url:'https://akm-img-a-in.tosshub.com/indiatoday/images/story/201510/thumb_647_102915112526.jpg?size=1200:675'},
];


function HomeScreen({ navigation }) {
  return (
    <View style={styles.screen}>
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
      <View style={styles.button}>
        <Button title="Signout" onPress={() => auth().signOut()} />
      </View>
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

function SignOut() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

export default SignOut;

const styles = StyleSheet.create({
      container:{
        margin:20,
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        alignItems:'center'
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
      logo:{
        width: 100,
        height: 100,
        borderRadius:50,
      },
      screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"#000000",
      },
      imgContainer:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        padding:20,
      },
      imgBox:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
      }
    
})





























