export interface InternetConnectionStatus {
  online: boolean
}

export function useInternetConnectionStatus(): InternetConnectionStatus

export default useInternetConnectionStatus