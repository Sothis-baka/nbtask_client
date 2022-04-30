import React, { createRef } from "react";
import { io } from 'socket.io-client';

import TableCell from "./TableCell";
import Refresh from "./Refresh";
import { queryTableData } from "../util/queries";
import { wsUrl } from "../config";
import "../styles/MyTable.css";

class MyTable extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            session: null,
            style: null
        }
    }

    componentDidMount() {
        this.loadData();
        this.initSocket();
    }

    // Reload the whole page because the whole structure is changed
    loadData = () => {
        queryTableData().then(data => {
            this.setState({
                session: data,
                style: {
                    height: data.ids.map(row => 240),
                    width: data.ids[0].map(col => 240),
                }
            })
        });

        // Using refs as a map
        this.childrenRefs = createRef();
        this.childrenRefs.current = {};
    }

    // Websocket for update
    initSocket = () => {
        const socket = io(wsUrl, { reconnectionDelayMax: 10000 });

        socket.on('updateCell', (singleId) => {
            this.updateCell(singleId);
        });
        socket.on('updateData', () => {
            this.loadData();
        });
        // Automatically reconnect
        socket.on("disconnect", () => {
            socket.connect();
        });

        this.socket = socket;
        socket.connect();
    }

    // Not using anymore
    componentWillUnmount() {
        this.socket.close();
    }

    // Hook to update a single cell when receiving update notification
    updateCell = (id) => {
        this.childrenRefs.current[id]?.updateSelf();
    }

    // Resize event
    updateStyle = (rowI, colI, x, y) => {
        const style = { ...this.state.style };
        style.height[rowI] += y;
        style.width[colI] += x;
        this.setState({ style });
    }

    render() {
        return(
            <div className="table">
                {
                    this.state.session &&
                    this.state.session.ids.map(
                        (r, rIndex) =>
                            <div className="tr" key={ rIndex }>
                                {
                                    r.map((singleId, cIndex) => {
                                        const cellStyle = { height: this.state.style.height[rIndex], width: this.state.style.width[cIndex] };
                                        return <TableCell ref={ node => this.childrenRefs.current[singleId] = node } key={ singleId }
                                                          singleId={ singleId } cellStyle={ cellStyle } indexes={{row: rIndex, col: cIndex}}
                                                          updateStyle={ this.updateStyle }/>
                                    })
                                }
                            </div>
                    )
                }
                <Refresh/>
            </div>
        );
    }
}

export default MyTable;