import React, { useContext } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { UidContext } from '../components/AppContext';
import NewPostForm from '../components/Post/NewPostForm';
import Thread from '../components/Thread';
import { logUser } from '../features/user.slice';

const Home = () => {
    const uid = useContext(UidContext);
    const dispatch = useDispatch();

    return (
        <div className='home'>
            {uid ? (
                <div className='home__main'>
                    <NewPostForm />
                    <Thread />
                </div>
            ) : (
                <>
                    <div className="home__landing-page">
                        <img className='home__logo' src="./img/icon-left-font-monochrome-black.svg" alt="logo" />
                        <div className="home__buttons">
                            <NavLink onClick={() => dispatch(logUser(true))} end to='/profil'>
                                <button>S'inscrire</button>
                            </NavLink>
                            <NavLink onClick={() => dispatch(logUser(false))} end to='/profil'>
                                <button>Se connecter</button>
                            </NavLink>
                        </div>
                    </div>
                </>  
            )}
        </div>
    )
};

export default Home;