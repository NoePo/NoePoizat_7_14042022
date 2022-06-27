import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, editUser } from '../../features/user.slice';
import { UidContext } from '../AppContext';
import UploadImg from './UploadImg';

// Modifier le profil
const UpdateProfil = () => {
    const userData = useSelector(state => state.user.getUserValue);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    const [pseudo, setPseudo] = useState(userData.map(user => {
        if (user.id === uid) return user.pseudo
        else return null;
    }).join(''));

    // Pseudo
    const handlePseudo = (e) => {
        e.preventDefault();
        axios.put(`${process.env.REACT_APP_API_URL}api/user/${uid}`, {
            pseudo
        }, {withCredentials: true})
            .then(res => {
                const dataObject = {id: uid, pseudo: pseudo};
                dispatch(editUser(dataObject));
            })
            .catch(err => console.log(err));
    }
    // Supprimer son compte
    const handleDelete = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}api/user/${uid}`, {withCredentials: true})
            .then(res => {
                axios.get(`${process.env.REACT_APP_API_URL}api/auth/logout`, {withCredentials: true})
                    .then(res => {
                        dispatch(deleteUser(uid));
                        window.location = '/';
                    })
                    .catch(err => console.log(err));
            }) 
            .catch(err => console.log(err));
    }

    return (
        <div className="profil-container">
            <div className="profil-container__card">
                <h1>Profil de {userData[0].pseudo}</h1>
                <div className="profil-container__card__update-img">
                    <h3>Photo de profil</h3>
                    <img src={userData[0].image} alt="user-pic" />
                    <UploadImg />
                </div>
                <form onSubmit={handlePseudo} className='profil-container__card__update-pseudo'>
                    <input aria-label="changer son nom" type="text" id="pseudo" name="pseudo"
                    onChange={e => setPseudo(e.target.value)} value={pseudo} />
                    <input type="submit" value="Valider" />
                </form>
                <button aria-label="Bouton supprimer son compte" className='profil-container__card__delete-account' onClick={() => {
                    if (window.confirm("Voulez-vous supprimer cet utilisateur ?")) {
                        handleDelete();
                    }
                }}>Supprimer le compte</button>
            </div>
        </div>
    );
};

export default UpdateProfil;