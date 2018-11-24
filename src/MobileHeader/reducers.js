const initialState = {
  showMenu: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_MENU': {
      return {
        ...state,
        showMenu: !state.showMenu,
      };
    }
    case 'OPEN_SUBSCRIBE': {
      return {
        ...state,
        showMenu: false,
      };
    }
    default:
      return state;
  }
}
