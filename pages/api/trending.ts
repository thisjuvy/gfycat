// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "../../common";
import Data from "../../types";

export const getTrendingData = async () => {
  const { data } = await axios.get("/reactions/populated", {
    params: {
      tagName: "trending",
    },
  });
  return data;
};

// GET /api/trending
export const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  console.log("trending api called");
  res.status(200).json(await getTrendingData());
};

export default handler;
