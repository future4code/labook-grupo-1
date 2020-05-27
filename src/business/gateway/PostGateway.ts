import { Post, PostType } from '../entity/Post'

export interface PostGateway {
  createPost(post: Post): Promise<void>

  getFeed(id: string): Promise<Post[]>

  getFeedByType(id: string, postType: PostType): Promise<Post[]>
}