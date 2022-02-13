import {observable, makeObservable, action, configure} from 'mobx';
import {RootStore} from '.';
import {callApi} from '../../services/ApiService';
import {TourItem} from '../interfaces/Tours';

class ToursStore {
  private root: RootStore;
  public tourList: Array<TourItem> = [];

  constructor(root: RootStore) {
    this.root = root;
    makeObservable(this, {
      tourList: observable,
      getToursList: action,
    });
    configure({
      enforceActions: 'never',
    });
  }

  public getToursList = () => {
    callApi({endpoint: '/tours'}).then(res => {
      this.tourList = res.data;
    });
  };
}

export {ToursStore};
