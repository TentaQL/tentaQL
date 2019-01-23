export function codeMirrorUpdate(value, cursor) {
  return {
    type: "CODEMIRROR_UPDATE",
    payload: [value, cursor]
  };
}

export function resetTab(value) {
  return {
    type: "RESET_TAB",
    payload: value
  };
}

export function switchTab(value) {
  return {
    type: "SWITCH_TAB",
    payload: value
  };
}

export function resetAll() {
  return {
    type: "RESET_ALL",
    payload: "Empty"
  };
}
