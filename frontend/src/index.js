
// API qui gère les composants
import React from 'react';
// API responsable de générer les composants dans le DOM
import ReactDOM from 'react-dom/client';
// Accès props sans passer par les composants enfants
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import './styles/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
  	</React.StrictMode>
);
