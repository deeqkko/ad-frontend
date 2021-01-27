import React from 'react'
import MainPage from './pages/mainpage'
import DomainPage from './pages/domainpage'
import UserPage from './pages/userpage'
import OuPage from './pages/oupage'
import GroupPage from './pages/grouppage'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {
  return(
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/domains" component={DomainPage} />
        <Route exact path="/users" component={UserPage} />
        <Route exact path="/ou" component={OuPage} />
        <Route exact path="/groups" component={GroupPage} />
      </Switch>
    </Router>

  )
}

export default App