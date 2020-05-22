import dotenv from "dotenv"
import { AddressInfo } from "net"
import express from "express"
import { signup } from "./endpoints/signup"
import { login } from "./endpoints/login"
import { createFriendship } from "./endpoints/friendrequest"


dotenv.config()
const app = express()
app.use(express.json())

const server = app.listen(process.env.PORT || 3003, () => {
  if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
  } else {
    console.error(`Failure upon starting server.`);
  }
})

app.post("/signup", signup);

app.post("/login", login);

app.post("/friendrequest", createFriendship);
