// useEffect pour faire des fetch
// useState pour stocker le retour des l'API

import React, { useEffect, useState } from 'react';
import Routes from './components/Routes/index.js';
import { UidContext } from './components/AppContext';
// Permet de faire des promise
import axios from 'axios';

const App = () => {
	const [uid, setUid] = useState('');

	useEffect(() => {
		axios.get(`${process.env.REACT_APP_API_URL}api/jwtid`, {withCredentials: true})
			.then((res) => {
				setUid(res.data.myID);
			})
			.catch((err) => console.log(err));
	}, [uid]);

	return (
		<UidContext.Provider value={uid}>
			<Routes />
		</UidContext.Provider>
	);
};

export default App;
