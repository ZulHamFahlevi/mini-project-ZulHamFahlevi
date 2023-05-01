import { uploaderAPI } from "../config/apiService";

export const api = {
  // Image Uploader
  uploader: (body) => {
    return uploaderAPI.post("/div5f4bqt/image/upload", body);
  },
};
