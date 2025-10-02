import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Banner from './components/Banner';
import Navbar from './components/Navbar';
import Exercise3 from './components/Exercise3';
function App() {
  return (
    <div>
      <Banner />
      <Navbar />
      <Exercise3 />
    </div>
  );
}

export default App;
