import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import en from "../locale/en";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import AuthScreen from "../screens/AuthScreen";

export default createAppContainer(
    createSwitchNavigator({
            // You could add another route here for authentication.
            // Read more at https://reactnavigation.org/docs/en/auth-flow.html

            // AuthLoading: AuthLoadingScreen,
            Auth: {
                screen: AuthScreen,
            },
            Main: {
                screen: MainTabNavigator,
                // path: en.routesPaths.tabNavigator
            },
        },
        {
            initialRouteName: 'Auth',
        }
    )
);
