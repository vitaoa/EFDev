$(window).scroll(function(){
	
});	

$(window).resize(function() {
	
});

$('body').hide();
$(document).ready(function(){
//	console.log(window);
	$('body').show();
});



function popup_show(div_name) {
	$("#"+div_name).fadeIn();
    return false;
}

function popup_close(div_name) {
	$("#"+div_name).fadeOut();
    return false;
}



var banner_mov;
var banner_show = 1;
function index_banner() {
	var pic_count = $(".banner_pic li").length;
	if(pic_count > 1) {
		if(banner_show > pic_count) {
			banner_show = 1;
		}
		if(banner_show < 1) {
			banner_show = pic_count;
		}
		$(".banner_pic li.show").addClass('hide');
		$(".banner_pic li").removeClass('show');
		$(".banner_pic li:eq("+(banner_show-1)+")").addClass('show');

		var banner_btn = "";
		for(var i =1; i <= pic_count; i++ ) {
			if(i == banner_show) {
				banner_btn += "<li class='selected' onClick='index_banner_change("+i+")'><span></span></li>";
			}
			else {
				banner_btn += "<li onClick='index_banner_change("+i+")'><span></span></li>";
			}
		}
		$(".banner_btn").html(banner_btn);

		setTimeout(function(){ 
			$(".banner_pic li").removeClass('hide');
		 }, 500);
		banner_show++;
	}
	else {
		$(".banner_pic li:eq(0)").addClass('show');
	}
}

function index_banner_change(change_id) {
	clearInterval(banner_mov);
	banner_show = change_id;
	index_banner();
	banner_mov = setInterval(index_banner,5000);
}

function index_content1(this_page) {
	$(".index_content1_table").removeClass('show');
	$(".index_content1_menu li").removeClass('selected');
	
	$(".index_content1_table[data="+this_page+"]").addClass('show');	
	$(".index_content1_menu li[data="+this_page+"]").addClass('selected');
}

function main_menu_change() {
	var this_object = $("#main_menu_list");
	if (!this_object.hasClass('hide_menu')) {
		
		if(this_object.hasClass("show_menu")) {
			this_object.addClass('hide_menu');
			setTimeout(function(){ 
				this_object.removeClass('hide_menu');
			}, 500);
		}
		this_object.toggleClass("show_menu");
    
	}
}


var information_bar_mov;
var information_bar_show = 1;

function information_bar() {
	var li_check = information_length_check();
	
	if(li_check == true) {
		var li_count = $("#information_bar li").length;
			if(information_bar_show > li_count) {
				information_bar_show = 1;
			}
			if(information_bar_show < 1) {
				information_bar_show = li_count;
			}
			$("#information_bar li.show").addClass('hide');
			$("#information_bar li").removeClass('show');
			$("#information_bar li:eq("+(information_bar_show-1)+")").addClass('show');
			information_bar_show++;

			setTimeout(function(){ 
				$("#information_bar li").removeClass('hide');
			 }, 500);
	}
	else {
		information_bar();
	}
}

function information_length_check() {
	
	var temp_html = $("#information_bar").html();
	if($("#information_bar li").length < 2 ) {
		temp_html = temp_html + temp_html;
		$("#information_bar").html(temp_html);
	}
	
	if($("#information_bar li").length >= 2) {
		return true;
	}
	else {
		return false;
	}
	
}







