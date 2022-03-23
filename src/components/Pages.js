import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Pagination} from "react-bootstrap";

const Pages = observer(() => {
    const {autoStore} = useContext(Context)
    const pagesCount = Math.ceil(autoStore.totalCount / autoStore.limit)

    const pages = []
    for (let i = 0; i < pagesCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination className="mt-5">
            {pages.map(page =>
                <Pagination.Item
                    key={page}
                    active={autoStore.page === page}
                    onClick={() => autoStore.setPage(page)}
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;