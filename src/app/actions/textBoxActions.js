export function codeMirrorUpdate(value, id) {
    return {
      type: "CODEMIRROR_UPDATE",
      payload: [value, id]
    }
  }

  export function resetTab(value) {
    return {
      type: "RESET_TAB",
      payload: value
    }
  }