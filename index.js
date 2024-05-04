    // 
	//SLOPE
	
	const e1 = document.getElementById("x1");
	const e2 = document.getElementById("x2");
	const d1 = document.getElementById("y1");
	const d2 = document.getElementById("y2");
	const slopeBtn = document.getElementById("slopeBtn")
	let Slope;
	const inputingS = () =>{
		x1 = e1.value
		x2 = e2.value
		y1 = d1.value
		y2 = d2.value
		Slope = (y2-y1)/(x2-x1)
		slope.innerText = Slope;
	}

	slopeBtn.addEventListener('click',inputingS)
	const slope = document.getElementById("slope");

	// 
	//%EROR
	const erroreP = document.getElementById("errore")
	const e3 = document.getElementById("x-theo")
	const e4 =  document.getElementById("x-exp")
	const erroreBtn = document.getElementById("errore-btn")
	let errore;
	const inputtingE = ()=>{
		xtheo = e3.value
		xexp =  e4.value
		errore = ((xtheo - xexp)/xtheo) * 100
		erroreP.innerText = "%" + errore
		console.log("hi")
	}

	erroreBtn.addEventListener('click',inputtingE)
/*
SUBBING ERROR
*/
const Seq = document.getElementById("subbing-equation");
const sBtn = document.getElementById("sub-btn")
const errorsField = document.getElementById("errors-entering")
const erBtn  = document.createElement("button")
const erText = document.createElement('p')
const erH = document.createElement('h2')


erH.innerHTML ="the error is: "
erBtn.innerHTML = "submit"


async function arrayingS (fie)  {
	let conArr  = [];
	fie = errorsField
	let eq1 = Seq.value
	let eq1Arr = eq1.split(/[+-]/)
	
	fie.appendChild(erBtn)
	fie.appendChild(erText)
	
	for(let i = 0 ; i < eq1Arr.length;i++){
		let j  = i+1
		 inputs = await  crIn()
		inputs.setAttribute('placeholder', "enter element " + j  + " error")
		inputs.className = "EInput" + i
		fie.appendChild(inputs);
		conArr.push(eq1Arr[i].split("*"))
}

console.log(conArr)
let cons;
let subAnswer = 0;
let erAnswer;
let z ;
let k ;
const ErrorAn = () =>{
	for(let i = 0 ; i < eq1Arr.length;i++){
			if(!isNaN(conArr[i][0])){
				cons = parseFloat(conArr[i][0])
			}else{
				cons = 1
			}
			console.log()
		z = document.getElementsByClassName("EInput" + i)
		console.log(cons)
		console.log(z)
		k =  cons * (z[0].value)
		console.log(z[0].value)
		console.log(k)
		subAnswer +=  k**2;
	}
	erAnswer = Math.sqrt(subAnswer);
	erText.innerText = erAnswer
}
async function crIn  () {
	//for(let i = 0 ; i < eq1Arr.length;i++){
	const input = document.createElement("input");
	//x.id = "subEIN" + i+1}
	return input;
//}
}
const SubReset = () => {
	errorsField.innerHTML = " ";
}
const subReset = document.getElementById('sub-reset')
subReset.addEventListener('click',SubReset)
erBtn.addEventListener('click', ErrorAn)
}
sBtn.addEventListener("click",arrayingS);
/*

multi

*/
const mulReset = document.getElementById("mul-reset")
 const merText = document.createElement('p')
const multiErrorField = document.getElementById("multi-errors-field")
 const MBtn = document.getElementById("multi-answer-btn")
const Meq  = document.getElementById('multing-equation')
const ans = document.getElementById("multi-answer")
const merBtn = document.createElement("button")
const MEqB = document.getElementById("multi-btn")
merBtn.innerText = "submit"
const An = () => {
	let an  =ans.value
	console.log(an)
	return an
}
async function arrayingM ()  {
	console.log('created')
	eq1 = Meq.value
	eq1Arr = eq1.split(/[*\/]/)
	console.log(eq1Arr)
	
	multiErrorField.appendChild(merBtn)
	multiErrorField.appendChild(merText)
	for(let i = 0 ; i < eq1Arr.length;i++){
		let j  = i+1
		inputs = await crIn()
		inputs.setAttribute('placeholder', "enter element " + j  + "value")
		inputs.className = "m-answer" + i
		multiErrorField.appendChild(inputs);
		minputs= await crIn()
		
		minputs.setAttribute('placeholder', "enter element " + j  + "error")
		minputs.className = "m-error" + i
		multiErrorField.appendChild(minputs);
}
let MultiAnswer = 0;
let MerAnswer;
let z ;
let k ;
let y ;
const ErrorAn = () =>{
	for(let i = 0 ; i < eq1Arr.length;i++){
		z = document.getElementsByClassName("m-error" + i)
		y = document.getElementsByClassName("m-answer" + i)
		k = z[0].value
		n = y[0].value
		MultiAnswer += (k/n) **2
	}
	MerAnswer =   ans.value * Math.sqrt(MultiAnswer);
	merText.innerText =  "the error is : "  + MerAnswer
	multiErrorField.appendChild(merText)
}
async function crIn  () {
	//for(let i = 0 ; i < eq1Arr.length;i++){
	const input = document.createElement("input");
	
	//x.id = "subEIN" + i+1}
	return input ;
//}
}
const MubReset = () => {
multiErrorField.innerHTML = " ";
}
const subReset = document.getElementById('sub-reset')
mulReset.addEventListener('click',MubReset)
merBtn.addEventListener('click', ErrorAn)
}
MBtn.addEventListener('click', An);
MEqB.addEventListener('click',arrayingM)
/*

power error

*/
const varE = document.getElementById("var-error")
const r = document.getElementById("r")
const rBtn = document.getElementById("r-btn")
const pEq = document.getElementById("power-eq")
const pEqB = document.getElementById("p-eq-btn")
//let res ;
//let powEr ;
//let vE ;
const powerField = document.getElementById("power-field")
const powText = document.createElement("p")
const v = document.getElementById("var-value")
const vVB = document.getElementById("v-v-b")
let varV;
const gVV = () =>{
	varV = v.value
}

const gVE = () =>{
	vE = varE.value
}

const result = () =>{
	 res = r.value
}


const pEe = () =>{
	let arr = pEq.value.split("^")
	arr[1] = parseInt(arr[1])
	arr[0] = varV
	res = arr[0]**arr[1]
	powEr = (res*(arr[1]*vE))/arr[0]
	powText.innerText = "the equation error is :" + powEr
	powerField.appendChild(powText)
}
const caller = () =>{
	gVE()
	gVV()
	pEe()
}
vVB.addEventListener("click",caller)
const pReset = document.getElementById("p-reset")
pReset.addEventListener("click", () =>{
	powerField.innerHTML = " "
	pEq.value = 0
	v.value = 0
	varE.value = 0
})