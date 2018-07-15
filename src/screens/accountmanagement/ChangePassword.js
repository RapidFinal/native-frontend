import React from 'react';
import compose from 'recompose/compose'
import hoistStatics from 'recompose/hoistStatics'
import PropTypes from 'prop-types'
import {Alert, StyleSheet, View} from "react-native";
import {Container, Content, Form, Input, Spinner} from "native-base";
import {Item} from "native-base";
import {CredentialAuthentication} from "../../api/authentication"
import IonIcons from 'react-native-vector-icons/Ionicons'
import {withContext} from "../../context/withContext";
import ClickButton from "../../components/ClickButton";

class ChangeEmail extends React.Component {

    static propTypes = {

    };

    state = {
        password: "",
        newPassword: "",
        confirmPassword: ""
    };

    handleStateChange = (name) => (e) => {
        this.setState({
            [name]: e.nativeEvent.text
        })
    };

    static navigationOptions = ({navigation}) => {
        return ({
            title: 'Change Password',
            headerTitleStyle: {flex: 1, textAlign: 'center'},
            headerRight: <View></View>,
        })
    };

    handleClick = async () => {
        const {password, confirmPassword, newPassword} = this.state
        try {
            CredentialAuthentication.changePassword({password, confirmPassword, newPassword})
                .then(() => {
                    Alert.alert(
                        'Success',
                        `Password has been updated`,
                        [
                            {text: 'OK'},
                        ],
                        { cancelable: false }
                    );
                })

        } catch (e) {
            Alert.alert(
                'Failure',
                `Failed to change password`,
                [
                    {text: 'OK'},
                ],
                { cancelable: false }
            );

            console.log(e)
        }
    }

    render(){
        const {password, newPassword, confirmPassword} = this.state;
        return (
            <Container>
                <Content>
                    <Form>
                        <Item>
                            <Input placeholder="Password"  secureTextEntry={true} value={password} onChange={this.handleStateChange("password")}/>
                        </Item>
                        <Item>
                            <Input placeholder="New Password"  secureTextEntry={true} value={newPassword} onChange={this.handleStateChange("newPassword")}/>
                        </Item>
                        <Item>
                            <Input placeholder="Confirm Password"  secureTextEntry={true} value={confirmPassword} onChange={this.handleStateChange("confirmPassword")}/>
                        </Item>
                    </Form>
                    <ClickButton onPress={this.handleClick}>Change Password</ClickButton>
                </Content>
            </Container>
        )
    }

}

const styles = StyleSheet.create({

});

export default hoistStatics(compose(withContext)) (ChangeEmail)
