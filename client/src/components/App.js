import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Join,Chat} from './';

const App = () =>{
  return (
    <Router>
      <Route path='/' exact component={Join} />
      <Route path='/chatting' component={Chat} />
    </Router>
  );
}

export default App;
