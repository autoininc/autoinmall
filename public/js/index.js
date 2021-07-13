var category = JSON.parse($('#e_category').val());
var itembrand = JSON.parse($('#e_itembrand').val());
var carbrand = JSON.parse($('#e_carbrand').val());
var ranking = JSON.parse($('#e_ranking').val());
var main_img = $('#e_main_img').val();

//ranking
$(document).ready(function () { $(".masthead").css("background-image", "url('" + main_img + "')"); })

for (var m = 0; m < ranking.length; m++) {
	var theme_num = parseInt(m / 5) + 1;
	for (var n = 1; n <= 5; n++) {
		if (ranking[m][`TOP${n}`] === ranking[m].PIN) {
			$(`#theme${theme_num} strong`).html(ranking[m].THEME);
			$(`#theme${theme_num}_top${n}_link`).attr("href", "/item/info?pin=" + ranking[m].PIN);
			$(`#theme${theme_num}_top${n}`).attr("src", "/img/item/" + ranking[m].IMG1);
			$(`#theme${theme_num}_top${n}_name strong`).html(ranking[m].ITEM_NAME);
		}
	}
}

//print carbrand
for (var l = 0; l < carbrand.length; l++) {
	if (carbrand[l].IMG === null) {
		carbrand.splice(l, 1);
	}
	$(".swiper-wrapper").append(
		'<div class="swiper-slide brand_slide"><a href="/search?brands=' + carbrand[l].NAME + '"><img class="img-fluid d-block mx-auto"' +
		'src="/img/car_brands/' + carbrand[l].IMG + '" alt="" /></a></div>'
	)
}
for (var i = 0; i < carbrand.length; i++) {
	$("#select_brands").append(
		'<option value = "' + carbrand[i].NAME + '">' + carbrand[i].NAME + '</option>'
	);
}

//print itembrand
for (var k = 0; k < itembrand.length; k++) {
	var flag = k % 6;
	if (itembrand[k].IMG === null) {
		itembrand.splice(k, 1);
	}
	$(`#ib_section${flag}`).append('<div style="height:50px;width:180px;"><a href="/search?itembrand=' + itembrand[k].NAME + '"><img class="img-fluid d-block mx-auto"' + 'src="/img/item_brands/' + itembrand[k].IMG + '" alt="img" /></a></div><br>');
}

for (var i = 0; i < category.length; i++) {
	var s_c = String(category[i].ID).split('_');
	var main = s_c[0];
	var sub = s_c[1];
	if (i === 0) {
		$("#category").html(
			'<option value="">Choose...</option>' +
			'<optgroup label ="' + main + '">' +
			'<option value="' + category[i].ID + '">' + sub + '</option></optgroup>'
		);
	} else {
		if (main === String(category[i - 1].ID).split('_')[0]) {
			$("optgroup[label = '" + main + "']").append(
				'<option value="' + category[i].ID + '">' + sub + '</option>'
			);
		} else if (i !== (category.length) - 1 && main !== String(category[i - 1].ID).split('_')[0]) {
			$("#category").append(
				'<optgroup label ="' + main + '">' +
				'<option value="' + category[i].ID + '">' + sub + '</option>'
			);
		}
	}
}
