import React from 'react';
import {Container, Content, List} from "native-base";
import CategoryItem from "./CategoryItem";
import IonIcons from "react-native-vector-icons/Ionicons"


const subcategory = {
    "1": [
        {
            key: "1",
            name: "Advertising Banner"
        },
        {
            key: "2",
            name: "Dicut and Photoshop"
        },
        {
            key: "3",
            name: "Illustration"
        },
        {
            key: "4",
            name: "Character Design"
        },
        {
            key: "5",
            name: "3D Perspective"
        },
        {
            key: "6",
            name: "Label & Packaging"
        }
    ],
    "2": [
        {
            key: "1",
            name: "Marketing Sub"
        }
    ],
    "3": [
        {
            key: "1",
            name: "Web Frontend"
        },
        {
            key: "2",
            name: "Backend"
        },
        {
            key: "3",
            name: "Auto Scaling"
        },
    ],
    "4": [
        {
            key: "1",
            name: "Law Consultant"
        },
        {
            key: "2",
            name: "Sub Consultant"
        }

    ]
};
class SubCategorySideMenu extends React.Component {

    static navigationOptions = ({navigation}) => {
        return ({
            title: 'Sub Categories',
        })
    };

    handleClicked = (key) => (e) => {
        alert(key)
    }

    render(){
        const {subCategoriesKey: subKey, subCategories} = this.props.navigation.state.params;
        return (
            <Container>
                <Content>
                    <List>
                        {
                            subCategories.map(({subCategoryId: key, subCategoryName: name}) => (
                                <CategoryItem
                                    key={key}
                                    onPress={this.handleClicked(key)}>
                                    {name}
                                </CategoryItem>
                            ))
                        }
                    </List>
                </Content>
            </Container>
        )
    }
}

export default SubCategorySideMenu;