const issues = [
  {
    id: 1, status: "New", owner: "Ravan", effort: 5,
    created: new Date('2018-08-15'), due: undefined,
    title: 'Chicken started running without its head'
  },
  {
    id: 2, status: "Assigned", owner: "Eddie", effort: 14,
    created: new Date('2018-08-16'), due: new Date('2018-08-30'),
    title: "I can't find my fingers"
  },
  {
    id: 3, status: "Assigned", owner: "Tobias", effort: 7,
    created: new Date('2018-08-17'), due: new Date('2018-08-18'),
    title: "Adding anogther issue to follow the rule of threes"
  }
]
class IssueFilter extends React.Component {
  render() {
    return (
      <div>placeholder issue filter</div>
    );
  }
}

class IssueAdd extends React.Component {
  render() {
    return (
      <div>placeholder issue add</div>
    );
  }
}

class IssueRow extends React.Component {
  render() {
    const issue = this.props.issue
    return (
      <tr>
        <td>{issue.id}</td>
        <td>{issue.title}</td>
        <td>{issue.owner}</td>
        <td>{issue.effort}</td>
        <td>{issue.created ? issue.created.toDateString() : 'No created date'}</td>
        <td>{issue.due ? issue.due.toDateString() : 'No due date'}</td>
        <td>{issue.title}</td>
      </tr>
    );
  }
}

class IssueTable extends React.Component {
  render() {
    const issueRows = issues.map(issue => <IssueRow key={issue.id} issue={issue} />)
    return (
      <table className="bordered-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Owner</th>
            <th>Created</th>
            <th>Effort</th>
            <th>Due Date</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {issueRows}
        </tbody>
      </table>
    );
  }
}

class IssueList extends React.Component {
  render() {
    return (
      <React.Fragment>
        <h1>Issue Tracker</h1>
        <IssueFilter />
        <hr />
        <IssueTable />
        <hr />
        <IssueAdd />
      </React.Fragment>
    );
  }
}

const element = <IssueList />

ReactDOM.render(element, document.getElementById('content'));