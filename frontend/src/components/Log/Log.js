import React, { useEffect, useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const Log = (props) => {
    const [signUpModal, setSignUpModal] = useState(props.signUp);
    const [signInModal, setSignInModal] = useState(props.signIn);

    
    const handleModals = (e) => {
        if (e.target.id === "register") {
            setSignInModal(false);
            setSignUpModal(true);
        }
        else if (e.target.id === "login") {
            setSignUpModal(false);
            setSignInModal(true);
        }
    }

    useEffect(() => {
        if (signUpModal) {
            document.getElementById('login').classList.remove('active');
            document.getElementById('register').classList.add('active');
        }
        if (signInModal) {
            document.getElementById('login').classList.add('active');
            document.getElementById('register').classList.remove('active');
        }
    }, [signUpModal, signInModal])

    return (
        <div className="profil-body">
            <img src="./img/icon-above-font.svg" alt="logo-groupomania" className='logo' />
            <div className='form-auth'>
                <ul>
                    <li onClick={handleModals} id="register">S'inscrire</li>
                    <li onClick={handleModals} id="login">Se connecter</li>
                </ul>
                {signUpModal && <SignUpForm />}
                {signInModal && <SignInForm />}
            </div>
        </div>
    );
};

export default Log;