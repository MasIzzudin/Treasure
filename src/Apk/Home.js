import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import firebase from 'firebase';
import { 
    Title, Header, Container, Form,
    Left, Button, Icon, Body, Tab, Tabs,
    TabHeading, Text, Drawer, Right
} 
from 'native-base';
import IncomeList from './servant/IncomeList';
import SpendingList from './servant/SpendingList';
import { DrawerPage } from './Drawer/DrawerPage';
import ResultData from '../components/ResultData';

const { width } = Dimensions.get('screen');

export default class Home extends Component {
    closeDrawer() {
        this.drawer._root.close();
      }

      openDrawer() {
        this.drawer._root.open();
      }

      onAccept() {
        firebase.database().ref('Income')
      }

    render() {
        return (
            <Drawer
            ref={(ref) => { this.drawer = ref; }}
            content={<DrawerPage navigator={this.navigator} />}
            onClose={() => this.closeDrawer()}
            >
                <Container>
                    <Header hasTabs>
                        <Left>
                            <Button transparent onPress={() => this.openDrawer()}>
                                <Icon name='menu' />
                            </Button>
                        </Left>

                        <Body>
                            <Title>Home</Title>
                        </Body>
                        <Right />
                    </Header>
                    <Tabs>
                        <Tab heading={<TabHeading><Text> Pemasukan </Text></TabHeading>} >
                            <IncomeList />
                        </Tab>
                        <Tab heading={<TabHeading><Text> Pengeluaran </Text></TabHeading>} >
                            <SpendingList />
                        </Tab>
                    </Tabs>

                    <Form style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Form style={{ marginLeft: 10 }}>
                            <ResultData />
                        </Form>
                    </Form>
                </Container>
            </Drawer>
        );
    }
}

