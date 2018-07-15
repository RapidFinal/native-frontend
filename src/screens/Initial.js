import React from 'react';
import compose from 'recompose/compose'
import {withContext} from "../context/withContext";
import hoistStatics from "recompose/hoistStatics";
import DatabaseService from "../api/databaseService";
import {Authentication} from '../api'
import {Content, Spinner, Container} from "native-base";

class Initial extends React.Component {

    componentDidMount() {
        const db = new DatabaseService;
        const navigation = this.props.navigation;
        this.unsubscribe = Authentication.onAuthStateChanged((currentUser) => {
            if (currentUser) db.getUserRole(currentUser.uid).then((result) => {
                if (result === "employer") navigation.navigate("MainEmployer");
                else if (result === "employee") navigation.navigate("MainCandidate");
                else /* invalid or null */ {
                    if (!currentUser.additionalUserInfo.isNewUser) {
                        alert("Invalid user role for current user");
                        navigation.navigate("AccountWrapper")
                    }
                }
            }).catch((error) => {
                console.log(error);
            });
            else navigation.navigate("Auth");
        })
    }

    componentWillUnmount(){
        this.unsubscribe()
    }

    render(){
        return (
            <Container>
                <Content>
                    <Spinner color={"black"} />
                </Content>
            </Container>
        )
    }
}

export default hoistStatics(compose(withContext)) (Initial)
