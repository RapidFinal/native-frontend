import firebase from 'react-native-firebase'

class DatabaseService {

  getUserRole(uid) {
    return new Promise((resolve, reject) => {
      firebase.database().ref("userRole/" + uid + "/role/").once('value').then((snapshot) => {
        resolve(snapshot.val());
      });
    });
  }

  // Employee

  // tags = ["java", "python"]
  // experiences = [{title: "title2", desc: "defefefefefefer"}, {title: "title3", desc: "defefefefefefer"}]
  // if user do not fill in, experiences = null
  // categories = map of categoey-subcategory that selected
  // {
  //   "categoryId1": ["subcategoryId1", "subcategoryId2", "subcategoryId3"],
  //   "categoryId2": ["subcategoryId1", "subcategoryId2", "subcategoryId3"]
  // }
  static createEmployeeInfo(uid, firstName, lastName, desc, statusId, tags, categories, experiences, major) {
    this.getAllTags().then((allTags) => {
      let tagIds = [];
      tags.forEach(tag => {
        if (typeof(allTags[tag]) !== 'undefined') {
          let tagId = allTags[tag];
          tagIds.push(tagId);
          this.addUidToTag(uid, tagId);
        } else {
          let tagId = firebase.database().ref("tags/").push().key;
          tagIds.push(tagId);
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
        major: major,
        role: "employee",
        liked: 0
      };
      firebase.database().ref("employeeInfo/" + uid + "/").set(value);
      firebase.database().ref("userRole/" + uid + "/").set({role: "employee"});

      Object.entries(categories).forEach(
        ([categoryId, subCatIds]) => {
          firebase.database().ref("employeeInfo/" + uid + "/categories/" + categoryId + "/").set({subCategoryIds: subCatIds});
          this.addUidToSubCategory(uid, categoryId, subCatIds);
        }
      );

      if (experiences !== null) {
        experiences.forEach(exp => {
          this.createEmployeeExperiences(uid, exp.title, exp.desc);
        })
      }
    });
  }


  static createEmployeeExperiences(uid, title, desc) {
    let value = {
      experience_title: title,
      experience_description: desc
    };
    firebase.database().ref("employeeInfo/" + uid + "/experiences/").push(value)
  }

  // links: {youtube: www.youtube.com
  //         website: www.helloworld.com}
  // tag: ["java", "python"]
  createEmployeeProjects(uid, progName, progDesc, date, tags, links) {
    this.getAllTags().then((allTags) => {
      let progId = firebase.database().ref("employeeInfo/" + uid + "/projects/").push().key;
      let tagIds = [];
      tags.forEach(tag => {
        if ( typeof(allTags[tag]) !== 'undefined') {
          let tagId = allTags[tag]
          tagIds.push(tagId);
          this.addProjectIdToTag(uid, progId, tagId);
        } else {
          let tagId = firebase.database().ref("tags/").push().key;
          tagIds.push(tagId);
          firebase.database().ref("tags/" + tagId + "/").set({tagName: tag});
          this.addProjectIdToTag(uid, progId, tagId)
        }
      });

      let value = {
        projectName: progName,
        projectDescription: progDesc,
        date: date,
        tagIds: tagIds
      };
      firebase.database().ref("employeeInfo/" + uid + "/projects/" + progId +"/").set(value);

      if (links !== null) {
        Object.entries(links).forEach(
          ([type, link]) => {
            let val = {type: type,
              link: link};
            firebase.database().ref("employeeInfo/" + uid + "/projects/" + progId + "/links/").push(val);
          })
      }
    });
  }

  CreateEmployeeSkillSet(uid, skill) {
    this.getEmployeeSkillSet(uid).then(skills => {
      // console.log(skills.val());
      skills[skill] = true;
      firebase.database().ref("employeeInfo/" + uid + "/skillSet/").set(skills);
    })
  }

  getEmployeeSkillSet(uid) {
    return new Promise((resolve, reject) => {
      firebase.database().ref("employeeInfo/" + uid + "/skillSet/").once('value').then(snapshot => {
        resolve(snapshot.val());
      });
    });
  }


  getEmployeeInfo(uid) {
    return new Promise((resolve, reject) => {
      firebase.database().ref("employeeInfo/" + uid + "/").once('value').then((snapshot) => {
        this.getStatus(snapshot.val().statusId).then(status => {
          const ret = {};
          let val = snapshot.val();

          let ex = [];
          if (typeof(val.experiences) !== 'undefined'){
            Object.entries(val.experiences).forEach( ([id, info]) => {
              ex.push({title: info.experience_title, description: info.experience_description});
            });
          } else {
            ex = [];
          }

          let prog = [];
          // console.log(val.projects);
          if (typeof(val.projects) !== 'undefined'){
            Object.entries(val.projects).forEach( ([id, info]) => {
              prog.push({name: info.projectName, description: info.projectDescription,
                date: info.date, tags: info.tagIds});
            });
          } else {
            prog = [];
          }

          let skills = [];
          if (typeof(val.skillSet) !== 'undefined'){
            Object.entries(val.skillSet).forEach( ([skill, bool]) => {
              skills.push(skill);
            });
          } else {
            skills = [];
          }

          let imgUrl = "";
          if (typeof(val.imgUrl) !== 'undefined'){
            imgUrl = val.imgUrl;
          } else {
            imgUrl = "";
          }

          ret.firstName = val.firstName;
          ret.lastName = val.lastName;
          ret.description = val.description;
          ret.imgUrl = imgUrl;
          ret.status = status;
          ret.experiences = ex;
          ret.tagIds = val.tagIds;
          ret.projects = prog;
          ret.skillSet = skills;
          ret.major = val.major;
          resolve(ret)
        })
      });
    });
  }

  updateEmployeeDegree(uid, degree) {
    firebase.database().ref("employeeInfo/" + uid + "/degree").set(degree);
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
      this.getEmployeeTags(uid).then((oldTagIds) => {
        let tagIds = [];
        tags.forEach(tag => {

          if ( allTags[tag] !== null) {
            let tagId = allTags[tag];
            tagIds.push(tagId);
            this.addUidToTag(uid, tagId)
          } else {
            let tagId = firebase.database().ref("tags/").push().key;
            tagIds.push(allTags[tag]);
            firebase.database().ref("tags/" + tagId + "/").set({tagName: tag});
            this.addUidToTag(uid, tagId)
          }
        });

        oldTagIds.filter((tagId) => {
          if(!tagIds.includes(tagId)) {
            firebase.database().ref("tags/" + tagId + "/employeeIds/" + uid + "/").remove();
          }
        });
        firebase.database().ref("employeeInfo/" + uid + "/tagIds/").set(tagIds);
      })
    });
  }

  // exp = {title: "title2", desc: "defefefefefefer"}, {title: "title3", desc: "defefefefefefer"}
  // need to talk with sky on the the process of edit
  updateEmployeeExperience(uid, exp) {

  }

  updateEmployeeProject(uid, projectId, progName, progDesc, date, tags) {
    this.getAllTags().then((allTags) => {
      this.getEmployeeTags(uid).then((oldTagIds) => {
        let tagIds = [];
        tags.forEach(tag => {
          let tagId = allTags[tag];
          if ( tagId !== null) {
            tagIds.push(tagId);
            this.addProjectIdToTag(uid, projectId, tagId)
          } else {
            let tagId = firebase.database().ref("tags/").push().key;
            tagIds.push(tagId);
            firebase.database().ref("tags/" + tagId + "/").set({tagName: tag});
            this.addProjectIdToTag(uid, projectId, tagId)
          }
        });

        oldTagIds.filter((tagId) => {
          if(!tagIds.includes(tagId)) {
            firebase.database().ref("tags/" + tagId + "/projectIds/" + projectId + "/").remove();
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
    });
  }

  getEmployeeTags(uid) {
    return new Promise((resolve, reject) => {
      firebase.database().ref("employeeInfo/" + uid + "/tagIds/").once('value').then((snapshot) => {
        resolve(snapshot.val());
      });
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

  updateEmployeeLiked(uid, val){
    firebase.database().ref("employeeInfo/" + uid + "/liked/").set(val);
  }

  getEmployeeLiked(uid) {
    return new Promise((resolve, reject) => {
      firebase.database().ref("employeeInfo/" + uid + "/liked/").once('value').then(function(snapshot) {
        resolve(snapshot.val())
      });
    });
  }

  // Employer

  // categories = map of categoey-subcategory that selected
  // {
  //   "categoryId1": ["subcategoryId1", "subcategoryId2", "subcategoryId3"],
  //   "categoryId2": ["subcategoryId1", "subcategoryId2", "subcategoryId3"]
  // }
  static createEmployerInfo(uid, firstName, lastName, companyName, categories) {
    let value = {
      firstName: firstName,
      lastName: lastName,
      companyName: companyName,
      role: "employer"
    };
    firebase.database().ref("employerInfo/" + uid + "/").set(value);
    firebase.database().ref("userRole/" + uid + "/").set({role: "employer"});

    Object.entries(categories).forEach(
      ([categoryId, subCatIds]) => {
        firebase.database().ref("employerInfo/" + uid + "/categories/" + categoryId + "/").set({subCategoryIds: subCatIds});
      }
    );
  }

  updateEmployerImgUrl(uid, url) {
    firebase.database().ref("employerInfo/" + uid + "/imgUrl/").set(url);
  }

  updateEmployerFirstName(uid, firstName) {
    firebase.database().ref("employerInfo/" + uid + "/firstName").set(firstName);
  }

  updateEmployerLastName(uid, lastName) {
    firebase.database().ref("employerInfo/" + uid + "/lastName").set(lastName);
  }

  updateEmployerDescription(uid, desc) {
    firebase.database().ref("employerInfo/" + uid + "/deacription").set(desc);
  }

  updateEmployerCategories(uid, cat) {

  }

  // ret = {firstName: "Alice", lastName:"Smith", companyName: "MUIC", imgUrl,
  //   categories: [
  //     {
  //       categoryId: "cat1",
  //       categoryName: "Graphic and Design",
  //       subCategory: [
  //         {subCategoryId: "subCat1", subCategoryName: "Logo"},
  //         {subCategoryId: "subCat2", subCategoryName: "Character Design"},
  //         {subCategoryId: "subCat3", subCategoryName: "Advertising Banner"}
  //       ]
  //     },
  //     {
  //       categoryId: "cat2",
  //       categoryName: "Web and Programming",
  //       subCategory: [
  //         {subCategoryId: "subCat1", subCategoryName: "HTML / CSS"},
  //         {subCategoryId: "subCat2", subCategoryName: "Web Development"},
  //         {subCategoryId: "subCat3", subCategoryName: "Mobile Application"}
  //       ]
  //     }
  //   ]
  // };
  getEmployerInfo(uid) {
    return new Promise((resolve, reject) => {
      this.getCategoriesInfo().then(allCats => {
        firebase.database().ref("employerInfo/" + uid + "/").once('value').then((snapshot) => {
          const ret = {};
          let val = snapshot.val();
          let cat = []
          Object.entries(val.categories).forEach(
            ([categoryId, subCatIds]) => {
              let tmp = {};
              let arr = [];
              subCatIds.subCategoryIds.forEach( (subCatId) => {
                let subCats = {
                  subCategoryId: subCatId,
                  subCategoryName: allCats[categoryId].subCategory[subCatId].subCategoryName
                }
                arr.push(subCats);
              });
              tmp.categoryId = categoryId;
              tmp.categoryName = allCats[categoryId].categoryName;
              tmp.subCategory = arr
              cat.push(tmp);
            }
          );

          let imgUrl = "";
          if (typeof(val.imgUrl) !== 'undefined'){
            imgUrl = val.imgUrl;
          } else {
            imgUrl = "";
          }

          ret.firstName = val.firstName;
          ret.lastName = val.lastName;
          ret.companyName = val.companyName;
          ret.categories = cat;
          ret.imgUrl = imgUrl;
          resolve(ret);
        });
      });
    });
  }

  likedEmployee(employerUid, employeeUid){
    this.getLikedEmployee(employerUid).then((list) => {
      this.getEmployeeLiked(employeeUid).then((liked) => {
        this.updateEmployeeLiked(employeeUid, liked+1)
      });
      if (typeof(list[employeeUid]) === 'undefined'){
        list[employeeUid] = true;
        firebase.database().ref("employerInfo/" + employerUid + "/likedEmployee/").set(list);
      }
    });

  }

  unLikedEmployee(employerUid, employeeUid){
    this.getLikedEmployee(employerUid).then((list) => {
      this.getEmployeeLiked(employeeUid).then((liked) => {
        this.updateEmployeeLiked(employeeUid, liked-1)
      });
      firebase.database().ref("employerInfo/" + employerUid + "/likedEmployee/" + employeeUid + "/").remove();
    });

    this.getEmployeeLiked(employeeUid).then((liked) => {
      this.updateEmployeeLiked(uid, liked-1)
    });
  }

  // return map of id and boolean
  // {
  //  "uid": true,
  //  "uid2": true
  // }
  getLikedEmployee(uid) {
    return new Promise((resolve, reject) => {
      firebase.database().ref("employerInfo/" + uid + "/").once('value').then(function(snapshot) {
        if (snapshot.hasChild("likedEmployee")){
          resolve(snapshot.val().likedEmployee);
        } else {
          resolve({});
        }
      });
    });
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
  static getAllStatus() {
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
  // value = map of cat-subCat
  // {
  //   "Web and Programming": ["web apllication", "mobile application", "HTML/CSS"],
  //   "Graphic and design": ["logo", "character design", "banner design"]
  // }
  createCategories(value){
    Object.entries(value).forEach( ([catName, subCats]) => {
      let val = {
        categoryName: catName,
      };
      let catId = firebase.database().ref("categories/").push().key;
      firebase.database().ref("categories/" + catId + "/").set(val);
      this.createSubCategories(subCats, catId);
    })
  }

  createSubCategories(subCats, catId) {
    Object.entries(subCats).forEach(([i, subCat]) => {
      firebase.database().ref("categories/" + catId +"/subCategories").push({subCategoryName: subCat});
    });
  }

  static addUidToSubCategory(uid, catId, subCatIds) {
    Object.entries(subCatIds).forEach(([i, subCatId]) => {
      this.getEmployeeFromSubCategory(catId).then(employeeIds => {
        if (typeof(employeeIds[uid]) === 'undefined'){
          employeeIds[uid] = true;
          firebase.database().ref("categories/" + catId + "/subCategories/" + subCatId + "/").update({employeeIds: employeeIds});
        }
      });
    });
  }

  // return array of uids
  static getEmployeeFromSubCategory(catId, subCatId) {
    return new Promise((resolve, reject) => {
      firebase.database().ref("categories/" + catId + "/subCategories/" + subCatId + "/").once('value').then(function(snapshot) {
        if (snapshot.hasChild("employeeIds")){
          resolve(snapshot.val().employeeIds);
        } else {
          resolve({});
        }
      });
    });
  }

  getCategoriesInfo() {
    return new Promise((resolve, reject) => {
      firebase.database().ref("categories/").once('value').then(function(snapshot) {
        let ret = {};
        snapshot.forEach(cat => {
          let tmpObj = {};
          let tmpArray = [];
          // Object.entries(cat.val().subCategories).forEach(([key, info]) => {
          //   tmpArray.push({subCategoryId: key, subCategoryName: info.subCategoryName})
          // });
          tmpObj.subCategory = cat.val().subCategories;
          tmpObj.categoryName = cat.val().categoryName;
          ret[cat.key] = tmpObj
        });
        resolve(ret);
      });
    });
  }

  //return [{
  //       categoryId: "cat1",
  //       categoryName: "Graphic and Design",
  //       subCategory: [
  //         {subCategoryId: "subCat1", subCategoryName: "Logo"},
  //         {subCategoryId: "subCat2", subCategoryName: "Character Design"},
  //         {subCategoryId: "subCat3", subCategoryName: "Advertising Banner"}
  //       ]
  //     }]
  static getAllCategories() {
    return new Promise((resolve, reject) => {
      firebase.database().ref("categories/").once('value').then(function(snapshot) {
        // console.log(snapshot.val());
        let ret = [];
        snapshot.forEach(cat => {
          let tmpObj = {};
          let tmpArray = [];
          Object.entries(cat.val().subCategories).forEach(([key, info]) => {
            tmpArray.push({subCategoryId: key, subCategoryName: info.subCategoryName})
          });
          tmpObj.subCategory = tmpArray;
          tmpObj.categoryId = cat.key;
          tmpObj.categoryName = cat.val().categoryName;
          ret.push(tmpObj);
        });
        resolve(ret);
      });
    });
  }

  // Tags

  // If there is no projectId, sent null
  createTag(tagName){
    firebase.database().ref("tags/").push({tagName: tagName});
  }

  static addUidToTag(uid, tagId) {
    this.getEmployeeFromTag(tagId).then(employeeIds => {
      if (typeof(employeeIds[uid]) === 'undefined'){
        employeeIds[uid] = true;
        firebase.database().ref("tags/" + tagId + "/employeeIds/").set(employeeIds);
      }
    });
  }

  addProjectIdToTag(uid, progId, tagId) {
    this.getProjectIdFromTag(tagId).then(projectIds => {
      if (typeof(projectIds[progId]) === 'undefined'){
        projectIds[progId] = true;
        firebase.database().ref("tags/" + tagId + "/projectIds/").set(projectIds);
      }
    })
  }

  // return array of uid
  static getEmployeeFromTag(tagId) {
    return new Promise((resolve, reject) => {
      firebase.database().ref("tags/" + tagId + "/").once('value').then(function(snapshot) {
        if (snapshot.hasChild("employeeIds")){
          resolve(snapshot.val().employeeIds);
        } else {
          resolve({});
        }
      });
    });
  }

  getProjectIdFromTag(tagId) {
    return new Promise((resolve, reject) => {
      firebase.database().ref("tags/" + tagId + "/").once('value').then(function(snapshot) {
        if (snapshot.hasChild("projectIds")){
          resolve(snapshot.val().projectIds);
        } else {
          resolve({});
        }
      });
    });
  }

  // array of tags: ["java", "python"]
  createSuggestedTag(catId, tags) {
    firebase.database().ref("suggestedTags/" + catId + "/").set({suggestions:tags});
  }

  // categoryId that employee pick
  static getSuggestedTagsFrom(categoryId) {
    return new Promise((resolve, reject) => {
      firebase.database().ref("suggestedTags/" + categoryId + "/").once('value').then(function(snapshot) {
        resolve(snapshot.val().suggestions);
      });
    });
  }

  getTagName(tagId) {
    return new Promise((resolve, reject) => {
      firebase.database().ref("tags/" + tagId + "/").once('value').then(function(snapshot) {
        const ret = "";
        resolve(snapshot.val().tagName);
      });
    });
  }

  static getAllTags() {
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
