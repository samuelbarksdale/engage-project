import React, { Component } from 'react';
import { Platform, Text, View, StyleSheet, TouchableOpacity, Alert, TextInput} from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


export default class Geolocation extends Component {

 state = {
        location: null,
        errorMessage: null,
        uid: this.props.uid,
        did: this.props.did,
        section_id: ""
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } 
  }

  _getLocationAsync = async () => {
    
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    

    let location = await Location.getCurrentPositionAsync({}).then( (llocation) => {
      

      this.setState({ location: llocation });
      
      
      let requestBody = {
      "uid": this.state.uid,
      "did": this.state.did, 
      "section_id": this.state.section_id,
      "type": "LEC",
      "location": {
        "lat": this.state.location.coords.latitude,
        "long":this.state.location.coords.longitude
      }
    }

    alert(JSON.stringify(requestBody)); 


    fetch('http://localhost:8080/api/attendance', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }).then(response => response.json()).then(responseJson => alert(JSON.stringify(responseJson)))
      })
    }
    
    

   
  


  render() {
    let text = '';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }

    return (
      <View style={styles.container}>
        <Text>Please Enter your Class and Section Below: </Text>
        <TextInput
                    value={this.state.section_id}
                    onChangeText={(section_id) => this.setState({section_id: section_id})}
                    placeholder={'cmsc131-0101'}
                    secureTextEntry={false}
                    placeholderTextColor='white'
                    style={styles.input}

             />

        <TouchableOpacity
            style={styles.button}
            onPress={this._getLocationAsync.bind(this)}
         >
           <Text style={styles.buttonText}> Geolocation!</Text>
         </TouchableOpacity>
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    );
  }

}

    const styles = StyleSheet.create({
        container: { 
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: Constants.statusBarHeight,
          backgroundColor: 'powderblue',
        },
        paragraph: {
          margin: 24,
          fontSize: 18,
          textAlign: 'center',
        },
        buttonText:{
    
          fontSize: 20,
          alignItems: 'center',
          justifyContent: 'center',
        },
        button: {
          alignSelf: 'center',
          alignItems: 'center',
          backgroundColor: 'powderblue',
          width: 200,
          height: 44,
          padding: 10,
          borderWidth: 1,
          borderColor: 'white',
          borderRadius: 25,
          marginBottom: 10,
          marginTop: 250
        },
        input: {
          width: 200,
  
          fontSize: 20,
          height: 44,
          padding: 10,
          borderWidth: 1,
          borderColor: 'white',
          marginVertical: 10,
      },
      });
