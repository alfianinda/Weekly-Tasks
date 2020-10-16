import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';  
import { TaskListProvider } from './context/TaskListContext';
import { AuthProvider } from './context/AuthContext';
import { DetailProvider } from './context/DetailContext';
import Login from './Components/Login';
import AddTask from './Components/AddTask';
import EditTask from './Components/EditTask';
import TaskList from './Components/TaskList';
import AllTasks from './Components/AllTasks';
import Navbar from './Components/Navbar';
import Profile from './Components/Profile';
import Register from './Components/Register';
import ProfileEdit from './Components/ProfileEdit';
import Detail from './Components/Detail';

function App() {
  return (
    <DetailProvider>
      <TaskListProvider>
        <AuthProvider>
          <Router>  
          <Navbar />     
              <Switch>    
                <Route exact path='/' component={Login} />      
                <Route exact path='/add' component={AddTask} />
                <Route exact path='/all' component={AllTasks} />
                <Route exact path='/edit' component={EditTask} />
                <Route exact path='/list/:user_id' component={TaskList} />
                <Route exact path='/profile' component={Profile} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/profile-edit' component={ProfileEdit} />
                <Route exact path='/detail' component={Detail} />
              </Switch>    
          </Router>
        </AuthProvider>
      </TaskListProvider>
    </DetailProvider>
  );
}

export default App;