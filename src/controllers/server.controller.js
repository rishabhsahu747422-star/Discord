import serverModel from "../models/server.model.js";
import userModel from "../models/user.model.js";
import sendFiles from "../services/storage.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { generateInviteCode } from "../utils/inviteCode.js";

export const createServer = async (req, res) => {
  try {
    const { name, email, description, isPublic } = req.body;
    if (!name) {
      throw new ApiError(400, "Name required for server creation");
    }

    const icon = req.files.icon;
    const banner = req.files.banner;

    let uploadIcon = null;
    if (icon) {
      uploadIcon = await sendFiles(icon[0].buffer, icon[0].originalname);
    }

    let uploadBanner = null;
    if (banner) {
      uploadBanner = await sendFiles(banner[0].buffer, banner[0].originalname);
    }

    const inviteCode = generateInviteCode();

    const server = await serverModel.create({
      name,
      description,
      email,
      icon: uploadIcon?.url || "",
      banner: uploadBanner?.url || "",
      isPublic,
      inviteCode,
    });

    return res
      .status(201)
      .json(new ApiResponse(201, server, "Server created Succesfully"));
  } catch (error) {
    console.log(error.message);
    return res.status(500).json(new ApiError(500, "Internal server error"));
  }
};

export const joinServer = async (req, res) => {
  try {
    const { inviteCode } = req.params;

    const server = await serverModel.findOne({ inviteCode });

    if (!inviteCode) {
      throw new ApiError(404, "Invalid Invite Code");
    }

    const user = await userModel.findById(req.user.id);

    const alreadyExists = user.server.some((serverId) => {
      user.server.serverId.toString() === server._id.toString();
    });

    if (!alreadyExists) {
      throw new ApiError(400, "Already Member");
    }

    user.server.push(server._id);
    await user.save();
    return res
      .status(200)
      .json(new ApiResponse(200, server, "server join successfully"));
  } catch (error) {
    console.log(error.message);
  }
};
