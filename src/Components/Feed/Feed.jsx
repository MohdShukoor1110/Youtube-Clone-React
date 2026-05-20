import { useEffect } from 'react';
import moment from 'moment'
import { Link } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchVideos } from '../../Api.js'
import { useInView } from 'react-intersection-observer'

import { value_converter } from '../../data.js'
import './Feed.css';

const Feed = ({ category }) => {

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['youtube', 'videos', category],
        queryFn: ({ pageParam }) => fetchVideos({ pageParam, category }),
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
        staleTime: 1000 * 60 * 5
    });

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage]);

    const videos = data?.pages.flatMap(page => page.items) ?? [];

    return (
        <div className="feed">
            {videos.map((item, index)=>{
                return(
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className='card' key={item.id}>
                        <img src={item.snippet.thumbnails.medium.url} alt="thumbnail-1" />
                        <h2>{item.snippet.title}</h2>
                        <h3>{item.snippet.channelTitle}</h3>
                        <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                    </Link>
                )
            })}

            <div ref={ref} style={{height:'20px'}}></div>

            {isFetchingNextPage && <p style={{width:'100%',height:'100px'}}>Loading more...</p>}
        </div>
    );
};

export default Feed;