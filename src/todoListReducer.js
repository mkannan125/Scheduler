export default function reducer(state = { items: [] }, action) {
  switch (action.type) {
    case "ADD": {
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    }
    case "DELETE": {
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };
    }
    case "CHECK": {
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id == action.payload) {
            item.checked = !item.checked;
          }
          return item;
        })
      };
    }
  }
  return state;
}
