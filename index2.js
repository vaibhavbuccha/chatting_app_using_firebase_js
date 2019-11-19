<script>
 var ar = <?php echo json_encode($me); ?>;
  var br = <?php  echo json_encode($others); ?>;
  $('#user_name').html(br[0].first_name);
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
    apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "xxxxxxxxxxxxx",
    databaseURL: "xxxxxxxxxxx",
    projectId: "xxxxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxxxxxxx",
    appId: "1xxxxxxxxxx",
    measurementId: "xxxxxxxxxxxxx"
  };  

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  
  // create database
  function insert()
  {
    let msg = $('#msg').val();
    // alert(msg);
    if(msg != '')
    {
      firebase.database().ref("messages").push().set({
        "senderId":ar[0].user_id,
        "senderName" :ar[0].first_name,
        "reciverId" :br[0].user_id,
        "reciverName" :br[0].first_name,
        "message" : msg
      });

      /*firebase.database().ref("messages").push().set({
        "senderId":br[0].user_id,
        "senderName" :br[0].first_name,
        "reciverId" :ar[0].user_id,
        "reciverName" :ar[0].first_name,
        "message" : msg
      });*/
    }
    $('#msg').val('');
    getCondDbValue();
  }


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

    firebase.database().ref('messages').on('child_added',function (snapshot){
      // console.log(snapshot.key);
      if((snapshot.val().senderId == ar[0].user_id && snapshot.val().reciverId == br[0].user_id )||(snapshot.val().senderId == br[0].user_id && snapshot.val().reciverId == ar[0].user_id ))
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
</script>
