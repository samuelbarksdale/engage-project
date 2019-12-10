import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from "react-navigation-tabs";
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CourseScreen from "../screens/CourseScreen";
import {checkType} from "../tsUtils";
import en from "../locale/en";

const config = Platform.select<Parameters<typeof createStackNavigator>[1]>({
    web: {headerMode: 'screen'},
    default: {},
});


export type ICoursesStackRoutes = 'Courses' | 'Course';
const CoursesStackRoutes: Record<ICoursesStackRoutes, Parameters<typeof createStackNavigator>[0][string]> = {
    Courses: {
        screen: HomeScreen,
        navigationOptions: {
            header: null,
        },
        path: en.routesPaths.courses
    },
    Course: {
        screen: CourseScreen,
        path: en.routesPaths.course
    }
};

const CoursesStack = createStackNavigator(
    CoursesStackRoutes,
    {
        ...config,
        initialRouteName: checkType<ICoursesStackRoutes>('Courses'),
        defaultNavigationOptions: {
            // header: null,
        },
        navigationOptions: {
            'Courses': {}
        }
    }
);

CoursesStack.navigationOptions = {
    tabBarLabel: en.tabs.courseTabText,
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={
                Platform.OS === 'ios'
                    ? `ios-information-circle${focused ? '' : '-outline'}`
                    : 'md-information-circle'
            }
        />
    ),
};

const LinksStack = createStackNavigator(
    {
        Links: {
            screen: LinksScreen,
            path: en.routesPaths.absenceRequest
        },
    },
    config
);

LinksStack.navigationOptions = {
    tabBarLabel: en.tabs.engagementTabText,
    tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'}/>
    ),
};


const SettingsStack = createStackNavigator(
    {
        Settings: {
            screen: SettingsScreen,
            path: en.routesPaths.geoLocation
        },
    },
    config
);

SettingsStack.navigationOptions = {
    tabBarLabel: en.tabs.absenceRequestsTabText,
    tabBarIcon: ({focused}) => (
        <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'}/>
    ),
};

const tabNavigator = createBottomTabNavigator({
    CoursesStack: {
        screen: CoursesStack,
        path: en.routesPaths.coursesStack
    },
    LinksStack: {
        screen: LinksStack,
        path: en.routesPaths.linksStack
    },
    SettingsStack: {
        screen: SettingsStack,
        path: en.routesPaths.settingsStack
    },
});

export default tabNavigator;
