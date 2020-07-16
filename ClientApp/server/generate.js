var faker = require('faker');

var database = { busStops: [] };
//var routes = {busStops.routes: []}

var routeList = "1,2,3";
const city = "Houston";

for (var i = 1; i <= 10; i++) {  
  database.busStops.push({
    id: i,
    name: faker.name.firstName(),
    city: faker.name.findName(city),
    routes: routeList,
  });

}

console.log(JSON.stringify(database));
