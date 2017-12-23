import React from 'react';
import { View, Modal } from 'react-native';
import { Button, Form, Text } from 'native-base';

export const Confirm = ({ children, visible, onAccept, onDecline }) => {
  const { CardSectionStyle, textStyle, containerStyle } = styles;
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide" // untuk default animasi yg diberikan
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <Form style={CardSectionStyle}>
            <Text style={textStyle}>
              {children}
            </Text>

            <Form style={{ flexDirection: 'row' }}>
              <Button onPress={onAccept} danger>
                <Text>Yes</Text>
              </Button>
              <Button onPress={onDecline} style={{ marginLeft: 5 }}>
                <Text>No</Text>
              </Button>
            </Form>
        </Form>
      </View>
    </Modal>
  );
};

const styles = {
  CardSectionStyle: {
    backgroundColor: 'white',
    height: 150,
    width: 340,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
    justifyContent: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0,0,0,0.75)',
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
};
