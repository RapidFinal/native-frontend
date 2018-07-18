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
        Authentication.onAuthStateChanged((currentUser) => {
            if (currentUser)
                db.getUserRole(currentUser.uid).then((result) => {
                    if (result === "employer") {
                        this.props.setContext({
                            role: "employer"
                        }, () => navigation.navigate("MainEmployer"));
                    }
                else if (result === "employee") {
                        this.props.setContext({
                            role: "employee"
                        }, () =>  navigation.navigate("MainCandidate"))
                    }
                else /* invalid or null */ {
                    if (!currentUser.additionalUserInfo.isNewUser) {
                        alert("Invalid user role for current user");
                        this.props.setContext({
                            role: null
                        }, () => navigation.navigate("AccountWrapper"))
                    }
                }
            }).catch((error) => {
                console.log(error);
            });
            else navigation.navigate("Auth");
        })
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
