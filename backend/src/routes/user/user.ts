import express, { Response, Request } from "express";
import { User } from "../../schema";

const router = express.Router();


router.post("/signup", async (req: Request, res: Response) => {

    try {
        const { email, password, pubKey } = req.body;
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ msg: "user already exists" });
        }

        const newUser = await User.create({
            email, password, pubKey
        });

        if (!newUser) {
            return res.status(401).json({ msg: "signup failed" });
        }

        return res.status(200).json({ msg: "created successfully " });
    }
    catch(err) {
        res.status(404).json({ msg: "somthing went wrong"})
    }
});

router.post("/signin", async (req: Request, res: Response) => {

});