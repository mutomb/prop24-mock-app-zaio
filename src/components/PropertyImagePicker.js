import * as React from 'react';
import { Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import {Button, CardSection, BLUE_DARK, BLUE} from './common';

export default class PropertyImagePicker extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;
    return (
        <CardSection
        style={[styles.imageCard]}
        >
          <CardSection
        style={[styles.cardSectionStyle,
          {alignItems: 'center', 
          justifyContent:"center", 
           flex:1,
           marginLeft: 1,
           marginRight: 1,
          }]}
        >
            {image && <Image source={{ uri: image }} resizeMode='stretch' style={styles.imageStyle} />}            
          </CardSection>

          <CardSection
            style={[styles.buttonSectionStyle]}
          >
            <Button
              onPress={()=>Actions.propertyImageCapturer({pickedImage: this.captureImage.bind(this)})}
              style={styles.buttonStyle}
              textStyle={{fontSize: 10}}
              underlayColor={BLUE_DARK}
            >
              TAKE A PHOTO
            </Button>
            <Button
              onPress={this._pickImage}
              style={styles.buttonStyle}
              textStyle={{fontSize: 10}}
              underlayColor={BLUE_DARK}
            >
              CHOOSE A PHOTO
            </Button>
          </CardSection>

        </CardSection>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
    console.log('hi');
  }
  getPermissionAsync = async () => {
    // Camera roll Permission 
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
  captureImage= ({image})=> {
    if(image) {
      this.setState({
        image: image.uri
      });
    }
  };
}

const styles = {
  imageCard:{
    height: 400,
    elevation: 5,
    backgroundColor: '#F4F4F4',
    flexDirection: 'column',
    flex: 1,
    borderWidth: 3,
    borderColor: BLUE_DARK,
    borderRadius: 5,
    paddingTop: 5,
  },
  cardSectionStyle: {
    backgroundColor:'#fff',
    marginLeft: 15,
    marginRight: 15,
    borderRadius: 0,
  },
  imageStyle: {
    height: '100%',
    width: '100%'
  },
  buttonSectionStyle: {
    position: 'absolute', 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center',
    alignItems: 'center', 
    flex:1,
    backgroundColor:'#fff',
  },
  buttonStyle: {
    backgroundColor: BLUE
  }

};
 