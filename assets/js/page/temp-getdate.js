n =  new Date();
y = n.getFullYear();
m = n.getMonth() + 1;
d = n.getDate();
document.getElementById("date").innerHTML = d + "/" + m + "/" + y;

$("#swal-4").click(function() {
	swal('Good Job', 'You clicked the button!', 'info');
});