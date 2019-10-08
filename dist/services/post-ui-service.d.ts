import { PostService, ProfileService, SchemaService, ImageService, Post } from "large-core";
declare class PostUIService {
    postService: PostService;
    profileService: ProfileService;
    schemaService: SchemaService;
    imageService: ImageService;
    setFeed(feed: any): void;
    constructor(postService: PostService, profileService: ProfileService, schemaService: SchemaService, imageService: ImageService);
    postMessage(content: any, walletAddress: string): Promise<Post>;
    postReply(parent: Post, content: any, walletAddress: string): Promise<Post>;
    private buildPost;
    getImagesFromPostContentOps(ops: any): string[];
    getRecentPosts(offset: number, limit: number, olderThan?: string, newerThan?: string): Promise<Post[]>;
    loadPostImages(): Promise<void>;
    translatePost(post: Post): Promise<Post>;
    translateContent(post: Post): string;
    loadPostFeedForWallet(walletAddress: string): Promise<void>;
    loadMainFeedForWallet(walletAddress: string): Promise<void>;
    loadRepliesFeed(feedAddress: string): Promise<void>;
    delete(post: Post): Promise<void>;
}
export { PostUIService };
