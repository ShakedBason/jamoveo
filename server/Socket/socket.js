// socket.js
const { Server } = require('socket.io');

function setupSocket(server) {
  const io = new Server(server, { cors: { origin: '*' } });

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('adminSongSelection', (song) => {
      io.emit('songChanged', song);
    });

    socket.on('quit', () => {
      io.emit('quit');
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);
    });
  });

  return io;
}

module.exports = setupSocket;
