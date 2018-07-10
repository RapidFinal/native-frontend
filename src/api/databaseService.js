import firebase from 'react-native-firebase'

class DatabaseService {

  // Employee

  // tags = ["java", "python"]
  // experiences = [{title: "title2", desc: "defefefefefefer"}, {title: "title3", desc: "defefefefefefer"}]
  // if user do not fill in, experiences = null
  // categories = map of categoey-subcategory that selected
  // {
  //   "categoryId1": ["subcategoryId1", "subcategoryId2", "subcategoryId3"],
  //   "categoryId2": ["subcategoryId1", "subcategoryId2", "subcategoryId3"]
  // }
  createEmployeeInfo(uid, firstName, lastName, desc, statusId, tags, categories, experiences) {
    this.getAllTags().then((allTags) => {
      let tagIds = [];
      tags.forEach(tag => {
        if ( allTags[tag] !== null) {
          console.log("tag exist");
          tagIds.push(allTags[tag])
        } else {
          console.log("tag not exist");
          var tagId = firebase.database().ref("tags/").push().key;
          tagIds.push(allTags[tag])
          firebase.database().ref("tags/" + tagId + "/").set({tagName: tag});
        }
      });

      let value = {
        firstName: firstName,
        lastName: lastName,
        description: desc,
        statusId: statusId,
        tagIds: tagIds,
      };
      firebase.database().ref("employeeInfo/" + uid + "/").set(value);

      Object.entries(categories).forEach(
        ([categoryId, subCatIds]) => {
          firebase.database().ref("employeeInfo/" + uid + "/categories/" + categoryId + "/").set({subCategoryIds: subCatIds});
        }
      );

      if (experiences !== null) {
        experiences.forEach(exp => {
          this.createEmployeeExperiences(uid, exp);
        })
      }
    });
  }


  createEmployeeExperiences(uid, title, desc) {
    let value = {
      experience_title: title,
      experience_description: desc
    };
    firebase.database().ref("employeeInfo/" + uid + "/experiences/").push(value)
  }

  // tags = ["java", "python"]
  createEmployeeProjects(uid, progName, progDesc, date, tags) {
    this.getAllTags().then((allTags) => {
      let tagIds = [];
      tags.forEach(tag => {
        if ( allTags[tag] !== null) {
          tagIds.push(allTags[tag])
        } else {
          let tagId = firebase.database().ref("tags/").push().key;
          tagIds.push(allTags[tag]);
          firebase.database().ref("tags/" + tagId + "/").set({tagName: tag});
        }
      });

      let value = {
        projectName: progName,
        projectDescription: progDesc,
        date: date,
        tagIds: tagIds
      };
      firebase.database().ref("employeeInfo/" + uid + "/projects/").push(value);
    });
  }

  getEmployeeInfo(uid) {
    return new Promise((resolve, reject) => {
      firebase.database().ref("employeeInfo/" + uid + "/").once('value').then((snapshot) => {
        this.getStatus(snapshot.val().statusId).then(status => {
          const ret = {};
          let val = snapshot.val();

          let ex = []
          if (val.experiences !== null){
            Object.entries(val.experiences).forEach( ([id, info]) => {
              ex.push({title: info.title, description: info.desc});
            });
          } else {
            ex = null;
          }

          let prog = []
          if (val.projects !== null){
            Object.entries(val.projects).forEach( ([id, info]) => {
              prog.push({name: info.projectName, description: info.projectDescription,
                date: info.date, tags: info.tagIds});
            });
          } else {
            prog = null;
          }

          ret.firstName = val.firstName;
          ret.lastName = val.lastName;
          ret.description = val.description;
          ret.status = status;
          ret.experiences = ex;
          ret.tagIds = val.tagIds;
          ret.projects = prog;
          resolve(ret)
        })
      });
    });
  }


  // look for field name and type of value in doc
  updateEmployeeInfoAt(uid, field, value) {

  }



  // assume you want to get at projects filed
  // getEmployeeInfoAt("uid", "projects") -> array of object
  //                                      -> [{},{}]
  getEmployeeInfoAt(uid, field) {
    let ret = [{
      name: "Note Sharing", description: "a web application to share and comment notes",
      date: "01/06/2018", tags: ["firebase", "Vue", "Cordova"]
    }];
    return ret;
  }

  // Employer

  // categories = map of categoey-subcategory that selected
  // {
  //   "categoryId1": ["subcategoryId1", "subcategoryId2", "subcategoryId3"],
  //   "categoryId2": ["subcategoryId1", "subcategoryId2", "subcategoryId3"]
  // }
  createEmployerInfo(uid, firstName, lastName, companyName, categories) {
    let value = {
      firstName: firstName,
      lastName: lastName,
      companyName: companyName
    };
    firebase.database().ref("employerInfo/" + uid + "/").set(value);

    Object.entries(categories).forEach(
      ([categoryId, subCatIds]) => {
        firebase.database().ref("employerInfo/" + uid + "/categories/" + categoryId + "/").set({subCategoryIds: subCatIds});
      }
    );
  }

  // look for field name and type of value in doc
  updateEmployerInfoAt(uid, field, value) {

  }

  getEmployerInfo(uid) {
    let ret = {firstName: "Alice", lastName:"Smith", companyName: "MUIC",
              categories: [
                {
                  categoryId: "cat1",
                  categoryName: "Graphic and Design",
                  subCategory: [
                    {subCategoryId: "subCat1", subCategoryName: "Logo"},
                    {subCategoryId: "subCat2", subCategoryName: "Character Design"},
                    {subCategoryId: "subCat3", subCategoryName: "Advertising Banner"}
                  ]
                },
                {
                  categoryId: "cat2",
                  categoryName: "Web and Programming",
                  subCategory: [
                    {subCategoryId: "subCat1", subCategoryName: "HTML / CSS"},
                    {subCategoryId: "subCat2", subCategoryName: "Web Development"},
                    {subCategoryId: "subCat3", subCategoryName: "Mobile Application"}
                  ]
                }
              ]
              };
    return ret;
  }

  // suppose you get categories
  getEmployerInfoAt(uid, field) {
    let ret = [
      {
        categoryId: "cat1",
        categoryName: "Graphic and Design",
        subCategory: [
          {subCategoryId: "subCat1", subCategoryName: "Logo"},
          {subCategoryId: "subCat2", subCategoryName: "Character Design"},
          {subCategoryId: "subCat3", subCategoryName: "Advertising Banner"}
        ]
      },
      {
        categoryId: "cat2",
        categoryName: "Web and Programming",
        subCategory: [
          {subCategoryId: "subCat1", subCategoryName: "HTML / CSS"},
          {subCategoryId: "subCat2", subCategoryName: "Web Development"},
          {subCategoryId: "subCat3", subCategoryName: "Mobile Application"}
        ]
      }
    ];
    return ret;
  }

  // Status

  createStatus(status) {
    firebase.database().ref("status/").push({status: status});
  }

  getStatus(statusId) {
    return new Promise((resolve, reject) => {
      firebase.database().ref("status/" + statusId + "/").once('value').then(function(snapshot) {
        let ret = "";
        ret = snapshot.val().status
        resolve(ret)
      });
    })
  }

  // return map of id and status
  // {"id1": "looking for job",
  //  "id2": "looking for opportunity"}
  getAllStatus() {
    return new Promise((resolve, reject) => {
      firebase.database().ref("status/").once('value').then((snapshot) => {
        const ret = {};
        snapshot.forEach(status => {
          ret[status.key] = status.val().status
        })
        resolve(ret)
      });
    })
  }

  // Categories
  getCategories() {
    let ret = [
      {
        categoryId: "cat1",
        categoryName: "Graphic and Design",
        subCategory: [
          {subCategoryId: "subCat1", subCategoryName: "Logo"},
          {subCategoryId: "subCat2", subCategoryName: "Character Design"},
          {subCategoryId: "subCat3", subCategoryName: "Advertising Banner"}
        ]
      },
      {
        categoryId: "cat2",
        categoryName: "Web and Programming",
        subCategory: [
          {subCategoryId: "subCat1", subCategoryName: "HTML / CSS"},
          {subCategoryId: "subCat2", subCategoryName: "Web Development"},
          {subCategoryId: "subCat3", subCategoryName: "Mobile Application"}
        ]
      }
    ];
    return ret;
  }

  // suppose the category is Web and Programming
  getSubCategories(categoryId) {
    let ret = [
      {subCategoryId: "subCat1", subCategoryName: "HTML / CSS"},
      {subCategoryId: "subCat2", subCategoryName: "Web Development"},
      {subCategoryId: "subCat3", subCategoryName: "Mobile Application"}
    ]
  }

  // Tags

  // If there is no projectId, sent null
  createTag(uid, tagName, projectId) {

  }

  getTagName(tagId) {
    return "java";
  }

  // categoryId that employee pick
  // suppose that employee pick web and programming
  getSuggestedTagsFrom(categoryId) {
    return ["java", "react", "vue", "python"];
  }

  // return array of object
  // suppose tagName = java
  getEmployeeFromTag(tagName) {
    let ret = [{
      firstName: "Sam",
      lastName: "Smith",
      description: "I am a programmer",
      status: "Looking for job",
      liked: 15,
      tags: ["java", "python", "react"],
      experiences: [{title: "Work at MUIC", description: "Be a TA for programming 1"},
        {title: "Intern at v-bit", description: "doing front-end"}],
      projects: [{
        name: "Note Sharing", description: "a web application to share and comment notes",
        date: "01/06/2018", tags: ["firebase", "vue", "cordova"]
      }]
    }];
  }

  getTag(tagId) {
    return new Promise((resolve, reject) => {
      firebase.database().ref("tags/" + tagId + "/").once('value').then(function(snapshot) {
        const ret = "";
        resolve(snapshot.val().tagName);
      });
    });
  }

  getAllTags() {
    return new Promise((resolve, reject) => {
      firebase.database().ref("tags/").once('value').then(function(snapshot) {
        // resolve(snapshot);
        const ret = {};
        snapshot.forEach(tag => {
          ret[tag.val().tagName] = tag.key
        })
        // console.log(ret);
        resolve(ret)
      });
    })
  }

}