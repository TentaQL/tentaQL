export function searchUpdate(url) {
    return {
      type: "SEARCH_UPDATE",
      payload: url
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