//===========================
this.pay = function(amount, description) {
  var widget = new cp.CloudPayments();
  widget.charge({
      // options
      publicId: "pk_6965d0bae623fc6018912ae8ef462", //id из личного кабинета
      description: description, //назначение
      amount: amount, //сумма
      currency: "RUB" //валюта
    },
    function(options) {
      // success
      //действие при успешной оплате
    },
    function(reason, options) {
      // fail
      //действие при неуспешной оплате
    }
  );
};

function payCpurse() {}

var modal;

function callModal(modal_id, title) {
  title = title ? title : "Заказать звонок";
  modal = $.sweetModal({
    title: title,
    content: $("#call-modal-html").html(),
    width: "500px"
  });
}

var rasr_modal;

function rasrCallModal(modal_id, title) {
  title = title ? title : "Заказать звонок";
  rasr_modal = $.sweetModal({
    title: title,
    content: $("#rasr-modal-html").html(),
    width: "500px"
  });
}


$(function() {
  //====================================
  $("#open-modules").click(function() {
    $("#modules").fadeIn();
  });
  $("#close-btn-modules").click(function() {
    $("#modules").fadeOut();
  });

  //====================================================
  $(".tt-close").click(function(e) {
    e.stopPropagation();
    $(this)
      .closest(".tooltip")
      .hide();
  });
  $(".prices-item .link").click(function(e) {
    e.stopPropagation();
    $(this).append($("#dop-mat").show());
  });
  //===============================================

  $(".faq-load-more").click(function() {
    $("#faq-more").slideToggle();
  });

  //=====================
  $(".play-btn").click(function() {
    var video_url = $(this).data("video");
    var video_container = $(this).closest(".video-container");
    video_container.addClass("video-start");
    video_container.find(".video").attr("src", video_url);
    $(this).hide();
  });
  //=======================

  $(".btn-modal-open").click(function() {});

  // Заказать звонок ===================

  //===================================
  $("#about-as__slider").slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    centerPadding: "100px"
  });

  //============================
  $(".phone-mask").inputmask("+7 (999) 999-99-99");

  //=============================
  var trigger = $("#hamburger"),
    isClosed = false;

  trigger.click(function() {
    burgerTime();
  });

  $(".mobil-menu a").click(burgerTime);

  function burgerTime() {
    if (isClosed == true) {
      trigger.removeClass("is-open");
      trigger.addClass("is-closed");
      $("body").addClass("menu-is-closed");
      $("body").removeClass("menu-is-open");
      isClosed = false;
    } else {
      trigger.removeClass("is-closed");
      trigger.addClass("is-open");
      $("body").addClass("menu-is-open");
      $("body").removeClass("menu-is-closed");
      isClosed = true;
    }
  }

  //===============================
  $(window).on("scroll", function() {
    if ($(this).scrollTop() > 5) {
      $("#header").addClass("header-scrolled");
      $("body").addClass("scrolled");
    } else {
      $("#header").removeClass("header-scrolled");
      $("body").removeClass("scrolled");
    }
  });

  //============================================== balloon animation ======================
  var path = $(".sine-wave");
  $.each(path, function() {
    var x = 0;
    var offset = 0;
    var frequency = 0.3;
    var amplitude = 1;
    var shadow = true;
    var framerate = 60;
    var increment = 2.5;
    var self = $(this);

    var pathFunction = function(x) {
      var result =
        // Function to determine curve
        //0.1*(Math.sin(Math.sqrt(x)-offset))*x;
        Math.sin(Math.sqrt(x * frequency) - offset) * x * (0.1 * amplitude);
      return result;
    };

    var createGraph = function(wave) {
      x = 0;
      var data = [{
        type: "M",
        values: [0, 150]
      }];
      while (x < 300) {
        point = {
          x: x,
          y: 150 - pathFunction(x)
        };
        data.push({
          type: "L",
          values: [point.x, point.y]
        });
        x += 1;
      }
      wave[0].setPathData(data);
    };

    var animate = function() {
      offset += increment / framerate;
      createGraph(self);

      setTimeout(function() {
        requestAnimationFrame(animate);
      }, 1000 / framerate);
    };
    requestAnimationFrame(animate);
  });

  //=============================================
  $('[data-item-num="item-1"]').addClass("active");

  $(".boy-section__list-item")
    .click(function() {
      $("body,html").animate({
        scrollTop: $("#boy-section__inner").offset().top - 100
      }, {
        duration: 500,
        queue: false
      });
      $("[data-item-num]").removeClass("active");

      var item_num = $(this).data("item-num");
      $('[data-item-num="' + item_num + '"]').addClass("active");
    })
    .hover(
      function() {
        $("[data-item-num]").removeClass("hover");
        var item_num = $(this).data("item-num");
        $('[data-item-num="' + item_num + '"]').addClass("hover");
      },
      function() {
        $("[data-item-num]").removeClass("hover");
      }
    );
  //============================================= Скрол
  var scrollLink = $(".scroll");

  // Smooth scrolling
  scrollLink.click(function(e) {
    e.preventDefault();
    $("body,html").animate({
      scrollTop: $(this.hash).offset().top - 50
    }, {
      duration: 1000,
      queue: false
    });
  });

  // Active link switching
  $(window).scroll(function() {
    var scrollbarLocation = $(this).scrollTop();
    scrollLink.each(function() {
      var sectionOffset = $(this.hash).offset().top - 20;
      if (sectionOffset <= scrollbarLocation) {
        $(this)
          .parent()
          .addClass("active");
        $(this)
          .parent()
          .siblings()
          .removeClass("active");
      }
    });
  });
});