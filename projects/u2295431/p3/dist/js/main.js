$(document).ready(function () {
  $(".carousel__inner").slick({
    speed: 300,
    adaptiveHeight: true,
    prevArrow: "<button class='slick-prev'><img src='img/icons/left.png' /></button>",
    nextArrow: "<button class='slick-next'><img src='img/icons/right.png' /></button>",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  });

  $("ul.catalog__tabs").on("click", "li:not(.catalog__tab_active)", function () {
    $(this)
      .addClass("catalog__tab_active")
      .siblings()
      .removeClass("catalog__tab_active")
      .closest("div.container")
      .find("div.catalog__content")
      .removeClass("catalog__content_active")
      .eq($(this).index())
      .addClass("catalog__content_active");
  });

  $(".catalog-item__link").each(function (i) {
    $(this).on("click", function (e) {
      e.preventDefault();
      console.log($(this).parent().parent().toggleClass("catalog-item__wrapper_show-descr"));
    });
  });

  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn();
  });

  $(".button_mini").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal__descr").text($(".catalog-item__subtitle").eq(i).text());
      $(".overlay, #order").fadeIn();
    });
  });

  $(".modal__close").on("click", function () {
    $(".overlay, .modal").fadeOut();
  });

  $("form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/",
      data: $(this).serialize(),
    });
    console.log($(this).serialize());
  });
});
