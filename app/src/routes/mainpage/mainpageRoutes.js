import express from "express";
import ctrl from "./mainpageCtrl.js";

const router = express.Router();

router.get("/", ctrl.process.getUser);
router.get("/:pageNo", ctrl.process.getPagesAndLoveCountAndCommentCount);
