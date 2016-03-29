import {async, register} from 'platypus';
import BaseService from '../base/base.svc';

export default class RedditService extends BaseService {
    
    getEntries(): async.IAjaxThenable<Array<any>> {
        return this.http.json<any>({
            method: 'GET',
            url: this.host + '/aww.json'
        }).then((success) => {
            // success is created by PlatypusTS, there is extra information
            // success.response is literally what the remote server responded with
            console.log(success);
            return success.response.data.children;
        }, (err) => {
            console.log(err);
            throw err;
        });
    }

}

register.injectable('reddit-svc', RedditService);
