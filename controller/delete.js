module.exports = function(id,db){
  db.import();
  db.deleteIssue(id);
  db.save();
  return {result:"successfully deleted",_id:id}
}