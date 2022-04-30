import { serverUrl } from "../config";

const contentsUrl = serverUrl + 'contents';

const apis = {
    queryTableDataApi: contentsUrl,
    queryPostApi: contentsUrl + '/',
    queryEditableApi: contentsUrl + '/editable',
    queryStopEditApi: contentsUrl + '/stopEdit',
    resetSessionApi: contentsUrl + '/reset',
    addRowApi: contentsUrl + '/addRow',
    addColApi: contentsUrl + '/addCol',
    updatePostApi: contentsUrl + '/updatePost'
}

export default apis;