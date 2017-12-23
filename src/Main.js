import React, { Component } from 'react';
import { Image, ImageBackground } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Form, Text, Button, Content } from 'native-base';
import backgroundImage from './img/money_dollars.jpg';
import Treasure from './img/chest.png';
import iconMail from './img/ic_mail_white_36dp.png';


export default class Main extends Component {

    render() {
        return (
            <ImageBackground source={backgroundImage} style={{ flex: 1 }}>
                <Form style={Style.Background}>
                        <Image 
                            source={Treasure} 
                            style={{ 
                                width: 100, 
                                height: 100, 
                                tintColor: 'white',
                                marginTop: 50
                            }}
                        />
                        <Text style={{ color: 'white', fontSize: 30 }}> TREASURE </Text>
                        
                        <Content style={{ width: 260 }}>
                            <Button 
                                block info 
                                style={{ marginTop: 50 }}
                                onPress={() => Actions.sign()}
                            >
                                <Image source={iconMail} style={{ width: 25, height: 25 }} />
                                <Text>Create Email</Text>
                            </Button>
                        </Content>
                        <Text style={{ fontSize: 15, marginBottom: 15 }}> 
                            Sudah Punya Akun? 
                            <Text style={{ color: 'blue' }} onPress={() => Actions.login()}> 
                                MASUK 
                            </Text> 
                        </Text>
                </Form>
            </ImageBackground>
        );
    }
}

const Style = {
    Background: {
        backgroundColor: 'rgba(0, 153, 51,0.5)',
        flex: 1,
        alignItems: 'center'
    }
};
