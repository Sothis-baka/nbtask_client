import React from "react";

import PageShadow from "./PageShadow";
import { addRow, addCol } from "../util/mutations";

const ContextMenu = ({ hideContext, pos, indexes }) => {
    return (
        <>
            <PageShadow hideSomething={ hideContext }/>
            <div className="contextMenuInner" style={ pos }>
                <div onClick={() => addRow(indexes.row + 1)}>Add row</div>
                <div onClick={() => addCol(indexes.col + 1)}>Add col</div>
            </div>
        </>
    );
}

export default React.memo(ContextMenu);