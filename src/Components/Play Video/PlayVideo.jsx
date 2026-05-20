import moment from 'moment'
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query'

import { value_converter } from '../../data'
import { fetchVideoChannelData, fetchVideoIdData, fetchVideoCommentData } from '../../Api.js'
import Like from '../../assets/like.png';
import DisLike from '../../assets/dislike.png';
import Share from '../../assets/share.png';
import Save from '../../assets/save.png';
import './PlayVideo.css';

const PlayVideo = () => {

    const { videoId } = useParams();

    // Video data
    const { data: videoDetails, isLoading: videoIsLoading, isError: videoIsError } = useQuery({
        queryKey: ["youtube", "videos", videoId],
        queryFn: ({ queryKey }) => {
            const [, , id] = queryKey;
            return fetchVideoIdData({ videoId: id });
        },
        enabled: !!videoId,
        staleTime: 1000 * 60 * 5,
        onError: (error) => console.log('Error in loading Video Data :',error),
    });

    const apiData = videoDetails;
    const channelId = apiData?.snippet?.channelId;

    // Channel data
    const { data: channelDetails, isLoading: channelIsLoading, isError: channelIsError } = useQuery({
        queryKey: ["youtube", "channels", channelId],
        queryFn: ({ queryKey }) => {
            const [, , id] = queryKey;
            return fetchVideoChannelData({channelId : id});
        },
        enabled: !!channelId,
        staleTime: 1000 * 60,
        enabled: !!channelId,
        onError: (error) => console.log('Error in loading Channel Data :',error),
    });

    const channelData = channelDetails;

    // Comment data
    const { data: commentDetails, isLoading: commentIsLoading, isError: commentIsError } = useQuery({
        queryKey: ["youtube", "comments", videoId],
        queryFn: ({ queryKey }) => {
            const [, , id] = queryKey;
            return fetchVideoCommentData({videoId: id});
        },
        enabled: !!videoId,
        staleTime: 1000 * 60,
        onError: (error) => console.log('Error in loading Comments Data :',error),
    });

    const commentData = commentDetails || [];

    if (videoIsLoading || channelIsLoading || commentIsLoading) {
        return <h1>Loading...</h1>;
    }

    if (videoIsError || channelIsError || commentIsError) {
        return <h1>Error in loading Data</h1>;
    }

    return (
        <div className='play-video'>
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>

            {apiData && <h3>{ apiData.snippet.title }</h3>}

            <div className="play-video-info">
                {apiData && <p>{value_converter(apiData.statistics.viewCount)} views &bull; {moment(apiData.snippet.publishedAt).fromNow()}</p>}
                <div>
                    {apiData && <span><img src={ Like } alt="" /> {value_converter(apiData.statistics.likeCount)}</span>}
                    <span><img src={ DisLike } alt="" /> </span>
                    <span><img src={ Share } alt="" /> Share</span>
                    <span><img src={ Save } alt="" /> Save</span>
                </div>
            </div>

            <hr />

            <div className="publisher">
                {channelData && <img src={channelData.snippet.thumbnails.default.url} alt="" />}
                <div>
                    {apiData && <p>{apiData.snippet.channelTitle}</p>}
                    {channelData && <span>{value_converter(channelData.statistics.subscriberCount)} Subscribers</span>}
                </div>
                <button>Subscribe</button>
            </div>

            <div className="video-description">
                {apiData && <p>{apiData.snippet.description.slice(0, 200) + "....."}</p>}

                <hr />

                {apiData && <h4>{value_converter(apiData.statistics.commentCount)} Comments</h4>}

                {commentData?.map((item, index)=>{
                    return (
                        <div key={index} className="comment">
                            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                            <div>
                                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span></h3>
                                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                                <div className="comment-action">
                                    <img src={Like} alt="" />
                                    <span>{value_converter(item.snippet.topLevelComment.snippet.likeCount)}</span>
                                    <img src={DisLike} alt="" />
                                    <span>2</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default PlayVideo