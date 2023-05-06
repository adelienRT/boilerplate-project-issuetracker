let IssueHandler = require('./issue');

module.exports = function(input,db){
  let issueHandler = new IssueHandler();
  let issue = {
    assigned_to : issueHandler.getAssignedTo(input.assigned_to),
    status_text : issueHandler.getStatusText(input.status_text),
    open: issueHandler.getOpen(),
    issue_title: issueHandler.getIssueTitle(input.issue_title),
    issue_text: issueHandler.getIssueText(input.issue_text),
    created_by : issueHandler.getCreatedBy(input.created_by),
    created_on : issueHandler.getCreatedOn(),
    updated_on : issueHandler.getUpdatedOn()
  };
  db.import();
  db.insertIssue(issue);
  db.save();
  return issue
}