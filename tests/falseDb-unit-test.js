const chai = require('chai');
let assert = chai.assert;
let Db = require('../controller/falseControllers/falseDB');
let issueTestNr1 = {"assigned_to":"","status_text":"","open":true,"_id":"63126b66fb7c75018f7b3ff9","issue_title":"title1","issue_text":"text1","created_by":"Ade","created_on":"2022-09-02T20:45:26.271Z","updated_on":"2023-04-18T08:49:17.465Z"}

let issueTestNr2 = {"assigned_to":"","status_text":"","open":false,"_id":"63126b9bfb7c75018f7b3ffb","issue_title":"tiutle2","issue_text":"text2","created_by":"Dodo","created_on":"2022-09-02T20:46:19.000Z","updated_on":"2023-04-16T19:25:45.737Z"}

suite('Unit Tests FalseDatabase', function(){
  let issueName1 = "FalseDbTestsName1";
  let issueName2 = "FalseDbTestsName2";
  let db = new Db(issueName1);
  let db2 = new Db(issueName2);
  db.import();
  db2.import();

  test('should return the db name',()=>{
    let dbname1 = db.getdbName();
    let dbname2 = db2.getdbName();
    assert.equal(dbname1,'FalseDbTestsName1');
    assert.equal(dbname2,'FalseDbTestsName2');
  })

  test('it should create a database peer DBname',()=>{
    let getAllIssuesdb1 = db.getAll();
    let issue = {"assigned_to":"","status_text":"","open":false,"_id":"63126b9bfb7c75018f7b3ffb","issue_title":"tiutle2","issue_text":"text2","created_by":"Dodo","created_on":"2022-09-02T20:46:19.000Z","updated_on":"2023-04-16T19:25:45.737Z"}
    db2.insertIssue(issue);    
    let getAllIssuesdb2 = db2.getAll();

    assert.equal(getAllIssuesdb1.length,2);
    assert.equal(getAllIssuesdb2.length,3);
    
   })
  
  test('db should return all items',()=>{
    let getAllIssues = db.getAll();
    assert.deepEqual(getAllIssues,[{"assigned_to":"","status_text":"","open":true,"_id":"63126b66fb7c75018f7b3ff9","issue_title":"title1","issue_text":"text1","created_by":"Ade","created_on":"2022-09-02T20:45:26.271Z","updated_on":"2023-04-18T08:49:17.465Z"},{"assigned_to":"","status_text":"","open":false,"_id":"63126b9bfb7c75018f7b3ffb","issue_title":"tiutle2","issue_text":"text2","created_by":"Dodo","created_on":"2022-09-02T20:46:19.000Z","updated_on":"2023-04-16T19:25:45.737Z"}])
  })

  test('db should filter single item open:true',()=>{
    let getFiltedIssue = db.getFilter({open:'true'})
    assert.deepEqual(getFiltedIssue,[{"assigned_to":"","status_text":"","open":true,"_id":"63126b66fb7c75018f7b3ff9","issue_title":"title1","issue_text":"text1","created_by":"Ade","created_on":"2022-09-02T20:45:26.271Z","updated_on":"2023-04-18T08:49:17.465Z"}])
  });

  test('db should filter single items',()=>{
    let getFiltedIssue = db.getFilter({created_by:"Ade",issue_text:"text2"})
    assert.deepEqual(getFiltedIssue,[])
  });
  
  test('db should filter single items',()=>{
    let getFiltedIssue = db.getFilter({created_by:"Dodo",issue_text:"text2"})
    assert.deepEqual(getFiltedIssue,[{"assigned_to":"","status_text":"","open":false,"_id":"63126b9bfb7c75018f7b3ffb","issue_title":"tiutle2","issue_text":"text2","created_by":"Dodo","created_on":"2022-09-02T20:46:19.000Z","updated_on":"2023-04-16T19:25:45.737Z"}])
  });

  test('db should return an issue from a valid id',()=>{
    let issue = db.getIssueFromId("63126b66fb7c75018f7b3ff9");
    assert.deepEqual(issue,issueTestNr1);
  })

  test('db should return an error from an invalid id',()=>{
assert.throws(()=>db.getIssueFromId("falseId"),'invalid id');
  })

  test('db should update a single item',()=>{
    let initialise = db.updateIssue("63126b66fb7c75018f7b3ff9",{created_by:'Ade'})
    let beforeUpdate = db.getFilter({_id:"63126b66fb7c75018f7b3ff9"});
       
    assert.deepEqual(beforeUpdate[0],issueTestNr1);

    let afterUpdate = db.updateIssue("63126b66fb7c75018f7b3ff9",{created_by:'Dorian'});

    let response = {...issueTestNr1}
    response.created_by = 'Dorian'
    assert.deepEqual(afterUpdate,response);
  });

  test('db should update multiple items',()=>{
    let initialise = db.updateIssue("63126b66fb7c75018f7b3ff9",{created_by:'Ade',issue_text:'text1' });
    let beforeUpdate = db.getFilter({_id:"63126b66fb7c75018f7b3ff9"});
    assert.deepEqual(beforeUpdate[0],issueTestNr1);
    let afterUpdate = db.updateIssue("63126b66fb7c75018f7b3ff9",{created_by:'Dorian',issue_text:'updated text'});
    let response = {...issueTestNr1};
    response.created_by = 'Dorian';
    response.issue_text = 'updated text';

    assert.deepEqual(afterUpdate,response);
  });

  test('db.delete should delete this item',()=>{
    let id = "63126b9bfb7c75018f7b3ffb"
    assert.isOk(db.getIssueFromId(id),'if ok this id exists');
    db.deleteIssue(id);
    assert.throws(()=>db.getIssueFromId(id),'invalid id');
  });

  test('db.import should import object from the db file',()=>{
db.insertIssue({issue_title:'testTitle',issue_text:'testDescription',created_by:'Ades'})
    console.log('issueInserted');
    db.import();
  });

  test('how does it works with a new db',()=>{
    let db3 = new Db('FalseDbTestsName3');
    db3.import();
    db3.insertIssue(issueTestNr1);
    db3.reset();
  });

    test('reset the db',()=>{
    db.reset();
    db2.reset();
  })

});
