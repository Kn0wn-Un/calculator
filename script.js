//Global Variables
let FIRST = "";
let SECOND = "";
let OPERAND = "";
let FLOAT_FLAG = 0;



//function to handle input and seperate numbers 
function setChar(val){
    let disTop = document.querySelector(".display-top");
    let disBot = document.querySelector(".display-bottom");
    if(isNaN(parseInt(val)))
    {   
        //if only operands pressed
        if(!SECOND && val != "del")return;
        //handle just =
        if(!OPERAND && val === "=")return;
        //make floating variables
        if(val === "."){
            if(SECOND.indexOf('.') === -1){
                SECOND += val;
                FLOAT_FLAG = 1;
            }
            display(1,1);
            return;
        }
        //handles del button
        if(val === "del"){
            SECOND = SECOND.substring(0, SECOND.length - 1);
            if(!SECOND){
                display(1, 0);
                if(!FIRST)
                    allClear();
                return;
            }
            display(1, 1);
        }
        //handles +/- button
        else if(val === "neg"){
            if(!SECOND)
                return;
            SECOND = convert(SECOND, FLOAT_FLAG);   
            if(FIRST){
                FIRST = convert(FIRST, FLOAT_FLAG);    
                SECOND = convert(evaluate(FIRST, SECOND, OPERAND), FLOAT_FLAG);
            }
            SECOND = convert(evaluate(SECOND, -1, "*"), FLOAT_FLAG);
            FIRST = "";
            OPERAND = "";
            display(1, 1);
            return;
        }
        //handles basic arithematic and = 
        else{
            if(val === "=" || (FIRST.length != 0)){
                if(!SECOND){
                    OPERAND = val;
                    display(1, 0);
                    return;
                }
                disTop.innerHTML = FIRST + " " + OPERAND + " " + SECOND;
                FIRST = convert(FIRST, FLOAT_FLAG);
                SECOND = convert(SECOND, FLOAT_FLAG);
                SECOND = evaluate(FIRST, SECOND, OPERAND);
                FIRST = "";
                OPERAND = "";
                disBot.innerHTML = SECOND;
                if(SECOND === "0"){
                    display(0, 1);
                    SECOND = "";
                    return;
                }
                if(val === "=" || isNaN(SECOND))
                {
                    display(0, 1);
                    //errors
                    if(isNaN(SECOND)){ 
                        disBot.innerHTML = "error";
                        if(SECOND === "Noob")
                            disBot.innerHTML = "Noob";
                        disBot.classList.add("err-state");
                        setTimeout(() =>{
                            document.querySelector(".display-bottom").classList.add("remove-error");
                            setTimeout(() =>{
                            document.querySelector(".display-bottom").classList.remove("err-state");
                            document.querySelector(".display-bottom").classList.remove("remove-error");
                            allClear();
                            }, 750);
                        }, 750);
                    }
                    return;
                }
            }
            //when valid operand
            OPERAND = val;
            FIRST = SECOND;
            SECOND = "";
            display(1, 0);
        }
    }
    //inputs only numbers
    else{
        if(SECOND.length < 6)
            SECOND += val;
        disTop.innerHTML = FIRST + " " + OPERAND + " " + SECOND;
        disBot.innerHTML = SECOND;
    }
        
}



//function to populate display
const display = (top, bottom) =>{
    let disTop = document.querySelector(".display-top");
    let disBot = document.querySelector(".display-bottom");
    disTop.innerHTML = top ?  FIRST + " " + OPERAND + " " + SECOND : String.fromCharCode(160);
    disBot.innerHTML = bottom ?  SECOND : String.fromCharCode(160);
};



//function to convert string inputs to numbers/floats
const convert = (num, flag) => {
   return flag ? parseFloat(parseFloat(num).toFixed(2)) : parseInt(num);
};



//function to set event listeners for operand buttons
function getOperands(){
    let opArr = document.querySelectorAll(".buttons");
    opArr = Array.from(opArr);
    opArr.push(document.querySelector(".equals-button"));
    for(i in opArr){
        opArr[i].addEventListener('click', (e)=>setOperands(e));
        temp = opArr[i].getAttribute("id");
    }

}



//send operand button values to handle inputs
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
        case "ac": allClear();
    }
}



//function to reset calculator
const allClear = ()=>{
    let disTop = document.querySelector(".display-top");
    let disBot = document.querySelector(".display-bottom");
    FIRST = "";
    SECOND = "";
    OPERAND = "";
    FLOAT_FLAG = 0;
    disTop.innerHTML = String.fromCharCode(160);
    disBot.innerHTML = "0";
}



//function to make and set event listeners number buttons
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



//function to perform math calculations FLOAT_FLAG handled here
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
                    return "Noob"; 
                    ans = a / b;
                    break;
    }
    if(ans === parseInt(ans))
        FLOAT_FLAG = 0;
    else 
        FLOAT_FLAG = 1;  
    ans = FLOAT_FLAG ? ans.toFixed(2) : ans.toString();
    if(ans.toString().length > 12){
        return "err";
    }
    return ans
}



//function to listen for keyboard inputs and map them to respective variables
function keyboardInput(){
    let body = document.querySelector("body");
    body.addEventListener('keydown', (e)=>{
            pressed = e.key;
            if(parseInt(pressed) || pressed === "0")
                setChar(pressed);
            switch(pressed){
                case "/":
                case "*":
                case "-":
                case "+":
                case ".":setChar(pressed);
                break;
                case "%":setChar("/");
                break;
                case "=":
                case "Enter":setChar("=");
                break;
                case "Backspace":setChar("del");
                break;
                case "Delete": allClear();
                break;
                case "!": setChar("neg");
                break;
            }
    });
}


//inital function calls
addNumbers();
getOperands();
keyboardInput();
alert("Input values limited to 6 and Output value limited to 12");