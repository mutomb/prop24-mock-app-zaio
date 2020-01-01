import React, { Component } from 'react';
import { View } from 'react-native';
import { Card, CardSection, Button, BLUE, BLUE_DARK } from './common';

class NavBarHorizontal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1,
        };
    } 
    toggleTab(tabNumber) {
        this.props.onPress(tabNumber);
        this.setState({
            activeTab: tabNumber
        });
    }
    render() {
        return (
            <View style={{ backgroundColor: '#fff' }}>
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
            </View>
        ); 
    }
}

export default NavBarHorizontal;

const styles = {
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
    card1: {
         marginLeft: 0, 
         marginRight: 0, 
         marginTop: 0 
    },
};
