var _Array = require('./_Array');

var arr = new _Array();
for (var i=1; i<10; i++) {
    var a;
    if (i % 2 === 0) {
	a = i - 1;
    } else {
	a = i + 1;
    }
    arr.push({
	a:a,
	b:i
    });
}

var res = arr.reduce(function(r,i){
    return {
	a:r.a + ',' + i.a,
	b:r.b + ',' + i.b
    };
});

var res2 = arr.map(function(i){
    return {
	a:i.a
    };
});

var res3 = arr.filter(function(i){
    return i.a % 2 === 0;
});

arr.forEach(function(i){
   console.log(i); 
});

console.log('----------');
console.log(res);
console.log('----------');
console.log(res2);
console.log('----------');
console.log(res3);
console.log('----------');
arr.sort(function(x,y){
    return x.a <= y.a
});
console.log(arr.array);
