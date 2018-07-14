import React from 'react';
import compose from 'recompose/compose'
import PropTypes from 'prop-types'
import _ from 'lodash'
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
import DatabaseService from "../../api/databaseService";
import Tags from "react-native-tags";

const MyAwesomeButton = ({onPress, children}) => (
    <Button
        small
        style={styles.button}
        onPress={onPress(children)}
    >
        <Text uppercase={false}>{"+ " + children}</Text>
    </Button>
)

const SuggestedTags = ({suggestedTags, func}) => (
    <Tags
        readonly
        initialTags={suggestedTags}
        onTagPress={(index, tagLabel, event) => func(tagLabel)}
        containerStyle={{justifyContent: "center"}}
        tagContainerStyle={{width: "30%", alignItems: 'center', height: 40}}
        tagTextStyle={{fontSize: 16}}
    />
)

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
        suggestionTags: [],
        statusId: "",
    };


    componentDidMount(){
        this.getData()
    }

    getData = () => {
        const {
            selectedCategories
        } = this.props.context
        if (selectedCategories === null) {
            return;
        }
        const k = Object.keys(selectedCategories);
        const dataPromises = k.map(val => DatabaseService.getSuggestedTagsFrom(val))

        Promise
            .all(dataPromises)
            .then((data) => [].concat.apply([], data))
            .then((d) => this.setState({suggestionTags:d}))
    }



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
        const {error, tags, degree, statusId} = this.state;

        if (typeof errorField === "number" && tags[errorField] === '') {
            error.tags[errorField] = true;
        }
        else if (errorField === "degree" && degree === '') {
            error.degree = true;
        }
        else if (statusId === "") {
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
        const {tags, degree, statusId} = this.state;
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
        if (statusId === "") {
            this.validate("status")
            flag = false
        }

        return flag;
    };

    attemptSubmit = () => {
        const {tags, degree, statusId} = this.state;
        const {navigation, setContext, context} = this.props;

        if (this.passAllFlags()) {
            context.employee.tags = tags;
            context.employee.degree = degree;
            setContext({
                employee: context.employee,
                statusId: statusId
            });

            navigation.navigate("workExp")
        }
    }

    setStatusState = (statusId) => {
        const {error} = this.state;
        error.status = false;
        this.setState({
            statusId: statusId,
            error: error
        });
    }



    putTagInTextInput = (tag) => {
        const {tags, error} = this.state
        for (let index = 0; index < tags.length; index++) {
            if (tags[index] === tag) {
                break;
            }
            else if (tags[index] === '') {
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
                            <Text style={styles.text}>Suggestion of popular tags</Text>


                            <SuggestedTags suggestedTags={suggestionTags} func={this.putTagInTextInput}/>

                            {tags.map((tag, index) => (
                                <TextInput
                                    key={index}
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
                                    placeholder={"e.g. B.S. in Marketing"}
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
                            <NextButton
                                onPress={() => this.attemptSubmit()}
                            />
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
