import { z } from "zod";
import axios from "axios";

export const imageUrlSchema = z.string().refine(
  async (url) => {
    const urlRegex = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
    if (!urlRegex.test(url)) {
      return false;
    }

    try {
      const response = await axios.head(url);
      // Check if the status code is in the 2xx range (success)
      if (
        !response ||
        !response.status ||
        response.status < 200 ||
        response.status >= 300
      ) {
        throw new Error("Failed to fetch image");
      }

      // Check the Content-Type header
      const contentType = response.headers["content-type"];
      return contentType && contentType.startsWith("image/");
    } catch (error) {
      // An error occurred, consider the URL as invalid
      return false;
    }
  },
  { message: "Invalid image URL" }
);

export type imageUrlType = z.infer<typeof imageUrlSchema>;
