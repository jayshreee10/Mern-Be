import express from "express";
import cors from "cors";

const app = express();

const appCors = cors({
  origin: ["http://localhost:5173/", "*"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
});

app.use(express.json());
app.use(cors());

const data = [
  {
    text: "Buy groceries",
    completed: false,
  },
  {
    text: "Walk the dog",
    completed: true,
  },
  {
    text: "Finish React project",
    completed: false,
  },
  {
    text: "Read a book",
    completed: true,
  },
  {
    text: "Call the plumber",
    completed: false,
  },
];

app.get("/", (req, res) => {
  res.send(data);
});

app.post("/add", (req, res) => {
  const userData = data.push(req.body);
  console.log(data);
  res.send(data);
});

app.listen(2000, (err) => {
  err ? console.log(err) : console.log("server started");
});
