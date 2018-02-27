export const maplistsort = (keyPath1, keyPath2, asc=true) => {
  var sortOrder = 1;
  if(asc === false) {
      sortOrder = -1;
  }
  return function (a, b) {
      let result;
      if (a.getIn(keyPath1) < b.getIn(keyPath1)) result = -1;
      else if (a.getIn(keyPath1) > b.getIn(keyPath1)) result = 1;
      else {
        if (keyPath2 === undefined) result = 0;
        else {
          if (a.getIn(keyPath2) < b.getIn(keyPath2)) result = -1;
          else if (a.getIn(keyPath2) > b.getIn(keyPath2)) result = 1;
          else result = 0;
        }
      }
      return result * sortOrder;
  }
}