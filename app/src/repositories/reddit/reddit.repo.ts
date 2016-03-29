import {async, register} from 'platypus';
import BaseRepository from '../base/base.repo';
import RedditService from '../../services/reddit/reddit.svc';

export default class RedditRepository extends BaseRepository {

    constructor(private redditSvc: RedditService) {
        super();
    }
    
    getEntries(): async.IThenable<Array<models.IRedditItem>> {
        return this.redditSvc.getEntries().then((success) => {
            let entries: Array<models.IRedditItem> = [];
            for (let i = 0; i < success.length; i++) {
                let currentItem = success[i];
                let item: models.IRedditItem = {
                    id: currentItem.data.id,
                    title: currentItem.data.title,
                    author: currentItem.data.author,
                    url: currentItem.data.url,
                    num_comments: currentItem.data.num_comments,
                    thumbnail: currentItem.data.thumbnail
                };
                entries.push(item);
            }
            return entries;
        });
    }
    
    getEntry(id: string): async.IThenable<models.IRedditItem> {
        return this.getEntries().then((success) => {
            for (let i = 0; i < success.length; i++) {
                let current = success[i];
                if (current.id === id) {
                    return current;
                }
            }
            return null;
        });
    }
}

register.injectable('reddit-repo', RedditRepository, [RedditService]);
