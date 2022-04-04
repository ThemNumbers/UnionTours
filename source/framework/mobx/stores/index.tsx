import React, { createContext, useContext } from 'react'
import { AlertsStore } from './Alerts'
import { FavoritesStore } from './Favorites'
import { ModalsStore } from './Modals'
import { ToursStore } from './Tours'

let store: RootStore
const StoreContext = createContext<RootStore | undefined>(undefined)
StoreContext.displayName = 'StoreContext'

export const useStores = () => {
  const context = useContext(StoreContext)

  if (context === undefined) {
    throw new Error('useStores must be used within RootStoreProvider')
  }

  return context
}

export const useAlertsStore = () => {
  const { alerts } = useStores()
  return alerts
}

export const useModalsStore = () => {
  const { modals } = useStores()
  return modals
}

export const useFavoritesStore = () => {
  const { favorites } = useStores()
  return favorites
}

export const useToursStore = () => {
  const { tours } = useStores()
  return tours
}

export class RootStore {
  alerts: AlertsStore
  modals: ModalsStore
  favorites: FavoritesStore
  tours: ToursStore

  constructor() {
    this.alerts = new AlertsStore(this)
    this.modals = new ModalsStore(this)
    this.favorites = new FavoritesStore(this)
    this.tours = new ToursStore(this)
  }
}

export const StoresProvider: React.FC = ({ children }) => {
  const root = store ?? new RootStore()

  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>
}
