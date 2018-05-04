(function(window){

var utilities = {};

utilities.isArray = Array.isArray || function(arr) {

 return Object.prototype.toString.call(arr) === '[object Array]';

};

utilities.isFunction = function(func) {

 return Object.prototype.toString.call(func) === '[object Function]';

};

utilities.isObject = function(obj) {

 return Object.prototype.toString.call(obj) === '[object Object]';

};


utilities.by = function(list, n, callback) {
	//Check if list is passed and is array
	if(!list || !this.isArray(list)) throw "by have not received the list parameter correctly.";	
	//Check if n is passed and if n is greater than 0
	if(!n && n > 0) throw "by have not received the n parameter correctly (it must be > 0).";	
	//Check if callback is passed
	if(!callback) throw "by have not received the callback parameter.";	
	//Check if callback is a function
	if(!this.isFunction(callback)) throw "by function didn't received a callback parameter of type function.";

	//For each list item ranging from n-1 to n
	for(var i = n-1; i < list.length; i += n) {
		//executes callback function
		callback(list[i]);
	}
};

utilities.keys = function(object) {
	//define keys locally as array
	var keys = [];

	//for each key index inside the object
	for(key in object) {
		//add the key to keys array.
		keys.push(key);
	}

	//return all the object keys.
	return keys;
};

utilities.values = function(object) {
	//define values locally as array
	var values = [];

	//for each key index inside the object
	for(key in object) {
		//add its object value correlated to values.
		values.push(object[key]);
	}

	//return correlated values
	return values;
};

utilities.pairs = function(object) {
	//define the pairs locally as array
	var pairs = [];

	//for each key index inside the object
	for(key in object) {
		//Add the key index
		pairs.push(key);
		//Then add the key value right after the key index.
		pairs.push(object[key]);
	}

	//return the key/value pairs.
	return pairs;
};


utilities.shuffle = function(array) {
	//Check if array parameter is passed and is array type.
	if(!array || !this.isArray(array)) throw "shuffle have not received the array parameter correctly.";	
	
	//Define the iterator index.
	var i = 0;
	//Define the max random number to the length of the passed array.
	var maxRand = array.length - 1;
	//Temporary variable which will transfer the random items.
	var temp;

	while(i++ < array.length)
	{
		//Choses the first randomic position
		var rand = Math.floor(Math.random() * maxRand);
		//Choses the second randomic position
		var rand2 = Math.floor(Math.random() * maxRand);
		//Assings the first randomic position to tempo
		temp = array[rand];
		//Places the second randomic position to the first randomic position
		array[rand] = array[rand2];
		//Switch the first randomic position with the second randomic position.
		array[rand2] =temp;
	}


	//returns the shuffled array.
	return array;

};

utilities.pluralize = function(n,word,pluralWord) {
	if(n === undefined) throw "pluralize have not received the n parameter correctly.";	
	if(word === undefined) throw "pluralize have not received the word parameter.";			

	if(n === 1) {
		return word;
	}

	if(pluralWord) {
		return pluralWord;
	}

	return word+'s';
};

utilities.toDash = function(str) {
	//Checking string passed
	if(str === undefined) throw "toDash have not received the str parameter correctly.";	

	//Init upper and lower ascii code array
	var upperChar = [];
	var lowerChar = [];

	//Create dashString for readability (mutability) purposes.
	var dashString = str;

	//Populate upperChar array (I do not know if were easier just write the array itself).
	for(var ascii = 65; ascii <= 90; ascii++) {
		upperChar.push(String.fromCharCode(ascii));
	}

	//Populate lowerChar array (I do not know if were easier just write the array itself).
	for(var ascii = 97; ascii <= 122; ascii++) {
		lowerChar.push(String.fromCharCode(ascii));
	}

	//forEach char inside upperArray
	for(var i = 0; i< upperChar.length; i++) {
		//split dashString by upperChar char and implodes it with lowerChar (at the same position) 
		dashString = dashString.split(upperChar[i]).join('-'+lowerChar[i]);
	}
	//Remove spaces from dashString.
	return dashString.split(' ').join('');
};

utilities.toCamel = function(str) {
	//Checking string passed
	if(str === undefined) throw "toCamel have not received the str parameter correctly.";

	//Split str by '-' to array, then proccess the array returning it as string after joining it again.
	return str.split('-').map(function(item,index){
		 
        return (index === 0 ) ? 
        	item[0].toLowerCase()+ item.slice(1): //first char from first array item is lowercase+the rest of the string
        	item[0].toUpperCase()+ item.slice(1); //The other array items are upper case + rest of the string.
	}).join(''); //Join the processed array then return it.
};

utilities.has = function(obj, search) {
	//Check if obj is passed and is object
	if(!obj || !this.isObject(obj)) throw "function has have not received the obj parameter correctly.";
	//Checking search passed
	if(search === undefined) throw "function has have not received the search parameter correctly.";
  	//Look to each item in object
    for(var index in obj) {
    	//if the search value is igual the object value in this index
        if(obj[index] === search) {
          return true;//returns true
        }
    }
  
  //Return false if all array items aren't equals to search
  return false;
};



utilities.pick = function(obj, keys) {
	//Check if obj is passed and is object
	if(!obj || !this.isObject(obj)) throw "function pick have not received the obj parameter correctly.";
	//Checking keys passed
	if(!keys || !this.isArray(keys)) throw "function pick have not received the keys parameter correctly. It must be an array.";

	//Instance new object to be returned
	var newObj = {};
  
  	//For each key value to be verified
    for(var i in keys) {
      //If value exists inside the obj passed.
      if(obj[keys[i]]) {
      	//Add it to newObj
        newObj[keys[i]] = obj[keys[i]];
      }
    }
  
  //Return the new obj
  return newObj;
};


utilities.withoutSymbols = function(input) {
	//Checking string passed
	if(input === undefined) throw "withoutSymbols have not received the input parameter correctly.";

    //Use map into the input parameter context to check each character.
	return [].map.call(input,function(char){
        //Get the char code
        charCode = char.charCodeAt(0);
        //Only return the charCode if it ranges from a-z|A-Z|0-9|(whitespace)
		return ( (charCode >= 65 && charCode <= 90) || (charCode >= 97 && charCode <= 122) || (charCode >= 48 && charCode <= 57) || charCode == 32 )? char :'';

	}).join(''); //Join the proccessed array and returns it.
};

utilities.countWords = function (input) {
	//Checking string passed
	if(!input) throw "countWords have not received the input parameter.";

	// - are being viewed as " " (space) then split string by spaces
	return input.split("-").join(" ").split(" ").filter(function(word){
		//Filter whitespaces.
		return word.trim().length > 0;
	}).length;
};

utilities.harvestLinks = function (input) {

	//Checking string passed
	if(!input) throw "harvestLinks have not received the input parameter.";
	
	input = '<a href="link2" class="cls">Text2</a><a href="mailto:link3" class="cls">Text3</a> <a href="mailto:link3" class="cls">Text3</a> <a href="mailto:link3" class="cls">Text3</a>';

	//a href and text matching pattern
	var pattern = /<a href="(\b[^>]*)" \b[^>]*>([\s\S]*?)<\/a>/g;
	var isEmailPattern = /^mailto:/;
	var harvest = {
    links: [],
    emailAddresses: []
  }; 
	var link = null;
	var linkText = null;
	var cont = 0;

	while ( (m = pattern.exec(input)) != null)
	{
      link = m[1];
      linkText = m[2];
	    
      if(link.search(isEmailPattern) > -1) {
        harvest.emailAddresses.push(link.replace(isEmailPattern,''));
        continue;
      }
    
      harvest.links.push({linkText: linkText, url:link});

	}  

	return harvest;
};


})(window);