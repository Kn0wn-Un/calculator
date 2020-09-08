function getOperands(){
    let opArr = document.querySelectorAll(".buttons");
    opArr = Array.from(opArr)
    for(i in opArr){
        opArr[i].addEventListener('click', (e)=>setOperands(e));
    }
}
getOperands();



function setOperands(e){
    btn = e.target;
    switch(e.target.getAttribute("id")){
        case "/":
        case "*":
        case "-":
        case "+":
        case ".":
        case "=":
        case "neg": console.log("send to evaluate");
                    break;
                    case "/":
        case "ac":
        case "del": console.log("add func");
                    break;
    }
}



function addNumbers(){
    let calc = document.querySelector(".calc-body");
    for(i = 0; i < 10; i ++){
        let num = document.createElement("div");
        num.style["grid-area"] = "num"+i;
        num.classList.add("num-buttons");
        num.setAttribute("value", i);
        num.innerHTML = i;
        num.addEventListener("click", (e)=>evaluate(e));
        calc.appendChild(num);
    }
}
addNumbers();



let FIRST = "";
function evaluate(e){
    let dis = document.querySelector(".display-bottom");
    if(FIRST.length != 3){
        FIRST += e.target.getAttribute("value");
    }
    dis.innerHTML = FIRST;
}
let temp = document.querySelector("#ac");
temp.addEventListener("click", (e)=>{
    FIRST = "";
    let dis = document.querySelector(".display-bottom");
    dis.innerHTML = String.fromCharCode(160);
});