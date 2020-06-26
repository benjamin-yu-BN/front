const express = require('express');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');
const gql = require('graphql-tag');
const { buildASTSchema } = require('graphql');

const SIZE = 130;
const MAXSIZE = 10;
const SMALLSIZE = 5;
const ZIPSIZE = 5;
const CITYSIZE = 2;
var USERS = [
  {firstname: "John1", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [1, 3], hobbies: ["asd", "seds"]},
  
];
for(let i = 0; i< SIZE; i++){
    //const rand = Boolean(Math.round(Math.random()));
    const firstname = randomString(randomInt(MAXSIZE));
    const lastname = randomString(randomInt(MAXSIZE));
    const middlemame = Boolean(Math.round(Math.random()))? randomString(randomInt(MAXSIZE)):"";
    const prefix = Boolean(Math.round(Math.random()))? randomString(randomInt(SMALLSIZE)):"";
    const nickname = randomString(randomInt(SMALLSIZE));
    const addressline1 = randomString(randomInt(MAXSIZE));
    const addressline2 = randomString(randomInt(MAXSIZE));
    const zipCode = randomZip(ZIPSIZE);
    const city = randomString(randomInt(SMALLSIZE));
    const state = randomString(randomInt(CITYSIZE));
    const country = randomString(randomInt(CITYSIZE));
    const friends = randomFriends();
    const hobbies = randomHobbies();
    var obj = {
      firstname: firstname,
      lastname: lastname,
      middlemame: middlemame,
      prefix: prefix,
      nickname: nickname,
      addressline1: addressline1,
      addressline2: addressline2,
      zipCode: zipCode,
      city: city,
      state: state,
      country: country,
      friends: friends,
      hobbies: hobbies
    }
    USERS.push(obj);
}

function randomInt(rightBound)
{
    return Math.floor(Math.random() * rightBound+1);
}
function randomInt1(rightBound)
{
    return Math.floor(Math.random() * rightBound);
}

function randomString(size)
{
    var alphaChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var generatedString = '';
    for(var i = 0; i < size; i++) {
        generatedString += alphaChars[randomInt1(alphaChars.length)];
    }

    return generatedString;
}

function randomZip(size)
{
    var alphaChars = "1234567890";
    var generatedString = '';
    for(var i = 0; i < size; i++) {
        generatedString += alphaChars[randomInt1(alphaChars.length)];
    }

    return generatedString;
}

function randomHobbies(){
    var res = [];
    for(var i = 0; i < randomInt(SMALLSIZE); i++) {
        res.push(randomString(SMALLSIZE))
    }
    return res;
}
function randomFriends(){
  var res = [];
  for(var i = 0; i < randomInt(SMALLSIZE); i++) {
      res.push(randomInt(SIZE))
  }
  return res;
}



const schema = buildASTSchema(gql`
  type Query {
    users: [User]
    user(id: ID!): [User]
  }
  type Mutation {
    select(id: ID): User
  }
  type User {
    id: ID
    firstname: String!
    lastname: String!
    middlemame: String  
    prefix: String  
    nickname: String 
    addressline1: String  
    addressline2: String   
    zipCode: String
    city: String 
    state: String  
    country: String 
    friends: [ID]
    hobbies: [String]
    select: Boolean
  }
  
`);

const mapPost = (post, id) => post && ({ id, ...post });

const root = {
  users: () => USERS.map(mapPost),
  //user: ({ id }) => mapPost(USERS[id], id),
  user: ({ id }) => USERS.slice(id, id+20).map(mapPost),
  select: ({ id }) => {
    USERS[id].select = !USERS[id].select;
    return mapPost(USERS[id], id);
  },
};

const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema,
  rootValue: root,
  graphiql: true,
}));

const port = process.env.PORT || 4000
app.listen(port);
console.log(`Running a GraphQL API server at localhost:${port}/graphql`);

/*
{firstname: "John2", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [ 4,5], hobbies: ["asd", "seds"]},
  {firstname: "John3", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [6,2], hobbies: ["asd", "seds"]},
  {firstname: "John4", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [3,5], hobbies: ["asd", "seds"]},
  {firstname: "John5", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [2,3], hobbies: ["asd", "seds"]},
  {firstname: "John6", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [4,5], hobbies: ["asd", "seds"]},
  {firstname: "John7", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [2,3], hobbies: ["asd", "seds"]},
  {firstname: "John8", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [4,5], hobbies: ["asd", "seds"]},
  {firstname: "John9", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [2,4], hobbies: ["asd", "seds"]},
  {firstname: "John10", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [3,4], hobbies: ["asd", "seds"]},
  {firstname: "John11", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [3,4], hobbies: ["asd", "seds"]},
  {firstname: "John12", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John13", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John14", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John15", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John16", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John17", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John18", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John19", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John20", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John21", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John22", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John23", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John24", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John25", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John26", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John27", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John28", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John29", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John30", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John31", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John32", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John33", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John34", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John35", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John36", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John37", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]},
  {firstname: "John38", lastname: "Doe", middlemame: "", prefix: "", nickname: "Jo", addressline1: "csedse edwed ewd dw", addressline2: "Stris ede dwng", zipCode: "13232", city: "Chicago", state: "IL", country: "US", friends: [], hobbies: ["asd", "seds"]}
*/