const express = require("express");
// const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");


const app = express();

app.use(express.static("public"));


app.use(bodyParser.urlencoded({extended:true}));

app.get("/" , function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
  const firstName = req.body.FirstName ;
  const lastName = req.body.LastName ;
  const email = req.body.mail ;
  // console.log( FNAME ,LNAME ,email);

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us10.api.mailchimp.com/3.0/lists/468afedca3";

  const options = {
    method: "POST",
    auth: "benita:c42b6e2727d26c00f3b390f73eb24929-us10"
  }




  const request = https.request(url, options, function(response){

    if(response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
    }else {
        res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData);
  request.end();

});


app.post("/failure", function(req, res){
  // res.sendFile(__dirname + "/signup.html");
  res.redirect("/");
})





app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});



// api key
// c42b6e2727d26c00f3b390f73eb24929-us10
// list id
// 468afedca3



// Working codes - new Mailchimp
// https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/18125203#questions/18824508
// https://www.udemy.com/course/the-complete-web-development-bootcamp/learn/lecture/18125203#questions/18812362
