import React, { Component } from 'react';
import { ListView, View, TouchableOpacity, Image, ToastAndroid, Text } from 'react-native';
import firebase from 'firebase';
import { Form } from 'native-base';
import { connect } from 'react-redux';
import _ from 'lodash';
import { SpendingData } from '../../actions';
import ListTaskSpending from './ListTaskSpending';
import { Confirm } from '../../components/Confirm';
import trashImage from '../../img/trash.png';

class IncomeList extends Component {
    state = { showModal: false }
    componentWillMount() {
        this.props.SpendingData();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(NextProps) {
        this.createDataSource(NextProps);
    }

    onAccept() {
        this.props.valueArray.map(obj => {
            const uid = obj.uid;
            firebase.database().ref(`/Spending/${uid}`)
            .remove()
            .then(() => this.setState({ showModal: false }));
        });
        
        ToastAndroid.show('Berhasil di hapus', ToastAndroid.SHORT);
    }

    onDecline() {
        this.setState({ showModal: false });
    }

    createDataSource({ valueArray }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(valueArray);
    }

    renderRow(income) {
        return <ListTaskSpending income={income} />;
    }

    render() {
        return (
            <View style={{ flexDirection: 'column', flex: 1 }}>
            <ListView 
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />

            <Form style={Style.containerIcon}>
                <TouchableOpacity 
                    style={Style.ButtonStyle} onPress={() => this.setState({ showModal: true })}
                >
                    <Image source={trashImage} style={{ width: 25, height: 25 }} />
                </TouchableOpacity>
            </Form>

            <Confirm
                visible={this.state.showModal}
                onAccept={this.onAccept.bind(this)}
                onDecline={this.onDecline.bind(this)}
            >
                Are you sure you want to delete this ?
          </Confirm>
        </View>
        );
    }
}

const Style = {
    containerIcon: {
        width: 40, 
        height: 40, 
        borderRadius: 100,
        position: 'relative',
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: { width: 10, height: 10 },
        elevation: 1,
        backgroundColor: 'white',
        marginBottom: 30,
        marginLeft: 15,
        alignItems: 'flex-end'

    },
    ButtonStyle: {
        borderRadius: 100,
        width: 40,
        height: 40,
        backgroundColor: 'rgb(255, 170, 0)',
        alignItems: 'center',
        justifyContent: 'center'
    }
};

const mapStateToProps = state => {
    const valueArray = _.map(state.spendingVal, (val, uid) => {
        return { ...val, uid };
    });
    return { valueArray };
};

export default connect(mapStateToProps, { SpendingData })(IncomeList);
