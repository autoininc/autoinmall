var username =$('#e_username').val();

if (username) {
	$("#account_ctrl").html('Signout');
	$("#account_ctrl").attr("href", "/signout");
	$("#accountMenu").append('<a class="dropdown-item" style="color:white;" id="management" href="/management">Management</a>');
} else {
	$("#account_ctrl").html('Signin');
	$("#account_ctrl").attr("href", "/signin");
	$("#accountMenu").remove("#management");
}

if ($(window).width() < 976) {
	if (username) {
		$("#resizemenu").html(
			'<li class="nav-item"><a class="nav-link js-scroll-trigger" href="/signout" id="account_ctrl">Signout</a></li>' +
			'<li class="nav-item"><a class="nav-link js-scroll-trigger" href="/cart">Cart</a></li>' +
			'<li class="nav-item"><a class="nav-link js-scroll-trigger" href="/management">Management</a></li>'
		);
	} else {
		$("#resizemenu").html(
			'<li class="nav-item"><a class="nav-link js-scroll-trigger" href="/signin" id="account_ctrl">Signin</a></li>' +
			'<li class="nav-item"><a class="nav-link js-scroll-trigger" href="/cart">Cart</a></li>'
		);
	}
}
$(window).resize(function () {
	if ($(window).width() < 976) {
		if (username) {
			$("#resizemenu").html(
				'<li class="nav-item"><a class="nav-link js-scroll-trigger" href="/signout" id="account_ctrl">Signout</a></li>' +
				'<li class="nav-item"><a class="nav-link js-scroll-trigger" href="/cart">Cart</a></li>' +
				'<li class="nav-item"><a class="nav-link js-scroll-trigger" href="/management">Management</a></li>'
			);
		} else {
			$("#resizemenu").html(
				'<li class="nav-item"><a class="nav-link js-scroll-trigger" href="/signin" id="account_ctrl">Signin</a></li>' +
				'<li class="nav-item"><a class="nav-link js-scroll-trigger" href="/cart">Cart</a></li>');
		}

	} else {
		if (username) {
			$("#resizemenu").html(
				'<div class="dropdown"><a class="nav-link js-scroll-trigger dropdown-toggle" href="#"' +
				'data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Account</a>' +
				'<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
				'<a class="dropdown-item" href="/signout" id="account_ctrl">Signout</a>' +
				'<a class="dropdown-item" href="/cart">Cart</a>' +
				'<a class="dropdown-item" href="/management">Management</a></div></div>'
			);
		} else {
			$("#resizemenu").html(
				'<div class="dropdown"><a class="nav-link js-scroll-trigger dropdown-toggle" href="#"' +
				'data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Account</a>' +
				'<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
				'<a class="dropdown-item" href="/signin" id="account_ctrl">Signin</a>' +
				'<a class="dropdown-item" href="/cart">Cart</a>'
			);
		}
	}
});
