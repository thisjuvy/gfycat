// types for gfycat json response
export type GfyCat = {
  likes: string;
  avgColor: string;
  title: string;
  gfyName: string;
  userName: string;
  gif100px: string;
};

export type Data = {
  cursor: string;
  gfycats: GfyCat[];
};

export default Data;
