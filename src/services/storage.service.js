import Imagekit from "Imagekit";
import dotenv from "dotenv";
dotenv.config();

const storageInstance = new Imagekit({
  urlEndpoint: process.env.IMG_URL_ENDPOINT,
  privateKey: process.env.IMG_PRIVATE_KEY,
  publicKey: process.env.IMG_PUBLIC_KEY,
});

const sendFiles = async (file, fileName) => {
  let obj = {
    file,
    fileName,
    folder: "discord",
  };
  return storageInstance.upload(obj);
};

export default sendFiles;
