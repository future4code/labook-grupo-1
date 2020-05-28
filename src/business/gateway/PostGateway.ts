import { Post, PostType } from '../entity/Post'

export interface PostGateway {
  createPost(post: Post): Promise<void>

  getFeed(userId: string): Promise<Post[]>

  getFeedByType(userId: string, postType: PostType): Promise<Post[]>
}