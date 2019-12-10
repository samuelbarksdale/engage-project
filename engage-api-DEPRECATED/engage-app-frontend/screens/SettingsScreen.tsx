import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';
import Geolocation from '../components/Geolocation'
import {NavigationScreenProp} from 'react-navigation'
import {observer} from "mobx-react-lite";
import {useStore} from "../App";
import {EStoreState} from "../store/createStore";



export interface SettingScreenProps{

}

type ExtendedProps = {
  navigation: NavigationScreenProp<null, SettingScreenProps>
}

export default observer(function SettingsScreen({navigation}: ExtendedProps) {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   * 
   * 
   */

  const store = useStore();
  const {coursesList, currentUser, storeState} = store;


  if (!store.isLoggedIn) {
    navigation.navigate('Auth');
  }

  return (
    <View style={styles.container}>
      {
       store.isLoggedIn && <Text>{`Welcome ${currentUser.did} \n DirectoryID: ${currentUser.uid}`}</Text>
        }
      <Geolocation uid={currentUser.uid} did={currentUser.did} /> 
    </View>
  );
}
)

// SettingsScreen.navigationOptions = {
//   title: 'app.json',
// };


const styles = StyleSheet.create({
  container: { 
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   
    backgroundColor: 'powderblue',
  }
});