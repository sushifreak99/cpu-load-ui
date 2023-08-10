enum LoadingStatus {
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

type LoadingState =
  { status: LoadingStatus.FAILURE, error: Error } |
  { status: LoadingStatus.LOADING } |
  { status: LoadingStatus.SUCCESS }

export function toError(err: Error): LoadingState {
  return {
    status: LoadingStatus.FAILURE,
    error: err,
  } as const;
}

export const LOADING_STATE: LoadingState = { status: LoadingStatus.LOADING }
export const SUCCESS_STATE: LoadingState = { status: LoadingStatus.SUCCESS }
