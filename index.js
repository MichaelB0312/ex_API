import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke";
const dash_sep = '----------------------------------------------';

console.log(dash_sep.length);
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", async (req, res) => {
  try {
    const response = await axios.get(API_URL + '/Any?format=txt');
    //console.log(response.data);
    //const result = JSON.stringify(response.data);
    console.log(result);
    res.render("index.ejs", { data: response.data});
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  } 
});

app.post("/", async (req, res) => {
  console.log(req.body);
  const usr_category = req.body["category"];
  const black_list = req.body["Block Topics"];
  
  const searched_word = req.body["searched_word"];
  const jokes_num = req.body["jokes_num"];

  try {
    let axios_dir = API_URL;
    if(usr_category){
      axios_dir += `/${usr_category}?format=txt`;
    }
    else{
      axios_dir += `/Any?format=txt`;
    }
    // if (black_list){
    //   axios_dir += `&blacklistFlags=${black_list}`;
    // }

    if(searched_word){
      axios_dir += `&contains=${searched_word}`;
    }

    if(jokes_num){
      axios_dir += `&amount=${jokes_num}`;
    }
    

    // Render the index.ejs file with a single *random* activity that comes back
    // from the API request.
    const selectedChoices = req.body["choices"] || [];
    
    // keep checkers marked even after submitting
    const checked = {};
    const choicesArray = Array.isArray(selectedChoices) ? selectedChoices : [selectedChoices];
    choicesArray.forEach(choice => {
      checked[choice] = 'checked'; // Set 'checked' attribute for selected checkboxes
    });

    if(choicesArray[choicesArray.length-1] == 'safeMode'){
      axios_dir += `&safe-mode`;
      choicesArray.pop();
    }

  
    if(choicesArray[choicesArray.length-1] == 'single' ||
      choicesArray[choicesArray.length-1] == 'twopart'){
          
          axios_dir += `&type=${choicesArray[choicesArray.length-1]}`;
          choicesArray.pop();
    }


    if (choicesArray) {
      console.log('Selected choices:', choicesArray);
      
      axios_dir += `&blacklistFlags=${choicesArray}`;
     
      // Do something with the selected choices, like saving to a database
    } else {
      console.log('No choices selected.');
    }

    const response = await axios.get(axios_dir);
    
    res.render("index.ejs", { data: response.data, checked: checked, dash_line: dash_sep, jokes_num:jokes_num });
    
    console.log("wiii " + response.data.slice(2,5));
  } catch (error) {
    console.error("Failed to make request:", error.message);
    //console.error(error.response.status);
    res.render("index.ejs", {
      error: error.message,
      error_stat: error.response.status
    });
  }
  
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
