import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import SearchCity from './components/SearchCity';
import { Nav, Navbar } from 'react-bootstrap';
import SingleDay from './pages/SingleDay';
import FiveDay from './pages/FiveDay';
import Home from './pages/Home';
import bg from './images/bg.svg'



function App() {


  return (
    <div style={{ backgroundImage: `url(${bg})`, height: '100%', backgroundRepeat: 'no-repeat', backgroundSize: 'cover'}}>
      <Navbar bg="primary" variant="dark">
      <Navbar.Brand href="/">Weather or Not</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/5day">5 Day Forecast</Nav.Link>
        <Nav.Link href="/1day">Single Day Forecast</Nav.Link>
      </Nav>
      </Navbar>
        <Router>
          <div className="App" >
            <Switch>
              <Route path='/' exact>
                <Home />
              </Route>
              <Route path='/5day'>
                <SearchCity />
                <FiveDay />
              </Route>
              <Route path='/1day'>
                <SearchCity />
                <SingleDay />
              </Route>
            </Switch>
          </div>
        </Router>
    </div>
  );
}

export default App;
