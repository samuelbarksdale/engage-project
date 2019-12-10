import {NavigationScreenProp} from "react-navigation";
import {observer} from "mobx-react-lite";
import {useStore} from "../App";
import {EStoreState} from "../store/createStore";
import {Button, StyleSheet, TextInput, View, Text} from "react-native";
import React, {useState} from "react";
import en from "../locale/en";

export interface AuthLoadingScreenProps {
}

type ExtendedProps = {
    navigation: NavigationScreenProp<null, AuthLoadingScreenProps>
}

export default observer(function AuthScreen({navigation}: ExtendedProps) {
    const [uid, setUid] = useState('');
    const [did, setDid] = useState(''); 

    const store = useStore();
    const {storeState} = store;

    if (storeState != EStoreState.ready) {
        return (
            <View style={styles.container}>
                <View style={styles.box}>
                    <Text>Loading...</Text>
                </View>
            </View>
        )
    }

    if (store.isLoggedIn) {
        navigation.navigate('Main');
    }


    // Render any loading content that you like here
    return (
        <View style={styles.container}>
            <View style={styles.box}>
                <TextInput
                    value={uid}
                    style={styles.textInput}
                    placeholder={en.auth.uidTextPlaceholder}
                    onChangeText={(text) => setUid(text)}
                />

                    <TextInput
                    value={did}
                    style={styles.textInput}
                    placeholder={en.auth.didTextPlaceholder}
                    onChangeText={(text) => setDid(text)}
                />

                <Button title={'Log In'} onPress={() => store.logIn(uid, did)}/>
            </View>
        </View>
    );
});


const styles = StyleSheet.create({
    container: {
        // flex: 1,
    },
    box: {
        margin: '20%',
        // backgroundColor: 'rgba(189,174,177,0.87)'
    },
    textInput: {
         fontSize: 20,
    }
});

