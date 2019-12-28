import React, { Component } from 'react';
import _ from 'lodash';
import { View, TouchableOpacity, ScrollView, FlatList, Dimensions, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { propertiesFetch } from '../actions';
import { 
    ButtonRound, Card, CardSection, Button, Header, AppLogo,
    BLUE, BLUE_DARK,
    } from './common';
import ListItem from './ListItem';

/**managing display of properties list */
class PropertyListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1,
            dataSource: []
        };
       this.props.propertiesFetch();
    }
    onAddPress() {
        Actions.createProperty();
    }
    onLogoutPress() {
        Actions.auth();
    }
    toggleTab(tabNumber) {
        this.setState({
            activeTab: tabNumber
        });
    }
    renderItem({ item, index }) {
        return <ListItem property={item} index={index} />;
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Header style={{ flexDirection: 'row' }}>
                <AppLogo 
                style={{ flex: 4, alignItems: 'flex-end', }} 
                imageStyle={{ width: Dimensions.get('window').width - 100 }}
                />
                <TouchableOpacity
                    style={styles.button1}
                    onPress={() => this.onLogoutPress()}
                >
                    <Image 
                    source={require('../../assets/lock_closed.png')}
                    style={{ width: 35, height: 35, opacity: 0.9 }}
                    />
                </TouchableOpacity>
            </Header>
            <Card style={styles.card1} >
                <CardSection 
                    style={styles.cardsection}
                >
                    <Button
                        style={[styles.button2, {
                            backgroundColor: this.state.activeTab === 1 ? (BLUE) : (BLUE_DARK), 
                            borderBottomWidth: this.state.activeTab === 1 ? (3) : (0),
                            elevation: this.state.activeTab === 1 ? (3) : (0),
                        }]}
                        onPress={() => this.toggleTab(1)}
                        underlayColor={BLUE}
                    >
                        Listings
                    </Button>
                    <Button
                        style={[styles.button2, {
                            backgroundColor: this.state.activeTab === 2 ? (BLUE) : (BLUE_DARK),
                            borderBottomWidth: this.state.activeTab === 2 ? (3) : (0),
                            elevation: this.state.activeTab === 2 ? (3) : (0),
                        }]}
                        onPress={() => this.toggleTab(2)}
                        underlayColor={BLUE}
                    >
                        Profile
                    </Button>
                </CardSection>
            </Card>
            <ScrollView>
                <Card>
                 <FlatList 
                    data={this.props.properties}
                    renderItem={this.renderItem}
                 />
                </Card>
            </ScrollView>
            <ButtonRound
            onPress={this.onAddPress.bind(this)}
            style={styles.roundButton}
            icon={require('../../assets/add.png')}
            />
            </View>
        ); 
    }
}
const mapStateToProps = state => { 
    const properties = _.map(state.properties, (value, uid) => ({ ...value, uid }));
    console.log(properties);
    return { properties };
};
export default connect(mapStateToProps, { propertiesFetch })(PropertyListing);

const styles = {
    button1: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.0)',
        padding: 0,
    },
    button2: {
        marginLeft: 1,
        marginRight: 1,
        borderBottomColor: '#fff',
        borderRadius: 0,   
    },
    cardsection: {
        flexDirection: 'row', 
        paddingHorizontal: 0, 
        paddingVertical: 0 
    },
    roundButton: {
        width: 75,
        height: 75,
        borderRadius: 37.5,
        position: 'absolute',                                          
        bottom: 30,                                                    
        right: 20
    },
    card1: {
         marginLeft: 0, 
         marginRight: 0, 
         marginTop: 0 
    },
};
