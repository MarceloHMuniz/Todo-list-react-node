import express from 'express';
import routes from './routes/routes';

const app = express();

app.use(express.json());
app.use('/', routes);

app.get('/', (req, res) => {
  res.send("TODO API is running");
});

app.listen(process.env.PORT_EXPRESS, () => {
  console.log(`server is listening on PORT ${process.env.PORT_EXPRESS}`);
});