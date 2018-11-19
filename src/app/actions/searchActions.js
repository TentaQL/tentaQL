export function searchUpdate(url, originatingInput) {
    return {
      type: "SEARCH_UPDATE",
      payload: [url, originatingInput]
    }
  }

export function currentSearch() {
    return {
      type: "CURRENT_SEARCH",
      payload: "Empty"
    }
  }

export function saveData(data) {
  return {
    type: "SAVE_DATA",
    payload: data
  }
}