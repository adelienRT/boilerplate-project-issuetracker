let Db = require('../../controller/falseControllers/falseDB');
let {issueTestNr1,issueTestNr2} = require('./utilsConstantsTests');

function initialiseDbTest(dbname){
  let db = new Db(dbname);
  db.falseDb = [issueTestNr1,issueTestNr2];
  db.save();
  return db
};

module.exports = {initialiseDbTest};