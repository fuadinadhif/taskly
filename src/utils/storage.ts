import asyncStorage from "@react-native-async-storage/async-storage";

export async function getFromStorage(key: string) {
  try {
    const data = await asyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function saveToStorage(key: string, data: object) {
  try {
    await asyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(error);
  }
}
