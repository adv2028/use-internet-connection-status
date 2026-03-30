import { useEffect, useState } from 'react'

export default function useInternetConnectionStatus() {
  const [online, setOnline] = useState(navigator.onLine)

  const handleOnlineStatus = async () => setOnline(navigator.onLine)

  useEffect(() => {
    globalThis.addEventListener('online', handleOnlineStatus)
    globalThis.addEventListener('offline', handleOnlineStatus)

    return () => {
      globalThis.removeEventListener('online', handleOnlineStatus)
      globalThis.removeEventListener('offline', handleOnlineStatus)
    }
  }, [])

  return { online }
}
