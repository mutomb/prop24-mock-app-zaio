import React from 'react';
import { Text, View, TouchableOpacity, Platform, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { BLUE, ModalWithSpinner } from './common';
import { propertyFormUpdate } from '../actions/propertyFormActions';

class PropertyImageCapturer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      cameraType: Camera.Constants.Type.back,
      loading: false
    };
  }

  async componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    } else {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      this.setState({ hasPermission: status === 'granted' });
    }
  }

  handleCameraType=() => {
    const { cameraType } = this.state;
    this.setState({ cameraType:
      cameraType === Camera.Constants.Type.back
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back
    });
  }

  takePicture = async () => {
    this.setState({ loading: true });
    if (this.camera) {
      const photo = await this.camera.takePictureAsync();
      this.props.propertyFormUpdate({ prop: 'image', value: photo.uri }); 
      Actions.pop();
    }
  }


  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });
    this.props.propertyFormUpdate({ prop: 'image', value: result.uri });
    Actions.pop();
  }
  
  render() {
    const { hasPermission } = this.state;
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } 
      return (
        <View style={{ flex: 1 }}>
        <ModalWithSpinner 
          visible={this.state.loading}
        >
          loading photo...
        </ModalWithSpinner>
        <Camera style={{ flex: 1 }} type={this.state.cameraType} ref={ref => { this.camera = ref; }}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 30 }}>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: BLUE,
                borderRadius: 30,
                elevation: 10,
                padding: 10,             
              }}
              onPress={() => this.pickImage()}
            >
              <Ionicons
                  name="ios-photos"
                  style={{ color: '#fff', fontSize: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: BLUE,
                borderRadius: 30,
                elevation: 10,
                padding: 10,
              }}
              onPress={() => this.takePicture()}
            >
              <FontAwesome
                  name="camera"
                  style={{ color: '#fff', fontSize: 40 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignSelf: 'flex-end',
                alignItems: 'center',
                backgroundColor: BLUE,
                borderRadius: 30,
                elevation: 10,
                padding: 10,
              }}
              onPress={() => this.handleCameraType()}
            >
              <MaterialCommunityIcons
                  name="camera-switch"
                  style={{ color: '#fff', fontSize: 40 }}
              />
            </TouchableOpacity>
          </View>
        </Camera>
    </View>
      );
  }
  
}
export default connect(null, { propertyFormUpdate })(PropertyImageCapturer);
