import sendFiles from "../services/storage.service";

const register = () => {
  const { username, email, password, dob, fullname, mobile_no } = req.body;

  const file = req.file;

  if (!username || !email || !password)
    return res.status(400).json({
      success: false,
      message: "All fields are Required",
    });

  let uploadImage;

  if (file) {
    uploadImage = sendFiles(file.buffer, file.originalName);
  }
};
