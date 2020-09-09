let FIRST = "";
let SECOND = "";
let OPERAND = "";
function setChar(val){
    let disTop = document.querySelector(".display-top");
    let disBot = document.querySelector(".display-bottom");
    if(isNaN(parseInt(val)))
    {
        if(!SECOND)return;
        if(val === "del");
        if(val === "neg"){
            if(!SECOND)
                return;
            if(FIRST)
                SECOND = parseInt(evaluate(parseInt(FIRST), parseInt(SECOND), OPERAND));
            SECOND = evaluate(parseInt(SECOND), -1, val);
            FIRST = "";
            OPERAND = "";
            disTop.innerHTML = String.fromCharCode(160);
            disBot.innerHTML = SECOND;
            return;
        }
        else{
            if(val === "=" || (FIRST.length != 0)){
                disTop.innerHTML = FIRST + " " + OPERAND + " " + SECOND;
                SECOND = parseInt(evaluate(parseInt(FIRST), parseInt(SECOND), OPERAND));
                FIRST = "";
                OPERAND = "";
                disBot.innerHTML = SECOND;
                if(val === "=" || isNaN(SECOND))
                {
                    disTop.innerHTML = String.fromCharCode(160);
                    if(isNaN(SECOND)){ 
                        SECOND = "";
                        disBot.innerHTML = "err";
                    }
                    return;
                }
            }
            OPERAND = val;
            FIRST = SECOND;
            SECOND = "";
            disTop.innerHTML = FIRST + " " + OPERAND + " " + SECOND;
            disBot.innerHTML = String.fromCharCode(160);
        }
    }
    else{
        if(SECOND.length < 6)
            SECOND += val;
        disTop.innerHTML = FIRST + " " + OPERAND + " " + SECOND;
        disBot.innerHTML = SECOND;
    }
        
}



function getOperands(){
    let opArr = document.querySelectorAll(".buttons");
    opArr = Array.from(opArr);
    opArr.push(document.querySelector(".equals-button"));
    console.log(opArr)
    for(i in opArr){
        opArr[i].addEventListener('click', (e)=>setOperands(e));
    }

}
getOperands();



function setOperands(e){
    btn = e.target.getAttribute("id");
    switch(btn){
        case "/":
        case "*":
        case "-":
        case "+":
        case ".":
        case "=":
        case "del": 
        case "neg": setChar(btn);
                    break;
        case "ac": FIRST = "";
                    SECOND = "";
                    OPERAND = "";
                    let disTop = document.querySelector(".display-top");
                    let disBot = document.querySelector(".display-bottom");
                    disTop.innerHTML = String.fromCharCode(160);
                    disBot.innerHTML = "0";
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
        num.addEventListener("click", (e)=>setChar(e.target.getAttribute("value")));
        calc.appendChild(num);
    }
}
addNumbers();



function evaluate(a, b, sign){
    let ans;
    switch(sign){
        case "+": ans = a + b;
            break;
        case "-": ans = a - b;
            break;
        case "*": ans = a * b;
            break;
        case "/": if(b == 0)
                    return "err"; 
                    ans = a / b;
                    break;
        case "neg": ans = a * b;
            break;
    }
    if(ans.toString().length > 12){
        return "err";
    }
    return ans;
}
