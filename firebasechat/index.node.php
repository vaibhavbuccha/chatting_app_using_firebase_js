

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
    authDomain: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
    databaseURL: "xxxxxxxxxxxxxxxxxxxxxxxx",
    projectId: "xxxxxxxxxxxxxxxxxxxx"
    storageBucket: "xxxxxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxxxxx",
    appId: "xxxxxxxxxxxxxxxxxx",
    measurementId: "xxxxxxxxxxx"
  };  

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  // create database
  function insert()
  {
  	alert("working");
	  firebase.database().ref("messages").push().set({
	  		"senderId":'2',
	  		"senderName" :'vaibhav',
	  		"reciverId" :'3',
	  		"reciverName" :'bipin',
	  		"message" :'hello'
	  });
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
</script>

<button onclick="insert()">create</button>
<button onclick="getAllDb()">get all</button>
<button onclick="getAllDbValue()">get all Value</button>
<button onclick="getCondDbValue()">get conditional Value</button>
<button onclick="getCondDeleteValue()">get conditional Delete Value</button>


<br><br>

<div>
	<div>
		
	</div>
	<div style=" width: 350px;height: 400px; border:1px solid black;">
		<div style="width: 350px;height: 400px;  overflow: auto;">
			
		</div>
		<form>
			<textarea style="width: 280px; height:50px;  ">Enter your message Here!</textarea>
			<input type="submit" style="float: right;width: 70px;height: 50px;" name="">
		</form>

	</div>
</div>
