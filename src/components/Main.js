import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';
import NavBarHorizontal from './NavBarHorizontal';
import PropertyListing from './PropertyListing';
import { Header, AppLogo, ButtonLogout } from './common';

/**managing display of properties list */
class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1,
        };
    } 

    onLogoutPress() {
        Actions.auth({ type: 'reset' });
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
    render() {
        return (
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
            </View>
        ); 
    }
}
export default Main;

