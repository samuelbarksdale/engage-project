import React from 'react';
import {View,Text} from 'react-native';
import {observer} from "mobx-react-lite";
import {useStore} from "../App";
import {EStoreState} from "../store/createStore";
import {NavigationScreenProp} from "react-navigation";


export interface AuthLoadingScreenProps {
}

type ExtendedProps = {
    navigation: NavigationScreenProp<null, AuthLoadingScreenProps>
}

export default observer(function AuthLoadingScreen({navigation}: ExtendedProps) {
    const store = useStore();
    const {currentUser, storeState} = store;
    debugger;
    if (store.isLoggedIn) {
        navigation.navigate('Main');
    } else if (storeState == EStoreState.ready) {
        navigation.navigate('Auth');
    }

    // Render any loading content that you like here
    return (
        <View>
            <Text>Loading...</Text>
        </View>
    );
});
