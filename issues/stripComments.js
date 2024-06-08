// First solution

String.prototype.deleteSpacesFromEnd  = function(){
	const splittedText = this.split('')
	
	while(splittedText[splittedText.length - 1] == ' '){
	  splittedText.pop()
	}
	return splittedText.join('')
  }
  
  
  function solution1(text, markers) {
	let re = `${markers.join(`\\`)}`
	if(re.length){
	  re = '[\\' + re + ']'
	}
	re = new RegExp(re,"g")
	let matched = [...text.matchAll(re)].map(el=>el.index)
	
	if(!markers.length || !matched.length || matched.length - 1 == text.length){
	  return text.deleteSpacesFromEnd()
	}  
	let answer = ''
	text = text.split(re)
	answer += text.shift().deleteSpacesFromEnd()
	text = text.filter(el=>{
	  return !!el && new RegExp(/[\n]/).test(el)
	})    
	
	text.forEach((el)=>{
	const words = el.split('\n');
	words.shift()
	answer += `\n${words.join('\n')}`
	})
	return answer.split('\n').map(el=> el.deleteSpacesFromEnd()).join('\n')
  }
  


// Second solution

function solution2(text, markers) {
	if (!markers.length) {
		return text.trimEnd();
	}
	let re = new RegExp(`[\\${markers.join("\\")}]`, "g");
	return text
		.split("\n")
		.map((el) => el.split(re)[0].trimEnd())
	.join("\n");
}


// third solution

function solution3(text, markers) {
	return text
		.split("\n")
		.map((el) => markers.reduce((acc,curr) => acc.split(curr)[0],el).trimEnd())
		.join("\n");
}

const testse = [
    ['aa bb cc', [], 'aa bb cc'],
    ['aa bb cc  ', [], 'aa bb cc'],
    ['  aa bb cc', [], '  aa bb cc'],
    ['  aa # bb # cc  ', [], '  aa # bb # cc'],

    ['aa bb cc', ['#'], 'aa bb cc'],
    ['aa bb # cc', ['#'], 'aa bb'],
    ['aa# bb cc', ['#'], 'aa'],
    ['aa #bb cc', ['#'], 'aa'],
    ['aa # bb # cc', ['#'], 'aa'],
    ['#aa bb cc', ['#'], ''],

    ['#aa bb\ncc dd', ['#'], '\ncc dd'],
    ['aa # bb\ncc dd', ['#'], 'aa\ncc dd'],
    ['aa bb\n#cc dd', ['#'], 'aa bb\n'],
    ['aa bb\ncc # dd', ['#'], 'aa bb\ncc'],
    ['aa bb\ncc dd#', ['#'], 'aa bb\ncc dd'],

    ['aa bb\ncc dd', ['#', '!'], 'aa bb\ncc dd'],
    ['aa # bb\ncc dd', ['#', '!'], 'aa\ncc dd'],
    ['aa bb\ncc ! dd', ['#', '!'], 'aa bb\ncc'],
    ['#aa bb\n!cc dd', ['#', '!'], '\n'],
    ['aa ! bb\ncc # dd', ['#', '!'], 'aa\ncc'],
    ['aa bb#\ncc dd!', ['#', '!'], 'aa bb\ncc dd'],

    ['aa + bb\ncc - dd\nee * ff', ['+', '-', '*'], 'aa\ncc\nee'],
    ['aa / bb\ncc ^ dd\nee $ ff', ['/', '^', '$'], 'aa\ncc\nee'],
  ];
const time = performance.now();
const tests = Array.from({length:10000}).fill(testse).flat(1)
tests.forEach(([text, markers]) => solution2(text, markers));

console.log('solution2',performance.now() - time)