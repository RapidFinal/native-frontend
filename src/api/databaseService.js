import firebase from 'react-native-firebase'

class DatabaseService {

  // Employee
  createEmployeeInfo(uid, firstName, lastName, desc, statusId, tagIds, subCatIds, experience, project) {
    var value = {
      firstName: firstName,
      lastName: lastName,
      description: desc,
      statusId: statusId,
      tagIds: tagIds,
      subCategoryIds: subCatIds
    };
    firebase.database().ref("employeeInfo/" + uid + "/").set(value);
    this.createEmployeeExperiences(uid, experience.title, experience.desc);
    this.createEmployeeProjects(uid, project.name, project.desc, project.date, project.tagIds)
  }


  createEmployeeExperiences(uid, title, desc) {
    var value = {
      experience_title: title,
      experience_description: desc
    };
    firebase.database().ref("employeeInfo/" + uid + "/experiences/").push(value)
  }

  createEmployeeProjects(uid, progName, progDesc, date, tagIds) {
    var value = {
      projectName: progName,
      projectDescription: progDesc,
      date: date,
      tagIds: tagIds
    };
    firebase.database().ref("employeeInfo/" + uid + "/projects/").push(value);

  }


  getEmployeeInfo(uid) {
    firebase.database().ref("employeeInfo/" + uid + "/").once('value').then(function(snapshot) {
      console.log(snapshot.val());
    });

  }


  // If field does not exist in db, the snapshot will be null

  updateEmployeeInfoAt(uid, field, value) {

  }

  getEmployeeInfoAt(uid, field) {

  }

  // Employer

  createEmployerInfo(uid, value) {

  }

  updateEmployerInfoAt(uid, field, value) {

  }

  getEmployerInfo(uid) {

  }

  getEmployerInfoAt(uid, field) {

  }

  // Categories

  getCategories() {

  }

  getSubCategories(categoryId) {

  }

  // Tags

  getSuggestedTagsFrom(categoryId) {

  }

  getEmployeeFromTag(tagId) {

  }

}