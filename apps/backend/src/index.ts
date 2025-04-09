import express from "express";
import { Prismaclient } from "@repo/db/client"; // Ensure correct import path

const app = express();
app.use(express.json());

// GET /users endpoint
app.get("/users", async (req, res) => {
  try {
    const users = await Prismaclient.user.findMany(); // Make sure 'user' matches your model in Prisma
    res.json(users);
  } catch (err) {
    res
      .status(500)
      .json({ error: "either do not have any data or fetching problem" });
  }
});

// POST /user endpoint
app.post("/user", async (req, res) => {
  const { Username, Password } = req.body;

  if (!Username || !Password) {
    res.status(400).json({ error: "Username and password are required" });
    return;
  }

  try {
    const user = await Prismaclient.user.create({
      data: {
        Username,
        Password,
      },
    });
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "too much mistake" });
  }
});

// Start the server
app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
