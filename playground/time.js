const moment = require('moment');

// let date = new Date();
// console.log(date.getMonth());

let date = moment()
date.add(100,'years').subtract(4,'months');
console.log(date.format('h:mm a'));