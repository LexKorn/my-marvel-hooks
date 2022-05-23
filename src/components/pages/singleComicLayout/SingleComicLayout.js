import { Link, useHistory } from 'react-router-dom';
import { Helmet } from "react-helmet";

import './singleComicLayout.sass';


const SingleComicPage = ({data}) => {
    const {title, description, pageCount, thumbnail, language, price} = data;
    const history = useHistory();

    const handleClick = () => {
        history.goBack();
    }

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comics book`}
                />        
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className='single-comic__img' />
            <div className="single-comic__info">
                <h2 className='single-comic__name'>{title}</h2>
                <p className='single-comic__descr'>{description}</p>
                <p className='single-comic__descr'>{pageCount}</p>
                <p className='single-comic__descr'>language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <div className="single-comic__back">
                <Link to="/comics" className="single-comic__back">Back to all comics</Link>
                <br/>
                <button className="button button__main" onClick={handleClick} >
                    <div className="inner">Back</div>
                </button>
            </div>           
        </div>
    )
}

export default SingleComicPage;