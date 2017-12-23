import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import Main from './src/Main';
import SignUpPage from './src/Authentication/SignUpPage';
import LoginPage from './src/Authentication/LoginPage';
import Home from './src/Apk/Home';
import { Transaksi } from './src/Apk/Transaksi';
import Transfer from './src/Apk/Transfer';

export class Route extends Component {
    render() {
        return (
            <Router sceneStyle={{ paddingTop: 0 }}>
                <Scene hideNavBar>
                    <Scene key='main' component={Main} hideNavBar initial />
                    <Scene 
                        key='sign' component={SignUpPage} 
                        back navTransparent
                        hideNavBar={false}
                    />
                    <Scene
                        key='login' component={LoginPage}
                        navTransparent
                        back
                        hideNavBar={false}
                    />
                    <Scene key='home' component={Home} hideNavBar />
                    <Scene key='transaksi' component={Transaksi} hideNavBar />
                    <Scene key='transfer' component={Transfer} hideNavBar />
                </Scene>
            </Router>
        );    
    }
}
