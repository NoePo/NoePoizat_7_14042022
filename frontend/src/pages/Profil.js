// Gérer les données entre les composants
import React, { useContext } from 'react';
import Log from '../components/Log/Log';
import { UidContext } from '../components/AppContext';
import UpdateProfil from '../components/Profil/UpdateProfil';
import axios from 'axios';
// useDispatch = dispatcher nos actions sans connecter notre composant 
// useSelector = sélectionner des données
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getUsers } from '../features/user.slice';

// profil de l'utilisateur 
const Profil = () => {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    const userSignUp = useSelector(state => state.user.getUserSignUpOrIn);

    // withCredentials "indique si une requête Access-Control entre plusieurs sites devrait être réalisée avec des informations d'authentification"
    axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`, {withCredentials: true})
        .then(res => {
            dispatch(getUser(res.data));
        }) 
        .catch(err => console.log(err));

    axios.get(`${process.env.REACT_APP_API_URL}api/user`, {withCredentials: true})
        .then(res => {
            dispatch(getUsers(res.data));
        }) 
        .catch(err => console.log(err));

    return (
        <div>
            {uid ? (
                <UpdateProfil />
            ) : (
                userSignUp ? <Log signIn={false} signUp={true} /> : <Log signIn={true} signUp={false} />
            )}
        </div>
    );
};

export default Profil;