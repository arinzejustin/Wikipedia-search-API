$(document).ready(function(){
  
 var arrTimes = [];
var i = 0; // start
var timesToTest = 5;
var tThreshold = 150; //ms
var testImage = "https://github.githubassets.com/favicons/favicon.svg"; // small image in your server
var dummyImage = new Image();
var isConnectedFast = false;

testLatency(function(avg){
  isConnectedFast = (avg <= tThreshold);
  /** output */
  document.body.appendChild(
    document.createTextNode("Time: " + (avg.toFixed(2)) + "ms - isConnectedFast? " + isConnectedFast)
  );
});

/** test and average time took to download image from server, called recursively timesToTest times */
function testLatency(cb) {
  var tStart = new Date().getTime();
  if (i<timesToTest-1) {
    dummyImage.src = testImage + '?t=' + tStart;
    dummyImage.onload = function() {
      var tEnd = new Date().getTime();
      var tTimeTook = tEnd-tStart;
      arrTimes[i] = tTimeTook;
      testLatency(cb);
      i++;
    };
  } else {
    /** calculate average of array items then callback */
    var sum = arrTimes.reduce(function(a, b) { return a + b; });
    var avg = sum / arrTimes.length;
    cb(avg);
  }
}
  
 var html = '';
/*as the name implies :)*/
function getArticle(value){
 var url = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + value + "&prop=revisions&rvprop=content&format=json";
  $.get(url,function(json){
     if (json.query.searchinfo.totalhits=== 0){
      html = '<div  class="articles"><a href="#"><p>Wikipedia does not understand your search term.<p>Please enter a meaningful search term</a></div>';
     $(".results").append(html);  
    }/*checks if results are more than 1*/
    
    else{
 var results = json.query.search;
      
/*loop to display results one by one*/  
  for (var result=0; result < results.length;result++){
    
    if (result > 10){break;}/*displays only 10 results*/
    html = '<div " class="articles"><a href="https://en.wikipedia.org/wiki/' + results[result].title + '"target="_blank"><h3>' + results[result].title + '</h3><p>' + results[result].snippet + '...</p></a></div>';
    
$(".results").append(html);}

  }/*end of if-block*/
  }, 'jsonp');}/*end of getArticles*/
  
  
function handleSearch(){
 $(".submitBtn").click(function(event){
    var value = $(".searchBox").val();
    event.preventDefault();
    if (value.length > 0){
      $(".results").empty();
       getArticle(value);
    }
    
  });  
}/*end of handleSearch*/
  
 handleSearch();

});
