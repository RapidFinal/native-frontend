import firebase from 'react-native-firebase';
import _ from 'lodash';
import DatabaseService from '../databaseService';

const cleanString = (str) => {
    const lower = str.toLowerCase();
    return lower.replace(/[^A-Za-z0-9_]/g,"");
};


// Takes array of tags that matched, and the snapshot of the tags object
const searchByTag = async (tags, snapshot) => {
    const filtered =  _.filter(snapshot, e => tags.includes(e.tagName));
    console.log(filtered);
    const arr = _.map(filtered, e => (e.hasOwnProperty("employeeIds") ? Object.keys(e.employeeIds) : []));
    console.log(arr);
    const ids = _.uniq(_.reduce(arr, (a, n) => a.concat(n),[]));
    console.log('ids', ids);

    let db = new DatabaseService;

    const infos = await Promise.all(ids.map( async (id) => {
        const info = await db.getEmployeeInfo(id);
        console.log(id, '->', info); return info
    }));

    console.log('infos:', infos);
    return infos;
};

const searchByName = async (name) => {

};

export const search = async (searchString, cb) => {
    const tagsSnapshot = await firebase.database().ref('tags').once('value');
    const snap = tagsSnapshot.val();

    const tags = _.map(snap, e => e.tagName );

    const tokens = searchString.split(" ");

    const tagMatches = _.intersectionBy(tags, tokens, cleanString);

    return searchByTag(tagMatches, snap);

    //console.log(tagsSnapshot.val());
};
