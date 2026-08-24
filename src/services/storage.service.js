import Imagekit from "imagekit";

const storageInstance = new Imagekit({
  urlendpoint,
  privateKey,
  publicKey,
});

const sendFiles = async (files, fileName) => {
  let obj = {
    file,
    fileName,
    folder: "discord",
  };
  return storageInstance.upload(obj);
};

export default sendFiles;
