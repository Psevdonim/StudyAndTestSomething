const getUniqueArray = (arr) => {
	let time = performance.now()
	let unique = {}
	arr.forEach(el => {
		if (!unique[el]) {
			unique[el] = el
		}
	});
	unique = Object.values(unique)
	console.log(performance.now() - time);
	return unique;
};

const getUniqueArray1 = (arr) => {
	let time = performance.now()
	const unique = new Set(arr);
	console.log(performance.now() - time);
	return unique;
};

let arr = Array.from({ length: 1000000 }, (_, idx) => (Math.round(idx * Math.random())));
//getUniqueArray(arr)
//getUniqueArray1(arr)

const getSummArraysReduce = () =>{
	var time = performance.now()
	var summ = 0
	var arr = Array.from({ length: 100 }, (_, idx) => idx);
	for(var i = 0;i < 10000000; i++){
		summ += i + arr.reduce((a, b) => a + b, 0) 
	}
	console.log('reduce', performance.now() - time);
	return summ
}

const getSummArraysFor = () =>{
	var time = performance.now()
	var summ = 0
	var arr = Array.from({ length: 100 }, (_, idx) => idx);
	for(var i = 0 ;i < 10000000; i++){
		summ += i
		for(var j = 0; j < arr.length; j++){
			summ += arr[j]
		}
	}
	console.log('for', performance.now() - time);
	return summ
}

//getSummArraysReduce()
//getSummArraysFor()

//function generateParenthesis(left, right, s, answer) {
//	console.log('start',{left, right, s, answer})
//    if (left == 0 && right == 0) {
//      answer.push(s);
//    }
//    if (left > right || left < 0 || right < 0) {
//      return;
//    }
//	console.log('live',{left, right, s, answer})
//    s += '(';
//    generateParenthesis(left - 1, right, s, answer);
//    s = s.slice(0, -1);
 
//    s += ')';
//    generateParenthesis(left, right - 1, s, answer);
//    s = s.slice(0, -1);

//  }

//function balancedParens(n) {
//  let str = '';
//  let answer = [];
//  generateParenthesis(n, n, str, answer);
//  return answer;
//}

//window.balancedParens = balancedParens

const cicles = {
	st:0,
	raf:0
}
const test = () =>{
	let isFirstUsed = false
	setTimeout(() => {
		console.log('st');
		if(!isFirstUsed){
			cicles.st++
			isFirstUsed = true;
		}
	})

	requestAnimationFrame(() => {
		console.log('raf');
		if(!isFirstUsed){
			cicles.raf++
			isFirstUsed = true;
		}
	})
}
addEventListener('DOMContentLoaded',()=>{
	let arr = new Array(1000)

		for (let i  of arr){

			setTimeout(()=>{
				test()
			}, Math.ceil(Math.random() * 10) + 4)
		}
		
})
