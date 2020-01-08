import React, { Component } from 'react';
import _ from 'lodash';
import { 
    View, FlatList, SafeAreaView, 
    Text, Image } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { propertiesFetch } from '../actions';
import { ButtonRound, Card, Spinner, BLUE } from './common';
import ListItem from './ListItem';

/**managing display of properties list */
class PropertyListing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeTab: 1,
        };
       this.props.propertiesFetch();
       console.log('loaded');
    } 
    onAddPress() {
        Actions.createProperty();
    }
    onLogoutPress() {
        Actions.auth();
    }
    getActiveTab(tabNumber) {
        this.setState({
            activeTab: tabNumber
        });
    }

    renderError() {
        if (this.props.error) {
            return (
            <View 
            style={{ 
                flex: 1,
                backgroundColor: '#ffff',
                alignItems: 'center',
                justifyContent: 'center',
                }}
            > 
                <Text
                    style={{ fontSize: 20, color: '#000' }}
                > 
                {this.props.error} 
                </Text> 
            </View>
            );
        }
    }
    renderLoading() {
        if (this.props.loading) {
            return (<Spinner size='large' color={BLUE} />);
        }
    }
    renderEmpty() {
        if (this.props.properties.length === 0 && !this.props.error && !this.props.loading) {
            return (
                <View 
                style={{ 
                    flex: 1,
                    backgroundColor: '#ffff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row'
                    }}
                > 
                    <Text
                        style={{ fontSize: 20, color: '#000' }}
                    > 
                    Empty. Tap
                    </Text> 
                    <View style={{ width: 30, height: 30, marginHorizontal: 5 }}>
                    <Image source={require('../../assets/add.png')} style={{ width: '100%', height: '100%' }} />
                    </View>
                    <Text
                        style={{ fontSize: 20, color: '#000' }}
                    > 
                     to add Propties.
                    </Text> 
                </View>
                );
        }
    }
    renderAddButton() {
        return (
            <ButtonRound
            onPress={this.onAddPress.bind(this)}
            icon={require('../../assets/add.png')}
            />
        );
    }
    renderItem({ item, index }) {
        return <ListItem property={item} />;
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <Card style={{ marginLeft: 2, marginRight: 2, flex: 1 }}>
                <SafeAreaView> 
                    <FlatList 
                    data={this.props.properties}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => item.uid}
                    />
                </SafeAreaView>
                {this.renderError()}
                {this.renderLoading()}
                {this.renderEmpty()}
            </Card>
             {this.renderAddButton()}
            </View>
        ); 
    }
}
const mapStateToProps = state => { 
    let properties = _.map(_.omit(state.properties, 'error', 'loading'), (value, uid) => ({ ...value, uid }));
        properties = _.reverse(properties);
    const { loading, error } = state.properties;
    console.log(properties)
    return { properties, loading, error };
};
export default connect(mapStateToProps, { propertiesFetch })(PropertyListing);

