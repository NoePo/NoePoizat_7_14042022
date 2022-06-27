import React from 'react';
import axios from 'axios';
import cookie from 'js-cookie';

// Se deconnecter (et enlever les cookies quand déconnexion)
const Logout = () => {
    const removeCookie = (key) => {
        if (window !== undefined) {
            cookie.remove(key, {expires: 1});
        }
    };

    const logout = async () => {
        await axios.get(`${process.env.REACT_APP_API_URL}api/auth/logout`, {withCredentials: true})
            .then(() => removeCookie('jwt'))
            .catch((err) => console.log(err));
        window.location = "/";
    };

    return (
        <>
        {window.innerWidth > 768 ? (
            <p aria-label="Déconnecter" onClick={logout} className='logout'>Se déconnecter</p>
        ) : (
            <img onClick={logout} className='logout-icon' src="./icons/arrow-right-from-bracket-solid.svg" alt="logout" />
        )}
        </>
    );
};

export default Logout;