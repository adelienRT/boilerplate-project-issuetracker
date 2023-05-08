const IssueHandler = require('./issue.js');
let issueHandler = new IssueHandler();



module.exports = issueUnit = function(assert,utils){
  let assertFunctionEqualResponse= function(arrayToTest){
      arrayToTest.map((functionTest)=>{
    test(functionTest.title, function(){
      let response = functionTest.function    
      assert.equal(response,functionTest.response);
    });
    });
    };
  let assertDateIsCloseToResponse = function(arrayDateToTest){
      arrayDateToTest.map((dateTest)=>{
      test(dateTest.title,()=>{
      let dateToTest = Date.parse(dateTest.function);
      let dateResponse = Date.parse(dateTest.response)
      assert.closeTo(dateToTest, dateResponse, 300) 
    });
  });
  };

  return suite('Unit Tests: issue.js', function(){
    suite('IssueHandler.getIssueTitle()',()=>{
      let issuesToTests = [
        {title:'should correctly read title input',name:'getIssueTitle',function:issueHandler.getIssueTitle('inputText'),response:'inputText'},
      ];
      assertFunctionEqualResponse(issuesToTests);

      test('should return an error if no title input', function(){
      assert.throws(()=>issueHandler.getIssueTitle(),'invalid ');
    });
    
    });

    suite('IssueHandler.getIssueText()',()=>{
      let issuesToTests =[
      {title:'should read text input',function:issueHandler.getIssueText('inputText'),response:'inputText'},
      {title:'should read optional text input',function:issueHandler.getIssueText(undefined,'optional'),response:undefined},
      ];

      assertFunctionEqualResponse(issuesToTests);  

      test('should return an error if no text input', function(){
      assert.throws(()=>issueHandler.getIssueText(),'invalid ');
    });
    });

    suite('IssueHandler.getCreatedBy()',()=>{
      let issuesToTests =[
      {title:'should read name input',function:issueHandler.getCreatedBy('inputText'),response:'inputText'}
      ];
      assertFunctionEqualResponse(issuesToTests);

      test('should return an error if no name input', function(){
      assert.throws(()=>issueHandler.getCreatedBy(),'invalid ');
    });
    });

    suite('IssueHandler.getassignedTo()',()=>{
      let issuesToTests =[
        {title:'should read assigned to input',function:issueHandler.getAssignedTo('inputText'),response:'inputText'},
        {title:'should read assigned to when no input',function:issueHandler.getAssignedTo(),response:''}
      ];

      assertFunctionEqualResponse(issuesToTests);       
    });

    suite('IssueHandler.getStatusText()',()=>{
      let issuesToTests =[
        {title:'read status text',name:'getStatusText',function:issueHandler.getStatusText('inputStatusText'),response:'inputStatusText'},
        {title:'read status text when  no input',name:'getStatusText',function:issueHandler.getStatusText(),response:''}
      ];

      assertFunctionEqualResponse(issuesToTests);       
    });

    suite('IssueHandler.getOpen()',()=>{
      let issuesToTests =[
        {title:'give the opening of this issue',name:'getOpen',function:issueHandler.getOpen(),response:true}
      ];
      assertFunctionEqualResponse(issuesToTests);       
    });  

    suite('IssueHandler.getCreatedOn()',()=>{
    let dateTests =[
      {title:'should give created on date',function:issueHandler.getCreatedOn(),response:new Date(Date.now()).toISOString()}
    ];
      assertDateIsCloseToResponse(dateTests);
    });

    suite('IssueHandler.getUpdatedOn()',()=>{
    let dateTests =[
      {title:'should give updated on date',function:issueHandler.getUpdatedOn(),response:new Date(Date.now()).toISOString()}
    ];
      assertDateIsCloseToResponse(dateTests);
    });
    
    });
}
