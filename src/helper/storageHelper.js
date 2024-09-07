// MARK: general functions

export const clearStorage = () => {
  return localStorage.clear();
};

// MARK: string functions

export const getString = (key, value = "") => {
  return localStorage.getItem(key) || value;
};

export const putString = (key, value) => {
  localStorage.setItem(key, value);
};

export const removeString = key => {
  localStorage.removeItem(key);
};

// MARK: object functions

export const getObject = key => {
  try {
    return JSON.parse(localStorage.getItem(key)) || {};
  } catch (e) {
    return {};
  }
};

export const putObject = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const removeObject = key => {
  localStorage.removeItem(key);
};
