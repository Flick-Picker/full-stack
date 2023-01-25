const app = require('./index');

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}/`);
});
