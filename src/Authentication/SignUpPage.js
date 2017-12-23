import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import { Image, TextInput, ToastAndroid } from 'react-native';
import { Form, Item, Container, Content, Label, Text, Spinner, Button } from 'native-base';
import Treasure from '../img/chest.png';


export default class LoginPage extends Component {
    state = {
        email: '',
        password: '',
        loading: false,
        error: ''
    }

    onSubmitSign() {
        const { email, password } = this.state;
        console.log('horee');
        this.setState({ error: '', loading: true });
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(this.onConditionSuccess.bind(this, email))
        .catch(this.onConditionFailed);
    }

    onConditionSuccess(email) {
        const { currentUser } = firebase.auth();
        this.setState({
            email: '',
            password: '',
            loading: false
        });
        firebase.database().ref(`/users/${currentUser.uid}/`)
        .set({ email, id: currentUser.uid });
        ToastAndroid.show('Selamat Datang', ToastAndroid.LONG);
    }

    onConditionFailed() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: 'Maaf ada kesalahan, mungkin email sudah di gunakan'
        });
        ToastAndroid.show(this.state.error, ToastAndroid.LONG);
    }

    renderCondition() {
        console.log(this.state.loading);
        if (this.state.loading) {
            return (
                <Spinner />
            );
        }
        return (
            <Form>
                <Button
                    block success
                    style={{ marginTop: 15 }} 
                    onPress={this.onSubmitSign.bind(this)} 
                >
                    <Text> Buat Akun </Text>
                </Button>
            </Form>
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

                    <Text style={{ marginTop: 25, fontSize: 20 }}> Buat akun baru </Text>

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

                    <Text style={{ fontSize: 15, marginBottom: 15 }}> 
                        Sudah Punya Akun? 
                    <Text style={{ color: 'blue' }} onPress={() => Actions.login()}> 
                        MASUK 
                    </Text>
                </Text>
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
