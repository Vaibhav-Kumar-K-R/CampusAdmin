import { Router } from "express";
const adminRouter = Router();
adminRouter.get("/me", (req, res) => {
  res.status(200).send({
    message: "Admin Router",
  });
});
export default adminRouter;
