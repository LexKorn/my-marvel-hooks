import { Helmet } from "react-helmet";

import AppBaner from "../appBaner/AppBaner";
import ComicsList from "../comicsList/ComicsList";


const ComicsPage = () => {
    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Page with list of our comics"
                />        
                <title>Comics page</title>
            </Helmet>
            <AppBaner />
            <ComicsList />
        </>
    )
}

export default ComicsPage;