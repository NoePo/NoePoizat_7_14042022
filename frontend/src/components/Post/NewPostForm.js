import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../features/user.slice';
import { UidContext } from '../AppContext';
import { timestampParser } from '../Utils';
import axios from 'axios';
import { getPosts } from '../../features/post.slice';
import { NavLink } from 'react-router-dom';

const NewPostForm = () => {
    // récupération des différents éléments (image, message...)
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [img, setImg] = useState(null);
    const [video, setVideo] = useState('');
    const [file, setFile] = useState();
    const userData = useSelector(state => state.user.getUserValue);
    const dispatch = useDispatch();
    const uid = useContext(UidContext);

    const handlePost = () => {
        if (message || img || video) {
            const data = new FormData();
            data.append('poster_id', userData[0].id);
            data.append('message', message);
            if (file) data.append('file', file);
            data.append('video', video);
            data.append('date', new Date().toLocaleDateString('en-CA'));

            // Si image pas au bon format / trop lourde
            if (file) {
                if (!file.name.endsWith(".jpg") && !file.name.endsWith(".jpeg") && !file.name.endsWith(".png")) {
                    alert("L'image doit être au format jpg/jpeg/png");
                    return;
                }
                if (file.size > 1 * 1024 * 1024) {
                    alert("L'image ne doit pas dépasser 5 mo");
                    return;
                }
            }
            axios.post(`${process.env.REACT_APP_API_URL}api/post`, data, {withCredentials: true})
                .then(res => {
                    axios.get(`${process.env.REACT_APP_API_URL}api/post`, {withCredentials: true})
                        .then(res => {
                            dispatch(getPosts(res.data));
                            cancelPost();
                        })
                        .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
                
        }
        // Si pas de message
        else {
            alert("Veuillez entrer un message");
        }
    }

    const handleImage = (e) => {
        setImg(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
        setVideo('');
    }

    const cancelPost = () => {
        setMessage('');
        setImg('');
        setVideo('');
        setFile('');
    }

    useEffect(() => {
        if (uid) {
            axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`, {withCredentials: true})
            	.then((res) => {
            		dispatch(getUser(res.data));
                    setIsLoading(false);
            	})
            	.catch((err) => console.log(err));
        }

        const handleVideo = () => {
            let findLink = message.split(" ");
            for (let i = 0; i < findLink.length; i++) {
                if (findLink[i].includes('https://www.yout') || findLink[i].includes('https://yout')) {
                    let embed = findLink[i].replace("watch?v=", "embed/");
                    setVideo(embed.split('&')[0]);
                    findLink.splice(i, 1);
                    setMessage(findLink.join(" "));
                    setImg(null);
                    setFile(null);
                }
            }
        }
        handleVideo();

    }, [uid, dispatch, message])

    return (
        <div className='post-container'>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <NavLink end to="/profil" className="user-info">
                        <img src={userData[0].image} alt="user-img" />
                        <p>{userData[0].pseudo}</p>
                    </NavLink>
                    <div className="form">
                        <textarea aria-label="Message post" name='message' id='message' placeholder='Quoi de neuf ?'
                        onChange={e => setMessage(e.target.value)} value={message} />
                        {message || img || video.length > 20 ? (
                            <div className="prev-container">
                                <div className="prev-header">
                                    <div className="info-poster">
                                        <img src={userData[0].image} alt="user-pic" />
                                        <p>{userData[0].pseudo}</p>
                                    </div>
                                    <p className='date'>{timestampParser(Date.now())}</p>
                                </div>
                                <div className="prev-content">
                                    <p>{message}</p>
                                    <img src={img} alt="" />
                                    {video && (
                                        <div className="video-container">
                                            <iframe className='video'
                                            src={(video).replace("watch?v=", "embed/")}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={video}
                                            ></iframe>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : null}
                        <div className="form-footer">
                            <div className="file-gestion">
                                {video === '' && (
                                    <>
                                        <div className="upload-file">
                                            <img src="./icons/file-image-regular.svg" alt="file-icon" id='file-image-icon' />
                                            <input type="file" id="file-upload" name="file" accept=".jpg, .jpeg, .png"
                                            onChange={e => handleImage(e)}
                                            onMouseOver={() => {
                                                const icon = document.getElementById('file-image-icon');
                                                const currentSrc = icon.getAttribute('src');
                                                icon.setAttribute('src', currentSrc.replace("regular", "solid"));
                                            }}
                                            onMouseOut={() => {
                                                const icon = document.getElementById('file-image-icon');
                                                const currentSrc = icon.getAttribute('src');
                                                icon.setAttribute('src', currentSrc.replace("solid", "regular"));
                                            }} />
                                        </div>
                                        {img && (
                                            <button onClick={() => {
                                                setImg(null);
                                                setFile(null);
                                            }}>Supprimer image</button>
                                        )}
                                    </>
                                )}
                                {video && (
                                    <>
                                        <span></span>
                                        <button onClick={() => setVideo("")}>Supprimer vidéo</button>
                                    </>
                                )}
                            </div>
                            <div className="buttons">
                                {message || img || video.length > 20 ? (
                                    <>
                                        <button className='cancel' onClick={cancelPost}>Annuler</button>
                                        <button className='send' onClick={handlePost}>Envoyer</button>
                                    </>
                                ) : <button aria-label="publier" className='send' onClick={handlePost}>Envoyer</button>}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default NewPostForm;