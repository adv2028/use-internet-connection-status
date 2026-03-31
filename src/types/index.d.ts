declare module 'use-internet-connection-status' {
  export interface InternetConnectionStatus {
    online: boolean
  }

  export default function useInternetConnectionStatus(): InternetConnectionStatus
}
