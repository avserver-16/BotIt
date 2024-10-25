import React, { useState, useCallback, useEffect } from 'react';
import axios from 'react-native-axios/lib/axios';
import { speak,isSpeakingAsync,stop } from 'expo-speech';
import Background from './Background';
import ChatBubble from './ChatBubble';
import { ActivityIndicator, TextInput } from 'react-native';
import { TouchableOpacity,FlatList,View,Text ,Image,KeyboardAvoidingView} from 'react-native';
import { Ionicons } from "react-native-vector-icons";


function ChatScreen() {
  const [chat,setChat]=useState([]);
  const [input,setInput]=useState("");
  const [load,setLoad]=useState(false);
  const [error,setError]=useState(null);
  const [isSpeaking,setIsSpeaking]=useState(false);
  const apiKey="AIzaSyClSFZwmYWdXLpcNgtg_eKkaMiVxMJVOEw";



  const handleUserInput= async ()=>{
    if (!input.trim()) {
      return;
    }

    let updateChat=[...chat,{role:"user",parts:[{text:input}]}];

    setLoad(true);

    try{
      const response= await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        {
          contents: updateChat
        }
      );
      console.log("response: ",response.data);
      //console.log(response.data[0]);
      const modelResponse=response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      console.log(response.data.candidates[0]);
      console.log(response.data.candidates[0].content);
      console.log(response.data.candidates[0].content.parts[0].text)
      console.log(modelResponse);

      if(modelResponse){
        const updatedChatwithModel=[
          ...updateChat,{role:"model",parts:[{text:modelResponse}],}
        ];
        setChat(updatedChatwithModel);
        setInput("");
      }
    }catch(error){
      console.error("Error:",error);setError("Please Try Again");
    }
    finally{
      setLoad(false);
    }
  };


  const handleSpeech = async(text)=>{
    if(isSpeaking){
      stop();
      setIsSpeaking(false);
    }else{
      if(!(await isSpeakingAsync())){
        speak(text);
        setIsSpeaking(true);
      }
    }
  };

  const renderChatItem=({item})=>(
    <ChatBubble 
    role={item.role}
    text={item.parts[0].text}
    onSpeech={()=>handleSpeech(item.parts[0].text)}>

    </ChatBubble>
  );

  return(<Background>
    <View>
    <View style={{ alignItems: 'center', marginTop: 50 }}>
      <View style={{
      backgroundColor: 'black',
      height: 100,
      borderRadius: 100,
      width: '60%',
      marginBottom: -100,
      elevation: 99
 }} />
 <Image
  source={require('./BotIt.png')}
 style={{
  height: 100,
  width: 100,
  position: 'absolute',
marginTop: 0,
elevation: 100
                                }}
                            />
                        </View>
      <View>
      <FlatList
data={chat}
renderItem={renderChatItem}
keyExtractor={(item,index)=>index.toString()}
style={{fontSize:25,color:'white',marginTop:120,marginBottom:150,height:600}}
     /></View>
     {load && <ActivityIndicator style={{color:'black'}} size={24} />}
     
     <View style={{
          position: 'absolute',
          bottom: 20,
          left: 5,
          right: 0,
          padding: 80,
          backgroundColor: 'transparent',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom:20
        }}>
          <TextInput
            placeholder="Enter Text..."
            placeholderTextColor="grey"
            value={input}
            onChangeText={setInput}
            style={{
              backgroundColor: 'black',
              height: 60,
              flex: 1,
              borderTopLeftRadius: 25,
              borderBottomLeftRadius:25,
              fontSize: 18,
              paddingLeft: 15,
              paddingRight:60,
              color: 'white',
              position:'absolute',
              width:290,
              marginLeft:21.3

            }}
          />
          <TouchableOpacity onPress={handleUserInput} style={{ marginLeft:10 }}>
          <Ionicons name="paper-plane-outline" size={30} color="rgba(216, 134, 255, 0.8)" style={{
            left:220,backgroundColor:'black',height: 60,position:'absolute',top:-30,width:50,alignItems:'center',
            borderBottomRightRadius:25,borderTopRightRadius:25,paddingTop:15
            }} />
          </TouchableOpacity>
        </View>
     
     {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}
  </View></Background>)
}

export default ChatScreen;
