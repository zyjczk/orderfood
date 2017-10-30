function msgShow(msg){
	art.dialog(
		{
			content:msg,
			lock:true,
			fixed:true
		}, 
		function(){
			//alert('yes');
			//dd();
		}
	);
}