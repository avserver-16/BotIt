import React from 'react';
import {View, ImageBackground} from 'react-native';

const Background = ({ children }) => {
  return ( 
<View style={{ position: "absolute", backgroundColor:'black',height:'100%',width:'100%'}}>
  <ImageBackground source={require('./bgChatbot.png')} style={{height:'100%',position:'absolute',width:'100%'}}/>
{children}
</View>
    
    
  );
}

export default Background;