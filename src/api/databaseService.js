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
          let tagId = allTags[tag];
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

  createEmployeeSkillSet(uid, skill, cb) {
    firebase.database().ref("employeeInfo/" + uid + "/skillSet/").push(skill, cb);
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
              ex.push({id: id, title: info.experience_title, description: info.experience_description});
            });
          } else {
            ex = [];
          }

          let prog = [];
          if (typeof(val.projects) !== 'undefined'){
            let tmp = [];
            Object.entries(val.projects).forEach( ([id, info]) => {
              Object.entries(info.links).forEach(([id, val]) => {
                let v = {};
                v[id] = id;
                v["type"] = val.type;
                v["links"] = val.link;
                tmp.push(v);
              });
              prog.push({id:id, name: info.projectName, description: info.projectDescription,
                date: info.date, tags: info.tagIds, links: tmp});
            });
          } else {
            prog = [];
          }

          let skills = [];
          if (typeof(val.skillSet) !== 'undefined'){
            Object.entries(val.skillSet).forEach( ([id, skill]) => {
              let tmp = {
                id: id,
                skill: skill
              };
              skills.push(tmp);
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
        });
      });
    });
  }

  updateEmployeeMajor(uid, major) {
    firebase.database().ref("employeeInfo/" + uid + "/major").set(major);
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

  updateEmployeeSkillSet(uid, skillId, skill, onComplete) {
    firebase.database().ref("employeeInfo/" + uid + "/skillSet/" + skillId + "/").set(skill, onComplete);
  }

  deleteEmployeeSkillSet(uid, skillId, onComplete) {
    firebase.database().ref("employeeInfo/" + uid + "/skillSet/" + skillId + "/").remove(onComplete);
  }

  updateEmployeeExperience(uid, expId, title, desc) {
    let val = {
      experience_title: title,
      experience_description: desc
    };
    firebase.database().ref("employeeInfo/" + uid + "/experiences/" + expId + "/").set(val);
  }

  deleteEmployeeExperience(uid, expId){
    firebase.database().ref("employeeInfo/" + uid + "/experiences/" + expId + "/").remove();
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

  deleteEmployeeProject(uid, projectId){
    firebase.database().ref("employeeInfo/" + uid + "/projects/" + projectId + "/").remove();
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

  /* All employeeInfo must be created with the node "liked: 0"*/
  updateEmployeeLiked(uid, operator){
    firebase.database().ref("employeeInfo/" + uid + "/liked/").transaction((currentVal) => {
      if (currentVal !== null) {
        if (operator === "increment") currentVal++;
        else if (operator === "decrement") currentVal--
      }
      else {
        // run commitSuicide.exe
      }
      return currentVal;
    });
  }

  getEmployeeLiked(uid) {
    return new Promise((resolve, reject) => {
      firebase.database().ref("employeeInfo/" + uid + "/liked/").once('value').then(function(snapshot) {
        resolve(snapshot.val())
      });
    });
  };

  updateEmployeeRecentView(uid, recentViewUid) {
    this.getEmployeeRecentView(uid).then(recentViews => {
      let val = [];
      if (recentViews === []) {
        val.push(recentViewUid);
        firebase.database().ref("employeeInfo/" + uid + "/recentViews/").set(val);
      } else {
        val = recentViews.reverse();
        if (recentViews.length < 5){
          if (recentViews.includes(recentViewUid)){
            let index = recentViews.indexOf(recentViewUid);
            val.splice(index, 1);
            val.push(recentViewUid)
          } else {
            val.push(recentViewUid);
          }
        } else {
          if (recentViews.includes(recentViewUid)){
            let index = recentViews.indexOf(recentViewUid);
            val.splice(index, 1);
            val.push(recentViewUid)
          } else {
            val.splice(0, 1);
            val.push(recentViewUid);
          }
        }
        firebase.database().ref("employeeInfo/" + uid + "/recentViews/").set(val.reverse());
      }
    })
  }

  getEmployeeRecentView(uid) {
    return new Promise((resolve, reject) => {
      firebase.database().ref("employeeInfo/" + uid + "/recentViews/").once('value').then(function(snapshot) {
        if (snapshot.val() === null){
          resolve([])
        } else {
          resolve(snapshot.val())
        }
      });
    });
  }

  // cat = map of categoey-subcategory that selected
  // {
  //   "categoryId1": ["subcategoryId1", "subcategoryId2", "subcategoryId3"],
  //   "categoryId2": ["subcategoryId1", "subcategoryId2", "subcategoryId3"]
  // }
  updateEmployeeCategories(uid, cat) {
    let val = {}
    Object.entries(cat).forEach(
      ([categoryId, subCatIds]) => {
        val[categoryId] = {subCategoryIds: subCatIds}
      }
    );
    firebase.database().ref("employeeInfo/" + uid + "/categories/").set(val);
  }

  getEmployeeCategories(uid){
    return new Promise((resolve, reject) => {
      firebase.database().ref("employeeInfo/" + uid + "/categories/").once('value').then((snapshot) => {
        let ret = {}
        snapshot.forEach(s => {
          ret[s.key] = s.val().subCategoryIds;
        })
        resolve(ret);
      })
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

  updateEmployerCompanyName(uid, companyName) {
    firebase.database().ref("employerInfo/" + uid + "/companyName").set(companyName);
  }

  // cat = map of categoey-subcategory that selected
  // {
  //   "categoryId1": ["subcategoryId1", "subcategoryId2", "subcategoryId3"],
  //   "categoryId2": ["subcategoryId1", "subcategoryId2", "subcategoryId3"]
  // }
  updateEmployerCategories(uid, cat) {
    let val = {}
    Object.entries(cat).forEach(
      ([categoryId, subCatIds]) => {
        val[categoryId] = {subCategoryIds: subCatIds}
      }
    );
    firebase.database().ref("employerInfo/" + uid + "/categories/").set(val);
  }


  // {
  //   "categoryId1": ["subcategoryId1", "subcategoryId2", "subcategoryId3"],
  //   "categoryId2": ["subcategoryId1", "subcategoryId2", "subcategoryId3"]
  // }
  getEmployerCategories(uid){
    return new Promise((resolve, reject) => {
      firebase.database().ref("employerInfo/" + uid + "/categories/").once('value').then((snapshot) => {
        let ret = {};
        snapshot.forEach(s => {
          ret[s.key] = s.val().subCategoryIds;
        });
        resolve(ret);
      })
    });
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
          let cat = [];
          Object.entries(val.categories).forEach(
            ([categoryId, subCatIds]) => {
              let tmp = {};
              let arr = [];
              subCatIds.subCategoryIds.forEach( (subCatId) => {
                let subCats = {
                  subCategoryId: subCatId,
                  subCategoryName: allCats[categoryId].subCategory[subCatId].subCategoryName
                };
                arr.push(subCats);
              });
              tmp.categoryId = categoryId;
              tmp.categoryName = allCats[categoryId].categoryName;
              tmp.subCategory = arr;
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
      this.updateEmployeeLiked(employeeUid, "increment");
      if (typeof(list[employeeUid]) === 'undefined'){
        list[employeeUid] = true;
        firebase.database().ref("employerInfo/" + employerUid + "/likedEmployee/").set(list);
      }
    });

  }

  unLikedEmployee(employerUid, employeeUid){
    this.getLikedEmployee(employerUid).then((list) => {
      this.updateEmployeeLiked(employeeUid, "decrement");
      firebase.database().ref("employerInfo/" + employerUid + "/likedEmployee/" + employeeUid + "/").remove();
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
      firebase.database().ref("categories/").once('value')
          .then(function(snapshot) {
            // console.log(snapshot.val());
            const ret = [];
            snapshot.forEach(cat => {
              const tmpObj = {};
              const tmpArray = [];
              Object.entries(cat.val().subCategories).forEach(([key, info]) => {
                tmpArray.push({subCategoryId: key, subCategoryName: info.subCategoryName})
              });
              tmpObj.subCategory = tmpArray;
              tmpObj.categoryId = cat.key;
              tmpObj.categoryName = cat.val().categoryName;
              ret.push(tmpObj);
            });
            resolve(ret);
          })
          .catch((e) => {
            // TODO: Handle error
              reject(e)
          })
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
