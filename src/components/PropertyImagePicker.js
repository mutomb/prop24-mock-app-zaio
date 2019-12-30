import * as React from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import { Button, CardSection, BLUE_DARK, BLUE } from './common';
import { propertyFormUpdate } from '../actions/propertyFormActions';

class PropertyImagePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uploading: false,
      hasPermission: null
  
    };
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    } else {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasPermission: status === 'granted' });
    }
  }
  _pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });


    if (!result.cancelled) {
     this.props.propertyFormUpdate({ prop: 'image', value: result.uri });
    }
  }
  renderButton1() {
    if (!this.props.image) {
      return 'TAKE A PHOTO';
    }
    return 'TAKE ANOTHER';
  }
  renderButton2() {
    if (!this.props.image) {
      return 'CHOOSE A PHOTO';
    }
    return 'CHOOSE ANOTHER';
  }

  render() {
    let { image } = this.props;
    return (
        <CardSection
        style={[styles.imageCard]}
        >
          <CardSection
        style={[styles.cardSectionStyle,
          { alignItems: 'center', 
          justifyContent: 'center', 
           flex: 1,
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
              onPress={() => Actions.propertyImageCapturer()}
              style={styles.buttonStyle}
              textStyle={{ fontSize: 10 }}
              underlayColor={BLUE_DARK}
            >
              {this.renderButton1()}
            </Button>
            <Button
              style={styles.buttonStyle}
              textStyle={{ fontSize: 10 }}
              underlayColor={BLUE_DARK}
              onPress={this._pickImage.bind(this)}
            >
              {this.renderButton2()}
            </Button>
          </CardSection>

        </CardSection>
    );
  }
}

export default connect(null, { propertyFormUpdate })(PropertyImagePicker);
 
const styles = {
  imageCard: {
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
    backgroundColor: '#fff',
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
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonStyle: {
    backgroundColor: BLUE
  }

};
 /*
  _maybeRenderUploadingOverlay = () => {
    if (this.state.uploading) {
      return (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}>
          <ActivityIndicator color="#fff" animating size="large" />
        </View>
      );
    }
  };
 */

