import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import {FlatList, ScrollView, StyleSheet, View} from "react-native";
import {
    Button,
    Container, Content,
    H3,
    Text,
} from "native-base";
import {
    NextButton,
    SignUpForm,
    StatusDropdown,
    Stepper,
    TextInput,
    TextInputWithLabel
} from "../../components/";
import {withContext} from "../../context/withContext";

class EmployeeInfo extends React.Component {

    static propTypes = {

    }

    state = {
        tags: [
            "",
            "",
            ""
        ],
        degree: "",
        error: {
            message: "Required",
            tags: [
                false,
                false,
                false
            ],
            degree: false,
            status: false,
        },
        suggestionTags: ["Java","vue","python","c","c++"],
        status: "",
    };

    handleChange = (name) => (event) => {
        if (typeof name === "number") {
            const {tags} = this.state;
            tags[name] = event.nativeEvent.text;
            this.setState({tags})
            this.validate(name)
        }
        else {
            this.setState({
                [name]: event.nativeEvent.text
            })
        }
    };

    validate = (errorField) => {
        const {error, tags, degree, status} = this.state;
        console.log(this.props.context)
        if (typeof errorField === "number" && tags[errorField] === '') {
            error.tags[errorField] = true;
        }
        else if (errorField === "degree" && degree === '') {
            error.degree = true;
        }
        else if (status === "") {
            error.status = true;
        }
        else {
            if (typeof errorField === "number") {
                error.tags[errorField] = false
            }
            else if (errorField === "degree") {
                error.degree = false
            }
            else {
                error.status = false
            }
        }
        this.setState({error})
    };

    passAllFlags = () => {
        const {tags, degree, status} = this.state;
        const {context} = this.props;
        let flag = true;
        for (let index = 0; index < tags.length; index++) {
            if (tags[index] === '') {
                this.validate(index);
                flag = false;
            }
        };
        if (degree === '') {
            this.validate("degree");
            flag = false
        }
        if (status === "") {
            this.validate("status")
            flag = false
        }

        return flag;
    };

    attemptSubmit = () => {
        const {tags, degree, status} = this.state;
        const {navigation, setContext, context} = this.props;

        if (this.passAllFlags()) {
            context.employee.tags = tags;
            context.employee.degree = degree;
            context.status = status;
            setContext({
                employee: context.employee,
                status: context.status
            });

            navigation.navigate("workExp")
        }
    }

    setStatusState = (status) => {
        const {error} = this.state;
        error.status = false;
        this.setState({
            status: status,
            error: error
        });
    }

    renderButton = (tag) => (
        <Button
            small
            style={styles.button}
            onPress={() => this.putTagInTextInput(tag)}
        >
            <Text uppercase={false}>{"+ " + tag}</Text>
        </Button>
    )


    putTagInTextInput = (tag) => {
        const {tags, error} = this.state
        let flag = false;
        for (let index = 0; index < tags.length; index++) {
            if (tags[index] === tag) {
                break;
            }
            else if (tags[index] === '') {
                flag = true;
                tags[index] = tag

                error.tags[index] = false;
                this.setState({tags,error});
                break;
            }
        }
    }


    render() {
        const {tags, degree, error, suggestionTags} = this.state; // to easily access state put desire variable in the curly brace so it may become const {variable} = this.state;
        return (
            <Container>
                <Content>
                    <Stepper
                        currentPosition={2}
                        stepCount={4}
                    />
                    <ScrollView>
                        <SignUpForm>
                            <H3>Your top skills</H3>
                            <Text style={styles.text}>Suggestion of popular tags for </Text>

                            <View style={styles.container}>
                                {suggestionTags.map((tag, index) => (
                                    this.renderButton(tag)
                                ))}
                            </View>

                            {tags.map((tag, index) => (
                                <TextInput
                                    placeholder={`${index + 1}. Add ...`}
                                    value={tag}
                                    onChange={this.handleChange(index)}
                                    hasError={error.tags[index]}
                                    errorMessage={error.message}
                                    onBlur={() => this.validate(index)}
                                />
                            ))}

                            <View style={styles.marginVertical}>
                                <TextInputWithLabel
                                    label={"Degree"}
                                    placeholder={"Degree"}
                                    value={degree}
                                    onChange={this.handleChange("degree")}
                                    hasError={error.degree}
                                    errorMessage={error.message}
                                    onBlur={() => this.validate("degree")}
                                />
                            </View>
                            <Text>Status</Text>
                            <StatusDropdown func={this.setStatusState} hasError={error.status}/>
                            {error.status ? <Text style={styles.error}>{error.message}</Text> : null}
                            <NextButton onPress={() => this.attemptSubmit()}/>
                        </SignUpForm>
                    </ScrollView>
                </Content>
            </Container>
        )
    }

}

const styles = StyleSheet.create({
    text: {
        marginVertical: 10
    },
    marginVertical: {
        marginVertical: 20
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: "wrap",
        marginBottom: 10
    },
    button: {
        justifyContent: 'center',
        width: '30%',
        margin: 5,
    },
    error: {
        color: "red",
        fontSize: 14,
    }
});

export default compose(withContext) (EmployeeInfo)
