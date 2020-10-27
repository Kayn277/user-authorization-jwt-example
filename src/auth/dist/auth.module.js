"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var user_module_1 = require("src/user/user.module");
var auth_service_1 = require("./auth.service");
var auth_controller_1 = require("./auth.controller");
var local_strategy_1 = require("./strategy/local.strategy");
var passport_1 = require("@nestjs/passport");
var jwt_1 = require("@nestjs/jwt");
var config_1 = require("@nestjs/config");
var jwt_strategy_1 = require("./strategy/jwt.strategy");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        common_1.Module({
            imports: [
                user_module_1.UserModule,
                config_1.ConfigModule,
                passport_1.PassportModule,
                jwt_1.JwtModule.registerAsync({
                    imports: [config_1.ConfigModule],
                    useFactory: function (config) { return ({
                        secret: config.get("JWT_SECRET_KEY"),
                        signOptions: { expiresIn: config.get("JWT_EXPRIES_IN") }
                    }); },
                    inject: [config_1.ConfigService]
                })
            ],
            controllers: [auth_controller_1.AuthController],
            providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JWTStrategy]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
