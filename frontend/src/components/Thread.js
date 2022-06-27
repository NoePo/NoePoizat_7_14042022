import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { getLikes, getPosts } from '../features/post.slice';
import Card from './Post/Card';
import { getUsers } from '../features/user.slice';

// Fil des posts
const Thread = () => {
    const dispatch = useDispatch();
    const postData = useSelector(state => state.post.getPostsValue);

    useEffect(() => {
        // post
        axios.get(`${process.env.REACT_APP_API_URL}api/post`, {withCredentials: true})
            .then(res => {
                dispatch(getPosts(res.data));
            })
            .catch(err => console.log(err));

        // utilisateur
        axios.get(`${process.env.REACT_APP_API_URL}api/user`, {withCredentials: true})
            .then(res => {
                dispatch(getUsers(res.data));
            })
            .catch(err => console.log(err));
            
        //like
        axios.get(`${process.env.REACT_APP_API_URL}api/post/likeUnlike`, {withCredentials: true})
            .then(res => {
                dispatch(getLikes(res.data));
            })
            .catch(err => console.log(err));

    }, [dispatch]);
        
        return (
            <div className='thread'>
            {postData !== null ? (
                postData.slice(0).reverse().map(post => {
                    return <Card key={post.id} post={post} />;
                })
                ) : (
                    <p>Loading...</p>
                )}
        </div>
    );
};

export default Thread;