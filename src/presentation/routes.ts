import express, {Request, Response} from 'express'
import { signup } from "./endpoints/signup";
import { login } from "./endpoints/login";
import { createFriendship } from "./endpoints/friendrequest";
import { createPost } from "./endpoints/createpost";
import { getPostsFriends } from "./endpoints/getPostsFriends";
import { getPostsType } from "./endpoints/getPostsType";
import { deleteFriendship } from './endpoints/deleteFirendship';

const app = express()

app.use(express.json())

app.post("/signup", signup);
app.post("/login", login);
app.post("/friendship", createFriendship);
app.post("/post/create", createPost);

app.delete("/friendship", deleteFriendship)

app.get("/post/feed", getPostsFriends);
app.get("/post/feedtype", getPostsType);

export default app;