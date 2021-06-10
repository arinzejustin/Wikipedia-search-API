$(document).ready(function(){
  
  
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

 //if ("geolocation" in navigator) {
//   // check if geolocation is supported/enabled on current browser
//   navigator.geolocation.getCurrentPosition(
//    function success(position) {
//         console.log('latitude', position.coords.latitude, 
//                  'longitude', position.coords.longitude);
//    },
//   function error(error_message) {
//    console.error('An error has occured while retrieving location', error_message)
//   }  
// );
// } else {
//   // geolocation is not supported
//   // get your location some other way
//   console.log('geolocation is not enabled on this browser')
// }

});
