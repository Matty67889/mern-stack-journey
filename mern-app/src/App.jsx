class HelloWorld extends React.Component {
  render() {
    return (
      <div title="Outer div">
        <h1>Hello World!Hello</h1>
        <h1>I want to make another h1</h1>
        <h1>Making another change</h1>
        <h2>Are you watching????</h2>
        <h3>You are watching. Yay!</h3>
        <h1>Making a change to HelloWorld</h1>
      </div>
    );
  }
}

const element = <HelloWorld />

ReactDOM.render(element, document.getElementById('content'));