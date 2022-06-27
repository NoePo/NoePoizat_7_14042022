import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UidContext } from '../AppContext';
import axios from 'axios';
import { addLike, removeLike } from '../../features/post.slice';

const LikeButton = ({ post }) => {
    const [liked, setLiked] = useState(false);
    const uid = useContext(UidContext);
    const dispatch = useDispatch();
    const likesData = useSelector(state => state.post.getLikesValue);
    const likeCounter = likesData.filter(element => element.postLiked_id === post.id);

    // Liker
    const like = () => {
        axios.patch(`${process.env.REACT_APP_API_URL}api/post/likeUnlike/${post.id}`, {
            liker_id: uid
        },
        {withCredentials: true})
            .then(res => {
                axios.get(`${process.env.REACT_APP_API_URL}api/post/likeUnlike`, {withCredentials: true})
                    .then(res => {
                        dispatch(addLike(res.data.at(-1)));
                        console.log("LIKED");
                        setLiked(true);
                    })
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }
    // Enlever son like
    const unlike = () => {
        axios.get(`${process.env.REACT_APP_API_URL}api/post/likeUnlike`, {withCredentials: true})
            .then(res => {
                res.data.forEach(like => {
                    if (like.liker_id === uid && like.postLiked_id === post.id) {
                        axios.get(`${process.env.REACT_APP_API_URL}api/post/likeUnlike/getOneLike/${like.id}`, {withCredentials: true})
                            .then(res => {
                                axios.patch(`${process.env.REACT_APP_API_URL}api/post/likeUnlike/${post.id}`, {
                                    liker_id: uid
                                },
                                {withCredentials: true})
                                    .then(res => {
                                        dispatch(removeLike(like.id));
                                        console.log("UNLIKED");
                                        setLiked(false);
                                    })
                                    .catch(err => console.log(err));
                            })
                            .catch(err => console.log(err));
                    }
                })
            })
            .catch(err => console.log(err));
    }
    // pas plus d'un like
    useEffect(() => {
        let shouldSkip = false;
        likesData.forEach((like) => {
            if (shouldSkip) {
                return;
            }
            if (like && like.liker_id === uid && like.postLiked_id === post.id) {
                setLiked(true);
                shouldSkip = true;
            }
            else {
                setLiked(false);
            }
        });
    }, [uid, likesData, post.id, liked]);

    return (
        <>
            {liked === false ? (
                <img src="./icons/thumbs-up-regular.svg" alt="thumbs up" onClick={like}/>
            ) : (
                <img src="./icons/thumbs-up-solid.svg" alt="thumbs up" onClick={unlike}/>
            )}
            <span>{likeCounter.length}</span>
        </>
    );
};

export default LikeButton;