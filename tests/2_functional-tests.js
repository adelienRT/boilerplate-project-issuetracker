const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');
chai.use(chaiHttp);

let {initialiseDbTest} = require('./utilsTests/utilsFunctionsTests');
let functionnalDBNAME = 'FunctionalTests'
initialiseDbTest(functionnalDBNAME);

suite('Functional Tests', function() {

  suite('POST /api/issues/{project}',()=>{
      suite('valid tests',()=>{

    let validFunctionnalTests = [{testName:'Create an issue with every field: POST request to /api/issues/{project}',
                                  send:{issue_title:"titleissue",issue_text:"textissue",created_by:"Ades",assigned_to:"test",status_text:"status"},
                                  response:{"assigned_to":"test",
                         "status_text":"status",
                         "open":true,
                         "_id":"644a2b8ce6707722bb0bf0cc",
                         "issue_title":"titleissue",
                         "issue_text":"textissue",
                         "created_by":"Ades",
                         "created_on":new Date(Date.now()),
                        "updated_on":new Date(Date.now())},
                                 },
                                 {testName:'Create an issue with only required fields: POST request to /api/issues/{project}',
                                  send:{issue_title:"titleissue",issue_text:"textissue",created_by:"Ades"},
                                  response:{"assigned_to":"",
                         "status_text":"",
                         "open":true,
                         "_id":"644a2b8ce6707722bb0bf0cc",
                         "issue_title":"titleissue",
                         "issue_text":"textissue",
                         "created_by":"Ades",
                         "created_on":new Date(Date.now()),
                        "updated_on":new Date(Date.now())},
                                 },
                                ]
      validFunctionnalTests.map((testresponse)=>{
          test(`${testresponse.testName}`,(done)=>{
        
      let response = testresponse.response
        
      chai
      .request(server)
      .keepOpen()
      .post('/api/issues/FunctionalTestsDb')
      .send(testresponse.send)
      .end(function(err,res){
        assert.equal(res.status,200);
        assert.equal(res.type,'application/json');
        assert.equal(res.body.assigned_to,response.assigned_to);
        assert.equal(res.body.status_text,response.status_text);
        assert.equal(res.body.open,response.open);
        assert.equal(res.body.issue_title,response.issue_title);
        assert.equal(res.body.issue_text,response.issue_text);
        assert.equal(res.body.created_by,response.created_by);
        assert.property(res.body,'_id');
        assert.property(res.body,'created_on');
        assert.property(res.body,'updated_on');
        done();
      })
    });
      })
  }); 
      suite('invalid tests',()=>{

    let InvalidFunctionnalTests = [{testName:'Create an issue with missing issue_title: POST request to /api/issues/{project}',
                                  send:{issue_text:"textissue",created_by:"Ades"},
                                  response:{error:'required field(s) missing'}},
                                  {testName:'Create an issue with missing issue_text: POST request to /api/issues/{project}',
                                  send:{issue_title:"titleissue",created_by:"Ades"},
                                  response:{error:'required field(s) missing'}},
                                  {testName:'Create an issue with missing created_by: POST request to /api/issues/{project}',
                                  send:{issue_text:"textissue", issue_title:"titleissue"},
                                  response:{error:'required field(s) missing'}}]

    InvalidFunctionnalTests.map((testresponse)=>{
          test(`${testresponse.testName}`,(done)=>{
        
      let response = testresponse.response
        
      chai
      .request(server)
      .keepOpen()
      .post('/api/issues/FunctionnalInvalidtest')
      .send(testresponse.send)
      .end(function(err,res){
        assert.equal(res.status,200);
        assert.deepEqual(res.body,testresponse.response)
        done();
      })
    });
      })
    
  });
  });

  suite('GET /api/issues/{project}',()=>{
    test('View issues on a project: GET request to /api/issues/{project}',(done)=>{
          chai
      .request(server)
      .keepOpen()
      .get('/api/issues/FunctionalTestsDb')
      .end(function(err,res){
        assert.equal(res.status,200);
        assert.equal(res.type,'application/json');
        assert.property(res.body[0],'assigned_to');
        assert.property(res.body[0],'issue_title');
        assert.property(res.body[0],'issue_text');
        assert.property(res.body[0],'created_by');
        done();
    })
      });

    test('View issues on a project with one filter: GET request to /api/issues/{project}',(done)=>{
          chai
      .request(server)
      .keepOpen()
      .get('/api/issues/'+functionnalDBNAME+'?open=false')
      .end(function(err,res){
        assert.equal(res.status,200);
        assert.equal(res.type,'application/json');
        assert.deepEqual(res.body,[{"assigned_to":"","status_text":"","open":false,"_id":"63126b9bfb7c75018f7b3ffb","issue_title":"tiutle2","issue_text":"text2","created_by":"Dodo","created_on":"2022-09-02T20:46:19.000Z","updated_on":"2023-04-16T19:25:45.737Z"}])
        done();
    })
      });

        test('View issues on a project with multiple filters: GET request to /api/issues/{project}',(done)=>{
          chai
      .request(server)
      .keepOpen()
      .get('/api/issues/'+functionnalDBNAME+'?open=false&issue_text=text2')
      .end(function(err,res){
        assert.equal(res.status,200);
        assert.equal(res.type,'application/json');
        assert.deepEqual(res.body,[{"assigned_to":"","status_text":"","open":false,"_id":"63126b9bfb7c75018f7b3ffb","issue_title":"tiutle2","issue_text":"text2","created_by":"Dodo","created_on":"2022-09-02T20:46:19.000Z","updated_on":"2023-04-16T19:25:45.737Z"}])
        done();
    })
      });
  });

  suite('PUT /api/issues/{project}',()=>{
      test('Update one field on an issue: PUT request to /api/issues/{project}',(done)=>{
          chai
      .request(server)
      .keepOpen()
      .put('/api/issues/'+functionnalDBNAME)
      .send({_id:'63126b9bfb7c75018f7b3ffb',issue_title:'testnameToChange',created_by:'newPerson',assigned_to:'newIssue',status_text:'this is a new status',open:false})
      .end(function(err,res){
        assert.equal(res.status,200);
        assert.equal(res.type,'application/json');
        assert.equal(res.body._id,'63126b9bfb7c75018f7b3ffb');
        assert.equal(res.body.issue_text,"text2");
        assert.equal(res.body.issue_title,'testnameToChange');
        assert.equal(res.body.created_by,'newPerson');
        assert.equal(res.body.assigned_to,'newIssue');
        assert.equal(res.body.status_text,'this is a new status');
        assert.equal(res.body.open,false);
        assert.equal(res.body.created_on,"2022-09-02T20:46:19.000Z");
        assert.closeTo(Date.parse(res.body.updated_on),Date.parse(new Date(Date.now()).toISOString()),50);
        done();
    })
      });

  });

});
