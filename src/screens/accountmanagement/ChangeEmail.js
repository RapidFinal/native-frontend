import React from 'react';
import compose from 'recompose/compose'
import hoistStatics from 'recompose/hoistStatics'
import PropTypes from 'prop-types'
import {Alert, StyleSheet} from "react-native";
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
        newEmail: "",
        confirmEmail: ""
    };

    handleStateChange = (name) => (e) => {
        this.setState({
            [name]: e.nativeEvent.text
        })
    };

    static navigationOptions = ({navigation}) => {
        return ({
            title: 'Change Email',
            headerLeft: (
                <IonIcons.Button
                    name="ios-arrow-back"
                    backgroundColor="transparent"
                    color={"black"}
                    onPress={() => navigation.pop()}
                />
            ),
            headerRight: (
                null
            )
        })
    };

    handleClick = async () => {
        const {password, newEmail, confirmEmail} = this.state
        try {
            CredentialAuthentication.changeemail({password, newEmail, confirmEmail})
                .then(() => {
                    Alert.alert(
                        'Success',
                        `Email has been updated`,
                        [
                            {text: 'OK'},
                        ],
                        { cancelable: false }
                    );
                })
        } catch (e) {
            Alert.alert(
                'Failure',
                `There was an error`,
                [
                    {text: 'OK'},
                ],
                { cancelable: false }
            );

            console.log(e)
        }
    }

    render(){
        const {password, newEmail, confirmEmail} = this.state;
        return (
            <Container>
                <Content>
                    <Form>
                        <Item>
                            <Input placeholder="Password"  value={password} onChange={this.handleStateChange("password")}/>
                        </Item>
                        <Item>
                            <Input placeholder="New Email"  value={newEmail} onChange={this.handleStateChange("newEmail")}/>
                        </Item>
                        <Item>
                            <Input placeholder="Confirm Eamil"  value={confirmEmail} onChange={this.handleStateChange("confirmEmail")}/>
                        </Item>
                    </Form>
                    <ClickButton onPress={this.handleClick}>Change Email</ClickButton>
                </Content>
            </Container>
        )
    }

}

const styles = StyleSheet.create({

});

export default hoistStatics(compose(withContext)) (ChangeEmail)
