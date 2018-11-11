const initialState = {
  showSubscribe: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}
