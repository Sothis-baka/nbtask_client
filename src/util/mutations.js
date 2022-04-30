import apis from "./api";
import axios from "axios";

const resetSession = async () => {
    const { data } = await axios.post(apis.resetSessionApi);
    if(!data){
        console.log('Failed to reset');
    }
}

const addRow = async (index) => {
    const { data } = await axios.post(apis.addRowApi, { index });
    if(!data){
        console.log('Failed to add row');
    }
}

const addCol = async (index) => {
    const { data } = await axios.post(apis.addColApi, { index });
    if(!data){
        console.log('Failed to add col');
    }
}

const updatePost = async (input) => {
    const { data } = await axios.post(apis.updatePostApi, { input });
    if(!data){
        console.log('Failed to update post');
    }
}

export { resetSession, addRow, addCol, updatePost };