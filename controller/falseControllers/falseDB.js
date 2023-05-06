let cuid = require('cuid');
var fs = require('fs');

module.exports = function (insertDbname) {
  this.falseDb = []
  let dbname = insertDbname;
  let path = `./controller/falseControllers/falseDatabase/${dbname}.json`

  this.import = function(){
    if (fs.existsSync(path)) {
        let rawdata = fs.readFileSync(path);
        this.falseDb = JSON.parse(rawdata);
    } else {
        this.save();
}
  }

    this.save = function(){
    let jsonData = JSON.stringify(this.falseDb);
    fs.writeFileSync(path, 
                 jsonData, 
                 function(err) {
    if (err) {
        throw new Error('database not save')
    }
});
  };

  
  this.insertIssue =function(issue){
    issue._id=cuid();
    this.falseDb.push(issue);
  }

  this.getdbName = function(){
    return dbname
  }

  this.getFilter = function(input){
    let potentialItem = [...this.falseDb]
    for (const [key, value] of Object.entries(input)) {
      potentialItem = potentialItem.filter((item=>String(item[key])==String(value)))
    }

    return potentialItem
  }

  this.isValidId = function(id){
    let idIssue = this.getFilter({_id:id})[0];
    if(!idIssue){
      throw new Error('invalid id')
    }
  }

  this.getIssueFromId = function(id){
    this.isValidId(id);
    let idIssue = this.getFilter({_id:id})[0];
    return idIssue
  }

  this.isValidItem = function(item){
    let validItems = ['assigned_to','status_text','open','_id','issue_title','issue_text','created_by','updated_on']
    if(!validItems.includes(item)){
      throw new Error('invalid input item: '+item)
    }
  }

  this.updateIssue= function(id,newItems){
    let issueToUpdate = this.getIssueFromId(id);
    this.falseDb.map((issue)=>{
      if(issue._id==issueToUpdate._id){
        for (const [key,value] of Object.entries(newItems)) {
          let validation = this.isValidItem(key);
          if(value !=issueToUpdate[key]){
            issue[key] = value
          }      
        }
      } 
    })
    return this.getIssueFromId(id)
  }

  this.getAll = function(){
    return this.falseDb
  }

  this.deleteIssue = function(id){
    this.isValidId(id);
    let index = this.falseDb.findIndex((issue)=>{
      issue._id == id
    });
    let falseDb1 = this.falseDb.slice(0,index-1);
    let falseDb2 = this.falseDb.slice(index+1,this.falseDb.length-1);
    this.falseDb = [...falseDb1,...falseDb2];
  }
  this.reset =function(){
    fs.unlinkSync(path);
  }
}