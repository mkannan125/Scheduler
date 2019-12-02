export function addItem(item) {
  return {
    type: "ADD",
    payload: item
  };
}

export function deleteItem(id) {
  return { type: "DELETE", payload: id };
}

export function checkItem(id) {
  return { type: "CHECK", payload: id };
}
