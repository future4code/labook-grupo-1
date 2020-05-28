import { Comment } from '../entity/Comment'

export interface CommentGateway {
  createComment(comment: Comment): Promise<void>
}