let selectedCategories = [];



// Kategorien auswählen

const categoryButtons =
document.querySelectorAll(".category");



categoryButtons.forEach(button => {


button.addEventListener("click",()=>{


button.classList.toggle("active");



if(button.classList.contains("active")){

selectedCategories.push(
button.innerText
);

}
else{

selectedCategories =
selectedCategories.filter(
item => item !== button.innerText
);

}


});


});





// Ergebnisse öffnen

function showResults(){


const text =
document.getElementById("userInput").value;



localStorage.setItem(
"userNeed",
text
);



window.location.href =
"ergebnisse.html";


}







// Ergebnisse erzeugen


const resultContainer =
document.getElementById(
"results-container"
);



if(resultContainer){


const userText =
localStorage.getItem(
"userNeed"
)
.toLowerCase();




let matches = [];



tools.forEach(tool=>{


let score = 0;



tool.keywords.forEach(keyword=>{


if(
userText.includes(
keyword.toLowerCase()
)
){

score++;

}


});



if(score > 0){

matches.push({

tool:tool,

score:score

});


}


});





matches.sort(
(a,b)=>b.score-a.score
);





if(matches.length === 0){


resultContainer.innerHTML = `

<div class="tool-card">

<h2>
Keine eindeutige Empfehlung gefunden
</h2>

<p>
Versuche deine Aufgabe genauer zu beschreiben.

</p>

</div>

`;



}






matches.slice(0,3).forEach(item=>{


let tool=item.tool;



resultContainer.innerHTML += `


<div class="tool-card">


<h2>
${tool.name}
</h2>


<p>
${tool.description}
</p>


<div class="reason">

<strong>
Warum empfohlen:
</strong>

<br>

${tool.reason}

</div>



<p>
${tool.price}
</p>


<a href="${tool.link}" target="_blank">

Website öffnen →

</a>


</div>


`;


});


}