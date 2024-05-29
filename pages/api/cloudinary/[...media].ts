import {
  mediaHandlerConfig,
  createMediaHandler,
} from "next-tinacms-cloudinary/dist/handlers"

import { isAuthorized } from "@tinacms/auth"
import { NextApiRequest, NextApiResponse } from "next"

export const config = mediaHandlerConfig

export default createMediaHandler({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
  authorized: async (
    req: NextApiRequest,
    _res: NextApiResponse,
  ): Promise<boolean> => {
    try {
      if (process.env.NODE_ENV == "development") {
        return true
      }

      const user = await isAuthorized(req)

      return (user && user.verified) ?? false
    } catch (e) {
      console.error(e)
      return false
    }
  },
})
