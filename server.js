require("dotenv").config();

const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk").default;


const app = express();


// Middleware
app.use(cors());
app.use(express.json());



// Groq Verbindung
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});



// Test Route
app.get("/", (req, res) => {

    res.send("Compass Server läuft!");

});




// KI Route
app.post("/api/compass", async (req, res) => {


    try {


        const userInput = req.body.message;


        if (!userInput) {

            return res.status(400).json({

                error: "Keine Nachricht erhalten"

            });

        }



        const response = await groq.chat.completions.create({


            model: "llama-3.1-8b-instant",


            messages: [

                {

                    role: "system",

                    content:
                    "Du bist Compass by ZKAKI. Deine Aufgabe ist es, Nutzern passende KI-Tools für ihre Aufgaben zu empfehlen. Erkläre deine Empfehlungen verständlich und professionell."

                },


                {

                    role: "user",

                    content: userInput

                }

            ]

        });



        res.json({

            answer: response.choices[0].message.content

        });



    } catch (error) {


        console.error("Groq Fehler:", error);


        res.status(500).json({

            error: "Fehler bei der KI-Verbindung"

        });


    }


});





// Server starten
app.listen(3000, () => {


    console.log("Compass Server läuft auf Port 3000");


});