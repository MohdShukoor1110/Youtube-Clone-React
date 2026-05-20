import { useParams } from 'react-router-dom';
import PlayVideo from '../../Components/Play Video/PlayVideo';
import Recommended from '../../Components/Recommended/Recommended';
import './Video.css';

const Video = () => {

    const { categoryId } = useParams();

    return (
        <div className='play-container'>
            < PlayVideo />
            < Recommended category={categoryId}  />
        </div>
    );
};

export default Video;