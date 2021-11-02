let express = require("express");
let app = express();

const stockValue = require("./routes/api/stockValue");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('etag', false);

//connect to db

// Routes
app.use("/api/stock-value", stockValue);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
