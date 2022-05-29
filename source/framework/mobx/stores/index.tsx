import React, { createContext, useContext } from 'react'
import { AlertsStore } from './Alerts'
import { FiltersStore } from './Filters'
import { ModalsStore } from './Modals'
import { ProfileStore } from './Profile'
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

export const useProfileStore = () => {
  const { profile } = useStores()
  return profile
}

export const useFiltersStore = () => {
  const { filters } = useStores()
  return filters
}

export const useToursStore = () => {
  const { tours } = useStores()
  return tours
}

export class RootStore {
  alerts: AlertsStore
  modals: ModalsStore
  profile: ProfileStore
  tours: ToursStore
  filters: FiltersStore

  constructor() {
    this.alerts = new AlertsStore(this)
    this.modals = new ModalsStore(this)
    this.profile = new ProfileStore(this)
    this.tours = new ToursStore(this)
    this.filters = new FiltersStore(this)
  }
}

export const StoresProvider: React.FC = ({ children }) => {
  const root = store ?? new RootStore()

  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>
}
