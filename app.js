const EventEmitter = require('events');
const emitter = new EventEmitter();

// Register a listener
emitter.on('messageLogged', (arg) => {
    console.log('Listener called',arg);
});

emitter.on('logging', (e) => { console.log('Loggin Event',e);});

emitter.emit('messageLogged', {id: 1, url: 'http://' });

// Raise: logging (data: message)
emitter.emit('logging','Jemin');
