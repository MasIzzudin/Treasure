import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Text } from 'native-base';
import { DataSaldo, TransferUsersSaldo } from '../actions';

class ResultData extends Component {
    componentWillMount() {
        const { email } = this.props;
        this.props.DataSaldo();
        this.props.TransferUsersSaldo({ email });
    }

    render() {
        return (
            <Form style={Style.container}>
                <Text style={{ margin: 10, fontSize: 25 }}>Rp. {this.props.result}</Text>
            </Form>
        );
    }
}

const Style = {
    container: {
        backgroundColor: 'white',
        width: 200,
        height: 100,
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowOffset: { width: 20, height: 20 },
        elevation: 1,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center'
    }
};

const mapStateToProps = state => {
    const { result } = state.income;
    const { email } = state.saldoUsers;
    return { result, email };
};


export default connect(mapStateToProps, { DataSaldo, TransferUsersSaldo })(ResultData);
