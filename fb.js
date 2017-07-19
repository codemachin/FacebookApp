$( document ).ready(function() {
    
    $('.loader').hide();
    //although loader will be hidden due to being inside the collapsable divs , but still hidden due to precautionary purposes
    
    var myFacebookToken = 'EAACEdEose0cBACvlSTyEZB2hxvaXZACmlfpHMLqTyQgTzvI3CrJI8ODFKNUONRioILeAMYosmzBeTq2Y4KJiZAd4MZAgjiN1g9YzpY3Gy1APjknYs1Vt908LKKFKJ5UwqrqOOwHC5JVZB1ccMwDNPR2QyHiOfni7RiwmAx3xniOjTcVoO7gxwzzXY7VHZAxN4ZD';
    //Face book token here

    function getFacebookInfo(){
        $("#btn2").toggle();
        //hides button2 when button 1 is clicked(and profile page opens)

        $.ajax('https://graph.facebook.com/me?fields=about,email,birthday,education,work,hometown,relationship_status,name,location,family,id&access_token='+myFacebookToken,{

                success : function(response){
                    console.log(response);
                    console.log(typeof(response));
                    $("#profilePic").html("<img src=" +'"https://graph.facebook.com/'+response.id+'/picture?width=300&height=300"'+ "class='img-responsive'>");
                    $("#name").text(" " + response.name);
                    $("#email").text(" " + response.email);
                    $("#bday").text(" " + response.birthday);
                    $("#htown").text(" " + response.hometown.name);
                    $("#currLoc").text(" " + response.location.name);
                    $("#relStatus").text(" " + response.relationship_status);

                    var eduDetail="";
                    jQuery.each( $( $(response.education).get().reverse() ), function( i, val ) {
                        eduDetail += ("<u>"+val.type +"<br>"+val.school.name +"<br><br>")
                        
                    });
                    $("#edu").html(eduDetail);
                    //eduDetail stores school type and school name on each iteration

                    var detail="";
                    jQuery.each( $( $(response.work).get().reverse() ), function( i, val ) {
                        
                        detail += ("<u>"+val.position.name+"</u> at" +"<br>"+val.employer.name +"<br><br>");
                        
                        

                    });

                    $("#work").html(detail);

                    //Details variable stores all the work details (adds them up after each iteration)
                },
                error : function(request,errorType,errorMessage){

                    console.log(request);
                    console.log(errorType);
                    alert(errorMessage+" Problem connecting with facebook. Please check you are using correct user access token. Check your internet connection");
                    //if there is a time out error or the ajax request fetches invalid or no details it
                    //prompts the user to check his/her access token details or internet connectivity
                },

                timeout:3000, // in ms

                beforeSend : function(){

                    $('.loader').show();

                },

                complete : function(){

                   $('.loader').hide();

                }

            }//end argument list 



        );// end ajax call 


    }
    function getFeeds(){
    $("#btn1").toggle();
    $.ajax('https://graph.facebook.com/me?fields=feed{message,picture,story,created_time}&access_token='+myFacebookToken,{

                success : function(response){
                    console.log(response);
                    console.log(typeof(response));
                    
                    
                    var allFeeds="";
                    jQuery.each((response.feed.data), function( i, val ) {
                        if(val.message!==undefined){
                            var msg = val.message;
                        }else{var msg = "No Message"};
                        //Error handles the message so that if there is no message it does not show undefined

                        if(val.picture!==undefined){
                            var imge = val.picture;
                        }else{var imge = "fthumb.png"}
                        //Error handles the image thumbnail so that if there is none it shoes a common facebook thumbnail
                        
                        allFeeds += (val.story +"<br> on "+val.created_time +"<br><br>"+"<img class='img-responsive center-block' src='"+imge+"'><br>Message : "+msg+"<br><hr style='min-width:85%; background-color:#a1a1a1 !important; height:1px;'/><br>");
                        
                        
                    });
                    $("#feed").html(allFeeds);
                    //allFeeds stores all the post details ( adding each one after every iteration)


                    
                },
                error : function(request,errorType,errorMessage){

                    console.log(request);
                    console.log(errorType);
                    alert(errorMessage+" Problem connecting with facebook. Please check you are using correct user access token. Check your internet connection");
                    //if there is a time out error or the ajax request fetches invalid or no details it
                    //prompts the user to check his/her access token details or internet connectivity
                },

                timeout:3000, // in ms

                beforeSend : function(){

                    $('.loader').show();

                },

                complete : function(){

                   $('.loader').hide();

                }

            }//end argument list 



        );// end ajax call 
    }
    

    $("#btn1").on('click',getFacebookInfo);
    $("#btn2").on('click',getFeeds);
    //executes both clicks
});