import firebase from 'react-native-firebase';
import _ from 'lodash';
import DatabaseService from '../databaseService';

const cleanString = (str) => {
    if (str === undefined)
	return null;
    const lower = str.toLowerCase();
    return lower.replace(/[^A-Za-z0-9_]/g,"");
};


// Takes array of tags that matched, and the snapshot of the tags object
const searchByTag = async (tags, snapshot) => {
    const filtered = _.filter(snapshot, tag => tags.includes(tag.tagName));
    console.log(filtered);
    const arr = _.map(filtered, e => (e.hasOwnProperty("employeeIds") ? Object.keys(e.employeeIds) : []));
    console.log(arr);
    const ids = _.uniq(_.reduce(arr, (a, n) => a.concat(n),[]));
    console.log('ids', ids);

    console.log('s', snapshot);
    
    let db = new DatabaseService;

    const infos = await Promise.all(ids.map( async (id) => {
        var info = await db.getEmployeeInfo(id);
        info.tags = info.tagIds.map( id => snapshot[id].tagName );
	
	console.log(id, '->', info);
	
        return info;
    }));

    console.log('infos:', infos);
    return infos;
};

const searchByName = async (name) => {
    let db = new DatabaseService;
    console.log(name);
    return null;
};

export const search = async (searchString) => {
    const tagsSnapshot = await firebase.database().ref('tags').once('value');
    const snap = tagsSnapshot.val();
    
    const tags = _.map(snap, e => e.tagName );

    const tokens = searchString.split(" ");
    console.log(tokens, "---");

    const tagMatches = _.intersectionBy(tags, tokens, cleanString);

    if (tagMatches.length > 0)
	return searchByTag(tagMatches, snap);
    else
	return searchByName(searchString);
    //console.log(tagsSnapshot.val());
};
