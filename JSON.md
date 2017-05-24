## TURNING THE RESPONSE FROM FUCKING DJANGO INTO KEY VALUE PAIRS AKA SOMETHING USEFULL
```js
// OUR RESPONSE FROM STUPIDASS DJANGO
let results = [[1, "back pain"], [2, "streching"]]
// NEW ARRAY TO PUSH LOOPED ITEMS INTO
let data = []
// LOOP TO ASSIGN KEY TO EACH RESPONSE VALE
// NEED TO KNOW POSITION AND WHAT 'id' TO ASSIGN
for (let i of results) {
  // TURNING ITEMS INTO OBJECT
  let obj = {
    // FIRST RESPONSE VALUE IN THE ARRAY
    id: results[i][0],
    title: results[i][1]
    // more here...
  }
  // ADDING KEY VALUES INTO DATA ARRAY
  data.push(obj)
}
// RETURNING THIS IN THE SERVICE
return data
```
