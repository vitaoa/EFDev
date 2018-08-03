// var stepStrCon = "Fasapay-1";
// var stepStrBtn = "gotostep-1";
// var stepStrCon = stepStrCon.split("-");
// var stepStrBtn = stepStrBtn.split("-");
// var stepZifu = stepStrCon[1];


$("[class*='gotostep-']").click(function () {	

// var x = 1,
// 	y = x+1;
// 	z = x-1;
// 	$("#Fasapay-"+x).hide();
// 	$("#Fasapay-"+y).show();
	$(this).parent().parent().parent().parent().parent().hide().next().show();
});


// back
var backPrimite =function(){
	$(this).parent().parent().parent().parent().parent().hide();
}
$("#backstep-7").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$("#Fasapay-6").show();
});
$("#backstep-6").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$("#Fasapay-5").show();
});
$("#backstep-5").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$("#Fasapay-4").show();
});
$("#backstep-4").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$("#Fasapay-3").show();
});
$("#backstep-3").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$("#Fasapay-2a").show();
});
$("#backstep-2a").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$("#Fasapay-2").show();
});
$("#backstep-3").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$("#Fasapay-2a").show();
});
$("#backstep-2").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$("#Fasapay-1").show();
});
$("#backstep-1").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".skrill-01").show();
});


// skrill
$(".backstep-8").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".skrill-06").show();
});
$(".backstep-7").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".skrill-06").show();
});
$(".backstep-6").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".skrill-05").show();
});
$(".backstep-5").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".skrill-04").show();
});
$(".backstep-4,.backstep-4a").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".skrill-03").show();
});
$(".backstep-3").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".skrill-02").show();
});
$(".backstep-2").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".skrill-01").show();
});
$("#logintoSkrill").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".skrill-04-2").show();
});



// help2pay
$(".backstep-18").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".help2pay-18").show();
});
$(".backstep-17").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".help2pay-17").show();
});
$(".backstep-16").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".help2pay-16").show();
});
$(".backstep-15").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".help2pay-15").show();
});
$(".backstep-14").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".help2pay-14").show();
});
$(".backstep-13").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".help2pay-13").show();
});
$(".backstep-12").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".help2pay-12").show();
});
$(".backstep-11").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".help2pay-11").show();
});
$(".backstep-10").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".help2pay-10").show();
});
$(".backstep-9").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".help2pay-09").show();
});
$(".backstep-8").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".help2pay-08").show();
});
$(".backstep-7").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".help2pay-07").show();
});
$(".backstep-6").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".help2pay-06").show();
});
$(".backstep-5").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".help2pay-05").show();
});
$(".backstep-4").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".help2pay-04").show();
});
$(".backstep-3").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".help2pay-03").show();
});
$("#backstep-2").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".help2pay-02").show();
});
$(".backstep-1").click(function(){
	$(this).parent().parent().parent().parent().parent().hide();
	$(".skrill-01").show();
});













$("#gotostep-7,.gotostep-18").click(function(){
	$(this).parent().parent().parent().parent().parent().show();
});