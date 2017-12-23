import React, { Component } from 'react';
import { TextInput, View } from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import { Item, Label, Container, Content, Picker, Form, Button, Text } from 'native-base';
import { IncomeValue, IncomeSave, IncomeResult } from '../../actions';
import { Date } from '../../components/Date';

class IncomePage extends Component {

    onSaveTask() {
        const { nominal, inform, date, picker, result } = this.props;
        this.props.IncomeSave({
            nominal, 
            inform, 
            date: date || moment().format('L'),
            picker: picker || 'Hasil Usaha'
        });
        this.props.IncomeResult({ nominal, result });
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
                                underlineColorAndroid='transparent'
                                keyboardType='numeric'
                                value={this.props.nominal}
                                onChangeText={value => 
                                    this.props.IncomeValue({ clan: 'nominal', value })}
                            />

                            </Item>

                            <Item stackedLabel>
                                <Label style={Style.LabelStyle}> Tanggal </Label>
                                <Date 
                                    date={this.props.date}
                                    onDateChange={value => 
                                        this.props.IncomeValue({ clan: 'date', value })}
                                    style={{ flex: 1, marginTop: 10 }}
                                />
                            </Item>

                            <Item stackedLabel>
                                <Label style={Style.LabelStyle}> Keterangan </Label>
                                <TextInput 
                                    placeholder="Keterangan" style={Style.InputStyle}
                                    underlineColorAndroid='transparent'
                                    multiline
                                    numberOfLines={4}
                                    value={this.props.inform}
                                    onChangeText={value => 
                                        this.props.IncomeValue({ clan: 'inform', value })}
                                />
                            </Item>
                            <Form style={{ marginTop: 10 }}>
                                <Label style={Style.LabelStyle}> Kategori </Label>
                                    <Picker
                                        mode="dropdown"
                                        style={Style.PickerStyle}
                                        selectedValue={this.props.picker}
                                        onValueChange={value => 
                                            this.props.IncomeValue({ clan: 'picker', value })}
                                    >
                                    <Item label="Hasil Usaha" value="Hasil Usaha" />
                                    <Item label="Tabungan" value="Tabungan" />
                                    <Item label="Hadiah" value="Hadiah" />
                                    <Item label="Lainnya" value="Lainnya" />
                                    </Picker>
                            </Form>
                            <Button 
                            block success onPress={this.onSaveTask.bind(this)}
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
    const { nominal, inform, picker, date, result } = state.income;
    return { nominal, inform, picker, date, result };
};

export default connect(mapStateToProps, { IncomeValue, IncomeSave, IncomeResult })(IncomePage);
