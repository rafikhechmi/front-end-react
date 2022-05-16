import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Company from './pages/Company';
import Contact from './pages/Contact';
import Quote from './pages/Quote';

import Login from './components/Login';

function App() {
  
  return (
    <div className="App">
      <Router>
                

        
        <Switch>
        <Route path='/Login' component={Login} />
        <div>
        <Navbar/> 
        
          <Route path='/Company' exact component={Company} />
          <Route path='/Contact' exact component={Contact} />
          <Route path='/Quote' exact component={Quote} />
         
          </div>
        </Switch>
      </Router>
   
      </div>

  );
}

export default App;