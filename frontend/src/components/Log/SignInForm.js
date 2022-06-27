import React, { useState } from 'react';
import axios from 'axios';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');
        // Envoie de l'email et mot de passe au backend
        axios.post(`${process.env.REACT_APP_API_URL}api/auth/login`, {
            email, 
            password 
        }, {withCredentials: true})
            .then((res) => {
                window.location = '/';
            })
            // Voir si erreur
            .catch((err) => {
                emailError.innerHTML = err.response.data.errorEmail;
                passwordError.innerHTML = err.response.data.errorPassword;
                console.log(err);
            });
    };

    return (
        <form action="" onSubmit={handleLogin} id="sign-in-form">
            <div className='containerLabelInput'>
                <label htmlFor="email">Email</label>
                <input type="text" name="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="email@gmail.com" />
                <div className="email error"></div>
            </div>
            <div className='containerLabelInput'>
                <label htmlFor="password">Mot de passe</label>
                <input type="password" name="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="6 caractères mini" />
                <div className="password error"></div>
            </div>
            <input type="submit" value="Se connecter" className='submit' />
        </form>
    );
};

export default SignInForm;