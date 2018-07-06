import Home_Test from "../screens/Home_Test";
import Edit_Test from "../screens/Edit_Test";
import Login_Test from "../screens/Login_Test";
import View_Test from "../screens/View_Test";
import LikeScreen from "../screens/Like_Test";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator, createStackNavigator, createSwitchNavigator} from "react-navigation";
import React from "react";
import {Button} from "react-native";

/* Changes both EmployerMainStack & CandidateMainStack */
const headerOptions = {
    headerLeft: (
        <Button
            onPress={() => alert('This is a left button!')}
            title="Left"
        />
    ),
    headerRight: (
        <Button
            onPress={() => alert('This is a right button!')}
            title="Right"
        />
    ),
    headerTitleStyle: {flex: 1, textAlign: 'center'}
};

const EmployerTabStack = createBottomTabNavigator(
    {
        View: View_Test,
        Home: Home_Test,
        Like: LikeScreen
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

const EmployerMainStack = createStackNavigator(
    {
        MainEmployer: EmployerTabStack
    },
    {
        navigationOptions: headerOptions
    }
);

const CandidateMainStack = createStackNavigator(
    {
        MainCandidate: CandidateTabStack
    },
    {
        navigationOptions:  headerOptions
    }
);

EmployerTabStack.navigationOptions = ({ navigation }) => {
    return setHeaderToRouteName(navigation);
};

CandidateTabStack.navigationOptions = ({ navigation }) => {
    return setHeaderToRouteName(navigation);
};

function setHeaderToRouteName(navigation) {
    let { routeName } = navigation.state.routes[navigation.state.index];
    let headerTitle = routeName;
    return {
        headerTitle,
    };
}

MainNavigator = createSwitchNavigator(
    {
        MainEmployer: EmployerMainStack,
        MainCandidate: CandidateMainStack,
        Auth: Login_Test, // Should probably be a stack consisting of login, signup, forgot password etc.
    },
    {
        initialRouteName: 'Auth',
    }
);

export default MainNavigator