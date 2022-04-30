import React from "react";

import PageShadow from "./PageShadow";
import '../styles/Popup.css';

// User needs to confirm for important operations
const Popup = ({ content, confirm, cancel }) => {
    return (
        <>
            <PageShadow hideSomething={ cancel }/>
            <div className="popup">
                <div className="content">{ content }</div>
                <div className='BtnGroup'>
                    <button onClick={ () => { confirm(); cancel(); } }>Confirm</button>
                    <button onClick={ cancel }>Cancel</button>
                </div>
            </div>
        </>
    );
}

export default React.memo(Popup);