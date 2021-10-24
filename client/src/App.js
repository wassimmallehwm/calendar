import './App.css';
import { lazy, Suspense, useState } from 'react';
import Layout from './components/layout/Layout';
import { AuthProvider } from './contexts/AuthContext';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import ProtectedRoute from './routes/guards/ProtectedRoute';
import 'semantic-ui-css/semantic.min.css';

const Login = lazy(() => import('./components/modules/auth/Login'));
const MyCalendar = lazy(() => import('./components/modules/calendar/MyCalendar'));
const Loading = () => {
  return (<h1>Loading</h1>)
}
function App() {
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const closeSidebar = () => {
    setSideBarOpen(false);
  }
  const openSidebar = () => {
    setSideBarOpen(true);
  }

  return (
    <AuthProvider>
      <Router >
        <Suspense fallback={(<Loading />)}>
          <Layout >
            <Switch>
              <ProtectedRoute exact path='/' component={MyCalendar}/>
              <Route exact path="/login" component={Login} />
            </Switch>
          </Layout>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
