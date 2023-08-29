import path from "path";
import fs from "fs";

export const getDataFromFile = (chatbotId: string, currTime: number) => {
  let filePath = path.join("chatbots", `${chatbotId}.json`);

  try {
    let cacheData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    // console.log("cach Data :", cacheData);

    if (cacheData.expriesAt >= currTime) return cacheData["data"];
  } catch (error) {
    console.log("error in getting File");
  }
  return;
};
