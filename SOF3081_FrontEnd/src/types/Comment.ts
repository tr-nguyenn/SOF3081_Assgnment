export interface IComment {
  id?: number;
  postId: number;
  userId: number;
  userName: string;
  content: string;
  createAt: string;
}
