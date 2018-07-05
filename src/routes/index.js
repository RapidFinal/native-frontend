import Home_Test from "../screens/Home_Test";
import Edit_Test from "../screens/Edit_Test";
import Login_Test from "../screens/Login_Test";
import View_Test from "../screens/View_Test";
import LikeScreen from "../screens/Like";
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator, createStackNavigator, createSwitchNavigator} from "react-navigation";
import React from "react";

/* Example of how to set header style (Must be added to both EmployerMainStack & CandidateMainStack */
/*const headerStyle = {
    headerStyle: {
        backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
        fontWeight: 'bold',
    },
};*/

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

const EmployerMainStack = createStackNavigator(
    {
        MainEmployer: EmployerTabStack
    },
    {
        //navigationOptions: headerStyle
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

const CandidateMainStack = createStackNavigator(
    {
        MainCandidate: CandidateTabStack
    },
    {
        //navigationOptions: headerStyle
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