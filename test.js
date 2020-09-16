const { store } = require('./store');
const fs = require('fs');

const { argv } = process;
const args = argv.slice(2);

const chunkArrayInTwos = arr => {
  const chunked = [];

  for (let i = 0; i < arr.length; i = i + 2) {
    chunked.push(arr.slice(i, i + 2));
  }

  return chunked;
}

const calcBundleOrder = inputs => {
  const bundleResults = [];

  inputs.forEach(val => {
    const productItem = val.split(' ');

    if (productItem.length === 2) {
      const [productCode, size] = productItem;
      const productIdx = store.findIndex(v => v.productCode === productCode);

      if (productIdx !== -1) {
        const { bundles } = store[productIdx];
        const sortedBundles = bundles.sort((a, b) => b.size - a.size);
        const parsedSize = parseFloat(size);
        let tempSize = parsedSize;

        const productResult = sortedBundles.reduce((acc, v) => {
          const quantity = Math.floor(tempSize / v.size);
          const remainder = tempSize % v.size;

          if (quantity > 0) {
            const remainingBundles = sortedBundles.filter(x => remainder % x.size === 0);

            if (remainingBundles.length) {
              tempSize = remainder;
              const total = acc.total + (quantity * v.price);

              return {
                ...acc,
                total: Math.round(total * 100) / 100,
                bundles: [
                  ...acc.bundles,
                  { quantity, size: v.size, price: `$${v.price}` }
                ]
              };
            }
          }

          return acc;
        }, { size, productCode, total: 0, bundles: [] });

        productResult.total = `$${productResult.total.toFixed(2)}`;

        bundleResults.push(productResult);
      }
    }
  });

  return bundleResults;
}

if (args.length === 1 && args[0].split('.').pop() === 'txt') {
  fs.readFile(args[0], 'utf8', (err, data) => {
    if (err) {
      throw err;
    }

    if (data.length) {
      const items = data.split('\n');
      const output = calcBundleOrder(items);
      console.dir(output, { depth: null });
    }
  })
} else {
  const items = chunkArrayInTwos(args).map(v => v.join(' '));
  console.log('item inputs from cmd', items);
}