import { useState } from "react";

import RCA_FACTS from "./pages/RCA_FACTS";
import RCA from "./pages/RCA";
import EDA from "./pages/EDA";
import Summary from "./pages/Summary";
import './styles/App.css';

function App() {
    const [showing, setShowing] = useState(2);

    return (
        <div className="App">
            <nav>
                <div className={showing===0 ? "focus" : ""} onClick={() => setShowing(0)}>RCA-Facts</div>
                <div className={showing===1 ? "focus" : ""} onClick={() => setShowing(1)}>RCA</div>
                <div className={showing===2 ? "focus" : ""} onClick={() => setShowing(2)}>EDA</div>
                <div className={showing===3 ? "focus" : ""} onClick={() => setShowing(3)}>SUMMARY</div>
            </nav>
            {
                showing === 0
                    ? <RCA_FACTS/>
                    : showing === 1
                        ? <RCA/>
                        : showing === 2
                            ? <EDA/>
                            : <Summary/>
            }
        </div>
    );
}

export default App;
