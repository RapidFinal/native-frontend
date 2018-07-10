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
  createEmployeeInfo(uid, firstName, lastName, desc, statusId, tags, imgUrl, categories, experiences) {
    this.getAllTags().then((allTags) => {
      let tagIds = [];
      tags.forEach(tag => {
        if ( allTags[tag] !== null) {
          let tagId = allTags[tag];
          tagIds.push(tagId);
          this.addUidToTag(uid, tagId);
        } else {
          let tagId = firebase.database().ref("tags/").push().key;
          tagIds.push(allTags[tag]);
          firebase.database().ref("tags/" + tagId + "/").set({tagName: tag});
          this.addUidToTag(uid, tagId)
        }
      });

      let value = {
        firstName: firstName,
        lastName: lastName,
        description: desc,
        statusId: statusId,
        tagIds: tagIds,
        imgUrl: imgUrl
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
          let tagId = allTags[tag];
          tagIds.push(tagId);
          this.addUidToTag(uid, tagId);
        } else {
          let tagId = firebase.database().ref("tags/").push().key;
          tagIds.push(allTags[tag]);
          firebase.database().ref("tags/" + tagId + "/").set({tagName: tag});
          this.addUidToTag(uid, tagId)
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
          ret.imgUrl = val.imgUrl;
          ret.status = status;
          ret.experiences = ex;
          ret.tagIds = val.tagIds;
          ret.projects = prog;
          resolve(ret)
        })
      }).catch((error) => {
        reject(error);
      });
    });
  }

  updateEmployeeFirstName(uid, firstName) {
    firebase.database().ref("employeeInfo/" + uid + "/firstName").set(firstName);
  }

  updateEmployeeLastName(uid, lastName) {
    firebase.database().ref("employeeInfo/" + uid + "/lastName").set(lastName);
  }

  updateEmployeeDescription(uid, desc) {
    firebase.database().ref("employeeInfo/" + uid + "/description").set(desc);
  }

  updateEmployeeStatus(uid, statusId) {
    firebase.database().ref("employeeInfo/" + uid + "/statusId").set(statusId);
  }

  updateEmployeeTags(uid, tags) {
    this.getAllTags().then((allTags) => {
      let tagIds = [];
      tags.forEach(tag => {
        if ( allTags[tag] !== null) {
          console.log("tag exist");
          tagIds.push(allTags[tag])
        } else {
          console.log("tag not exist");
          let tagId = firebase.database().ref("tags/").push().key;
          tagIds.push(allTags[tag]);
          firebase.database().ref("tags/" + tagId + "/").set({tagName: tag});
        }
      });
      firebase.database().ref("employeeInfo/" + uid + "/tagIds/").set(tagIds);
    });
  }

  // exp = {title: "title2", desc: "defefefefefefer"}, {title: "title3", desc: "defefefefefefer"}
  // need to talk with sky on the the process of edit
  updateEmployeeExperience(uid, exp) {

  }

  updateEmployeeProject(uid, projectId, progName, progDesc, date, tags) {
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
      firebase.database().ref("employeeInfo/" + uid + "/projects/" + projectId + "/").set(value);
    });
  }

  updateEmployeeImgUrl(uid, url) {
    firebase.database().ref("employeeInfo/" + uid + "/imgUrl/").set(url);
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
      }).catch((error) => {
        reject(error)
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
  createTag(tagName){
    firebase.database().ref("tags/").push({tagName: tagName});
  }

  // array of tags: ["java", "python"]
  createSuggestedTag(catId, tags) {
    firebase.database().ref("employeeInfo/" + uid + "/").set(value);
  }

  addUidToTag(uid, tagId) {
    this.getEmployeeFromTag(tagId).then(employeeIds => {
      if (!employeeIds.includes(uid)) {
        employeeIds.push(uid);
        firebase.database().ref("tags/" + tagId + "/employeeIds/").set(employeeIds);
      }
    })
  }

  // return array of uid
  getEmployeeFromTag(tagId) {
    return new Promise((resolve, reject) => {
      firebase.database().ref("tags/" + tagId + "/").once('value').then(function(snapshot) {
        let ret = [];
        if (snapshot.hasChild("employeeIds")){
          resolve(snapshot.val().employeeIds);
        } else {
          resolve([]);
        }
      });
    });
  }

  // categoryId that employee pick
  // suppose that employee pick web and programming
  getSuggestedTagsFrom(categoryId) {
    return ["java", "react", "vue", "python"];
  }

  getTagName(tagId) {
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
        });
        // console.log(ret);
        resolve(ret)
      });
    })
  }

}
export default DatabaseService