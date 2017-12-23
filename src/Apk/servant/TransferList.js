import React, { Component } from 'react';
import { ListView } from 'react-native';
import _ from 'lodash';
import { connect } from 'react-redux';
import { TransferData } from '../../actions';

class TransferList extends Component {
    componentWillMount() {
        this.props.TransferData();
        
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(NextProps) {
        this.createDataSource(NextProps);
    }

    createDataSource({ dataUsers }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.dataSource = ds.cloneWithRows(dataUsers);
    }

    renderRow(users) {
        return <ListTasks income={income} />;
    }

    render() {
        return (
            <ListView 
                enableEmptySections
            />
        );
    }
}

const mapStateToProps = state => {
    const dataUsers = _.map(state.transferVal, (val, uid) => {
        return { ...val, uid };
    });
    return { dataUsers };
}

export default connect(mapStateToProps, { TransferData })(TransferList);
