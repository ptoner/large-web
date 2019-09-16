"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Quill = require("quill/dist/quill.js");
var quill_blot_formatter_1 = require("quill-blot-formatter");
var QuillBlotFormatter = require("quill-blot-formatter");
var framework7_1 = require("framework7");
var $$ = framework7_1.Dom7;
/**
 * THESE CLASSES ARE HERE BECAUSE I NEEDED TO OVERRIDE THEM TO FIX A PROBLEM WITH DELETING
 * IMAGES BUT I DONT KNOW WHERE THEY SHOULD GO. SO THEY'RE HERE FOR NOW
 */
var CustomDeleteAction = /** @class */ (function (_super) {
    __extends(CustomDeleteAction, _super);
    function CustomDeleteAction() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomDeleteAction.prototype.onCreate = function () {
        var self = this;
        this.keyUpListener = function (e) {
            self.onKeyUp(e);
        };
        document.addEventListener('keyup', self.keyUpListener, true);
        this.formatter.quill.root.addEventListener('input', self.keyUpListener, true);
    };
    CustomDeleteAction.prototype.onDestroy = function () {
        var self = this;
        document.removeEventListener('keyup', self.keyUpListener);
        this.formatter.quill.root.removeEventListener('input', self.keyUpListener);
    };
    //@ts-ignore
    CustomDeleteAction.prototype.onKeyUp = function (e) {
        if (!this.formatter.currentSpec) {
            return;
        }
        // delete or backspace
        if (e.keyCode === 46 || e.keyCode === 8) {
            var blot = Quill.find(this.formatter.currentSpec.getTargetElement());
            if (blot) {
                blot.deleteAt(0);
            }
            this.formatter.hide();
        }
    };
    return CustomDeleteAction;
}(quill_blot_formatter_1.DeleteAction));
var CustomImageSpec = /** @class */ (function (_super) {
    __extends(CustomImageSpec, _super);
    function CustomImageSpec() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomImageSpec.prototype.getActions = function () {
        return [QuillBlotFormatter.AlignAction, QuillBlotFormatter.ResizeAction, CustomDeleteAction];
    };
    return CustomImageSpec;
}(QuillBlotFormatter.ImageSpec));
/**
 * END UTIL
 */
var QuillService = /** @class */ (function () {
    function QuillService(uploadService, imageService) {
        this.uploadService = uploadService;
        this.imageService = imageService;
        this.initialized = false;
        var self = this;
        $$(document).on('click', '.bold-button', function (e) {
            e.preventDefault();
            self.boldClick();
        });
        $$(document).on('click', '.italic-button', function (e) {
            e.preventDefault();
            self.italicClick();
        });
        $$(document).on('click', '.link-button', function (e) {
            e.preventDefault();
            self.linkClick();
        });
        $$(document).on('click', '.blockquote-button', function (e) {
            e.preventDefault();
            self.blockquoteClick();
        });
        // $$(document).on('click', '.header-1-button', function (e) {
        //   e.preventDefault()
        //   self.header1Click()
        // })
        // $$(document).on('click', '.header-2-button', function (e) {
        //   e.preventDefault()
        //   self.header2Click()
        // })
        // $$(document).on('click', '.divider-button', function (e) {
        //   e.preventDefault()
        //   self.dividerClick()
        // })
        $$(document).on('click', '.image-button', function (e) {
            e.preventDefault();
            self.imageClick();
        });
        $$(document).on('change', '.image-button-input', function (e) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            e.preventDefault();
                            return [4 /*yield*/, self.imageSelected(this)];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        });
    }
    QuillService.prototype.buildQuillPostEditor = function (selector) {
        this.initialize();
        // this.activeEditor = undefined
        this.activeEditor = new Quill(selector, {
            modules: {
                blotFormatter: {
                    specs: [
                        CustomImageSpec,
                    ],
                    align: {
                        icons: {
                            left: "<i class='fa fa-align-left'></i>",
                            center: "<i class='fa fa-align-center'></i>",
                            right: "<i class='fa fa-align-right'></i>"
                        },
                        toolbar: {
                            svgStyle: {
                                fontSize: '21px'
                            }
                        }
                    }
                }
            }
        });
        return this.activeEditor;
    };
    QuillService.prototype.initialize = function () {
        var self = this;
        if (this.initialized)
            return;
        Quill.register('modules/blotFormatter', QuillBlotFormatter["default"]);
        Quill.debug(false);
        var Inline = Quill["import"]('blots/inline');
        var BoldBlot = /** @class */ (function (_super) {
            __extends(BoldBlot, _super);
            function BoldBlot() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return BoldBlot;
        }(Inline));
        BoldBlot.blotName = 'bold';
        BoldBlot.tagName = 'strong';
        var ItalicBlot = /** @class */ (function (_super) {
            __extends(ItalicBlot, _super);
            function ItalicBlot() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return ItalicBlot;
        }(Inline));
        ItalicBlot.blotName = 'italic';
        ItalicBlot.tagName = 'em';
        var LinkBlot = /** @class */ (function (_super) {
            __extends(LinkBlot, _super);
            function LinkBlot() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            LinkBlot.create = function (value) {
                var node = _super.create.call(this);
                // Sanitize url value if desired
                node.setAttribute('href', value);
                // Okay to set other non-format related attributes
                // These are invisible to Parchment so must be static
                node.setAttribute('target', '_blank');
                return node;
            };
            LinkBlot.formats = function (node) {
                // We will only be called with a node already
                // determined to be a Link blot, so we do
                // not need to check ourselves
                return node.getAttribute('href');
            };
            return LinkBlot;
        }(Inline));
        LinkBlot.blotName = 'link';
        LinkBlot.tagName = 'a';
        var Block = Quill["import"]('blots/block');
        var BlockquoteBlot = /** @class */ (function (_super) {
            __extends(BlockquoteBlot, _super);
            function BlockquoteBlot() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return BlockquoteBlot;
        }(Block));
        BlockquoteBlot.blotName = 'blockquote';
        BlockquoteBlot.tagName = 'blockquote';
        var HeaderBlot = /** @class */ (function (_super) {
            __extends(HeaderBlot, _super);
            function HeaderBlot() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            HeaderBlot.formats = function (node) {
                return HeaderBlot.tagName.indexOf(node.tagName) + 1;
            };
            return HeaderBlot;
        }(Block));
        HeaderBlot.blotName = 'header';
        HeaderBlot.tagName = ['H1', 'H2'];
        var BlockEmbed = Quill["import"]('blots/block/embed');
        var DividerBlot = /** @class */ (function (_super) {
            __extends(DividerBlot, _super);
            function DividerBlot() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return DividerBlot;
        }(BlockEmbed));
        DividerBlot.blotName = 'divider';
        DividerBlot.tagName = 'hr';
        var IpfsImageBlot = /** @class */ (function (_super) {
            __extends(IpfsImageBlot, _super);
            function IpfsImageBlot() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            IpfsImageBlot.create = function (value) {
                self.imageService.cidToUrl(value.ipfsCid).then(function (imgUrl) {
                    $$("#" + value.ipfsCid).prop('src', imgUrl);
                });
                var node = _super.create.call(this);
                node.setAttribute('id', value.ipfsCid);
                node.setAttribute('ipfsCid', value.ipfsCid);
                node.setAttribute('width', value.width);
                node.setAttribute('height', value.height);
                node.setAttribute('style', value.style);
                return node;
            };
            IpfsImageBlot.value = function (node) {
                var ipfsCid = node.getAttribute('ipfsCid');
                var width = node.getAttribute('width');
                var height = node.getAttribute('height');
                var style = node.getAttribute('style');
                return {
                    ipfsCid: ipfsCid,
                    width: width,
                    height: height,
                    style: style
                };
            };
            return IpfsImageBlot;
        }(BlockEmbed));
        IpfsImageBlot.blotName = 'ipfsimage';
        IpfsImageBlot.tagName = 'img';
        var IpfsVideoBlot = /** @class */ (function (_super) {
            __extends(IpfsVideoBlot, _super);
            function IpfsVideoBlot() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            IpfsVideoBlot.create = function (value) {
                var node = _super.create.call(this);
                node.setAttribute('src', framework7_1.Template7.global.ipfsGateway + "/" + value.ipfsCid);
                node.setAttribute('ipfsCid', value.ipfsCid);
                node.setAttribute('width', value.width);
                node.setAttribute('height', value.height);
                node.setAttribute('style', value.style);
                return node;
            };
            IpfsVideoBlot.value = function (node) {
                var ipfsCid = node.getAttribute('ipfsCid');
                var width = node.getAttribute('width');
                var height = node.getAttribute('height');
                var style = node.getAttribute('style');
                return {
                    ipfsCid: ipfsCid,
                    width: width,
                    height: height,
                    style: style
                };
            };
            return IpfsVideoBlot;
        }(BlockEmbed));
        IpfsVideoBlot.blotName = 'ipfsvideo';
        IpfsVideoBlot.tagName = 'video';
        Quill.register(IpfsVideoBlot);
        Quill.register(IpfsImageBlot);
        // Quill.register(DividerBlot)
        // Quill.register(HeaderBlot)
        Quill.register(BlockquoteBlot);
        Quill.register(LinkBlot);
        Quill.register(BoldBlot);
        Quill.register(ItalicBlot);
        this.initialized = true;
    };
    QuillService.prototype.boldClick = function () {
        var currentFormat = this.activeEditor.getFormat();
        this.activeEditor.format('bold', !currentFormat.bold);
    };
    QuillService.prototype.italicClick = function () {
        var currentFormat = this.activeEditor.getFormat();
        this.activeEditor.format('italic', !currentFormat.italic);
    };
    QuillService.prototype.linkClick = function () {
        var value = prompt('Enter link URL');
        this.activeEditor.format('link', value);
    };
    QuillService.prototype.blockquoteClick = function () {
        var currentFormat = this.activeEditor.getFormat();
        this.activeEditor.format('blockquote', !currentFormat.blockquote);
    };
    // header1Click() {
    //   const currentFormat = this.activeEditor.getFormat()
    //   this.activeEditor.format('header', currentFormat.header ? undefined : 1);
    // }
    // header2Click() {
    //   const currentFormat = this.activeEditor.getFormat()
    //   this.activeEditor.format('header', currentFormat.header ? undefined : 2);
    // }
    // dividerClick() {
    //   let range = this.activeEditor.getSelection(true)
    //   this.activeEditor.insertText(range.index, '\n', Quill.sources.USER)
    //   this.activeEditor.insertEmbed(range.index + 1, 'divider', true, Quill.sources.USER)
    //   this.activeEditor.setSelection(range.index + 2, Quill.sources.SILENT)
    // }
    QuillService.prototype.imageClick = function () {
        var imageButtonInput = $$(".image-button-input");
        imageButtonInput.click();
    };
    //TODO: move to service
    QuillService.prototype.imageSelected = function (fileElement) {
        return __awaiter(this, void 0, void 0, function () {
            var imageCid, range;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.uploadService.uploadFile(fileElement)];
                    case 1:
                        imageCid = _a.sent();
                        range = this.activeEditor.getSelection(true);
                        this.activeEditor.insertText(range.index, '\n', Quill.sources.USER);
                        this.activeEditor.insertEmbed(range.index, 'ipfsimage', { ipfsCid: imageCid }, Quill.sources.USER);
                        this.activeEditor.setSelection(range.index + 2, Quill.sources.SILENT);
                        return [2 /*return*/];
                }
            });
        });
    };
    return QuillService;
}());
exports.QuillService = QuillService;
