import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MovieManager from './pages/MovieManager';
import Login from './pages/Login';
import { useAuthState } from './contexts/AuthContext';

function App() {
  const auth = useAuthState();

  return (
    <div className="App">
      {auth && auth.isAuthenticated ? <MovieManager /> : <Login />}
    </div>
  );
}

export default App;