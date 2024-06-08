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
var smaller1 = function (nums) {
    var length = nums.length;
    var list = [];
	var result = new Array(length).fill(0);
    for (let i = length - 1; i >= 0; i -= 1) {
        const num = nums[i];
        result[i] = findIndexByBinary(num, list);
        add(num, list);
    }
    return result;
};


// my last try to resolve the solution

function smaller2(arr) {
    var length = arr.length;
    var answer = new Array(length);

    for (var i = length - 1; i >= 0; i--) {
        var sum = 0;
        var x = i + 1;
        while (x < length) {
            var arrI = arr[i];
            var arrX = arr[x];
            var answerX = answer[x];
            if (arrX < arrI) {
                sum++;
                if (answerX == length - x) {
                    sum += answerX;
                    break;
                }
            } else if (arrX > arrI && answerX == 0) {
                break;
            } else if (arrX == arrI) {
                sum += answerX;
                break;
            }
            x++;
        }
        answer[i] = sum;
    }
    return answer;
}

// passed solution 

var smaller3 = function(nums) {
    var Node = function(val) {
        this.val = val;
        this.left = null;
        this.right = null;
        this.count = 0;
        this.dup = 0;
    }

    var insert = function(val) {
        let root = bst;
        let newNode = new Node(val);

        // initialize node
        if (!root) {
            bst = newNode;
            return 0;
        }

        var smaller = 0;
        while(root) {
            if (val < root.val) { // go left
                root.count++; // add 1 to root since it has 1 more element in its left subtree
                if (!root.left) {
                    root.left = newNode;
                    return smaller;
                } else {
                    root = root.left
                }
            } else if (val > root.val){ // go to right
                smaller+=root.count+1; // update total smaller numbers
                if (!root.right) {
                    root.right = newNode;
                    return smaller;
                } else {
                    root = root.right;
                }
            } else {
                // add up the current total smaller numbers and remove duplicate numbers
                return smaller+(root.count++)-(root.dup++);
            }
        }
    }

    let bst = null, count = [];
    for (let i=nums.length-1;i>=0;i--) {
        count[i] = insert(nums[i]);
    }

    return count;
}
