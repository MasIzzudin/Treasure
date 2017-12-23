import React, { Component } from 'react';
import { Form, Text, Left, Right, Content, List, ListItem, Body } from 'native-base';

class ListTasksSpending extends Component {
    render() {
        const { nominal, inform, date, picker, note } = this.props.income;
        return (
            <Form>
                <Content>
                    <List>
                        <ListItem avatar>
                            <Left />
                            <Body>
                                <Text>Rp. {nominal}</Text>
                                <Text note style={Style.informStyle}>{inform}</Text>
                                <Text note style={Style.noteStyle}>{note}</Text>
                            </Body>
                            <Right>
                                <Text note style={Style.noteStyle}>{date}</Text>
                                <Text note style={Style.noteStyle}>{picker}</Text>
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Form>
        );
    }
}

const Style = {
    noteStyle: {
        fontSize: 10,
        color: 'black'
    }
};

export default ListTasksSpending;
