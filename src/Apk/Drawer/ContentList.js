import React, { Component } from 'react';
import { Image } from 'react-native';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { Container, Form, List, ListItem, Left, Body, Text, Button } from 'native-base';
import HomeIcon from '../../img/home.png';
import Transfer from '../../img/transaksi.png';
import TransaksiIcon from '../../img/ic_account_balance_wallet_black_24dp.png';
import LogOut from '../../img/ic_power_settings_new_black_24dp_2x.png';

export class ContentList extends Component {

    onLogOut() {
        firebase.auth().signOut()
        .then(() => Actions.main({ type: 'reset' }));
    }
    render() {
        return (
            <Container style={{ flex: 3, marginTop: 20 }}>
                <Form>
                    <List>
                        <ListItem icon onPress={() => Actions.home({ type: 'reset' })}>
                            <Left>
                                <Image source={HomeIcon} style={{ width: 30, height: 30 }} />
                            </Left>
                            <Body>
                                <Text> Home </Text>
                            </Body>
                        </ListItem>

                        <ListItem icon onPress={() => Actions.transaksi({ type: 'reset' })}>
                            <Left>
                                <Image source={TransaksiIcon} style={{ width: 30, height: 30 }} />
                            </Left>
                            <Body>
                                <Text> Transaksi </Text>
                            </Body>
                        </ListItem>

                        <ListItem icon onPress={() => Actions.transfer({ type: 'reset' })}>
                            <Left>
                                <Image source={Transfer} style={{ width: 30, height: 30 }} />
                            </Left>
                            <Body>
                                <Text> Transfer </Text>
                            </Body>
                        </ListItem>
                    </List>
                </Form>
                    
                <Form style={Style.logOutStyle} >
                    <Button onPress={this.onLogOut.bind(this)} transparent>
                        <Form style={Style.wrapLogOutStyle}>
                            <Image source={LogOut} style={Style.LabelImageStyle} />
                            <Text style={Style.TextStyle}> Log out </Text>
                        </Form>
                    </Button>
                </Form>
            </Container>
        );
    }
}

const Style = {
    TextStyle: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
        paddingLeft: 35
    },

    LabelImageStyle: {
        marginLeft: 15,
        width: 20,
        height: 20,
        marginTop: 3
    },

    logOutStyle: {
        position: 'relative',
        justifyContent: 'flex-end',
        flex: 1,
    },
    
    wrapLogOutStyle: {
        width: 240,
        height: 50,
        flexDirection: 'row',
        position: 'relative'
    }
};
