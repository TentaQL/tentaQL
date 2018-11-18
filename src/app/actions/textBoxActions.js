export function codeMirrorUpdate(value) {
    return {
      type: "CODEMIRROR_UPDATE",
      payload: value
    }
  }