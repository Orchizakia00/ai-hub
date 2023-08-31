const d1 = new Date('2019-06-01');
const d2 = new Date('2018-06-01');
const d3 = new Date('2019-06-01');

const objects = [
  { createdAt: d1, name: 'Test 1' },
  { createdAt: d2, name: 'Test 2' },
  { createdAt: d3, name: 'Test 3' }
];

objects.sort((a, b) => a.createdAt - b.createdAt);

// [ 'Test 2', 'Test 1', 'Test 3' ]
console.log(objects.map(o => o.name));