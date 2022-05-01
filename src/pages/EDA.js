import React, {useState} from "react";
import EDA_SCT from "./EDA_SCT";
import EDA_ET from "./EDA_ET";
import EDA_ST from "./EDA_ST";

const EDA = () => {
    const [showing, setShowing] = useState(0);

    return (
        <div>
            <nav>
                <div className={showing===0 ? "focus" : ""} onClick={() => setShowing(0)}>SCT</div>
                <div className={showing===1 ? "focus" : ""} onClick={() => setShowing(1)}>ET</div>
                <div className={showing===2 ? "focus" : ""} onClick={() => setShowing(2)}>ST</div>
            </nav>
            {
                showing === 0
                    ? <EDA_SCT/>
                    : showing === 1
                        ? <EDA_ET/>
                        : <EDA_ST/>
            }
        </div>
    );
}

export default React.memo(EDA);