 <script>
  var ar = <?php echo json_encode($me); ?>;
  var br = <?php  echo json_encode($others); ?>;
  // alert(ar[0].first_name);
  // alert(br[0].first_name);
</script>


<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.4.0/firebase-app.js"></script>


<!-- ---------------include firebase databases-------------------- -->
<script src="https://www.gstatic.com/firebasejs/7.4.0/firebase-database.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.4.0/firebase-analytics.js"></script>
<!-- </script> -->
 <script>
  
    // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "axxxxxxxxxxxxxxxxxxxxxxxx",
    databaseURL: "xxxxxxxxxxxxxxxxxxxxxxx",
    projectId: "xxxxxxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxxxxxxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxxxxx",
    appId: "xxxxxxxxxxxxxxxxxx",
    measurementId: "xxxxxxxxxxxxxxx"
  };  

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  // create database
  
  var reciverId ;
  var reciverName ;



  firebase.database().ref('messages').once('child_added',function (snapshot){
      // console.log(snapshot.key);
      if(snapshot.val().senderId == ar[0].user_id || snapshot.val().reciverId == ar[0].user_id )
      {

        var data = [];
          if(snapshot.val().senderId == ar[0].user_id)
          {
            var user = [snapshot.val().reciverId,snapshot.val().reciverName ];
            data.push(user);
          }
          else
          {
            var user = [ snapshot.val().senderId,snapshot.val().senderName ];
            data.push(user);
          }
         // console.log(data);
         var html = $('.chat-list').html();
         for (let d of data)
         {  
            html += '<div class="chat-row" data-id="'+ d[0] +'" onclick="openChat('+ d[0]+')" >'; 
              html += d[1];
            html +='</div>'; 
         }
         $('.chat-list').html(html);
      }
      else
      {
        console.log('not found');
      }
    });


  function openChat(id){
    $('#main').val('');
    window.reciverId = id ;
    firebase.database().ref('messages').on('child_added',function (snapshot){
      // console.log(snapshot.key);
      if((snapshot.val().senderId == ar[0].user_id && snapshot.val().reciverId == id )||(snapshot.val().senderId == id && snapshot.val().reciverId == ar[0].user_id ))
      {
        // console.log(snapshot.val().message);
        var html = '';
        var name = '';
        if(snapshot.val().senderId == ar[0].user_id){ 

         name = snapshot.val().reciverName; 
          html += '<div class=""> <div class="gap-sender"></div><div class="sender-msg">';
            html +=  " You : "+snapshot.val().message;
          html += ' </div></div><br>';
        }
        else
        {

             name = snapshot.val().senderName;
            html += '<div class=""> <div class="gap-reciver"></div><div class="recive-msg">';
            html += snapshot.val().senderName +" : "+snapshot.val().message;
             html += ' </div></div><br>';
        }
          window.reciverName = name;
          $('#user_name').html(name);
          document.getElementById('main').innerHTML += html;

      }
      else
      {
        console.log('not found');
      }
    });
  }

  function insert()
  {
    var msg = $('#msg').val();
   /* alert(window.reciverId);
    alert(window.reciverId);*/
    if(msg != '' )
    {
      firebase.database().ref("messages").push().set({
          "senderId":ar[0].user_id,
          "senderName" :ar[0].first_name,
          "reciverId" :reciverId,
          "reciverName" :reciverName,
          "message" :msg
      });
    }
    $('#msg').val('');
  }

   firebase.database().ref('messages').once('child_added',function (snapshot){
      // console.log(snapshot.key);
      if((snapshot.val().senderId == ar[0].user_id && snapshot.val().reciverId == reciverId )||(snapshot.val().senderId == reciverId && snapshot.val().reciverId == ar[0].user_id ))
      {
        // console.log(snapshot.val().message);
        var html = '';
        if(snapshot.val().senderId == ar[0].user_id){  
          html += '<div class=""> <div class="gap-sender"></div><div class="sender-msg">';
            html +=  " You : "+snapshot.val().message;
          html += ' </div></div><br>';
        }
        else
        {
            html += '<div class=""> <div class="gap-reciver"></div><div class="recive-msg">';
            html += snapshot.val().senderName +" : "+snapshot.val().message;
            html += ' </div></div><br>';
        }

          document.getElementById('main').innerHTML += html;
      }
      else
      {
        console.log('not found');
      }
    });

/*
  function getAllDb()
  {
    firebase.database().ref('messages').on('child_added',function (snapshot){
      console.log(snapshot.key);
    });
  }

  function getAllDbValue()
  {
    firebase.database().ref('messages').on('child_added',function (snapshot){
      console.log(snapshot.val());
    });
  }

  function getCondDbValue()
  {
    firebase.database().ref('messages').on('child_added',function (snapshot){
      // console.log(snapshot.key);
      if(snapshot.val().senderId == '1' && snapshot.val().reciverId == '4' )
      {
        console.log(snapshot.val());
      }
      else
      {
        console.log('not found');
      }
    });
  }

  function getCondDeleteValue(){
    firebase.database().ref('messages').on('child_added',function (snapshot){

      if(snapshot.val().senderId == '1' && snapshot.val().reciverId == '4' )
      {
        firebase.database().ref("messages").child(snapshot.key).remove();
      }
      else
      {
        console.log('not found');
      }
    });
  }
*/


</script>
