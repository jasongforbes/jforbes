const initialState = {
  bias: 0,
  standardDeviation: 1,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'BIAS_CHANGE':
      return {
        ...state,
        bias: action.value,
      };
    case 'STD_CHANGE': {
      return {
        ...state,
        standardDeviation: action.value,
      };
    }
    default:
      return state;
  }
}
