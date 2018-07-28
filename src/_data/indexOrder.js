/* 
  - create array in JS of all project titles(or some id --> slug) -- manually! XX
  - instead of looping projects on index(work)...
      ...map through project titles array created in JSON X
  - use slug to find project
    --> on every map iteration, find project from graphQL array, look at slug, return the array

  -- Look at array.indexOf() --
*/

//create array below...Umm

const indexOrder = [
  "micro-cabin",
  "17-thompson",
  "object-loft",
  "17-west-71st-street",
  "lift-brooklyn",
  "37-west-12th-street",
  "stairwell",
  "45-crosby-5n",
  "ankara",
  "10-astor",
  "740-broadway-showroom",
  "568-grand-street",
  "58th-street",
  "ward-road",
  "reflect-showroom",
  "lift-huntington",
  "barman",
  "44-monroe",
  "45-crosby-lobby",
  "boatbox",
  "740-broadway",
  "city-of-dreams",
  "clarkson-parkside",
  "83-waverly",
  "elevators",
  "45-crosby-5s",
  "jungle-house",
  "east-riverside-science-park",
  "newline-cinema",
  "riverside",
  "west-53rd-street"
];

export default indexOrder;