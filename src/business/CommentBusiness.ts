import { Comment } from "../models/Comment";
import { CommentDatabase } from "../data/CommentDatabase";
import { PostsDatabase } from "../data/PostsDatabase";

export class CommentBusiness {
  async createComment(
    comment: string,
    userId: string,
    postId: string,
    commentId: string
  ) {
    const verifyPostId = await new PostsDatabase().verifyPostId(postId);

    if (!verifyPostId) {
      throw new Error(" invalid post id");
    }

    const commentData = new Comment(commentId, comment, userId, postId);

    const commentDatabase = new CommentDatabase();

    await commentDatabase.createComment(commentData);
  }
}
