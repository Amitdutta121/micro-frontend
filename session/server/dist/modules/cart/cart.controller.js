"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../auth/jwt-auth.guard");
const products_1 = require("../../products");
const initialCart = (indexes) => ({
    cartItems: indexes.map((index) => (Object.assign(Object.assign({}, products_1.default[index]), { quantity: 1 }))),
});
let CartController = class CartController {
    constructor() {
        this.carts = {
            1: initialCart([0, 2, 4]),
            2: initialCart([1, 3]),
        };
    }
    async index(req) {
        var _a;
        return (_a = this.carts[req.user.userId]) !== null && _a !== void 0 ? _a : { cartItems: [] };
    }
    async create(req, { id }) {
        const cart = this.carts[req.user.userId];
        const cartItem = cart.cartItems.find((cartItem) => cartItem.id === parseInt(id));
        if (cartItem) {
            cartItem.quantity += 1;
        }
        else {
            cart.cartItems.push(Object.assign(Object.assign({}, products_1.default.find((product) => product.id === parseInt(id))), { quantity: 1 }));
        }
        return cart;
    }
    async destroy(req) {
        this.carts[req.user.userId] = { cartItems: [] };
        return this.carts[req.user.userId];
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "index", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CartController.prototype, "destroy", null);
CartController = __decorate([
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [])
], CartController);
exports.CartController = CartController;
//# sourceMappingURL=cart.controller.js.map