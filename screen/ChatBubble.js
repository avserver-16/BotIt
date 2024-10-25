import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "react-native-vector-icons";

const ChatBubble = ({ role, text, onSpeech }) => {
  const isUser = role === "user";

  return (
    <View style={{ marginVertical:15, alignItems: isUser ? 'flex-end' : 'flex-start' }}>
      <Text
        style={{
          borderRadius: 10,
          color: isUser ? 'white' : 'black',
          fontSize: 18,
          backgroundColor: isUser ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)',
          width: 300,
          padding: 10,
          textAlign: 'center',
          marginLeft:isUser?0:20,
          marginRight:isUser?20:0
        }}
      >
        {text}
      </Text>

      {role === "model" && (
        <TouchableOpacity onPress={onSpeech} style={{ position: 'absolute', right:30, top: 10 }}>
          <Ionicons
            name="volume-high-outline"
            size={24}
            color="rgba(255,255,255,0.7)"
            style={{
              backgroundColor: 'rgba(0,0,0,0.6)',
              borderRadius: 25,
              padding: 5,
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ChatBubble;
