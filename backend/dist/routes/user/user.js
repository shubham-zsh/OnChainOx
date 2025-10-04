"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const schema_1 = require("../../schema");
const console_1 = require("console");
exports.router = express_1.default.Router();
exports.router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, pubKey } = req.body;
        const userExists = yield schema_1.User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ msg: "user already exists" });
        }
        const newUser = yield schema_1.User.create({
            email, password, pubKey
        });
        if (!newUser) {
            return res.status(401).json({ msg: "signup failed" });
        }
        return res.status(200).json({ msg: "created successfully " });
    }
    catch (err) {
        (0, console_1.log)("error : ", err);
        res.status(404).json({ msg: "somthing went wrong" });
    }
}));
exports.router.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const userExists = yield schema_1.User.findOne({ email });
        if (!userExists) {
            return res.status(400).json({ msg: "user not found, please register" });
        }
        ;
        const matchPass = schema_1.User.find({ password });
        if (!matchPass) {
            return res.status(402).json({ msg: "password is wrong" });
        }
        return res.status(200).json({ msg: "login successfully " });
    }
    catch (err) {
        res.status(404).json({ msg: "somthing went wrong" });
    }
}));
