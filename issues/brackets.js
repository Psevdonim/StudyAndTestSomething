const brackets = {
	'(': ')',
	'[': ']',
	'{': '}'
}



const checkCLosingBrackets = (str) => {
	let i = str.length % 2 !== 0 ? str.length : 0;
	while(i <= str.length){
		if(brackets[str[i]] === str[i+1] && brackets[str[i]]){
			str = str.slice(0, i) + str.slice(i+2)
			i--;
		}else{
			i++;
		}
	}
	return str.length > 0 ? false : true;
}

const changeBrackets = (str) => {
	if(!checkCLosingBrackets(str)){
		return 'nothing to change'
	}

	str.split('').forEach(el => {
		
	})
	return str
}

const str = '()()()()()'

console.log(changeBrackets(str))

const generateBrackets = (open,close,str,answer) =>{
	if(open === 0 && close === 0){
	 answer.push(str)
   }
   if(open < 0  || close < 0 || open > close){
	 return;
   }
   generateBrackets(open-1,close,str + '(',answer)
   generateBrackets(open,close-1,str + ')',answer)
 }
 
 function balancedParens(n) {
   const answer = []
   generateBrackets(n,n,'',answer)
   return answer
 }

 console.log(balancedParens(5).length)
 
