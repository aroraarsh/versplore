import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import Intro from './components/Intro';
import Quiz_page from './components/Quiz_page';
import Genre from './components/Genre';


function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/Home" element = {<Homepage />} />
    <Route path="/Intro" element={<Intro/>}/>
    <Route path="/Genre" element={<Genre/>}/>
    <Route path="/Quiz" element={<Quiz_page/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
