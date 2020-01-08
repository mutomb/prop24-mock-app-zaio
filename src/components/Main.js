import React, { Component } from 'react';
import { View, Dimensions, TouchableOpacity, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SideMenu from 'react-native-side-menu';
import { connect } from 'react-redux';
import GestureRecognizer from 'react-native-swipe-gestures';
import NavBarHorizontal from './NavBarHorizontal';
import PropertyListing from './PropertyListing';
import { Header, AppLogo, ButtonLogout, RatingModal } from './common';
import { signOutUser } from '../actions';
import Menu from './Menu';
/**managing display of properties list */
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1,
            isOpen: false,
            selectedItem: 'listing', 
            ratingText: 'Please rate this app:',
            ratingVisible: false, 
        };
    } 

    onLogoutPress() {
        this.setState({ ratingVisible: true })
    }
    getActiveTab(tabNumber) {
        this.setState({
            activeTab: tabNumber
        });
    }

    renderContent() {
        const list = <PropertyListing />;
        if (this.state.activeTab === 1) {
            return list;
        }
        return;
    }
    renderRating() {
        return (
            <RatingModal 
                visible={this.state.ratingVisible} 
                onDecline={this.onDecline.bind(this)}
                onAccept={this.onAccept.bind(this)} 
                ratingCompleted={this.ratingCompleted.bind(this)}
            >
              {this.state.ratingText}
            </RatingModal>
        );
    }
    toggle() {
        this.setState({
          isOpen: !this.state.isOpen,
        });
    }

    updateMenuState(isOpen) {
        this.setState({ isOpen });
    }

    onMenuItemSelected(item) {
        this.setState({
          isOpen: false,
          selectedItem: item,
        });
        if(item === 'logout'){
            this.onLogoutPress();
        }
        else if(item === 'profile'){
        }
        else if(item === 'profile'){
        }
    }
    ratingCompleted(rating){
        return rating;
    }

    onDecline() {
        this.setState({ ratingVisible: false });
        this.props.signOutUser();

    }
    onAccept() {
        this.setState({ratingText: 'Thanks!'})
        setTimeout(()=>{
            this.setState({ ratingVisible: false });
            this.props.signOutUser();
        }, 3000);
    }
    onSwipeRight(gestureState) {
        this.setState({
            isOpen: true
        })
    }
    onSwipeLeft(gestureState) {
        this.setState({
            isOpen: false
        })
    }
    render() {
        const menu = <Menu onItemSelected={this.onMenuItemSelected.bind(this)} currentSelection={this.state.selectedItem} />;
        const config = {
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80
        };
        return (
            <GestureRecognizer
                onSwipeLeft={this.onSwipeLeft.bind(this)}
                onSwipeRight={this.onSwipeRight.bind(this)}
                config={config}
                style={{
                  flex: 1,
                }}
            >
            <SideMenu
                menu={menu}
                isOpen={this.state.isOpen}
                onChange={isOpen => this.updateMenuState(isOpen)}
            >
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header style={{ flexDirection: 'row' }}>
                    <AppLogo 
                    style={{ flex: 4, alignItems: 'flex-end', }} 
                    imageStyle={{ width: Dimensions.get('window').width - 100 }}
                    />
                     <ButtonLogout onPress={this.onLogoutPress.bind(this)} />
                </Header>
                <NavBarHorizontal onPress={this.getActiveTab.bind(this)} />
                {this.renderContent()}
                {this.renderRating()}
                <TouchableOpacity
                  onPress={this.toggle.bind(this)}
                  style={styles.Menubutton}
                >
                  <Image
                    source={this.state.isOpen? require('../../assets/arrow_left.png'):require('../../assets/arrow_right.png')}
                    style={{ width: 50, height: 50}}
                  />
                </TouchableOpacity>
            </View>
          </SideMenu>
          </GestureRecognizer>
        ); 
    }
}
export default connect(null, { signOutUser })(Main);

const styles = {
    Menubutton: { /** side menu**/
        position: 'absolute',
        top: Dimensions.get('window').height-100,
        padding: 10,
        elevation: 3
    },
}