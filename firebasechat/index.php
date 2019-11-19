<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.4.0/firebase-app.js"></script>


<!-- ---------------include firebase databases-------------------- -->
<script src="https://www.gstatic.com/firebasejs/7.4.0/firebase-database.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.4.0/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxx",
    authDomain: "xxxxxxxxxxxxxxx",
    databaseURL: "xxxxxxxxxxxxxxxxxxx",
    projectId: "xxxxxxxxx",
    storageBucket: "xxxxxxxxxxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxx",
    appId: "xxxxxxxxxxxxxxxxxxx",
    measurementId: "xxxxxxxxxxxxxxxxxxxx"
  };                                                                                  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  // // initialize firebase
  //  Firebasese.initializeApp(firebaseConfig);

  var myName = prompt("enter your name");

  function sendMessage() {
    // get message
    var message = document.getElementById("message").value;
    // alert(message);
    // save in database
    firebase.database().ref("messages").push().set({
      "sender": myName,
      "message": message
    });

    // prevent form from submitting
    return false;
  }

  // listen for incomming message
  firebase.database().ref('messages').on('child_added',function (snapshot){
    var html = '';
    //give each message a unique id 
    html += "<li id='message-"+snapshot.key+"' >"  

    html += '<li>';
      if(snapshot.val().sender == myName){
        html += "<button data-id='"+ snapshot.key +"' onclick='deleteMessage(this);' >";
          html += "Delete";
        html += "</button>";
      }
      html += snapshot.val().sender +": "+snapshot.val().message;
    html += '</li>';

    document.getElementById('messages').innerHTML += html;
  })

  function deleteMessage(self)
  {
    // get message id for delete message
    var messageID = self.getAttribute("data-id");
    // delete the message
    firebase.database().ref("messages").child(messageId).remove();
  }

  firebase.database().ref('messages').on("child_removed",function(snapshot){
    // remove message node
    document.getElementById("message-"+snapshot.key).innerHTML = "This message has been removed";
  })
</script>

<!-- create a form to send message  -->

<form onsubmit="return sendMessage();" >
  <input type="message" placeholder="Enter message" id="message" autocomplete="off">
  <input type="submit" >
</form>
<!-- create a list -->

<ul id="messages">
  
</ul>
