const removeAttribute = ({ attribute, object }) => {
  return Object.keys(object).reduce((attributeObject, key) => {
    if (object !== undefined) {
      if (key !== "" && !attribute.includes(key)) {
        attributeObject[key] = object[key];
      }
      return attributeObject;
    }
    return undefined;
  }, {});
};

export { removeAttribute };
