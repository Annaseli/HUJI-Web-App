import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// pages & components
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar';

function App() {
  const { authIsReday, user } = useAuthContext()

  return (
    <div className="App">
      { authIsReday && (
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/">
              { !user && <Redirect to="/login" />}
              { user && <Home /> }
            </Route>
            <Route path="/login">
              { !user && <Login /> }
              { user && <Redirect to="/" />}
            </Route>
            <Route path="/signup">
              { !user && <Signup /> }
              { user && <Redirect to="/" />}
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
