import express from "express"
import { updateRoleTOEducator } from "../controller/educatorController.js";

const educatorRouter = express.Router();

educatorRouter.get('/update-role', updateRoleTOEducator);

export default educatorRouter ;