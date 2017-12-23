import React from 'react';
import { Modal } from 'react-native';
import { Form, Text, Spinner, Card } from 'native-base';

export const ModalLoading = ({ animationType, visible, }) => {
    const { containerModalStyle, TextStyle } = Style;
    
        return (
            <Modal
                transparent
                animationType={animationType}
                visible={visible}
                onRequestClose={() => { console.log('Modal has clossed'); }}
            >
                <Form style={containerModalStyle}>
                    <Card 
                        style={{ 
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: 'center' }}
                    >
                        <Spinner color='blue' />
                        <Text style={TextStyle}> Mohon Tunggu Sebentar... </Text>
                    </Card>
                </Form>
            </Modal>
        );
};

const Style = {
    containerModalStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    TextStyle: {
        color: 'black',
        fontSize: 20
    }
};
