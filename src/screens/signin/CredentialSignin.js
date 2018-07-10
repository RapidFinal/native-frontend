import React from 'react';
import compose from 'recompose/compose'
import hoistStatics from 'recompose/hoistStatics'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import {Container, Content, Form, Input, Spinner} from "native-base";
import {Item} from "native-base";
import {Authentication} from "../../api"
import IonIcons from 'react-native-vector-icons/Ionicons'
import {withContext} from "../../context/withContext";
import {hoistStatics} from "recompose";

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
                </Content>
            </Container>
        )
    }

}

const styles = StyleSheet.create({

});

export default hoistStatics(compose(withContext)) (CredentialSignin)
