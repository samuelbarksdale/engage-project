import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';
import {
    Text
} from 'react-native-elements'

import {MonoText} from '../components/StyledText';
import CourseCard from "../components/CourseCard";
import {NavigationScreenProp} from "react-navigation";
import {ICoursesStackRoutes} from "../navigation/MainTabNavigator";
import {ICourse} from '../common/model-definitions';
import {observer} from "mobx-react-lite";
import {useStore} from "../App";

export interface CourseScreenProps {
    courseId: ICourse['id']
}

type ExtendedProps = {
    navigation: NavigationScreenProp<null, CourseScreenProps>
}

export default observer(function CourseScreen({navigation}: ExtendedProps) {
        const {courses} = useStore();
        const course = courses.get(navigation.getParam('courseId'));

        if (!course) {
            return <View>
                <Text>Course not found</Text>
            </View>
        }
        return (
            <View style={styles.container}>
                <CourseCard
                    key={course.id}
                    courseName={course.id}
                    educators={course.educators}
                    semester={course.semester}
                />
            </View>
        );
    }
)
const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
