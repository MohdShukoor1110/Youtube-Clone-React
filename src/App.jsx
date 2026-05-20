import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar/Navbar.jsx';
import Home from './Pages/Home/Home.jsx';
import Video from './Pages/Video/Video.jsx';

const App = () => {
    const [sideBar, setSideBar] = useState(true);

    return (
        <>
            <Navbar setSideBar={setSideBar} />
            <Routes>
                <Route path='/' element={<Home sideBar={sideBar} />} />
                <Route path='/video/:categoryId/:videoId' element={<Video/>} />
            </Routes>
        </>
    );
};

export default App;