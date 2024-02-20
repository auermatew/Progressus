import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('das World');
});


app.listen(3000, () => {
  console.log(`server running on port 4000`);
}); 