import Edit_Test from "../screens/Edit_Test";
import LikeScreen from "../screens/Like";
import ViewCandidateProfile from "../screens/ViewProfile";
import Signup from "../screens/Signup";
import SearchResult from "../screens/SearchResult";
import AccountWrapper from "../screens/accountmanagement/AccountWrapper"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Home from '../screens/Home';
import {createBottomTabNavigator, createStackNavigator, createSwitchNavigator} from "react-navigation";
import React from "react";
import {
    EmployeeCategorySelect,
    EmployeeCredentialSignUp,
    EmployeeInfo,
    WorkExp
} from "../screens/employeeSignUp";
import {
    EmployerCategorySelect,
    EmployerCredentialSignUp,
} from "../screens/employerSignUp"
import {
    Signin,
    CredentialSignin,
    ForgotPassword,
} from '../screens/signin'
import SideMenu from "../components/CategorySideMenu";
import SubCategorySideMenu from "../components/SubCategorySideMenu"
import ChangeEmail from "../screens/accountmanagement/ChangeEmail"
import ChangePassword from "../screens/accountmanagement/ChangePassword"
import ViewEmployerProfile from "../screens/ViewEmployerProfile"
import {View} from "react-native";
import Initial from "../screens/Initial";
import EditEmployerProfile from "../screens/EditEmployerProfile";
import EditProfile from '../screens/EditProfile';

/* REQUIRED in both EmployerMainStack & CandidateMainStack  */
const headerOptions = () => ({
    headerRight: <View></View>,
    headerTitleStyle: {flex: 1, textAlign: 'center'}
});

const EmployerTabStack = createBottomTabNavigator(
    {
        ViewEmployer: ViewEmployerProfile,
        Home: Home,
        Like: LikeScreen
    },
    {
        navigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === 'ViewEmployer') {
                    iconName = `ios-contact${focused ? '' : '-outline'}`;
                } else if (routeName === 'Home') {
                    iconName = `ios-home${focused ? '' : '-outline'}`;
                }
                else if (routeName === 'Like') {
                    iconName = `ios-heart${focused ? '' : '-outline'}`;
                }

                return <Ionicons name={iconName} size={25} color={tintColor}/>;
            }
        }),
        initialRouteName: "Home"
    }
);

const CandidateTabStack = createBottomTabNavigator(
    {
        View: ViewCandidateProfile,
        Home: Home,
        Edit: EditProfile,
    },
    {
        navigationOptions: ({navigation}) => ({
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
        }),
        initialRouteName: "Home"
    }
);

const EmployerMainStack = createStackNavigator(
    {
        MainEmployer: EmployerTabStack,
        SideMenu: SideMenu,
        SubCategorySideMenu: SubCategorySideMenu,
        AccountWrapper: AccountWrapper,
        SearchResult: SearchResult,
        ChangePassword: ChangePassword,
        ChangeEmail: ChangeEmail,
        EditEmployerProfile: EditEmployerProfile,
        View: ViewCandidateProfile, // View on tabbar for employer, will go to their profile
    },
    {
        navigationOptions: headerOptions
    }
);

const CandidateMainStack = createStackNavigator(
    {
        MainCandidate: CandidateTabStack,
        SideMenu: SideMenu,
        SubCategorySideMenu: SubCategorySideMenu,
        AccountWrapper: AccountWrapper,
        SearchResult: SearchResult,
        ChangePassword: ChangePassword,
        ChangeEmail: ChangeEmail
    },
    {
        navigationOptions: headerOptions
    }
);

const AuthenticationMainStack = createStackNavigator(
    {
        Signin: Signin,
        /*  Sign up related */
        Signup: Signup,
        employeeCategorySelect: EmployeeCategorySelect,
        employeeCredentialSignUp: EmployeeCredentialSignUp,
        employeeInfo: EmployeeInfo,
        workExp: WorkExp,
        employerCredentialSignUp: EmployerCredentialSignUp,
        employerCategorySelect: EmployerCategorySelect,
        /*********************/
        CredentialSignin: CredentialSignin,
        ForgotPassword: ForgotPassword,
        AccountWrapper: AccountWrapper,
        /* Others */
        Home: Home,
        SideMenu: SideMenu,
        SubCategorySideMenu: SubCategorySideMenu,
        SearchResult: SearchResult,
        View: ViewCandidateProfile,
    },
    {
        initialRouteName: 'Home',
        navigationOptions: headerOptions
    }
);

EmployerTabStack.navigationOptions = ({navigation}) => {
    return setHeaderTabItems(navigation);
};

CandidateTabStack.navigationOptions = ({navigation}) => {
    return setHeaderTabItems(navigation);
};

/* Set each screen in the tab navigator to the route name.
 * It'll adjust the route name if necessary.
 * For home page, it'll show the side menu button on the top left.
 */
function setHeaderTabItems(navigation) {
    let {routeName} = navigation.state.routes[navigation.state.index];
    let headerTitle = routeName;
    // Adjust header title if necessary
    if (routeName === "ViewEmployer") headerTitle = "View";
    // Show category menu icon if in home page (+ set route name)
    if (routeName === "Home") return {
        headerTitle,
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
                onPress={() => navigation.push("AccountWrapper")}/>
        ),
        headerTitleStyle: {flex: 1, textAlign: 'center'}
    };
    // For all other screens, do not show category menu icon
    else return {
        headerTitle,
        headerLeft: (
            <View>
            </View>
        ),
        headerRight: (
            <MaterialCommunityIcons.Button
                name="account"
                backgroundColor="transparent"
                color="black"
                onPress={() => navigation.push("AccountWrapper")}/>
        ),
        headerTitleStyle: {flex: 1, textAlign: 'center'}
    };
}

MainStackNavigator = createSwitchNavigator(
    {
        MainEmployer: EmployerMainStack,
        MainCandidate: CandidateMainStack,
        Auth: AuthenticationMainStack,
        Initial: Initial
    },
    {
        initialRouteName: 'Initial',
    }
);

export default MainStackNavigator
