export function searchUpdate(url) {
    return {
      type: "SEARCH_UPDATE",
      payload: url
    }
  }

export function currentSearch(name) {
    return {
      type: "CURRENT_SEARCH",
      payload: name
    }
  }

export function saveData(data) {
  return {
    type: "SAVE_DATA",
    payload: data
  }
}