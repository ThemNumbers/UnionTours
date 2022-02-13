import React, {createContext, useContext} from 'react';
import {FavoritesStore} from './Favorites';
import {ToursStore} from './Tours';

let store: RootStore;
const StoreContext = createContext<RootStore | undefined>(undefined);
StoreContext.displayName = 'StoreContext';

export const useStores = () => {
  const context = useContext(StoreContext);
  return context;
};

export class RootStore {
  favoritesStore: FavoritesStore;
  toursStore: ToursStore;

  constructor() {
    this.favoritesStore = new FavoritesStore(this);
    this.toursStore = new ToursStore(this);
  }
}

export const StoresProvider: React.FC = ({children}) => {
  const root = store ?? new RootStore();

  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
};
