export function codeMirrorUpdate(value, id) {
    return {
      type: "CODEMIRROR_UPDATE",
      payload: [value, id]
    }
  }