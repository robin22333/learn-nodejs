function _Array() {
    
    this.array = [];

    this.push = function(item) {
	this.array.push(item);
    }

    this.toString = function() {
	var str = '[';
	for (var i in this.array) {
	    str += this.array[i] + ',';
	}
	str = str.substring(0, str.length-1) + ']';
	return str;
    }
    	
    this.map = function(func) {
        var result = [];
	for (var i in this.array) {
	    result.push(func(this.array[i]));
	}
	return result;
    }

    this.reduce = function(func) {
	var result = this.array[0];
	for (var i=1; i<this.array.length; i++) {
	    result = func(result, this.array[i]);
	}
	return result;
    }

    this.filter = function(func) {
	var result = [];
	for (var i in this.array) {
	    if (func(this.array[i])) {
		result.push(this.array[i]);
	    }
	}
	return result;
    }

    this.forEach = function(func) {
	for (var i in this.array) {
	    func(this.array[i]);
	}
    }

    this.sort = function(func) {
        quick_sort(this.array, 0, this.array.length, func);
    }

}

function quick_sort(arr, p, q, func) {
    if (p >= q) {
	return;
    }
    var i = p;
    var j = p + 1;
    var x = arr[p];
    for(var j=p+1; j<q; j++) {
	if (func(arr[j], x)) {
	    i ++;
	    swap(arr, i, j);
	}
    }
    swap(arr, p, i);
    quick_sort(arr, p, i, func);
    quick_sort(arr, i+1, q, func);
}

function swap(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

module.exports = _Array;
