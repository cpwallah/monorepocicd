import WebSocket from "ws"; // Importing the 'ws' library for WebSocket functionality
import { prismaClient } from "@repo/db/client"; // Assuming you have the Prisma client set up

// Create a WebSocket server listening on port 8081
const wss = new WebSocket.Server({ port: 8081 });

// Set up event listener when a new WebSocket connection is established
wss.on("connection", (ws) => {
  console.log("A new client connected!");

  // Handle messages received from clients
  ws.on("message", async (message) => {
    console.log("Received: " + message);

    // Create a new user in the database using Prisma when a message is received
    try {
      const newUser = await prismaClient.user.create({
        data: {
          Username: Math.random().toString(),
          Password: Math.random().toString(),
        },
      });
      console.log("Created user: ", newUser);

      // Send back the same message received from the client
      ws.send(message);
    } catch (err) {
      console.error("Error creating user: ", err);
      ws.send("Error creating user");
    }
  });

  // Send a welcome message to the new connection
  ws.send("Welcome to the WebSocket server!");
});

console.log("WebSocket server is running on ws://localhost:8081");
