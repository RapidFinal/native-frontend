import React from 'react';
import compose from 'recompose/compose'
import hoistStatics from 'recompose/hoistStatics'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import {Container, Content, Form, Input, Spinner} from "native-base";
import {Item} from "native-base";
import {CredentialAuthentication} from "../../api/authentication"
import IonIcons from 'react-native-vector-icons/Ionicons'
import {withContext} from "../../context/withContext";
import ClickButton from "../../components/ClickButton";

class CredentialSignin extends React.Component {

    static propTypes = {

    };

    state = {
        email: "",
        password: ""
    };

    handleStateChange = (name) => (e) => {
        this.setState({
            [name]: e.nativeEvent.text
        })
    }

    static navigationOptions = ({navigation}) => {
        return ({
            title: 'Signin',
            headerLeft: (
                <IonIcons.Button name="ios-arrow-back" backgroundColor="transparent" color={"black"} onPress={() => navigation.pop()} />
            ),
        })

    };

    handleSigin = async () => {
        const {email, password} = this.state
        try {
            const auth = await CredentialAuthentication.signin({email, password})

            if (auth !== null){
                this.props.setContext({
                    authProvider: "CREDENTIAL"
                })
            }
        } catch (e) {

        }
    }

    render(){
        const {email, password} = this.state;
        return (
            <Container>
                <Content>
                    <Form>
                        <Item>
                            <Input placeholder="Email"  value={email} onChange={this.handleStateChange("email")}/>
                        </Item>
                        <Item last>
                            <Input placeholder="Password" value={password} onChange={this.handleStateChange("password")} />
                        </Item>
                    </Form>
                    <ClickButton onPress={this.handleSigin}>Signin</ClickButton>
                </Content>
            </Container>
        )
    }

}

const styles = StyleSheet.create({

});

export default hoistStatics(compose(withContext)) (CredentialSignin)
