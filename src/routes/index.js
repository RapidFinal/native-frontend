import Edit_Test from "../screens/Edit_Test";
import View_Test from "../screens/View_Test";
import LikeScreen from "../screens/Like";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Home from '../screens/Home';
import {createBottomTabNavigator, createStackNavigator, createSwitchNavigator, createDrawerNavigator} from "react-navigation";
import React from "react";
import { Signin, CredentialSignin } from '../screens/signin'
import SideMenu from "../components/CategorySideMenu";
import SubCategorySideMenu from "../components/SubCategorySideMenu"

/* Changes both EmployerMainStack & CandidateMainStack */
const headerOptions = ({navigation}) => ({
    headerLeft: (
        <FontAwesome.Button
            name="navicon"
            backgroundColor="transparent"
            color="black"
            onPress={() => navigation.push("SideMenu")}
        />
    ),
    headerRight: (
        <MaterialCommunityIcons.Button
            name="account"
            backgroundColor="transparent"
            color="black"
            onPress={() => navigation.push("Signin")}/>
    ),
    headerTitleStyle: {flex: 1, textAlign: 'center'}
});

const EmployerTabStack = createBottomTabNavigator(
    {
        View: View_Test,
        Home: Home,
        Like: LikeScreen,
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
        Home: Home,
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

const HomeStack = createStackNavigator(
    {
        Home: Home
    },
    {
        headerTitle: "Test",
        navigationOptions: headerOptions
    }
)

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
        navigationOptions:  headerOptions,

    }
);

const AuthenticationMainStack = createStackNavigator(
    {
        Home: Home,
        Signin: Signin,
        CredentialSignin: CredentialSignin
    },
    {
        navigationOptions: headerOptions,
        initialRouteName: 'Home',
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

const SideMenuStack = createStackNavigator (
    {
        SideMenu: SideMenu,
        SubCategorySideMenu: SubCategorySideMenu
    },
    {

        navigationOptions: {
            headerTitleStyle: {
                flex: 1,
                textAlign: 'center'
            },
            title: "Category"
        }
    }
)

MainStackNavigator = createSwitchNavigator(
    {
        SideMenuStack: SideMenuStack,
        MainEmployer: EmployerMainStack,
        MainCandidate: CandidateMainStack,
        Auth: AuthenticationMainStack, // Should probably be a stack consisting of login, signup, forgot password etc.
    },
    {
        initialRouteName: 'Auth',
    }
);

export default MainStackNavigator