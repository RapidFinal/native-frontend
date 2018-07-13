import Edit_Test from "../screens/Edit_Test";
import LikeScreen from "../screens/Like";
import ViewProfile from "../screens/ViewProfile";
import Signup from "../screens/Signup";
import SearchResult from "../screens/SearchResult";
import AccountWrapper from "../screens/accountmanagement/AccountWrapper"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Home from '../screens/Home';
import {createBottomTabNavigator, createStackNavigator, createSwitchNavigator, createDrawerNavigator} from "react-navigation";
import React from "react";
import {
    EmployeeCategorySelect,
    EmployeeCredentialSignUp,
    EmployeeInfo,
    WorkExp
} from "../screens/employeeSignUp";
import ProjectDetail from '../components/ProjectDetail';
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
            onPress={() => navigation.push("AccountWrapper")}/>
    ),
    headerTitleStyle: {flex: 1, textAlign: 'center'}
});

const ViewStack = createStackNavigator(
    {
        ViewProfile: ViewProfile,
        ViewEmployerProfile : ViewEmployerProfile,
        ProjectDetail: ProjectDetail
    },
    {
        initialRouteName: 'ViewProfile',
    }
);

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
);

const EmployerTabStack = createBottomTabNavigator(
    {
        View: ViewStack,
        Home: Home,
        Like: LikeScreen
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
        View: ViewStack,
        Home: Home,
        Edit: Edit_Test,
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
        SideMenu: SideMenuStack,
        AccountWrapper: AccountWrapper,
        SearchResult: SearchResult,
    },
    {
        navigationOptions: headerOptions
    }
);

const CandidateMainStack = createStackNavigator(
    {
        MainCandidate: CandidateTabStack,
        SideMenu: SideMenuStack,
        AccountWrapper: AccountWrapper,
        SearchResult: SearchResult,
    },
    {
        navigationOptions: headerOptions

    }
);


const SignupStack = createStackNavigator(
    {
        employeeCategorySelect: EmployeeCategorySelect,
        employeeCredentialSignUp: EmployeeCredentialSignUp,
        employeeInfo: EmployeeInfo,
        workExp: WorkExp,
        employerCredentialSignUp : EmployerCredentialSignUp,
        employerCategorySelect : EmployerCategorySelect,
        signUp: Signup
    },
    {
        initialRouteName: 'signUp',
        headerMode: "none"

    }
);

const AuthenticationMainStack = createStackNavigator(
    {
        Signin: Signin,
        Signup: SignupStack,
        CredentialSignin: CredentialSignin,
        ForgotPassword: ForgotPassword,
        AccountWrapper: AccountWrapper,
        ChangePassword: ChangePassword,
        ChangeEmail: ChangeEmail
    },
    {
        initialRouteName: 'AccountWrapper',
    }
);

EmployerTabStack.navigationOptions = ({ navigation }) => {
    return setHeaderToRouteName(navigation);
};

CandidateTabStack.navigationOptions = ({navigation}) => {
    return setHeaderToRouteName(navigation);
};

function setHeaderToRouteName(navigation) {
    let {routeName} = navigation.state.routes[navigation.state.index];
    let headerTitle = routeName;
    return {
        headerTitle,
    };
}

MainStackNavigator = createSwitchNavigator(
    {
        MainEmployer: EmployerMainStack,
        MainCandidate: CandidateMainStack,
        Auth: AuthenticationMainStack,
    },
    {
        initialRouteName: 'Auth',
    }
);

export default MainStackNavigator
