import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import http from 'http'; 
import { Server } from 'socket.io'; 
import router from './src/routes/index.js';
import connectDB from './database.js';


dotenv.config();


const app = express();
const server = http.createServer(app);
const io = new Server(server); 

app.use(cors({ origin: '*' }));

app.use((req, res, next) => {
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; connect-src 'self' https://connect-i645.onrender.com;  img-src 'self' https://res.cloudinary.com;"
    );
    next();
});



app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/connect', router);
app.use(express.json())


app.use((req, res, next) => {
    res.setHeader('Connection', 'keep-alive');
    next();
  });




io.on('connection', (socket) => {
    console.log('A user connected');
});

export default {
   server,
   io
};



const startServer = async () => {
    const PORT = process.env.PORT || 1112;
    connectDB();
    try {
        server.listen(PORT, () => {
            console.log(`APP IS RUNNING ON PORT: ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
};

startServer();

app.get('/', (req, res) => {
     res.send('API IS RUNNING');
});
