import {observable, makeObservable, action, configure} from 'mobx';
import {RootStore} from '.';
import {getItem, setItem, StorageKeys} from '../../services/StorageService';
import {FavoriteItem} from '../interfaces/Favorites';

class FavoritesStore {
  private root: RootStore;
  public favoritesList: Array<FavoriteItem> = [];

  constructor(root: RootStore) {
    this.root = root;
    makeObservable(this, {
      favoritesList: observable,
      addToFavoriteList: action,
      removeFromFavoriteListById: action,
    });
    configure({
      enforceActions: 'never',
    });
    this.getFavoriteList();
  }

  public addToFavoriteList = (item: FavoriteItem) => {
    this.favoritesList = [...this.favoritesList, item];
    this.saveFavoriteList();
  };

  public removeFromFavoriteListById = (id: number) => {
    this.favoritesList = this.favoritesList.filter(f => f.id !== id);
    this.saveFavoriteList();
  };

  private saveFavoriteList = () => {
    setItem(StorageKeys.FAVORITES, this.favoritesList);
  };

  private getFavoriteList = () => {
    getItem<FavoriteItem[]>(StorageKeys.FAVORITES)
      .then(nextFavorites => {
        if (nextFavorites) {
          this.favoritesList = nextFavorites;
        } else {
          this.favoritesList = [];
          // mark as empty in pending
        }
      })
      .catch(() => {
        this.favoritesList = [];
        // mark as error in pending
      });
  };
}

export {FavoritesStore};
