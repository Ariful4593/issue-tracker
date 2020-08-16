document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random()*100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  // console.log(issue)
  let issues = [];
  if (localStorage.getItem('issues')){
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  // console.log(issues)
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  const issueCountValue = parseInt(document.getElementById("issueCount").innerText);
  console.log(issueCountValue)
  if(issueCountValue>=0)
  {
    // issueCountValue++;
    console.log("Hey issue count")
    // document.getElementById("issueCount").innerText = issueCount
    // console.log(issueCount)
  }
 

  fetchIssues();
  e.preventDefault();
}

const closeIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  console.log(issues)
  const currentIssue = issues.find(issue => issue.id === id);
  currentIssue.status = 'Closed';
  localStorage.setItem('issues', JSON.stringify(issues));
  fetchIssues();
}

const deleteIssue = id => {
  const issues = JSON.parse(localStorage.getItem('issues'));
  const remainingIssues = issues.filter( issue.id !== id )
  localStorage.setItem('issues', JSON.stringify(remainingIssues));
}

const fetchIssues = () => {

  let issues = JSON.parse(localStorage.getItem('issues'));
  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';
  if(issues === null)
  {
    issues == null;
  }
  else{
    // console.log("It is false")
    for (var i = 0; i < issues.length; i++) {
      const {id, description, severity, assignedTo, status} = issues[i];
  
      issuesList.innerHTML +=   `<div class="well">
                                <h6>Issue ID: ${id} </h6>
                                <p><span class="label label-info"> ${status} </span></p>
                                <h3> ${description} </h3>
                                <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                                <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                                <a href="#" onclick="setStatusClosed(${id})" class="btn btn-warning">Close</a>
                                <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                                </div>`;
                                // console.log(issues[i])
    }
  }
  
}

// document.getElementById("issueCount").innerText = 10;

// function count(){
//   let btn = document.getElementById("issueInputForm");
//   if(btn == true)
//   {
//     console.log("hellow");
//   }else{
//     console.log("I am false")
//   }
// }
 