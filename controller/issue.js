let IssueHandler = function(){
  let open = true;
  const created_on = new Date(Date.now());
  let updated_on = new Date(Date.now());

  this.getCreatedOn= function(){
    return created_on.toISOString();
  };

  this.getUpdatedOn = function(){
    return updated_on.toISOString();
  }

  this.getOpen = function(){
    return open
  }
  
  this.getIssueTitle = function(inputTitle){
    if(!inputTitle){
      throw new Error('invalid title')
    }
    return inputTitle
  }

  this.getIssueText = function(inputText,option){
    if(!inputText && option!='optional'){
      throw new Error('invalid text')
    }
    return inputText
  }

    this.getCreatedBy = function(inputCreatedBy){
    if(!inputCreatedBy){
      throw new Error('invalid name')
    }
    return inputCreatedBy
  }
  
  this.getAssignedTo = function(inputAssignedTo){
    if(!inputAssignedTo){
      inputAssignedTo = ''
    }
    return inputAssignedTo
  };

  this.getStatusText = function(inputStatusText){
    if(!inputStatusText){
      inputStatusText = ''
    }
    return inputStatusText
  };


}

module.exports = IssueHandler