const express = require('express')
const app = express()
const port = process.env.PORT || 4000

const { users } = require('./state')
const bodyParser = require('body-parser');
const { json } = require('express/lib/response');
// instantiate the application server
app.use(bodyParser.json());

let variableCounter = users.length;

/* BEGIN - create routes here */
// * GET /users
// * Give your server the ability to respond to a GET request with a path "/users" and return the users array from state.js
// * Ex. `res.json(users)`


app.get("/users", function(req, res){
  console.log("GET /users");
  res.json(users)
})

// * GET /users/1
//     * Give your server the ability to respond to a GET request with a path "/users/1"
//  and return the first user object from the users array from state.js

app.get("/users/:id", function(req,res){
  console.log("GET /users/1", req.params.id);
  let found
  for(let i=0; i < users.length; i++){
    let item = users[i]
    if(item._id  == req.params.id){ 
      found = item;
      break;
    }
  }
  if(found) {
    res.json(found); 
    } else {
    res.sendStatus(404);
    }
  
  }
  )


// * POST /users
// * Give your server the ability to respond to a POST request with a path "/users" 
// and add a hard coded user object to the users array from state.js. 
// Use `res.json()` to send the last user in the array (should be the new one) back to the client.
// * If you do another GET request you should see this added
// * You will need to create the hard coded user mentioned above


app.post("/users", function(req, res){
  console.log("POST");
  variableCounter ++;
  let json = req.body;
  let newUser = {};
  // it will be a new object so we need an empty object
  newUser.id = variableCounter;
  newUser.name = json.name;
  // body is where we will type in what we want to add
  newUser.occupation = json.occupation;
  newUser.avatar = json.avatar;
  users.push(newUser);
  res.json(newUser);
  })

  // * PUT /users/1
  // * Give your server the ability to respond to a PUT request with a path "/users/1" 
  // * and just change any key value (ex. name, occupation) on the first user object in the users array in state.js. 
  // * Use `res.json()` to send this user back to the client.

  app.put("/users/:id", function(req, res){
    console.log("PUT /todos/", req.params.id);
    let json = req.body
    let found;
    for(let i=0; i < users.length; i++){
    let item =  users[i]
    if(item._id  == req.params.id){ 
      found = item;
      break;
    }
    }
    if(found) {
      found.name = json.name;
      found.occupation = json.occupation;
      found.avatar = json.avatar;
      res.json(found)
      } else {
      res.sendStatus(404);
    }
    })
    

  // * DELETE /users/1
  // * Give your server the ability to respond to a DELETE request with a path "/users/1" and remove the first item from the users array. 
  // * Use `res.send()` to send back a messsage, "deleted"
app.delete('/users/:id', (req, res) => {
  console.log('DELETE /users/:id', req.params.id);
  let index = -1;
  for (let i = 0; i < users.length; i++) {
    let item = users[i];
    if (item.id == req.params.id) {
      index = i;
      break;
    }
  }
  let found;
  if (index > -1) {
    found = users.splice(index, 1);
  }
  res.send("user has been deleted");
});


/* END - create routes here */

app.listen(port, () => 
  console.log(`Example app listening on port ${port}!`))