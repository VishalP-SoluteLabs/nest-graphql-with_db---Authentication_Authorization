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
exports.AppResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("./user/entity/user.entity");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("./auth/auth.guard");
const jwt = require("jsonwebtoken");
const jwt_guard_1 = require("./auth/jwt.guard");
const role_guard_1 = require("./auth/role.guard");
let AppResolver = class AppResolver {
    index() {
        return 'NestJs GraphQL Server';
    }
    securedAdminResource(user) {
        return 'This is a secured data for Admin!' + user.email;
    }
    securedNormalUserResource(user) {
        return 'This is a secured data for Normal User!' + user.email;
    }
    login(email, password, user) {
        let payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        };
        return jwt.sign(payload, 'secretkey', { expiresIn: '1h' });
    }
};
__decorate([
    (0, graphql_1.Query)(returns => String),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", String)
], AppResolver.prototype, "index", null);
__decorate([
    (0, graphql_1.Query)(returns => String),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, new role_guard_1.RoleGuard(role_guard_1.Roles.admin)),
    __param(0, (0, graphql_1.Context)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], AppResolver.prototype, "securedAdminResource", null);
__decorate([
    (0, graphql_1.Query)(returns => String),
    (0, common_1.UseGuards)(jwt_guard_1.JwtGuard, new role_guard_1.RoleGuard(role_guard_1.Roles.normal_user)),
    __param(0, (0, graphql_1.Context)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", String)
], AppResolver.prototype, "securedNormalUserResource", null);
__decorate([
    (0, graphql_1.Query)(returns => String),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __param(0, (0, graphql_1.Args)({ name: 'email', type: () => String })),
    __param(1, (0, graphql_1.Args)({ name: 'password', type: () => String })),
    __param(2, (0, graphql_1.Context)('user')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, user_entity_1.UserEntity]),
    __metadata("design:returntype", void 0)
], AppResolver.prototype, "login", null);
AppResolver = __decorate([
    (0, graphql_1.Resolver)(of => String)
], AppResolver);
exports.AppResolver = AppResolver;
//# sourceMappingURL=app.resolver.js.map