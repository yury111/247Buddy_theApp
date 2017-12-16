import io from 'socket.io-client';

window.navigator.userAgent = 'ReactNative';

// let server = 'ws://demo247buddy.herokuapp.com';
//let server = 'http://192.168.1.100:9000';
let server = 'wss://247buddy.net';

export default io(server, {
  jsonp: false,
  path: '/socket.io-client',
  transports: ['websocket'],
  pingTimeout: 30000
});


