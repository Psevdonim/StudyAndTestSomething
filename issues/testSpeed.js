var add = (num, list) => {
	var index = findIndexByBinary(num, list);
	return list.splice(index, 0, num);
}
var findIndexByBinary = (num, list) => {
	var left = 0;
	var right = list.length - 1;
	while (left <= right) {
		var mid = left + Math.floor((right - left) / 2);
		if (num <= list[mid]) {
			right = mid - 1;
		} else {
			left = mid + 1;
		}
	}
	return left;
}

Array.prototype.addItem = function(num){
	var index = this.findIndexByBinary(num);
	return this.splice(index, 0, num);
}

Array.prototype.findIndexByBinary = function(num) {
	var left = 0;
	var right = this.length - 1;
	while (left <= right) {
		var mid = left + Math.floor((right - left) / 2);
		if (num <= this[mid]) {
			right = mid - 1;
		} else {
			left = mid + 1;
		}
	}
	return left;
}

class IndexedBinary {
	constructor(){
		this.list = []
	}
	add = function(num){
		var index = this.findIndexByBinary(num);
		return this.list.splice(index, 0, num);
	}
	
	findIndexByBinary = function(num) {
		var left = 0;
		var right = this.length - 1;
		while (left <= right) {
			var mid = left + Math.floor((right - left) / 2);
			if (num <= this.list[mid]) {
				right = mid - 1;
			} else {
				left = mid + 1;
			}
		}
		return left;
	}
}

var smaller2 = (nums) => {
	const time = performance.now()
    var length = nums.length;
    var list = new IndexedBinary();
	var result = new Array(length).fill(0);
    for (let i = length - 1; i >= 0; i -= 1) {
        const num = nums[i];
        result[i] = list.findIndexByBinary(num, list);
		list.add(num, list);
    }
	console.log(performance.now() - time)
    return result;
};

var smaller0 = (nums) => {
	const time = performance.now()
    var length = nums.length;
    var list = [];
	var result = new Array(length).fill(0);
    for (let i = length - 1; i >= 0; i -= 1) {
        const num = nums[i];
        result[i] = findIndexByBinary(num, list);
        add(num, list);
    }
	console.log(performance.now() - time)
    return result;
};

var smaller1 = (nums) => {
	const time = performance.now()
    var length = nums.length;
	var list = []
	var result = new Array(length).fill(0);
    for (let i = length - 1; i >= 0; i -= 1) {
        const num = nums[i];
        result[i] = list.findIndexByBinary(num);
		list.addItem(num);
    }
	console.log(performance.now() - time)
    return result;
};

var nums = Array.from({length:100000},(_,idx)=> Math.ceil(Math.random() * 1000000 + idx));

smaller0(nums)