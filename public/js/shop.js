/*!
    * Start Bootstrap - Agency v6.0.2 (https://startbootstrap.com/template-overviews/agency)
    * Copyright 2013-2020 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
    */
(function ($) {
	"use strict"; // Start of use strict
	$(document).ready(function () {


		// Smooth scrolling using jQuery easing
		$('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
			if (
				location.pathname.replace(/^\//, "") ==
				this.pathname.replace(/^\//, "") &&
				location.hostname == this.hostname
			) {
				var target = $(this.hash);
				target = target.length
					? target
					: $("[name=" + this.hash.slice(1) + "]");
				if (target.length) {
					$("html, body").animate(
						{
							scrollTop: target.offset().top - 72,
						},
						1000,
						"easeInOutExpo"
					);
					return false;
				}
			}
		});

		//selected value
		$("#category").change(function () {
			var categ = $("#category option:selected").val();
			categ = categ.split('&');
			if (categ[0] != "accessories") {
				$("#brands").attr("disabled", false);
			} else {

				$("#model").attr("disabled", true);
				$("#version").attr("disabled", true);
			}
		})
		//brand select
		$("#select_brands").change(function () {
			var brand = $("#select_brands option:selected").val();
			if (brand === "") {
				$("#model").attr("disabled", true);
			} else {
				$.ajax({
					url: "/select/model",
					type: "post",
					data: {brand: brand},
					success: (data) => {
						//model select option 출력
						for (var i = 0; i < data.length; i++) {
							$("#model").append(
								'<option value="' + data[i].BASE_M + '">' + data[i].BASE_M + '</option>'
							);
						}

						$("#model").attr("disabled", false);
					}
				})

			}

		})
		//model select
		$("#model").change(function () {
			var model = $("#model option:selected").val();
			var brand = $("#select_brands option:selected").val();
			if (model === '') {
				$("#version").attr("disabled", true);
			} else {
				$.ajax({
					url: "/select/version",
					type: "post",
					data: {model: model, brand: brand},
					success: (data) => {
						//version select option 출력
						for (var i = 0; i < data.length; i++) {
							$("#version").append(
								'<option value="' + data[i].DETAIL_M + '">' + data[i].DETAIL_M + '</option>'
							);
						}

						$("#version").attr("disabled", false);
					}
				})
			}


		})


		// Closes responsive menu when a scroll trigger link is clicked
		$(".js-scroll-trigger").click(function () {
			$(".navbar-collapse").collapse("hide");
		});

		// Activate scrollspy to add active class to navbar items on scroll
		$("body").scrollspy({
			target: "#mainNav",
			offset: 74,
		});

		// Collapse Navbar
		var navbarCollapse = function () {
			var windowwidth = $(window).width();
			if ($("#mainNav").offset().top > 100) {
				$("#mainNav").addClass("navbar-shrink");


			} else {
				$("#mainNav").removeClass("navbar-shrink");

			}
		};
		// Collapse now if page is not at top
		navbarCollapse();
		// Collapse the navbar when page is scrolled
		$(window).scroll(navbarCollapse);

	})

})(jQuery); // End of use strict
