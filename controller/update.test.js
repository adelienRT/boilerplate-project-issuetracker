let update = require('../controller/update');

module.exports = function(assert,utils){
  let db = utils.functions.initialiseDbTest('UpdateUnitTestDb');
  
  suite('Update() Unit Tests', function(){
  test('update should return an modified issue with correct items',()=>{
    let t0 = Date.now();
    
    let input = {_id:'63126b66fb7c75018f7b3ff9',created_by:'Dorian',open:false}
    let updateresp =update(input,db);
    let now = new Date(Date.now());

    console.log('TEST time update',Date.now()-t0);
    
    assert.equal(updateresp._id,input._id);
    assert.equal(updateresp.created_by,input.created_by);
    assert.equal(updateresp.open,input.open);
    assert.equal(updateresp.created_on,"2022-09-02T20:45:26.271Z");
    console.log('updated_on-now',Date.parse(updateresp.updated_on)-Date.parse(now));
    assert.closeTo(Date.parse(updateresp.updated_on),Date.parse(now),1000);

  });

  test('update should return an error with incorrect items',()=>{
    let input = {_id:'63126b66fb7c75018f7b3ff9',created_by:'Dorian',open:false,wrongitem:'wrongItem'}
    assert.throws(()=> update(input,db),'invalid input item');
  });

  test('update should return an error with invalid id',()=>{
    let input = {_id:'wrongId',created_by:'Dorian',open:false,wrongitem:'wrongItem'};
    assert.throws(()=>update(input,db),'invalid id')
  });

  test('update should return an error with missing id',()=>{
    let input = {_id:'wrongId',created_by:'Dorian',open:false,wrongitem:'wrongItem'};
    assert.throws(()=>update(undefined,db),'invalid id')
  });

    test('reset the db',()=>{
    db.reset()
  })
});
}

      
