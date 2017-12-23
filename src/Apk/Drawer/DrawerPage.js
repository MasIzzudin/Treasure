import React, { Component } from 'react';
import { Form } from 'native-base';
import { Profile } from './Profile';
import { ContentList } from './ContentList';

export class DrawerPage extends Component {
    render() {
        return (
            <Form style={{ backgroundColor: 'white', flex: 1, flexDirection: 'column' }}>
                <Profile />
                <ContentList />
            </Form>
        );
    }
}
