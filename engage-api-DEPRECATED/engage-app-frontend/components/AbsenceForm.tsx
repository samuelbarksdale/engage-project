import React, {Component} from 'react';
import {

    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    Button,
    Image,
    
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import DatePicker from 'react-native-datepicker'
import config from "../config";


export default class AbsenceForm extends Component {


    state = {
        uid: '',
        course_id: '',
        section_id: '',
        start_date: '',
        end_date: '',
        type: '',
        rationale: '',
        email: '',
        files: null
    };

    onSubmitAbsences() {
        const {uid, course_id, section_id, start_date, end_date, type, rationale, email, files} = this.state;

        const matched_dates = {
            start: new Date(start_date), end: new Date(end_date)
        }
        let requestBody = {
            uid: uid,
            section_id: course_id + '-' + section_id,
            missed_days : matched_dates,
            type: type,
            rationale: rationale,
            email: email
            
        }

        let formData = new FormData(); 
        
        //formData.append("forms", JSON.stringify(requestBody)); 
        formData.append("files", files); 

        //alert(JSON.stringify(formData)); 
        alert(JSON.stringify(requestBody));

        fetch(config.absenceURL + '/api/absences', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        }).then(response => (response.json())).
                then(responseJson => {});


    }

    render() {

        let {files} = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.titleText}>Submit an Absence Request</Text>
                <Text style={styles.titleText}>Momento</Text>
                <TextInput
                    value={this.state.uid}

                    onChangeText={(uid) => this.setState({uid})}
                    placeholder='UID'
                    placeholderTextColor='white'
                    style={styles.input}
                />
                <TextInput
                    value={this.state.section_id}
                    onChangeText={(section_id) => this.setState({section_id})}
                    placeholder={'SectionID'}
                    secureTextEntry={false}
                    placeholderTextColor='white'
                    style={styles.input}
                />

                <TextInput
                    value={this.state.course_id}
                    onChangeText={(course_id) => this.setState({course_id})}
                    placeholder={'CourseID'}
                    secureTextEntry={false}
                    placeholderTextColor='white'
                    style={styles.input}
                />
                <TextInput
                    value={this.state.type}
                    onChangeText={(type) => this.setState({type})}
                    placeholder={'Sick/Military/Away etc. '}
                    secureTextEntry={false}
                    placeholderTextColor='white'
                    style={styles.input}
                />
                <TextInput
                    value={this.state.rationale}
                    onChangeText={(rationale) => this.setState({rationale})}
                    placeholder={'Reason for Absence'}
                    secureTextEntry={false}
                    placeholderTextColor='white'
                    style={styles.input}
                />

                <TextInput
                    value={this.state.email}
                    onChangeText={(email) => this.setState({email})}
                    placeholder={'email'}
                    secureTextEntry={false}
                    placeholderTextColor='white'
                    style={styles.input}
                />

                <DatePicker
                    style={{width: 200}}
                    date={this.state.start_date}
                    mode='date'
                    placeholder='select start date'
                    format='YYYY-MM-DD'
                    minDate='2019-12-01'
                    maxDate='2050-06-01'
                    confirmBtnText='Confirm'
                    cancelBtnText='Cancel'
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={(date) => {
                        this.setState({start_date: date})
                    }}
                />

                <DatePicker
                    style={{width: 200}}
                    date={this.state.end_date}
                    mode='date'
                    placeholder='select start date'
                    format='YYYY-MM-DD'
                    minDate='2016-05-01'
                    maxDate='2050-06-01'
                    confirmBtnText='Confirm'
                    cancelBtnText='Cancel'
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                        // ... You can check the source to find the other keys.
                    }}
                    onDateChange={(date) => {
                        this.setState({end_date: date})
                    }}
                />


                <Button
                    title='Please Upload Valid Documentation'
                    onPress={this._pickImage}
                />

                {files &&
                <Image source={{uri: files}} style={{width: 200, height: 200}}/>}


                <TouchableOpacity
                    style={styles.button}
                    onPress={this.onSubmitAbsences.bind(this)}
                >
                    <Text style={styles.buttonText}> Submit! </Text>
                </TouchableOpacity>

            </View>
        );
    }

    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        // alert(JSON.stringify(result));

        if (!result.cancelled) { 
            this.setState({files: result.uri});
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    button: {
        alignItems: 'center',
        backgroundColor: 'powderblue',
        width: 200,
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 25,
        marginBottom: 10,
    },
    buttonText: {

        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
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