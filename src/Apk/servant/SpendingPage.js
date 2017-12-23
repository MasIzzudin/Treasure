import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import { Item, Label, Container, Content, Picker, Form, Button, Text } from 'native-base';
import { SpendingValue, SpendingSave, SpendingResult } from '../../actions';
import { Date } from '../../components/Date';

class SpendingPage extends Component {
    onSubmitAction() {
        const { nominal, inform, date, picker, result } = this.props;
        this.props.SpendingSave({
            nominal,
            inform,
            date: date || moment().format('L'),
            picker: picker || 'Belanja'
        });
        this.props.SpendingResult({ nominal, result });
    }
    render() {
        return (
            <Container 
            style={{ flex: 1,
                    backgroundColor: 'rgb(77, 195, 255)' 
                }}
            >
                <Content >
                    <View style={Style.InputContainer}>
                            <Item stackedLabel>
                                <Label style={Style.LabelStyle}> Nominal </Label>
                            <TextInput 
                                placeholder="Masukkan Nominal" style={Style.InputStyle} 
                                onChangeText={email => this.setState({ email })}
                                underlineColorAndroid='transparent'
                                keyboardType='numeric'
                                value={this.props.nominal}
                                onChangeText={value => 
                                    this.props.SpendingValue({ clan: 'nominal', value })}
                            />

                            </Item>

                            <Item stackedLabel>
                                <Label style={Style.LabelStyle}> Tanggal </Label>
                                <Date 
                                    date={this.props.date}
                                    onDateChange={value => 
                                        this.props.SpendingValue({ clan: 'date', value })}
                                />
                            </Item>

                            <Item stackedLabel>
                                <Label style={Style.LabelStyle}> Keterangan </Label>
                                <TextInput 
                                    placeholder="Keterangan" style={Style.InputStyle}
                                    onChangeText={password => this.setState({ password })}
                                    underlineColorAndroid='transparent'
                                    multiline
                                    numberOfLines={4}
                                    value={this.props.inform}
                                    onChangeText={value => 
                                        this.props.SpendingValue({ clan: 'inform', value })}
                                />
                            </Item>
                            <Form style={{ marginTop: 10 }}>
                                <Label style={Style.LabelStyle}> Kategori </Label>
                                <Picker
                                    mode="dropdown"
                                    style={Style.PickerStyle}
                                    selectedValue={this.props.picker}
                                    onValueChange={value => 
                                        this.props.SpendingValue({ clan: 'picker', value })}
                                >
                                <Item label="Belanja" value="Belanja" />
                                <Item label="Infastruktur" value="Infastruktur" />
                                <Item label="Makan" value="Makan" />
                                <Item label="Lainnya" value="Lainnya" />
                                </Picker>
                            </Form>
                            <Button 
                            block success onPress={this.onSubmitAction.bind(this)}
                            style={{ marginTop: 10 }}
                            
                            >
                                <Text> Save </Text>
                            </Button>
                        </View>
                    </Content>
            </Container>
        );
    }
}

const Style = {

    InputStyle: {
        width: 270,
        padding: 10,
        fontSize: 16,
        marginTop: 10,
        backgroundColor: 'rgba(255,255,255,1)'
    },

    LabelStyle: {
        fontSize: 15,
        color: 'black'

    },

    InputContainer: {
        backgroundColor: 'rgb(0, 153, 230)',
        margin: 20,
        marginBottom: 0,
        padding: 20,
        paddingBottom: 10,
        alignSelf: 'stretch',
        borderWidth: 1,
        borderColor: '#fff'
    }
};

const mapStateToProps = state => {
    const { nominal, inform, date, picker, result } = state.spending;
    return { nominal, inform, date, picker, result };
};

export default connect(mapStateToProps, { 
    SpendingValue, SpendingSave, SpendingResult })(SpendingPage);
