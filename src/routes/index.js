import Home_Test from "../screens/Home_Test";
import Edit_Test from "../screens/Edit_Test";
import Login_Test from "../screens/Login_Test";
import View_Test from "../screens/View_Test";
import Like_Test from "../screens/Like_Test";
import {createBottomTabNavigator, createSwitchNavigator} from "react-navigation";

const EmployerTabStack = createBottomTabNavigator(
    {
        View: View_Test,
        Home: Home_Test,
        Like: Like_Test
    },
);

const CandidateTabStack = createBottomTabNavigator(
    {
        View: View_Test,
        Home: Home_Test,
        Edit: Edit_Test,
    },
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