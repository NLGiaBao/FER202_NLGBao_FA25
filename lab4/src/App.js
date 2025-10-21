import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CounterComponent from './components/CounterComponent';
import LightSwitch from './components/LightSwitch';
import QuestionBank from './components/QuestionBank';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';

function App() {
  return (
    <div className="App">
      <CounterComponent />
      <LightSwitch />
      <QuestionBank />
      <LoginForm />
      <SignUpForm />
    </div>
  );
}

export default App;
