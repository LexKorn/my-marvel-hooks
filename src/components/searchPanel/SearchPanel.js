import './searchPanel.sass';

const searchPanel = () => {

    return (
        <div className='search'>
            <div className="search__title">Or find a character by name:</div>
            <div className="search__panel">
                <input type="text" placeholder='Enter name' />
                <button className='button button__main'>
                    <div className="inner">Find</div>
                </button>
            </div>
            <div className="search__answer">
                <div className="search__answer-text">This field is required</div>
                <a href='#' className="button button__secondary">
                    <div className="inner">To page</div>
                </a>
            </div>
        </div>
    )
}

export default searchPanel;