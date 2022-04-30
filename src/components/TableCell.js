import React from "react";
import ContextMenu from "./ContextMenu";
import EditPanel from "./EditPanel";

import { queryEditable, queryPostData, queryStopEdit } from "../util/queries";
import DragBtn from "./DragBtn";

class TableCell extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            question: "",
            answer: "",
            showMenu: false,
            showEdit: false,
            pos: {
                top: 0,
                left: 0
            }
        };
    }

    componentDidMount() {
        this.getData();
    }

    // Read content of this cell
    getData = () => {
        queryPostData(this.props.singleId).then((data) => {
            this.setState({
                title: data.title,
                question: data.question,
                answer: data.answer
            });
        })
    }

    // For row/col operation
    handleRightClick = (e) => {
        e.preventDefault();
        this.setState({
            pos: {
                top: e.clientY,
                left: e.clientX
            },
            showMenu: true,
            showResize: false
        })
    }

    hideContext = (e) => {
        e.preventDefault();
        this.setState({ showMenu: false });
    }

    startEdit = async () => {
        // Can't start if someone is using it
        const editable = await queryEditable(this.props.singleId);
        if(editable) this.setState({ showEdit: true });
        else alert('Someone is editing the page')
    }

    hideEdit = () => {
        // Tell the server that the editing finished
        queryStopEdit(this.props.singleId).then(
            () =>this.setState({ showEdit: false })
        );
    }

    handleResize = (x, y) => {
        this.props.updateStyle(this.props.indexes.row, this.props.indexes.col, x, y)
    }

    updateSelf = () => {
        this.getData();
    }

    // Show resize button only when user tends to do it
    handleMouseMoveIn = () => {
        this.setState({ showResize: true });
    }

    handleMouseMoveOut = () => {
        this.setState({ showResize: false });
    }

    render() {
        return (
            <div className='cellWrapper' onMouseEnter={this.handleMouseMoveIn} onMouseLeave={this.handleMouseMoveOut}>
                <div className="tc" style={ this.props.cellStyle } onContextMenu={ this.handleRightClick } onDoubleClick={ this.startEdit }>
                    <div className="title">{ this.state.title }</div>
                    <div className="content">
                        <div className='question'>
                            <span className='header'>Question</span>
                            { this.state.question }
                        </div>
                        <div className='answer'>
                            <span className='header'>Answer</span>
                            { this.state.answer }
                        </div>
                    </div>
                    <div className="editIcon" onClick={ this.startEdit }>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                        </svg>
                    </div>
                </div>
                {
                    this.state.showResize &&
                    <DragBtn singleId={ this.props.singleId } handelResize={ this.handleResize }/>
                }

                {
                    this.state.showMenu &&
                    <ContextMenu hideContext={ this.hideContext } pos={ this.state.pos } indexes={ this.props.indexes }/>
                }

                {
                    this.state.showEdit &&
                    <EditPanel hideEdit={ this.hideEdit }
                               content={{ t: this.state.title, q: this.state.question, a: this.state.answer }}
                               singleId={ this.props.singleId } />
                }
            </div>
        );
    }
}

export default TableCell;