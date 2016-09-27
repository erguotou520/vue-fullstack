let storage = window.sessionStorage

export function changeStorage (_storage) {
  storage = window[_storage]
}

export function save (key, value) {
  storage.setItem(key, value)
}

export function saveMulti (datas) {
  datas.forEach(data => save(data.key, data.value))
}

export function read (key, _storage) {
  return _storage ? _storage.getItem(key) : storage.getItem(key)
}

export function readMulti (keys, searchAllStorage) {
  if (!searchAllStorage) {
    return keys.map(key => read(key))
  } else {
    const first = window['localStorage'].getItem(keys[0])
    return first !== undefined && first !== null
      ? keys.map(key => read(key, window['localStorage']))
      : keys.map(key => read(key, window['sessionStorage']))
  }
}

export function clear (key) {
  storage.removeItem(key)
}

export function clearMulti (keys) {
  keys.forEach(key => clear(key))
}
