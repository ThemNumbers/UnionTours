import AsyncStorage from '@react-native-async-storage/async-storage';

enum StorageKeys {
  FAVORITES = 'FAVORITES',
}

async function setItem<T>(key: StorageKeys, value: T): Promise<void> {
  const val = await AsyncStorage.setItem(key, JSON.stringify(value));
  return val;
}

async function getItem<T>(key: StorageKeys): Promise<T | undefined> {
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : undefined;
}

async function clear(): Promise<void> {
  await AsyncStorage.clear();
}

export {clear, StorageKeys, getItem, setItem};
