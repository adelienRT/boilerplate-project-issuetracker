let deleteIssue = require('../controller/delete');

module.exports = function(assert,utils){
  let db = utils.functions.initialiseDbTest('DeleteUnitTestDb');
  suite('delete Unit Test',()=>{
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
}

