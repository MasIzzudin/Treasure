import React, { Component } from 'react';
import { ImageBackground, Platform, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import firebase from 'firebase';
import RNFetchBlob from 'react-native-fetch-blob';
import { Form, Thumbnail, Text } from 'native-base';
import iconProfile from '../../img/account.png';
import backgroundImage from '../../img/drawerpic.jpg';

const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;

const uploadImage = (uri, mime = 'application/octet-stream') => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    const sessionId = new Date().getTime();
    let uploadBlob = null;
    const imageRef = firebase.storage().ref('ImageProfiles').child(`${sessionId}`);
    const database = firebase.database();
    const { currentUser } = firebase.auth();

      fs.readFile(uploadUri, 'base64')
      .then(data => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then(blob => {
        uploadBlob = blob;
        const TaskImage = imageRef.put(blob, { contentType: 'image/png' });

        TaskImage.on('state_changed', snapshot => {
          const showURL = TaskImage.snapshot.downloadURL;
          const postData = {
            url: showURL
          };
        const DataImage = database.ref(`Image/${currentUser.uid}`);
          DataImage.set(postData);
        });
        return TaskImage;
      })
      .then(() => {
        uploadBlob.close();
        return imageRef.getDownloadURL();
      })
      .then(url => {
        resolve(url);
      })
      .catch(err => {
        reject(err);
      });
  });
};

export class Profile extends Component {
    state = {
        avatarSource: null
    }

    componentWillMount() {
        const { currentUser } = firebase.auth();
          firebase.database().ref(`/Image/${currentUser.uid}/url`)
          .on('value', snapshot => {
            this.setState({ avatarSource: snapshot.val() });
        });
    }

    showImageLibrary() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
              skipBackup: true,
            }
          };
    
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
               uploadImage(response.uri)
              .catch(err => console.log(err));
            }
          });
    }

    // 
    
    render() {
        const { currentUser } = firebase.auth();
        console.log(this.state.avatarSource);
        return (
            <ImageBackground source={backgroundImage} style={{ flex: 1 }} >
                <Form style={{ flex: 1, backgroundColor: 'rgba(158, 192, 247, 0.5)' }}>
                    <TouchableOpacity 
                      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                      onPress={this.showImageLibrary.bind(this)}
                    >
                        { this.state.avatarSource === null ? 
                            <Form style={Style.wrapThumbnail}>
                                <Thumbnail source={iconProfile} style={{ width: 80, height: 80 }} />
                            </Form> :
                            <Form style={Style.wrapThumbnail}>
                              <Thumbnail source={{ uri: this.state.avatarSource }} 
                            style={{ width: 80, height: 80 }} />
                            </Form>
                        }
                    </TouchableOpacity>

                    <Form>
                        <Text style={Style.wrapText}>
                        Hello {currentUser.email}
                        </Text>
                    </Form>
                </Form>
            </ImageBackground>
        );
    }
}

const Style = {
    wrapThumbnail: {
        backgroundColor: 'white',
        borderRadius: 100,
        width: 80,
        height: 80
    },

    wrapText: {
        fontSize: 15,
        color: 'black',
        marginBottom: 10,
        marginLeft: 5
    }
};
