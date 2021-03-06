import { PostService, ProfileService, SchemaService, ImageService, Post, Profile } from "large-core";
import { Dom7, Template7 } from "framework7";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

const moment = require('moment')

var $$ = Dom7

class PostUIService {

    setFeed(feed) {
        this.postService.setFeed(feed)
    }


    constructor(
        public postService: PostService,
        public profileService: ProfileService,
        public schemaService: SchemaService,
        public imageService: ImageService
    ) { }

    async postMessage(content: any, walletAddress: string) {

        let post: Post = await this.buildPost(walletAddress, content);

        //Load user's post feed
        await this.postService.loadPostFeedForWallet(walletAddress)
        await this.postService.load(1)
        await this.postService.create(post)

        //Put in user's main feed too
        await this.postService.loadMainFeedForWallet(walletAddress)
        await this.postService.load(1)
        await this.postService.create(post)

        await this.translatePost(post)

        return post

    }


    async postReply(parent:Post, content: any, walletAddress: string) {

        let post: Post = await this.buildPost(walletAddress, content, parent);

        //Load replies feed
        await this.postService.loadRepliesFeed(parent.replies)
        await this.postService.create(post)

        await this.translatePost(post)

        return post

    }



    private async buildPost(walletAddress: string, content: any, parent:Post=undefined) {

        let dateString: string = moment().format().toString()
        
        //Get profile service of poster
        let profile: Profile
        
        try {
            profile = await this.profileService.getProfileByWallet(walletAddress);
        }
        catch (ex) {
            console.log(ex);
        }

        let post: Post = {
            owner: walletAddress,
            ownerDisplayName: (profile && profile.name) ? profile.name : walletAddress,
            dateCreated: dateString,
            content: content
        }

        if (parent) {
            post.parentCid = parent.cid
        }

        post.replies = await this.schemaService.getRepliesPostFeedAddress(post, this.translateContent(post));
        
        //Set user avatar
        if (profile && profile.profilePic) {
            post.ownerProfilePic = profile.profilePic
        }
        return post;
    }

    getImagesFromPostContentOps(ops: any) {

        const images: string[] = []

        for (let op of ops) {
            if (op.insert && op.insert.ipfsimage) {
                images.push(op.insert.ipfsimage.ipfsCid)
            }
        }

        return images

    }

    async getRecentPosts(offset:number, limit:number, olderThan: string = undefined, newerThan: string = undefined): Promise<Post[]> {
        
        let posts:Post[] = await this.postService.getRecentPosts(offset, limit, olderThan, newerThan)

        let translatedPosts:Post[] = []

        for (let post of posts) {
            translatedPosts.push(await this.translatePost(post))
        }

        return translatedPosts

    }

    async loadPostImages() {

        const self = this

        $$(".blob-image").each(async function(index, element) {

            let src = $$(element).prop('src')
            if (src) return

            let cid = $$(element).data('cid')

            let imgUrl = await self.imageService.cidToUrl(cid)

            $$(element).prop('src', imgUrl)
        })

    }


    async translatePost(post: Post): Promise<Post> {

        //@ts-ignore
        let translated:Post = {}

        Object.assign(translated, post)

        translated.contentTranslated = this.translateContent(post)
        translated.dateCreated = moment(post.dateCreated).fromNow()

        if (translated.ownerProfilePic) {
            translated.ownerProfilePicSrc = await this.imageService.cidToUrl(post.ownerProfilePic)
        }
        
        return translated

    }

    translateContent(post: Post): string {

        if (!post.content) return

        const qdc = new QuillDeltaToHtmlConverter(post.content.ops, {});

        //Render dividers into HTML
        qdc.renderCustomWith(function (customOp, contextOp) {
            if (customOp.insert.type === 'divider') {
                return "<hr />"
            }

            if (customOp.insert.type === 'ipfsimage') {
                return `<img class="blob-image" data-cid="${customOp.insert.value.ipfsCid}" width="${customOp.insert.value.width}" height="${customOp.insert.value.height}" style="${customOp.insert.value.style}"  />`
            }

            if (customOp.insert.type === 'ipfsvideo') {
                return `
                <video width="${customOp.insert.value.width}" height="${customOp.insert.value.height}" style="${customOp.insert.value.style}">
                  <source src="${Template7.global.ipfsGateway}/${customOp.insert.value.ipfsCid}" type="video/mp4">
                </video>
              `
            }

        })

        return qdc.convert()
    }

    async loadPostFeedForWallet(walletAddress: string){
        return this.postService.loadPostFeedForWallet(walletAddress)
    }

    async loadMainFeedForWallet(walletAddress: string){
        return this.postService.loadMainFeedForWallet(walletAddress)
    }

    async loadRepliesFeed(feedAddress:string) {
        return this.postService.loadRepliesFeed(feedAddress)
    }
  


    async delete(post: Post): Promise<void> {
        this.postService.delete(post)
    }


}

export {
    PostUIService
}