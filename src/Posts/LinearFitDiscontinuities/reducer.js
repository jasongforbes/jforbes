const initialState = {
  clockSpeed: 1,
  noise: 0,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'SPEED_CHANGE':
      return {
        ...state,
        clockSpeed: action.value,
      };
    case 'NOISE_CHANGE': {
      return {
        ...state,
        noise: action.value,
      };
    }
    default:
      return state;
  }
}
