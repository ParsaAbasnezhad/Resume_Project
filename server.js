const app = require('./src/app');

const port = process.env.PORT || 3002;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    console.log(`http://localhost:${port}`);
});