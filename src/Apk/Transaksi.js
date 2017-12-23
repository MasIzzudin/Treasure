import React, { Component } from 'react';
import { 
    Title, Header, Container, 
    Left, Button, Icon, Body, Tab, Tabs,
    TabHeading, Text, Drawer
} from 'native-base';
import { DrawerPage } from './Drawer/DrawerPage';
import IncomePage from './servant/IncomePage';
import SpendingPage from './servant/SpendingPage';

export class Transaksi extends Component {

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
                <Container>
                    <Header hasTabs>
                        <Left>
                            <Button transparent onPress={() => this.openDrawer()}>
                                <Icon name='menu' />
                            </Button>
                        </Left>

                        <Body>
                            <Title>Transaksi</Title>
                        </Body>
                    </Header>
                    <Tabs>
                        <Tab heading={<TabHeading><Text> Pemasukan </Text></TabHeading>} >
                            <IncomePage />
                        </Tab>

                        <Tab heading={<TabHeading><Text> Pengeluaran </Text></TabHeading>} >
                        <SpendingPage />
                    </Tab>
                    </Tabs>

                    
                </Container>
            </Drawer>
        );
    }
}
