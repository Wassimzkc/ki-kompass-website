async function showResults() {


    const input = document.getElementById("userInput").value;


    if(input.trim() === ""){

        alert("Bitte beschreibe zuerst deine Aufgabe.");

        return;

    }



    try {


        const response = await fetch("http://localhost:3000/api/compass", {


            method: "POST",


            headers: {

                "Content-Type": "application/json"

            },


            body: JSON.stringify({

                message: input

            })


        });



        const data = await response.json();



        localStorage.setItem(
            "compassAnswer",
            data.answer
        );



        window.location.href = "ergebnisse.html";



    } catch(error){


        console.error(error);


        alert(
            "Keine Verbindung zum Compass Server."
        );


    }


}







const container = document.getElementById("results-container");



if(container){


    const answer = localStorage.getItem("compassAnswer");



    if(answer){


        container.innerHTML = `


        <div class="tool-card">


            <h2>
            Compass KI-Empfehlung
            </h2>


            <div class="reason">

            ${answer.replace(/\n/g,"<br>")}

            </div>


        </div>


        `;


    }


}