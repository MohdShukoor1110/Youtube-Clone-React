import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

import { value_converter } from '../../data';
import { fetchVideos } from '../../Api.js'
import './Recommended.css';

const Recommended = ({ category }) => {

    const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError } = useInfiniteQuery({
        queryKey: ['youtube', 'videos', category],
        queryFn: ({ pageParam, queryKey }) => {
            const [, , id] = queryKey;
            return fetchVideos({ pageParam, category: id });
        },
        initialPageParam: null,
        getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
        staleTime: 1000 * 60 * 5,
        onError: (error) => console.log('Error in loading Video Data :',error),
    });

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && hasNextPage && !isError) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage, isError]);

    const videos = data?.pages.flatMap(page => page.items) ?? [];

    return (
        <div className='recommended'>
            {videos?.map((item, index) => {
                return(
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                        <div className="video-info">
                            <h4>{item.snippet.title}</h4>
                            <p>{item.snippet.channelTitle}</p>
                            <p>{value_converter(item.statistics.viewCount)} Views</p>
                        </div>
                    </Link>      
                )
            })}

            <div ref={ref} style={{height:'20px'}}></div>

            {isFetchingNextPage && <p>Loading more...</p>}
        </div>
    )
}

export default Recommended