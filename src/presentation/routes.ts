import express, { Request, Response } from 'express'
import { signup } from "./endpoints/signup";
import { login } from "./endpoints/login";
import { createFriendship } from "./endpoints/friendrequest";
import { createPost } from "./endpoints/createpost";
import { getPostFeed } from "./endpoints/getPostFeed";
import { getPostsFeedByType } from "./endpoints/getPostsFeedByType";
import { deleteFriendship } from './endpoints/deleteFirendship';
import { createComment } from './endpoints/createComment';
import { likePost } from './endpoints/likePost';
import { dislikePost } from './endpoints/dislikePost'

const app = express()

app.use(express.json())

app.post("/signup", signup);
app.post("/login", login);
app.post("/friendship", createFriendship);
app.post("/post/create", createPost);

app.delete("/friendship", deleteFriendship)
app.delete("/post/:postId", dislikePost)

app.get("/post/feed", getPostFeed);
app.get("/post/feed/:type", getPostsFeedByType);

app.put("/comment/:postId", createComment)
app.put('/post/:postId', likePost)

export default app;