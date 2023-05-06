module.exports = function(input,db){
  let id =''
  input ? id=input._id : id='undefined'
  let t0 = Date.now();
  db.import();
  db.isValidId(id);
  input.updated_on = new Date(Date.now()).toISOString();
  let updateissue = db.updateIssue(id,input);
  db.save();
  
  return updateissue
}