import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import { UidContext } from '../AppContext';
import Navbar from '../Navbar';

const Index = () => {
    const uid = useContext(UidContext);

    return (
        <div>
            <Router>
                {uid && (
                    <Navbar />
                )}
                <Routes>
                    <Route path='/' exact element={<Home />} />
                    <Route path='/profil' exact element={<Profil />} />
                    <Route path='*' element={<Home />} />
                </Routes>
            </Router>
        </div>
    );
};

export default Index;