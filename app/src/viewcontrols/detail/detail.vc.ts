import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import RedditRepository from '../../repositories/reddit/reddit.repo';

export default class DetailViewControl extends BaseViewControl {
    templateString: string = require('./detail.vc.html');

    context = {
        item: <models.IRedditItem>{}
    };
    
    constructor(private redditRepo: RedditRepository) {
        super();
    }
    
    navigatedTo(parameters: { redditId: string; }): void {
        console.log('navigated to!');
        console.log(parameters.redditId);
        let id = parameters.redditId;
        this.redditRepo.getEntry(id).then((success) => {
            this.context.item = success;
        }, (err) => {
            console.log('something went wrong!');
            console.log(err);
        });
    }
}

register.viewControl('detail-vc', DetailViewControl, [RedditRepository]);
