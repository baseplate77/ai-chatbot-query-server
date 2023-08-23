import express, { Request, Response } from "express";
import path from "path";
import fs from "fs";
import { renderFile } from "template-file";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

const chatRouter = express.Router();

chatRouter.get("/chat/:id.js", async (req: Request, res: Response) => {
  const id = req.params.id as any;

  if (id === undefined || id === "") res.status(500).send("not a vaild url");

  const docRef = doc(db, `/chatbots/${id}`);
  let data: any;
  try {
    data = (await getDoc(docRef)).data();
    if (data === undefined) throw "invalid chat id was passed";
    console.log("data :", data);
  } catch (error) {
    console.log("error in chat due to :", error);
    res.status(500).send(`error in chat due to : ${error}`);
  }

  let filePath = path.join(__dirname, "..", "utils", "iframeScript.js");

  const dataTemplate = {
    chatbotId: id,
    welcomeMsg: data.botConfig.welcomeMsg,
    botIcon: data.botConfig.botIcon,
    primaryColor: data.botConfig.primaryColor,
    showToolTip: data.botConfig.showToolTip,
    brightness: data.botConfig.primaryColor.includes("ffffff")
      ? "brightness(0)"
      : "brightness(1)",
  };
  let s = await renderFile(filePath, dataTemplate);

  res.set("Content-Type", "application/javascript"); // Set the response content type as JavaScript
  res.send(s);
});

export default chatRouter;
