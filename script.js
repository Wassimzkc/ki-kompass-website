let selectedCategories = [];



const buttons = document.querySelectorAll(".category");


buttons.forEach(button => {


button.addEventListener("click",()=>{


button.classList.toggle("active");


if(button.classList.contains("active")){

selectedCategories.push(button.innerText);

}

else{

selectedCategories =
selectedCategories.filter(
item => item !== button.innerText
);

}


});


});






function showResults(){


let input =
document.getElementById("userInput").value;


if(input.trim() === ""){

alert("Bitte beschreibe zuerst deine Aufgabe.");

return;

}



localStorage.setItem(
"userNeed",
input
);



window.location.href="ergebnisse.html";


}







const container =
document.getElementById("results-container");



if(container){



let text =
(localStorage.getItem("userNeed") || "")
.toLowerCase();



let results=[];



tools.forEach(tool=>{


let score=0;



tool.keywords.forEach(keyword=>{


if(text.includes(keyword.toLowerCase())){

score++;

}


});



if(score>0){

results.push({

tool:tool,
score:score

});

}


});





results.sort((a,b)=>b.score-a.score);





if(results.length===0){


container.innerHTML=`

<div class="tool-card">

<h2>
Keine eindeutige Empfehlung
</h2>

<p>
Beschreibe deine Aufgabe genauer.
Zum Beispiel: "Ich möchte aus PDFs Lernkarten erstellen."
</p>

</div>

`;



}




results.slice(0,3).forEach(item=>{


let tool=item.tool;



container.innerHTML += `


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
<strong>Preis:</strong>
${tool.price}
</p>


<p>

<strong>
Geeignet für:
</strong>

${tool.use}

</p>



<a href="${tool.link}" target="_blank" rel="noopener noreferrer">

Website besuchen →

</a>



</div>


`;


});


}