import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import { Home } from './pages/home/Home';
import CVPage from './pages/cv/Cv';
import Header from './components/header/Header';
function App() {
  return (
    <div className="w-full h-screen bg-black">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path='/cv' exact element={<CVPage/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
