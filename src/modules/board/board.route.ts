import express from "express";

import { authenticate } from "../../middlewares/auth.middleware";
import {
  checkBoardAccess,
  requireBoardPermission,
} from "../../middlewares/board.middleware";

import {
  getBoardByIdController,
  updateBoardController,
  deleteBoardController,
} from "./board.controller";

const boardRouter = express.Router();

boardRouter.get(
  "/:boardId",
  authenticate,
  checkBoardAccess,
  requireBoardPermission("board:view"),
  getBoardByIdController,
);
boardRouter.patch(
  "/:boardId",
  authenticate,
  checkBoardAccess,
  requireBoardPermission("board:update"),
  updateBoardController,
);
boardRouter.delete(
  "/:boardId",
  authenticate,
  checkBoardAccess,
  requireBoardPermission("board:delete"),
  deleteBoardController,
);
export default boardRouter;
