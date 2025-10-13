import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FooterPage from './pages/FooterPage';
import HomePage from './pages/HomePage';
import AccountPage from './pages/AccountPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

function App() {
  return (
     <Router>
      <Routes>
        <Route path="/" element={
          <>
            <HomePage />
            <FooterPage />
          </>
        } />
        <Route path="/account" element={
          <>
            <AccountPage />
            <FooterPage />
          </>
        } />
        <Route path="/about" element={
          <>
            <AboutPage />
            <FooterPage />
          </>
        } />
        <Route path="/contact" element={
          <>
            <ContactPage />
            <FooterPage />
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
