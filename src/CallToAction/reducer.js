const initialState = {
  emailAddress: '',
  hasError: false,
  loading: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'INITIALIZE_CTA':
      return {
        ...initialState,
      };
    case 'CTA_EMAIL_CHANGE':
      return {
        ...state,
        emailAddress: action.emailAddress,
      };
    case 'EMAIL_SUCCEED':
      return {
        ...state,
        emailAddress: '',
        loading: false,
        hasError: false,
      };
    case 'SUBMIT_EMAIL': {
      return {
        ...state,
        loading: true,
        hasError: false,
      };
    }
    case 'SUBMIT_ERROR':
    case 'INVALID_EMAIL': {
      return {
        ...state,
        loading: false,
        hasError: true,
      };
    }
    default:
      return state;
  }
}
