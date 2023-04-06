import axios from 'axios';

const JIKAN_API_URL = 'https://api.jikan.moe/v4';

// call external anime API and receive a list of anime media data
export const topAnimes = async (mediatype: string, page: number) => {
  try {
    const requrl = `${JIKAN_API_URL}/top/anime`;
    const media = await axios.get(requrl, {
      params: {
        type: mediatype,
        page: page.toString(),
      },
    }).then((resp) => resp.data);
    return media;
  } catch (error) {
    console.log(error);
    return error;
  }
};
