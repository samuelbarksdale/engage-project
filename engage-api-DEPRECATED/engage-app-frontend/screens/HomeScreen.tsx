import React from 'react';
import {
    Button, Image, Platform, ScrollView, StyleSheet, Text, View
} from 'react-native';
import {NavigationScreenProp} from 'react-navigation'
import CourseCard from "../components/CourseCard";
import {ICoursesStackRoutes} from "../navigation/MainTabNavigator";
import {CourseScreenProps} from "./CourseScreen";
import {checkType} from "../tsUtils";
import {observer} from "mobx-react-lite";
import {useStore} from "../App";
import {EStoreState} from "../store/createStore";

export interface HomeScreenProps {
}

type ExtendedProps = {
    navigation: NavigationScreenProp<null, HomeScreenProps>
}

export default observer(function HomeScreen({navigation}: ExtendedProps) {
        const store = useStore();
        const {coursesList, currentUser, storeState} = store;

        if (!store.isLoggedIn) {
            navigation.navigate('Auth');
        }

        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                >
                    <View style={styles.welcomeContainer}>
                        <Image
                            source={
                                __DEV__
                                    ? require('../assets/images/robot-dev.png')
                                    : require('../assets/images/robot-prod.png')
                            }
                            style={styles.welcomeImage}
                        />

                        {
                            store.isLoggedIn && <Text>{`Welcome ${currentUser.did} \n DirectoryID: ${currentUser.uid}`}</Text>
                        }
                        <Button
                            disabled={storeState != EStoreState.ready}
                            title={'Log Out'}
                            onPress={() => {
                                return store.logOut();
                            }}
                        />

                        <Button
                            disabled={storeState != EStoreState.ready}
                            title={'Refresh'}
                            onPress={() => {
                                return store.loadCourses();
                            }}
                        />
                    </View>
                    <View style={styles.courses}>
                        {
                            coursesList.map((course) => (
                                <CourseCard
                                    key={course.id}
                                    lectureName={course.courseName}
                                    courseName={course.courseName}
                                    educators={course.educators}
                                    startTime={course.schedule.time.end}
                                    endTime={course.schedule.time.end}
                                    onCourseClick={() => {
                                        navigation.navigate(checkType<ICoursesStackRoutes>('Course'), checkType<CourseScreenProps>({courseId: course.id}))
                                    }}
                                />
                            ))
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
)
// HomeScreen.navigationOptions = {
//     header: null,
// };


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'powderblue',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
        paddingBottom: 30,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    welcomeImage: {
        width: 100,
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {width: 0, height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#fbfbfb',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },
    helpContainer: {
        marginTop: 15,
        alignItems: 'center',
    },
    helpLink: {
        paddingVertical: 15,
    },
    helpLinkText: {
        fontSize: 14,
        color: '#2e78b7',
    },
    courses: {

        // flex: 1,
        // flexDirection: 'column',
        // justifyContent: 'space-between',

    }
});
