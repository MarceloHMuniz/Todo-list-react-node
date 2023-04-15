import express from 'express';
import {userRouter} from './routes/userRoutes';
import {taskRouter} from './routes/taskRoutes';
import cors from 'cors'


const app = express();
app.use(cors());

app.use(express.json());
app.use('/', userRouter);
app.use('/', taskRouter);

app.get('/', (req, res) => {
  res.send("TODO API is running");
});

app.listen(process.env.PORT_EXPRESS, () => {
  console.log(`server is listening on PORT ${process.env.PORT_EXPRESS}`);
});