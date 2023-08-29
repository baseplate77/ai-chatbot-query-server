import express, { Request, Response } from "express";
import path from "path";
import { renderFile } from "template-file";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import fs from "fs";
import { getDataFromFile } from "../utils/getdataFromFile";

const chatRouter = express.Router();

chatRouter.post(
  "/invalidate-chatbot-details",
  async (req: Request, res: Response) => {
    const { chatbotId } = req.body;
    console.log("body :", req.body);

    try {
      if (chatbotId === undefined) throw "chatbotId is not define";

      let filePath = path.join("chatbots", `${chatbotId}.json`);
      fs.unlinkSync(filePath);
      res.send("invalidate");
    } catch (error) {
      console.log("unable to remove cache details");
      res.status(500).send(error);
    }
  }
);

chatRouter.get("/chat/:id.js", async (req: Request, res: Response) => {
  const id = req.params.id as any;

  if (id === undefined || id === "") res.status(500).send("not a vaild url");

  let currTime = Date.now();
  let data: any;
  try {
    data = getDataFromFile(id, currTime);

    if (data === undefined) {
      console.log("Uncached");

      const docRef = doc(db, `/chatbots/${id}`);
      data = (await getDoc(docRef)).data();
      // console.log("fetch details :", data);

      let d = { data, expriesAt: currTime + 2 * 60 * 60 * 1000 };
      // console.log("cache datails :", d);

      fs.writeFile(
        path.join("chatbots", `${id}.json`),
        JSON.stringify(d),
        "utf-8",
        (err) => {
          console.log("error in creating a file", err);
        }
      );
    }

    if (data === undefined) throw "invalid chat id was passed";
    // console.log("data :", data);
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
