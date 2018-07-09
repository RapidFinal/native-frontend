import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {StyleSheet} from "react-native";
import {Container, Content, Form, Input, Spinner} from "native-base";
import Item from "native-base/src/theme/components/Item";
import {Authentication} from "../api"

class Signin extends React.Component {

    static propTypes = {

    };

    state = {
        email: "",
        password: ""
    };

    handleStateChange = (name) => (e) => {
        this.setState({
            [name]: ""
        })
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
                </Content>
            </Container>
        )
    }

}

const styles = StyleSheet.create({

});

export default compose() (Signin)
