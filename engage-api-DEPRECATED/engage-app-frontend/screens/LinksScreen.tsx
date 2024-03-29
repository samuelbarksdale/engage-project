import React from 'react';
import { ScrollView, StyleSheet,Alert, Button, Text, TouchableOpacity, TextInput, View } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import AbsenceForm from '../components/AbsenceForm'; 

export default function LinksScreen() {

  const state = {
    email: '',
    password: '',
  };

  function onLogin() {
    const { email, password } = this.state;

    Alert.alert('Credentials', `email: ${email} + password: ${password}`);
  }

  return (
    <ScrollView style={styles.container}>
     <Text style={styles.titleText}>Submit an Absence Request</Text>
      <AbsenceForm />  
    </ScrollView>
  );
}

LinksScreen.navigationOptions = {
  title: 'Links',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor:'powderblue',
  },
  titleText:{
    fontFamily: 'Baskerville',
    fontSize: 50,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
