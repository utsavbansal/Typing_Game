const typingText=document.querySelector('.typing-text p');
const input=document.querySelector('.wrapper .input-field');
const time=document.querySelector('.time span b')
const mistakes=document.querySelector('.mistake span')
const wpm=document.querySelector('.wpm span')
const cpm=document.querySelector('.cpm span')
const btn=document.querySelector('button')

//set value
let timer;
let maxTime=60;
let timeLeft=maxTime;
let charIndex=0;
let mistake=0;
let isTyping=false;

function loadParagraph(){
    const loadParagraph=[ "JavaScript is a versatile programming language that is commonly used for web development.",
    "It allows developers to create dynamic and interactive web pages by manipulating the content and behavior of HTML and CSS.",
    "JavaScript can be run on both the client-side and server-side, making it a powerful tool for building full-stack web applications.",
    "With its rich ecosystem of libraries and frameworks, such as React, Angular, and Node.js, JavaScript enables developers to create complex applications efficiently and effectively.",
    "JavaScript is an interpreted language, which means that scripts written in JavaScript are executed line by line without the need for compilation.",
    "It supports object-oriented, imperative, and functional programming styles, providing developers with flexibility in how they structure and organize their code.",
    "In addition to web development, JavaScript is also used in various other domains such as game development, mobile app development, and server-side scripting.",
    "As the language continues to evolve, with regular updates to the ECMAScript specification, JavaScript remains a vital and in-demand skill for developers."];
    const randomIndex=Math.floor(Math.random()*loadParagraph.length);
    typingText.innerHTML='';
    for(const char of loadParagraph[randomIndex]){
        console.log(char);
        typingText.innerHTML+=`<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',()=>input.focus());
    typingText.addEventListener("click",()=>{
        input.focus()
    })
}


// Handle User Input
function initTyping(){
    const char = typingText.querySelectorAll('span');
    const typedChar=input.value.charAt(charIndex);
    if(charIndex < char.length && timeLeft >0)
    {
        if(!isTyping)
        {
            timer=setInterval(initTime,1000);
            isTyping=true;
        }
        

        if(char[charIndex].innerText===typedChar)
        {
            char[charIndex].classList.add('correct');
            console.log("correct");
        }
        else
        {
            mistake++;
            char[charIndex].classList.add('incorrect');
            console.log("incorrect");
        }
        charIndex++;
        char[charIndex].classList.add('active');
        mistakes.innerText=mistake;
        cpm.innerText=charIndex-mistake;
    }
    else
    {
        clearInterval(timer);   
        input.value='';
    }

}

function initTime(){
    if(timeLeft>0)
    {
        timeLeft--;
        time.innerText=timeLeft;
        let wpmval=Math.round(((charIndex - mistake)/5)/(maxTime-timeLeft)*60);
        wpm.innerText=wpmval;
    }
    else
    {
        clearInterval(timer);


    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft=maxTime;
    time.innerText=timeLeft;
    input.value='';
    charIndex=0;
    mistake=0;
    isTyping=false;
    wpm.innerText=0;
    cpm.innerText=0;
    mistakes.innerText=0;
}

input.addEventListener("input",initTyping);
btn.addEventListener('click',reset);
loadParagraph();
