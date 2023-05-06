const chai = require('chai');
let assert = chai.assert;
const IssueHandler = require('../controller/issue.js');

let issueHandler = new IssueHandler();


suite('Unit Tests', function(){

  suite('issue.js',()=>{
     
  suite('valid test submit',()=>{
    let functionTests = [
      {title:'read title input',name:'getIssueTitle',function:issueHandler.getIssueTitle('inputText'),response:'inputText'},
      {title:'read text input',name:'getIssueText',function:issueHandler.getIssueText('inputText'),response:'inputText'},
      {title:'read optional text input',name:'getIssueText',function:issueHandler.getIssueText(undefined,'optional'),response:undefined},
      {title:'read name input',name:'getCreatedBy',function:issueHandler.getCreatedBy('inputText'),response:'inputText'},
      {title:'read assigned to input',name:'getassignedTo',function:issueHandler.getAssignedTo('inputText'),response:'inputText'},
      {title:'read assigned to when no input',name:'getassignedTo',function:issueHandler.getAssignedTo(),response:''},
      {title:'read status text',name:'getStatusText',function:issueHandler.getStatusText('inputStatusText'),response:'inputStatusText'},
      {title:'read status text when  no input',name:'getStatusText',function:issueHandler.getStatusText(),response:''},
      {title:'give the opening of this issue',name:'getOpen',function:issueHandler.getOpen(),response:true}]
    
    functionTests.map((functionTest)=>{
    test(`IssueHandler.${functionTest.name} should correctly ${functionTest.title}`, function(){
      let createdBy = functionTest.function    
      assert.equal(createdBy,functionTest.response);
    });
    });


    let dateTests =[
      {title:'give created on date',name:'getCreatedOn',function:issueHandler.getCreatedOn(),response:new Date(Date.now()).toISOString()},
      {title:'give updated on date',name:'getUpdatedOn',function:issueHandler.getUpdatedOn(),response:new Date(Date.now()).toISOString()}]
    
    dateTests.map((dateTest)=>{
      test(`IssueHandler.${dateTest.name} should correctly ${dateTest.title}`,()=>{
      let dateToTest = Date.parse(dateTest.function);
      let dateResponse = Date.parse(dateTest.response)
      assert.closeTo(dateToTest, dateResponse, 300) 
    });
    })

    

  });

  suite('invalid test submit',()=>{
    test('IssueHandler.getIssueTitle should return an error if no title input', function(){
      assert.throws(()=>issueHandler.getIssueTitle(),'invalid ');
    });
    test('IssueHandler.getIssueText should return an error if no text input', function(){
      assert.throws(()=>issueHandler.getIssueText(),'invalid ');
    });
    test('IssueHandler.getCreatedBy should return an error if no name input', function(){
      assert.throws(()=>issueHandler.getCreatedBy(),'invalid ');
    });
    });
  
  });
  
    });