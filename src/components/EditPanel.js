import React, { useCallback, useState } from "react";
import { debounce } from "lodash";

import PageShadow from "./PageShadow";
import Popup from "./Popup";
import sleep from "../util/sleep";
import { updatePost } from "../util/mutations";

const EditPanel = ({ content: {t, q, a}, singleId, hideEdit }) => {
    const [question, setQuestion] = useState(q);
    const [answer, setAnswer] = useState(a);

    const [showPopup, setShowPopup] = useState(false);

    const handleShow = () =>  setShowPopup(true);

    const handleHide = () =>  setShowPopup(false);

    const handleCancel = useCallback(() => {
        hideEdit();
    }, [hideEdit]);

    // Prevent frequently incur
    const debouncedSetQ = debounce(setQuestion, 200);
    const debouncedSetA = debounce(setAnswer, 200);

    const handleChange = useCallback((e) => {
        if(e.target.name === 'question'){
            debouncedSetQ(e.target.value)
        }else{
            debouncedSetA(e.target.value)
        }
    }, []);

    // Wait for latest update
    const handleSubmit = async () => {
        await sleep(360);
        await updatePost({
            postId: singleId,
            question: question,
            answer: answer
        });
        handleCancel();
    }

    return (
        <>
            <PageShadow hideSomething={ handleCancel }/>
            <div className="editPanel">
                <div className="title">
                    { t }
                </div>
                <div>
                    <div className="header">Question</div>
                    <textarea name="question" defaultValue={ question } onChange={ handleChange }/>
                </div>
                <div>
                    <div className="header">Answer</div>
                    <textarea name="answer" defaultValue={ answer } onChange={ handleChange }/>
                </div>
                <div className="btnGroup">
                    <button onClick={ handleSubmit }>submit</button>
                    <button onClick={ handleShow }>cancel</button>
                </div>
            </div>
            { showPopup && <Popup content="Do you want to discard all changes?" confirm={ handleCancel } cancel={ handleHide }/> }
        </>

    );
}

export default React.memo(EditPanel);