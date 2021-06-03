import React from 'react';
import { StatusBar, TouchableOpacity, Text, Image, View } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Search from './screens/Search';
import SignIn from './screens/SignIn';
import CreateAccount from './screens/CreateAccount';
import Initializing from './screens/Initializing';
import CollectionList from './screens/CollectionList';
import Collection from './screens/Collection';
import CreateCollection from './screens/CreateCollection';
import { saveAuthToken } from './util/api';
import { setTopLevelNavigator } from './util/NavigationService';

import { Feather } from "@expo/vector-icons";

const HeaderRightButton = ({ onPress, style, icon }) => (
    <TouchableOpacity onPress={onPress}>
        <Image
            source={icon}
            resizeMode="contain"
            style={[
                {
                    marginRight: 10,
                    width: 20,
                    height: 20,
                    tintColor: '#fff',
                },
                style,
            ]}
        />
    </TouchableOpacity>
);

const defaultStackOptions = {
    headerStyle: {
        backgroundColor: '#6c1fd1',
    },
    headerTintColor: '#fff',
};

const Information = createStackNavigator(
    {
        CollectionList: {
            screen: CollectionList,
            navigationOptions: ({ navigation }) => ({
                headerTitle: 'CollectionList',
                headerRight: () => (
                    <React.Fragment >
                        {/* <StatusBar barStyle="light-content" /> */}
                        <View style={{ flexDirection: 'row' }}>
                            <Feather
                                name="plus"
                                size={21}
                                color="#fff"
                                //deletes the item when icon is pressed
                                onPress={() => navigation.navigate("CreateCollection")}
                                //onLayout={this.handlePlay()}
                                style={{ paddingRight: 45 }}

                            />
                            <HeaderRightButton
                                icon={require('./assets/search.png')}
                                onPress={() => navigation.navigate('Search')}
                            />
                        </View>
                    </React.Fragment>
                ),
                headerStyle: {
                    backgroundColor: '#6c1fd1',
                },
                headerTintColor: '#fff',
            }),
        },
        Search: {
            screen: Search,
            navigationOptions: ({ navigation }) => ({
                headerTitle: 'Search',
                headerRight: () => (
                    <React.Fragment>
                        <StatusBar barStyle="dark-content" />
                        <HeaderRightButton
                            icon={require('./assets/close.png')}
                            onPress={() => navigation.pop()}
                            style={{ tintColor: '#fff' }}
                        />
                    </React.Fragment>
                ),
                headerStyle: {
                    backgroundColor: '#6c1fd1',
                },
                headerTintColor: '#fff',
            }),
        },
        Collection: {
            screen: Collection,
            navigationOptions: ({ navigation }) => ({
                headerTitle: 'Your Collection',
                headerRight: () => (
                    <TouchableOpacity
                        onPress={() => {
                            saveAuthToken().then(() => navigation.navigate('Auth'));
                        }}
                    >
                        <Text style={{ color: '#fff', marginRight: 10 }}>Sign Out</Text>
                    </TouchableOpacity>
                ),
                headerStyle: {
                    backgroundColor: '#6c1fd1',
                },
                headerTintColor: '#fff',
            }),
        },
        CreateCollection: {
            screen: CreateCollection,
            navigationOptions: ({ navigation }) => ({
                headerTitle: 'Create Collection',
                headerRight: () => (
                    <React.Fragment>
                        <StatusBar barStyle="dark-content" />
                        <HeaderRightButton
                            icon={require('./assets/close.png')}
                            onPress={() => navigation.pop()}
                            style={{ tintColor: '#fff' }}
                        />
                    </React.Fragment>
                ),
                headerStyle: {
                    backgroundColor: '#6c1fd1',
                },
                headerTintColor: '#fff',
            }),
        },

    },
    {
        mode: 'modal',
    },
    {
        defaultNavigationOptions: {
            ...defaultStackOptions,
        },

    }
);

const Auth = createStackNavigator(
    {
        CreateAccount: {
            screen: CreateAccount,
            navigationOptions: {
                headerTitle: "Create Account"
            }
        },
        SignIn: {
            screen: SignIn,
            navigationOptions: {
                headerTitle: 'Sign In',
            },
        },
    },
    {
        defaultNavigationOptions: {
            ...defaultStackOptions,
        },
    }
);

const App = createSwitchNavigator({
    Initializing,
    Auth,
    Information,
});

const AppWithContainer = createAppContainer(App);

export default () => (
    <React.Fragment>
        <StatusBar barStyle="light-content" />
        <AppWithContainer
            ref={navigatorRef => setTopLevelNavigator(navigatorRef)}
        />
    </React.Fragment>
);