import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from "./screen/Home";
import Create from './screen/Create';
import Header from './components/Header';
import IndexList from './components/IndexList';

function App() {
  return (
    <div className='App'>
      <div className='navBar'>
        <Header />
      </div>
      <div className='container'>
        <IndexList className="flex-aside" />
        <Routes>
            <Route path="/" element={<Home />} className="flex-article" />
            <Route path="/create" element={<Create />} className="flex-article" />
        </Routes>
      </div>
    </div>
  );
}

export default App;
