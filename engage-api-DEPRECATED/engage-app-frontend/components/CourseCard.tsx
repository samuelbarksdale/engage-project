import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import en from "../locale/en";
import {Text, Card, Icon, Button} from "react-native-elements";

interface CourseCardProps {
    courseName: string;
    lectureName: string;
    startTime: string; 
    endTime: string; 
    educators: string[];
    semester: string;
    onCourseClick?: () => void
}

export default function CourseCard({educators, startTime, endTime,  lectureName, courseName, onCourseClick}: CourseCardProps) {
    return (
        <View style={styles.container}>
            <Card title={`Course Name:  ` + lectureName}> 
                <Text>
                    Educators: {educators[0]}
                </Text>
                <Text>Start Time: {startTime}</Text>
                <Text>End Time: {endTime}</Text>
                {
                    onCourseClick &&
                    <Button
                        onPress={() => onCourseClick()}
                        icon={<Icon name='code' color='#ffffff'/>}
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title={en.courseCard.button}
                    />
                }
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // backgroundColor: '#97ff7a',
        // alignSelf: 'center',
        // margin: 50,
        // flex: 1,
        // width: 500,
        // height: 200,
        // flex: 1,
        // borderRadius: 10,
        // alignItems: 'center',
        // justifyContent: 'space-around'
    },
});