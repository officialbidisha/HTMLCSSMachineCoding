const APP={
    SW: null,
    init(){
        if ('serviceWorker' in navigator){
            navigator.serviceWorker.register('./../sw.js', {
                scope: '/'
            }).then((registration)=> {
                const {installing, active, waiting} = registration;
                APP.SW = installing || waiting || active;
                console.log('Service worker registered');

                // 2. See if the page is currently has a service worker.
                if (navigator.serviceWorker.controller) {
                    console.log('we have a service worker installed');
                }

                // 3. Register a handler to detect when a new or
      // updated service worker is installed & activate.
                navigator.serviceWorker.oncontrollerchange = (ev) => {
                    console.log('New service worker activated');
                  };

            })
        }else{
            console.log('Service worker not supported')
        }
    }
}

document.addEventListener('DOMContentLoaded', APP.init());