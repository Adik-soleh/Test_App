function use(n) {
  if (n % 2 === 0) {
      console.log("angka harus ganjil");
      return;
  }

  for (let i = 0; i < n; i++) {
      let row = '';
      for (let j = 0; j < n; j++) {
          if ((i + j) % 2 === 1) {
              row += ' # ';
          }else if((i + j) % 2 === 0) {
            row += ' * '
        }
          else {
              row += '';
          }
      }
      console.log(row.trim());
  }
}

use(5);

