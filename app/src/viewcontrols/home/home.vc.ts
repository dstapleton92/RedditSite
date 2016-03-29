import {register} from 'platypus';
import BaseViewControl from '../base/base.vc';
import RedditRepository from '../../repositories/reddit/reddit.repo';
import DetailViewControl from '../detail/detail.vc';

export default class HomeViewControl extends BaseViewControl {
    templateString: string = require('./home.vc.html');

    context = {
        items: <Array<models.IRedditItem>>[],
        detailView: DetailViewControl
    };
    
    constructor(private redditRepo: RedditRepository) {
        super();
    }
    
    navigatedTo(): void {
        this.redditRepo.getEntries().then((success) => {
            this.context.items = success;
        }, (err) => {
            console.log('something went wrong!');
            console.log(err);
        });
    }
    
}

register.viewControl('home-vc', HomeViewControl, [RedditRepository]);
