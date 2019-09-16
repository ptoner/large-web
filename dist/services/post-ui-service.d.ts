import { PostService, ProfileService, SchemaService, ImageService, Post } from "large-core";
declare class PostUIService {
    private postService;
    private profileService;
    private schemaService;
    private imageService;
    setFeed(feed: any): void;
    constructor(postService: PostService, profileService: ProfileService, schemaService: SchemaService, imageService: ImageService);
    postMessage(content: any, walletAddress: string): Promise<Post>;
    postReply(parent: Post, content: any, walletAddress: string): Promise<Post>;
    private buildPost;
    getImagesFromPostContentOps(ops: any): string[];
    getRecentPosts(limit: number, lt?: string, gt?: string): Promise<Post[]>;
    loadPostImages(): Promise<void>;
    translatePost(post: Post): Promise<void>;
    translateContent(post: Post): string;
    loadPostFeedForWallet(walletAddress: string): Promise<void>;
    loadMainFeedForWallet(walletAddress: string): Promise<void>;
    loadRepliesFeed(feedAddress: string): Promise<void>;
    delete(post: Post): Promise<void>;
}
export { PostUIService };
