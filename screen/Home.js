import React from 'react';
import { TextInput, View, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import Background from './Background';
import { SafeAreaView } from 'react-native-safe-area-context';

function Home() {
    return (
        <Background>
            <SafeAreaView style={{ flex: 1 }}>
               
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}  
                        style={{ flex: 1 }}
                    >
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <View style={{
                                backgroundColor: 'black',
                                height: 100,
                                borderRadius: 100,
                                width: '60%',
                                marginBottom: 20,
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
                        
                    
                        <TextInput
                            style={{
                                backgroundColor: 'black',
                                marginTop: 'auto', 
                                height: 60,
                                width: 350,
                                borderRadius: 30,
                                fontSize: 20,
                                paddingLeft: 25,
                                elevation: 25,
                                color: 'white',
                                alignSelf: 'center',
                                marginBottom: 20 
                            }}
                            placeholder='Enter Prompt...'
                            placeholderTextColor={'grey'}
                        />
                    </KeyboardAvoidingView>
                </ScrollView>
            </SafeAreaView>
        </Background>
    );
}

export default Home;




