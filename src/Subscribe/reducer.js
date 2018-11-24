const initialState = {
  showSubscribe: false,
  showSuccess: false,
  hasError: false,
  loading: false,
  error: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'EMAIL_SUCCEED':
      return {
        ...state,
        showSuccess: true,
        loading: false,
      };
    case 'CLOSE_SUBSCRIBE': {
      return {
        ...initialState,
      };
    }
    case 'OPEN_SUBSCRIBE': {
      return {
        ...initialState,
        showSubscribe: true,
      };
    }
    case 'SUBMIT_EMAIL': {
      return {
        ...state,
        loading: true,
        hasError: false,
        error: '',
      };
    }
    case 'SUBMIT_ERROR':
    case 'INVALID_EMAIL': {
      return {
        ...state,
        hasError: true,
        error: action.error,
        loading: false,
      };
    }
    default:
      return state;
  }
}
