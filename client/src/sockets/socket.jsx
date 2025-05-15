import { io } from 'socket.io-client';

const socket = io('http://localhost:3000', {
    withCredentials: true, // Nếu bạn cần gửi cookie hoặc token
});

export default socket;
