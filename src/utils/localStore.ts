interface Data {
    [key: string]: any
  }
  
  export const saveStringToLocalStorage = (key: string, data: string): void => {
    localStorage.setItem(key, data)
  }
  
  export const saveDataToLocalStorage = (key: string, data: Data): void => {
    localStorage.setItem(key, JSON.stringify(data))
  }
  
  export const getStringFromLocalStorage = (key: string): string | null => {
    const storedData = localStorage.getItem(key)
    if (storedData) {
      return storedData
    }
    return null
  }
  
  export const getDataFromLocalStorage = (key: string): Data | null => {
    const storedData = localStorage.getItem(key)
    if (storedData) {
      return JSON.parse(storedData)
    }
    return null
  }
  
  export const clearDataFromLocalStorage = (key: string): void => {
    localStorage.removeItem(key)
  }
  
  export const clearAllDataFromLocalStorage = (): void => {
    localStorage.clear()
  }
  