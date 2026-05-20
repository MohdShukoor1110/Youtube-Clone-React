import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

export const fetchVideos = async ({pageParam = null, category}) => {
    const url = new URL(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&key=${API_KEY}`);

    if (category) {
        url.searchParams.set("videoCategoryId", category);
    } else {
        url.searchParams.set("videoCategoryId", "0");
    };
    
    if (pageParam) {
        url.searchParams.set("pageToken", pageParam);
    };

    const res = await axios.get(url);

    return res.status === 200 ? res.data : [];
}

export const fetchVideoIdData = async ({videoId}) => {
    const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`);

    return res.status === 200 ? res.data.items[0] : [];
};

export const fetchVideoChannelData = async ({channelId}) => {
    const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API_KEY}`);

    return res.status === 200 ? res.data.items[0] : null;
};

export const fetchVideoCommentData = async ({videoId}) => {
    const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`);

    return res.status === 200 ? res.data.items : [];
};