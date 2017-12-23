import React, { Component } from 'react';
import { Image, TextInput, ToastAndroid } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { Form, Item, Container, Content, Label, Text, Button, Spinner } from 'native-base';
import Treasure from '../img/chest.png';

export default class LoginPage extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
        error: ''
    }

    onPressLogin() {
        const { email, password } = this.state;
        this.setState({ error: '', loading: true });
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(this.onLoginSuccess.bind(this))
        .catch(this.onLoginFailed.bind(this));
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
        });
        ToastAndroid.show('Selamat Datang', ToastAndroid.LONG);
        Actions.home({ type: 'reset' });
    }

    onLoginFailed() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: 'Login Gagal, coba cek kembali password Anda'
        });
        ToastAndroid.show(this.state.error, ToastAndroid.LONG);
    }

    renderCondition() {
        if (this.state.loading) {
            return (
                <Spinner />
            );
        }
        return (
            <Button 
                    block success 
                    style={{ marginTop: 15 }}
                    onPress={this.onPressLogin.bind(this)}
            >
                    <Text> Login </Text>
            </Button>
        );
    }

    render() {
        return (
            <Container style={{ flex: 1, alignItems: 'center' }}>
                <Form style={Style.IconStyle}>
                    <Image 
                        source={Treasure} 
                        style={{ 
                            width: 50, 
                            height: 50, 
                            tintColor: 'white',
                        }}
                    
                    />
                </Form>
                    <Text style={{ marginTop: 25, fontSize: 20 }}> Selamat Datang Kembali </Text>
                <Content style={{ marginTop: 15 }}>
                <Form>
                    <Item stackedLabel>
                        <Label style={Style.LabelStyle}> Email </Label>
                    <TextInput 
                        placeholder="Masukkan Email" style={Style.InputStyle} 
                        underlineColorAndroid='black' 
                        onChangeText={email => this.setState({ email })}
                    />

                    </Item>
                    <Item stackedLabel>
                        <Label style={Style.LabelStyle}> Password </Label>
                    <TextInput 
                        placeholder="min. 6 karakter" style={Style.InputStyle}
                        underlineColorAndroid='black'
                        secureTextEntry
                        onChangeText={password => this.setState({ password })}
                    />
                    </Item>
                </Form>
                {this.renderCondition()}
                </Content>
          </Container>
        );
    }
}

const Style = {
    IconStyle: {
        marginTop: 45,
        borderRadius: 100,
        width: 80,
        height: 80,
        backgroundColor: 'rgb(0, 255, 128)',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'red',
        shadowOffset: { width: 20, height: 10 },
        shadowOpacity: 2,
        elevation: 2
    },

    InputStyle: {
        width: 230
    },

    LabelStyle: {
        fontSize: 10,

    }
};
