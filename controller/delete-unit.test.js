const chai = require('chai');
let assert = chai.assert;
let deleteIssue = require('../controller/delete');
let Db = require('../controller/falseControllers/falseDB');
let db = new Db('DeleteUnitTestDb');
db.import();
db.insertIssue({"assigned_to":"","status_text":"","open":true,"_id":"63126b66fb7c75018f7b3ff9","issue_title":"title1","issue_text":"text1","created_by":"Ade","created_on":"2022-09-02T20:45:26.271Z","updated_on":"2023-04-18T08:49:17.465Z"})
db.insertIssue({"assigned_to":"","status_text":"","open":false,"_id":"63126b9bfb7c75018f7b3ffb","issue_title":"tiutle2","issue_text":"text2","created_by":"Dodo","created_on":"2022-09-02T20:46:19.000Z","updated_on":"2023-04-16T19:25:45.737Z"});
db.save();

module.exports = suite('delete Unit Test',()=>{
  test('assert delete an exisant issue with a valid id',()=>{
    let id = '63126b66fb7c75018f7b3ff9'
    let response = deleteIssue(id,db);
    assert.deepEqual(response,{result:"successfully deleted",_id:id});
  });

  test('assert delete an inexistant issue with a invalid id',()=>{
    assert.throws(()=>deleteIssue('falseid',db),"invalid id");
  });

  test('assert delete an inexistant issue with a missing id',()=>{
    assert.throws(()=>deleteIssue(undefined,db),"invalid id");
  });

  test('reset the db',()=>{
    db.reset()
  })

})
