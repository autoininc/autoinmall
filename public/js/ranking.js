var data = JSON.parse($('#e_data').val());

for (var i = 0; i < 3; i++) {
	for (var j = 0; j < 5; j++) {
		$(`#theme${i + 1}_top${j + 1}_img`).attr('src', data['imgPath'][i * 5 + j]).css('width', '100%').css('height', '170px');
		$(`#theme${i + 1}_top${j + 1}_name`).text(data['name'][i * 5 + j]).css('font-weight', 'bold');
		$(`#theme${i + 1}_top${j + 1}`).val(data['pin'][i * 5 + j]);
	}
}
$(".btn").off("click").on("click", (e) => {
	var id = e.target.id;
	var number = id.substring(5, 6);
	var value = e.target.value;
	if (value === "add") {
		$.ajax({
			url: "/admin/ranking/add",
			type: "post",
			data: $("#form_theme" + number).serialize(),
			success: function (data) {
				location.reload();
			},
			error: function () {
				alert("add error");
				location.reload();
			}
		})
	} else if (value === "setting") {
		for (var i = 1; i <= 5; i++)
			$(`#theme${number}_top${i}`).attr("disabled", false);
		$("#" + id).val('finish');
	} else if (value === "delete") {
		alert('Delete complete');
		$.ajax({
			url: "/admin/ranking/delete",
			type: "post",
			data: {theme: $("#theme" + number).val()},
			success: function (data) {
				location.reload();
			},
			error: function () {
				alert("delete error");
				location.reload();
			}
		})
	} else if (value === "finish") {
		$.ajax({
			url: "/admin/ranking/setting",
			type: "post",
			data: {
				theme: $("#theme" + number).val(),
				top1: $("#theme" + number + "_top1").val(),
				top2: $("#theme" + number + "_top2").val(),
				top3: $("#theme" + number + "_top3").val(),
				top4: $("#theme" + number + "_top4").val(),
				top5: $("#theme" + number + "_top5").val()
			},
			success: function (data) {
				location.reload();
			},
			error: function () {
				alert("setting error");
				location.reload();
			}
		})
	}

})
