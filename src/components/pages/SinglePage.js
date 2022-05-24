import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';
import AppBaner from "../appBaner/AppBaner";


const SinglePage = ({Component, dataType}) => {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const { getCharacter, getComic, clearError, process, setProcess } = useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const updateData = () => {        
        clearError();

        switch (dataType) {
            case 'character' :
                getCharacter(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
                break;
            case 'comic' :
                getComic(id)
                    .then(onDataLoaded)
                    .then(() => setProcess('confirmed'));
                break;
        }
        
    }

    const onDataLoaded = (data) => {
        setData(data);
    }


    return (
        <>
            <AppBaner />
            { setContent(process, Component, data) }
        </>
    )
}

export default SinglePage;