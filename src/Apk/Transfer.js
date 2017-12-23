import React, { Component } from 'react';
import { TextInput, Dimensions, ToastAndroid } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import moment from 'moment';
import { connect } from 'react-redux';
import { 
    Title, Header, Container, Form, Label,
    Left, Icon, Body, Drawer, Text, Button
} from 'native-base';
import { DrawerPage } from './Drawer/DrawerPage';
import { Date } from '../components/Date';
import { TransferResult, TransferUsersSaldo, TransferValue } from '../actions';

const { width } = Dimensions.get('screen');

class Transfer extends Component {
    state = {
        nominal: '',
        date: '',
        note: ''
    }

    onProcessTransfer() {
        const { email } = this.props;
        const { nominal, date, note } = this.state;
        const { currentUser } = firebase.auth();
        firebase.database().ref('/users').orderByChild('email').equalTo(email)
        .once('value')
        .then(snapshot => {
            firebase.database().ref('/Spending')
            .push({ 
                nominal,
                note: `${note}, -transfer untuk ${email}-`, 
                date: date || moment().format('L'), 
                createdBy: currentUser.uid 
            })
            .then(() => {
                this.setState({ 
                    nominal: '',
                    date: '',
                    note: '',
                });
                ToastAndroid.show('Berhasil di Transfer', ToastAndroid.SHORT);
                Actions.home({ type: 'reset' });
                firebase.database().ref('/Income')
                .push({
                    nominal,
                    note: `${note}, -transfer by ${currentUser.email}-`, 
                    date: date || moment().format('L'),
                    createdBy: Object.keys(snapshot.val())[0]
                }).then(() => {
                    const { userSaldo } = this.props;
                    const data = parseInt(userSaldo) + parseInt(nominal);
                    console.log(userSaldo);
                    firebase.database()
                    .ref(`/Saldo/${Object.keys(snapshot.val())[0]}/value`)
                    .set(data);
                });
            });
        })
        .catch(err => {
            console.log(err);
            ToastAndroid.show('Email tujuan tidak di temukan.', ToastAndroid.SHORT);
            Actions.transfer({ type: 'reset' });
        });

        const { result } = this.props;

        this.props.TransferResult({ nominal, result });
    }

    closeDrawer() {
        this.drawer._root.close();
      }

      openDrawer() {
        this.drawer._root.open();
      }

    render() {
        return (
            <Drawer
            ref={(ref) => { this.drawer = ref; }}
            content={<DrawerPage navigator={this.navigator} />}
            onClose={() => this.closeDrawer()}
            >
                <Container style={{ flex: 1 }}>
                    <Header hasTabs>
                        <Left>
                            <Button transparent onPress={() => this.openDrawer()}>
                                <Icon name='menu' />
                            </Button>
                        </Left>

                        <Body>
                            <Title>Transfer</Title>
                        </Body>
                    </Header>
                    <Form style={Style.container}>
                        <Form>
                            <Date 
                                date={this.state.date}
                                onDateChange={date => this.setState({ date })}
                                style={Style.dateStyle}
                                date={this.state.date}
                            />
                        </Form>

                        <Form>
                            <TextInput 
                                style={Style.Input} 
                                placeholder='Nominal'
                                keyboardType='numeric'
                                value={this.state.nominal}
                                onChangeText={nominal => this.setState({ nominal })}
                            />
                        </Form>
                    </Form>
                    <Form style={{ marginTop: 20 }}>
                        <Form>
                            <Label style={{ textAlign: 'center', color: 'black' }}> 
                                To Account 
                            </Label>
                            <TextInput 
                            placeholder='Email Tujuan'
                            value={this.props.email}
                            onChangeText={value => 
                                this.props.TransferValue({ clan: 'email', value })}
                            />
                        </Form>

                        <Form>
                            <TextInput 
                                multiline
                                numberOfLines={4}
                                placeholder='Note'
                                style={{ paddingLeft: 20 }}
                                onChangeText={note => this.setState({ note })}
                                value={this.state.note}
                            />
                        </Form>
                        <Form style={{ alignItems: 'flex-end' }}>
                            <Button block onPress={this.onProcessTransfer.bind(this)}>
                                <Text>Send</Text>
                            </Button>
                        </Form>
                        
                    </Form>
                </Container>
            </Drawer>
        );
    }
}

const Style = {
    container: {
        alignItems: 'center',
        marginLeft: 10,
        flexDirection: 'row'
    },
    dateStyle: {
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOffset: { width: 3, height: 10 },
        shadowOpacity: 1,
        elevation: 1,
    },
    Input: {
        width: width,
        marginLeft: 15
    }
};

const mapStateToProps = state => {
    const { result } = state.saldo;
    const { userSaldo, email } = state.saldoUsers;
    return { result, userSaldo, email };
};

export default connect(mapStateToProps, { 
    TransferResult, TransferUsersSaldo, TransferValue })(Transfer);
