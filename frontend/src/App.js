import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import Intro from './components/Intro';
import Quiz_page from './components/Quiz_page';
import Genre from './components/Genre';
import Game from './components/Game';
import Selector from './components/Selector';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element = {<Homepage />} />
    <Route path="/Intro" element={<Intro/>}/>
    <Route path="/Genre" element={<Genre/>}/>
    <Route path="/Quiz" element={<Quiz_page/>}/>
    <Route path="/Game" element={<Game/>}/>
    <Route path='/selector' element={<Selector/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
