"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var framework7_1 = require("framework7");
var quill_delta_to_html_1 = require("quill-delta-to-html");
var moment = require('moment');
var $$ = framework7_1.Dom7;
var PostUIService = /** @class */ (function () {
    function PostUIService(postService, profileService, schemaService, imageService) {
        this.postService = postService;
        this.profileService = profileService;
        this.schemaService = schemaService;
        this.imageService = imageService;
    }
    PostUIService.prototype.setFeed = function (feed) {
        this.postService.setFeed(feed);
    };
    PostUIService.prototype.postMessage = function (content, walletAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.buildPost(walletAddress, content)];
                    case 1:
                        post = _a.sent();
                        //Load user's post feed
                        return [4 /*yield*/, this.postService.loadPostFeedForWallet(walletAddress)];
                    case 2:
                        //Load user's post feed
                        _a.sent();
                        return [4 /*yield*/, this.postService.load(1)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.postService.create(post)
                            //Put in user's main feed too
                        ];
                    case 4:
                        _a.sent();
                        //Put in user's main feed too
                        return [4 /*yield*/, this.postService.loadMainFeedForWallet(walletAddress)];
                    case 5:
                        //Put in user's main feed too
                        _a.sent();
                        return [4 /*yield*/, this.postService.load(1)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.postService.create(post)];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.translatePost(post)];
                    case 8:
                        _a.sent();
                        return [2 /*return*/, post];
                }
            });
        });
    };
    PostUIService.prototype.postReply = function (parent, content, walletAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var post;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.buildPost(walletAddress, content, parent)];
                    case 1:
                        post = _a.sent();
                        //Load replies feed
                        return [4 /*yield*/, this.postService.loadRepliesFeed(parent.replies)];
                    case 2:
                        //Load replies feed
                        _a.sent();
                        return [4 /*yield*/, this.postService.create(post)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.translatePost(post)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, post];
                }
            });
        });
    };
    PostUIService.prototype.buildPost = function (walletAddress, content, parent) {
        if (parent === void 0) { parent = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var dateString, profile, ex_1, post, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dateString = moment().format().toString();
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.profileService.getProfileByWallet(walletAddress)];
                    case 2:
                        profile = _b.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        ex_1 = _b.sent();
                        console.log(ex_1);
                        return [3 /*break*/, 4];
                    case 4:
                        post = {
                            owner: walletAddress,
                            ownerDisplayName: (profile && profile.name) ? profile.name : walletAddress,
                            dateCreated: dateString,
                            content: content
                        };
                        if (parent) {
                            post.parentCid = parent.cid;
                        }
                        _a = post;
                        return [4 /*yield*/, this.schemaService.getRepliesPostFeedAddress(post, this.translateContent(post))];
                    case 5:
                        _a.replies = _b.sent();
                        //Set user avatar
                        if (profile && profile.profilePic) {
                            post.ownerProfilePic = profile.profilePic;
                        }
                        return [2 /*return*/, post];
                }
            });
        });
    };
    PostUIService.prototype.getImagesFromPostContentOps = function (ops) {
        var images = [];
        for (var _i = 0, ops_1 = ops; _i < ops_1.length; _i++) {
            var op = ops_1[_i];
            if (op.insert && op.insert.ipfsimage) {
                images.push(op.insert.ipfsimage.ipfsCid);
            }
        }
        return images;
    };
    PostUIService.prototype.getRecentPosts = function (offset, limit, olderThan, newerThan) {
        if (olderThan === void 0) { olderThan = undefined; }
        if (newerThan === void 0) { newerThan = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var posts, translatedPosts, _i, posts_1, post, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.postService.getRecentPosts(offset, limit, olderThan, newerThan)];
                    case 1:
                        posts = _c.sent();
                        translatedPosts = [];
                        _i = 0, posts_1 = posts;
                        _c.label = 2;
                    case 2:
                        if (!(_i < posts_1.length)) return [3 /*break*/, 5];
                        post = posts_1[_i];
                        _b = (_a = translatedPosts).push;
                        return [4 /*yield*/, this.translatePost(post)];
                    case 3:
                        _b.apply(_a, [_c.sent()]);
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, translatedPosts];
                }
            });
        });
    };
    PostUIService.prototype.loadPostImages = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                $$(".blob-image").each(function (index, element) {
                    return __awaiter(this, void 0, void 0, function () {
                        var src, cid, imgUrl;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    src = $$(element).prop('src');
                                    if (src)
                                        return [2 /*return*/];
                                    cid = $$(element).data('cid');
                                    return [4 /*yield*/, self.imageService.cidToUrl(cid)];
                                case 1:
                                    imgUrl = _a.sent();
                                    $$(element).prop('src', imgUrl);
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    PostUIService.prototype.translatePost = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            var translated, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        translated = {};
                        Object.assign(translated, post);
                        translated.contentTranslated = this.translateContent(post);
                        translated.dateCreated = moment(post.dateCreated).fromNow();
                        if (!translated.ownerProfilePic) return [3 /*break*/, 2];
                        _a = translated;
                        return [4 /*yield*/, this.imageService.cidToUrl(post.ownerProfilePic)];
                    case 1:
                        _a.ownerProfilePicSrc = _b.sent();
                        _b.label = 2;
                    case 2: return [2 /*return*/, translated];
                }
            });
        });
    };
    PostUIService.prototype.translateContent = function (post) {
        if (!post.content)
            return;
        var qdc = new quill_delta_to_html_1.QuillDeltaToHtmlConverter(post.content.ops, {});
        //Render dividers into HTML
        qdc.renderCustomWith(function (customOp, contextOp) {
            if (customOp.insert.type === 'divider') {
                return "<hr />";
            }
            if (customOp.insert.type === 'ipfsimage') {
                return "<img class=\"blob-image\" data-cid=\"" + customOp.insert.value.ipfsCid + "\" width=\"" + customOp.insert.value.width + "\" height=\"" + customOp.insert.value.height + "\" style=\"" + customOp.insert.value.style + "\"  />";
            }
            if (customOp.insert.type === 'ipfsvideo') {
                return "\n                <video width=\"" + customOp.insert.value.width + "\" height=\"" + customOp.insert.value.height + "\" style=\"" + customOp.insert.value.style + "\">\n                  <source src=\"" + framework7_1.Template7.global.ipfsGateway + "/" + customOp.insert.value.ipfsCid + "\" type=\"video/mp4\">\n                </video>\n              ";
            }
        });
        return qdc.convert();
    };
    PostUIService.prototype.loadPostFeedForWallet = function (walletAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.postService.loadPostFeedForWallet(walletAddress)];
            });
        });
    };
    PostUIService.prototype.loadMainFeedForWallet = function (walletAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.postService.loadMainFeedForWallet(walletAddress)];
            });
        });
    };
    PostUIService.prototype.loadRepliesFeed = function (feedAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.postService.loadRepliesFeed(feedAddress)];
            });
        });
    };
    PostUIService.prototype["delete"] = function (post) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.postService["delete"](post);
                return [2 /*return*/];
            });
        });
    };
    return PostUIService;
}());
exports.PostUIService = PostUIService;
