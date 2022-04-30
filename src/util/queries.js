import axios from "axios";
import apis from './api';

const queryTableData = () => {
    return new Promise((resolve) => {
        axios.get(apis.queryTableDataApi)
            .then(data => resolve(data.data))
            .catch(e => console.log(e))
    })
}

const queryPostData = (id) => {
    return new Promise((resolve) => {
        axios.get(apis.queryPostApi + id)
            .then(data => resolve(data.data))
            .catch(e => console.log(e))
    })
}

const queryEditable = (id) => {
    return new Promise((resolve) => {
        axios.get(apis.queryEditableApi + id)
            .then(data => resolve(data.data))
            .catch(e => console.log(e))
    })
}

const queryStopEdit = (id) => {
    return new Promise((resolve) => {
        axios.get(apis.queryStopEditApi + id)
            .then(data => resolve(data.data))
            .catch(e => console.log(e))
    })
}

export { queryTableData, queryPostData, queryEditable, queryStopEdit };