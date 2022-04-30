import React from "react";

import '../styles/PageShadow.css';

// Use to prevent user from interacting with other components
const PageShadow = ({ hideSomething }) => {
    return (
        <div className="pageShadow" onClick={ hideSomething } onContextMenu={ hideSomething }>
        </div>
    );
}

export default React.memo(PageShadow);