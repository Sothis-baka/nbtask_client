import React from "react";
import { useCallback, useState } from "react";

import Popup from "./Popup";
import { resetSession } from "../util/mutations";

const Refresh = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleRefresh = useCallback(() => {
        resetSession().then(() => {
            console.log('reset');
        })
    }, []);

    const handleShow = () => {
        setShowPopup(true);
    }

    const handleHide = () => {
        setShowPopup(false);
    }

    return (
        <>
            <div className="refreshBtn" onClick={ handleShow }>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                    <path
                        d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                </svg>
            </div>

            { showPopup && <Popup content="This operation will clear all data in database!"  confirm={ handleRefresh } cancel={ handleHide }/> }
        </>
    );
}

export default React.memo(Refresh);