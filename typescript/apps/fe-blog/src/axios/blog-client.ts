import axios from "axios";
import { configs } from "~/utils/config";

export const blogClient = axios.create({
  baseURL: configs.BLOG_API_URL,
});
