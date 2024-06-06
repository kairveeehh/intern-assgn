import React from 'react';
import ChipAuto from './ChipAuto';
import ParentComponent from './secondcomp';

function App() {
  const suggestion = [
    'React', 'Hands On', 'Live Coding', 'Angular', 'Vue JS', 'JS Fundamentals', 'Typescript', 
    'Browser/DOM', 'API', 'Router', 'Forms', 'Jest', 'Vue', 'Templates', 'Directives', 
    'Routing', 'State management', 'Asynchronous programming', 'React Js', 'Hooks', 
    'JSX', 'CSS', 'flex', 'DOM'
  ];
  return (
    <div className="App">
  

    <ChipAuto suggestions={suggestion}/>
    <ParentComponent />
    </div>
  );
}

export default App;
