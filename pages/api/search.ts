// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "../../common";
import Data from "../../types";

export const getSearchData = async (search_text: string) => {
  const { data } = await axios.get("/gfycats/search", {
    params: {
      search_text,
    },
  });
  return data;
};

// GET /api/search
export const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  console.log("search api called");
  const { search_text } = req.query;
  const data = await getSearchData(search_text as string);
  res.status(200).json(data);
};

export default handler;
