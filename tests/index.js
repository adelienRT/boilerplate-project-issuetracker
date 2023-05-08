const chai = require('chai');
let assert = chai.assert;

utilsTests = require('./utilsTests')

let issueTest = require('../controller/issue.test');
let falseDbTest = require('../controller/falseControllers/falseDb.test');

let updateTest = require('../controller/update.test');
let deleteTest = require('../controller/delete.test');

let functionalTest= require('./functional.test');

//Unit test
issueTest(assert,utilsTests);
falseDbTest(assert,utilsTests);

updateTest(assert,utilsTests);
deleteTest(assert,utilsTests);


//Functional Tests
functionalTest(utilsTests);
