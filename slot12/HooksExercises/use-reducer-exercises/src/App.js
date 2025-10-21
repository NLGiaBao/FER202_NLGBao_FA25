import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import QuestionBank from './components/QuestionBank';

function App() {
  return (
    <div className="App">
      <CounterComponent />
      <LightSwitch />
      <QuestionBank />
    </div>
  );
}

export default App;
