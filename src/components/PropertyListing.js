import React, { Component } from 'react';
import { FlatList, View, Text, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { ButtonRound, Card, CardSection, Button, BLUE, BLUE_DARK, Header } from './common';

/**managing display of properties list */
class PropertyListing extends Component {
    state={
        activeTab: 1
    }
    onAddPress() {
        Actions.createProperty();
    }
    toggleTab(tabNumber) {
        this.setState({
            activeTab: tabNumber
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
            <Header
            style={{
                marginTop: 0, 
                backgroundColor: BLUE_DARK,
                paddingLeft: 0,
                elevation: 2,
                borderRadius: 0
            }}
            >
                <Card
                style={{
                    flex: 1,
                    marginBottom: 0,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    }}
                >
                    <CardSection
                    style={{ backgroundColor: BLUE_DARK }}
                    >
                        <Text
                        style={{
                            fontSize: 30,
                            color: '#fff',
                            fontWeight: 'bold',
                            fontFamily: 'sans-serif',

                        }}
                        >
                            Property24
                        </Text>
                    </CardSection>
                </Card>
                        
            </Header>
            <Card style={{ marginLeft: 0, marginRight: 0, marginTop: 0, }} >
                <CardSection 
                style={{
                    flexDirection: 'row', 
                    paddingHorizontal: 0, 
                    paddingVertical: 0 }}
                >
                    <Button
                        style={{
                            backgroundColor: this.state.activeTab === 1 ? (BLUE) : (BLUE_DARK), 
                            marginLeft: 1,
                            marginRight: 1,
                            borderBottomColor: '#fff',
                            borderBottomWidth: this.state.activeTab === 1 ? (3) : (0),
                            elevation: this.state.activeTab === 1 ? (3) : (0),
                            borderRadius: 0,
                        }}
                        onPress={() => this.toggleTab(1)}
                        underlayColor={BLUE}
                    >
                        Listings
                    </Button>
                    <Button
                    style={{
                        backgroundColor: this.state.activeTab === 2 ? (BLUE) : (BLUE_DARK),
                        marginLeft: 1,
                        marginRight: 1,
                        borderBottomColor: '#fff',
                        borderBottomWidth: this.state.activeTab === 2 ? (3) : (0),
                        elevation: this.state.activeTab === 2 ? (3) : (0),
                        borderRadius: 0
                    }}
                    onPress={() => this.toggleTab(2)}
                    underlayColor={BLUE}
                    >
                        Profile
                    </Button>
                </CardSection>
            </Card>
            <ButtonRound
            onPress={this.onAddPress.bind(this)}
            style={{
                width: 75,
                height: 75,
                borderRadius: 37.5,
                position: 'absolute',                                          
                bottom: 30,                                                    
                right: 20
            }}
            icon={require('../../assets/add.png')}
            />
            </View>
        ); 
    }
}
export default PropertyListing;
