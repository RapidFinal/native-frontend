import Home_Test from "../screens/Home_Test";
import Edit_Test from "../screens/Edit_Test";
import Login_Test from "../screens/Login_Test";
import View_Test from "../screens/View_Test";
import Like_Test from "../screens/Like_Test";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator, createSwitchNavigator} from "react-navigation";
import React from "react";

const EmployerTabStack = createBottomTabNavigator(
    {
        View: View_Test,
        Home: Home_Test,
        Like: Like_Test
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === 'View') {
                    iconName = `ios-contact${focused ? '' : '-outline'}`;
                } else if (routeName === 'Home') {
                    iconName = `ios-home${focused ? '' : '-outline'}`;
                }
                else if (routeName === 'Like') {
                    iconName = `ios-heart${focused ? '' : '-outline'}`;
                }

                return <Ionicons name={iconName} size={25} color={tintColor}/>;
            }
        })
    }
);

const CandidateTabStack = createBottomTabNavigator(
    {
        View: View_Test,
        Home: Home_Test,
        Edit: Edit_Test,
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === 'View') {
                    iconName = `ios-contact${focused ? '' : '-outline'}`;
                } else if (routeName === 'Home') {
                    iconName = `ios-home${focused ? '' : '-outline'}`;
                }
                else if (routeName === 'Edit') {
                    iconName = `ios-create${focused ? '' : '-outline'}`;
                }

                return <Ionicons name={iconName} size={25} color={tintColor}/>;
            }
        })
    }
);

export default createSwitchNavigator(
    {
        MainEmployer: EmployerTabStack,
        MainCandidate: CandidateTabStack,
        Auth: Login_Test, // Should probably be a stack consisting of login, signup, forgot password etc.
    },
    {
        initialRouteName: 'Auth',
    }
);