
import ReactDOM from 'react-dom';
import React from 'react';

import App from './component/App';
function start() {
    ReactDOM.render(<App/>,
        // document.getElementById('root')
        document.body.appendChild(document.createElement("DIV"))
    );

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('SW registered: ', registration);
            }).catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
        });
    } else {
        console.log('Service Worker is not supported by browser.');
    }
}

start();
