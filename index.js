var request = require('request');


//GET SESSION ID
var url = 'http://api.foodessentials.com/createsession?uid=ert&devid=ert&appid=ert&f=json&v=2.00&api_key='+process.env.API_KEY
request(url, function(error, response, body){
  if(error){console.log("Error ", error)};
  if(!error && response.statusCode === 200){
    var data = JSON.parse(body);
    var session = data.session_id;
    console.log("session", session);
  }
//CALL FOR LABEL SEARCH
var upc = '043695553840';
var labelUrl = 'http://api.foodessentials.com/label?u='+upc+'&sid=24be5748-d1cf-473a-b572-5d8dbd8e1a2b&appid=demoApp_01&f=json&long=38.6300&lat=90.2000&api_key='+process.env.API_KEY  
  request(labelUrl, function(err, res, bod){
    if(err){console.log("Error", err)};
    if(!err && res.statusCode === 200) {
      var resData = JSON.parse(bod);
      var allergens = resData.allergens;
      var additives = resData.additives;
      console.log(additives);
      //allergens is an array of objects/hashmaps
      for(var i =0; i < allergens.length; i++){        
          var allergen_value = allergens[i].allergen_value;
          // console.log("Value:", allergen_value);
          var allergen_name = allergens[i].allergen_name;
          // console.log("Allergen Name:", allergen_name);
          var allergen_red_ingredients = allergens[i].allergen_yellow_ingredients;
          var allergen_yellow_ingredients = allergens[i].allergen_yellow_ingredients;
          // console.log("Yellow/May contain: ", allergen_yellow_ingredients);
          // console.log("Red/definitely contains: ", allergen_red_ingredients);       
      }
      for(var i = 0; i < additives.length; i++){
          var additive_value = additives[i].additive_value;
          console.log("Value:", additive_value);
          var additive_name = additives[i].additive_name;
          console.log("Additive Name:", additive_name);
          var additive_red_ingredients = additives[i].additive_yellow_ingredients;
          var additive_yellow_ingredients = additives[i].additive_yellow_ingredients;
          console.log("Yellow/May contain: ", additive_yellow_ingredients);
          console.log("Red/definitely contains: ", additive_red_ingredients);  
      }

    }
  })
// GET ADDITIVE DESCRIPTION
var additive_Name = ''
  var additiveUrl = 'http://api.foodessentials.com/getpropdescription?sid=24be5748-d1cf-473a-b572-5d8dbd8e1a2b&type=additive&name='+additive_Name+'&f=json&api_key='+process.env.API_KEY;    
    request(additiveUrl, function(err, res, body){
         if(err){console.log("Error", err)};
    if(!err && res.statusCode === 200) {
      // console.log(body);
    }
    })





});








