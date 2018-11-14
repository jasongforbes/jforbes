const initialState = {
  showSubscribe: false,
  hasError: false,
  error: '',
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'EMAIL_SUCCEED':
    case 'CLOSE_SUBSCRIBE': {
      return {
        ...state,
        showSubscribe: false,
      };
    }
    case 'OPEN_SUBSCRIBE': {
      return {
        ...state,
        showSubscribe: true,
      };
    }
    case 'SUBMIT_EMAIL': {
      return {
        ...state,
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
      };
    }
    default:
      return state;
  }
}
