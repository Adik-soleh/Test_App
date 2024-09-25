let myArr = [20, 12, 35, 11, 17, 9, 58, 23, 69, 8,1 ,2];

const sort = (arr) => {
    let check;
  
    do {
      check = false;
      for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] > arr[i + 1]) {
          let thisArr = arr[i];
          arr[i] = arr[i + 1];
          arr[i + 1] = thisArr;
          check = true;
        }
      }
    } while (check);
  
    return arr;
  };

console.log(sort(myArr));

