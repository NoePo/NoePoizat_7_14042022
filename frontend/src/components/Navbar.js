import React, { useContext, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getUser } from '../features/user.slice';
import { UidContext } from './AppContext';
import Logout from './Log/Logout';
import axios from 'axios';

// Barre de navigation
const Navbar = () => {
    const uid = useContext(UidContext);
    // Window.innerWidth => récupère la largeur de la fenêtre
    const [width, setWidth] = useState(window.innerWidth);

    const dispatch = useDispatch();
    const userData = useSelector(state => state.user.getUserValue);

    const updateDimensions = () => setWidth(window.innerWidth);

    useEffect(() => {
        if (uid) {
            axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`, {withCredentials: true})
            	.then((res) => {
            		dispatch(getUser(res.data));
            	})
            	.catch((err) => console.log(err));
        }
        
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);

    }, [uid, dispatch]);

    return (
        <nav className='navbar'>
            <NavLink end to="/">
                {width > 768 ? (
                    <img className='logo-home' src="./img/icon-left-font.svg" alt="logo-groupomania" />
                ) : (
                    <img className='logo-home' src="./img/icon.svg" alt="logo-groupomania" />
                )}
            </NavLink>
            {uid && userData !== null ? (
                
                <div className='links'>
                    <NavLink end to="/profil">
                        {window.innerWidth > 768 ? (
                            <p aria-label="Page profil">Hello {userData[0].pseudo} !</p>
                        ) : (
                            <img className='nav-user-pic' src={userData[0].image} alt="user-pic" />
                        )}
                    </NavLink>
                    <Logout />
                </div>
            ) : (
                <NavLink end to="/profil">
                    <p>Go to login</p>
                </NavLink>
            )}
        </nav>
    );
};

export default Navbar;