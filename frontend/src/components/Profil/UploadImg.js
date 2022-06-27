import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../features/user.slice';

const UploadImg = () => {
    const [file, setFile] = useState();
    const userData = useSelector(state => state.user.getUserValue);
    const dispatch = useDispatch();

    const handlePicture = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('file', file);

        // Expliquer les formats d'image autorissé
        if (file) {
            if (!file.name.endsWith(".jpg") && !file.name.endsWith(".jpeg") && !file.name.endsWith(".png")) {
                alert("L'image doit être au format jpg/jpeg/png");
                return;
            }
        // Limite de taille 
            if (file.size > 1 * 1024 * 1024) {
                alert("L'image ne doit pas dépasser 5 mo");
                return;
            }
        }
        // Changer sa photo de profil
        axios.put(`${process.env.REACT_APP_API_URL}api/user/updateUserPic/${userData[0].id}`, data, {withCredentials: true})
            .then(res => {
                axios.get(`${process.env.REACT_APP_API_URL}api/user/${userData[0].id}`, {withCredentials: true})
                    .then(res => dispatch(getUser(res.data)))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    return (
        <form onSubmit={handlePicture} className="upload-pic">
            <div className="input-button">
                <input type="file" title='' id="file" name="file" accept=".jpg, .jpeg, .png"
                onChange={e => setFile(e.target.files[0])}/>
                <button>Changer de photo</button>
            </div>
            <input type="submit" value="Valider" className='send-upload'/>
        </form>
    );
};

export default UploadImg;