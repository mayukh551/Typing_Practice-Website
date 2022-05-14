var displayQuote = document.querySelector("h6");
var url = "https://api.quotable.io/random";
// var inputText = document.querySelector("#user-input");
var quoteStr = "";
var arrayQuote;
var correct = true;
var errorList = [];
var str = "";
var prevSpan = null;

async function fetchQuote() {
    const result = await fetch(url);
    const data = await result.json();
    return data.content;
}

// document.body.addEventListener("keydown", (e) => {
//     console.log("Hey there!");
//     console.log(e.key);
// });

document.body.addEventListener("keydown", (e) => {
    // console.log(e);
    if (e.key != 'Shift') {
        // if (str.length <= quoteStr.length)
        //     prevSpan = arrayQuote[str.length - 1];
        console.log('Previous Span HTML', prevSpan);
        if (e.key === "Backspace" && prevSpan != null) {
            prevSpan.classList.remove("correct");
            prevSpan.classList.remove("incorrect");
            str = str.slice(0, str.length - 1);
            prevSpan = arrayQuote[str.length - 1];
            console.log('str after backspace:', str);
        }

        else {
            let specialCharacters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            let lettersAndSpaces = /^[A-Za-z\s]*$/;

            if (lettersAndSpaces.test(e.key) || specialCharacters.test(e.key)) {
                // console.log('Here')
                str = str + e.key;
                // console.log('Current : ', str[str.length - 1], str.length, quoteStr.length);

                var characterSpan = arrayQuote[str.length - 1];
                prevSpan = characterSpan;
                console.log("Current Span HTML :", characterSpan, str[str.length - 1], str.length, quoteStr.length);

                if (str[str.length - 1] === quoteStr[str.length - 1]) {
                    characterSpan.classList.add("correct");
                    characterSpan.classList.remove("incorrect");
                    correct = true;
                    errorList[str.length - 1] = true;
                } else {
                    characterSpan.classList.remove("correct");
                    characterSpan.classList.add("incorrect");
                    correct = false;
                    errorList[str.length - 1] = false;
                }
            }
        }

        if (str.length == quoteStr.length) {
            let count = 0;
            errorList.forEach((condition) => {
                if (condition == true) count++;
            });
            if (count == errorList.length) renderQuote();
            else console.log("Remove the error!");
        }
    }
});

function setQuoteObjToString() {
    arrayQuote = displayQuote.querySelectorAll("span");
    arrayQuote.forEach((characterSpan) => {
        quoteStr += characterSpan.innerText;
    });
    console.log(quoteStr);
}

async function renderQuote() {
    quoteStr = "";
    str = "";
    prevSpan = null;
    const q = await fetchQuote();
    displayQuote.innerText = "";
    // console.log(q);
    q.split("").forEach((element, index) => {
        var characterSpan = document.createElement("span");
        characterSpan.innerText = element;
        errorList[index] = false;
        displayQuote.appendChild(characterSpan);
    });
    setQuoteObjToString();
}

renderQuote();

// Previous COde

// var displayQuote = document.querySelector('h6');
// var url = "https://api.quotable.io/random"
// var inputText = document.querySelector("#user-input");
// var quoteStr = ""
// var arrayQuote;
// var correct = true;
// var errorList = []

// async function fetchQuote() {
//     const result = await fetch(url);
//     const data = await result.json();
//     return data.content;
// }

// inputText.addEventListener('input', (e) => {
//     var prevSpan;
//     let str = inputText.value
//     console.log(str[str.length - 1], str.length, quoteStr.length)
//     if (str.length < quoteStr.length)
//         prevSpan = arrayQuote[str.length]
//     else
//         prevSpan = arrayQuote[str.length - 1]

//     var characterSpan = arrayQuote[str.length - 1]
//     console.log(characterSpan)
//     if (e.inputType === 'deleteContentBackward') {
//         prevSpan.classList.remove('correct')
//         prevSpan.classList.remove('incorrect')
//     }

//     if (str[str.length - 1] === quoteStr[str.length - 1]) {
//         characterSpan.classList.add('correct')
//         characterSpan.classList.remove('incorrect')
//         correct = true;
//         errorList[str.length - 1] = true;
//     }
//     else {
//         characterSpan.classList.remove('correct')
//         characterSpan.classList.add('incorrect')
//         correct = false;
//         errorList[str.length - 1] = false;
//     }

//     if (str.length == quoteStr.length && correct == true)
//     {
//         let count = 0;
//         errorList.forEach((condition) => {
//             if(condition == true)
//                 count++
//         })
//         if(count == errorList.length)
//             renderQuote();
//         else
//             console.log('Remove the error!');
//     }

// })

// function setQuoteObjToString() {
//     arrayQuote = displayQuote.querySelectorAll('span')
//     arrayQuote.forEach((characterSpan) => {
//         quoteStr += characterSpan.innerText
//     })
//     console.log(quoteStr)
// }

// async function renderQuote() {
//     quoteStr = "";
//     const q = await fetchQuote();
//     displayQuote.innerText = "";
//     // console.log(q);
//     q.split('').forEach((element, index) => {
//         var characterSpan = document.createElement('span');
//         characterSpan.innerText = element;
//         errorList[index] = false;
//         // characterSpan.classList.add('#quote-content');
//         displayQuote.appendChild(characterSpan);
//     });
//     inputText.value = null;
//     setQuoteObjToString();
// }

// renderQuote();
