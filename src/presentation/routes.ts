import express, {Request, Response} from 'express'
import { signup } from "./endpoints/signup";
import { login } from "./endpoints/login";
import { createFriendship } from "./endpoints/friendrequest";
import { createPost } from "./endpoints/createpost";
import { getPostsFriends } from "./endpoints/getPostsFriends";
import { getPostsType } from "./endpoints/getPostsType";

const app = express()

app.use(express.json())

app.post("/signup", signup);
app.post("/friendrequest", createFriendship);
app.post("/createpost", createPost);

app.get("/post/feed", getPostsFriends);
app.get("/post/feedtype", getPostsType);
app.get("/login", login);

export default app;