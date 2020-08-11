!(function($) {
  "use strict";

  // Hero typed
  if ($('.typed').length) {
    var typed_strings = $(".typed").data('typed-items');
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {

        var scrollto = target.offset().top;

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  $(document).on('click', '.mobile-nav-toggle', function(e) {
    $('body').toggleClass('mobile-nav-active');
    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
  });

  $(document).click(function(e) {
    var container = $(".mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox();
    });
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out-back",
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  });

})(jQuery);


let languageChosen = ''; // Chosen Language

let currentURL = window.location.href; // Current URL
let lastIndex = currentURL.lastIndexOf('/'); // Last index of '/' in URL
let croppedURL = currentURL.substring(lastIndex + 1); // Get index.html or indexSRB.html

let engIcon = document.querySelector('.lang-icon-eng'); // Eng icon
let srbIcon = document.querySelector('.lang-icon-srb'); // Srb icon

// If URL is index.html language is ENG, if URL is indexSRB.html language is SRB

switch(croppedURL){
  case 'index.html':
    languageChosen = 'eng';
    break;
  case 'indexSRB.html':
    languageChosen = 'srb';
    break;
  default:
    languageChosen = 'eng';
}


let contactForm = document.getElementById('contact-form'); // Contact Form

let name = document.querySelector("#name"); // Name Input
let email = document.querySelector("#email"); // Email Input
let subject = document.querySelector("#subject"); // Subject Input
let message = document.querySelector("#message"); // Message Input

let nameError = document.querySelector("#name-error"); // Name Error Div 
let emailError = document.querySelector("#email-error"); // Email Error Div
let subjectError = document.querySelector("#subject-error"); // Subject Error Div
let messageError = document.querySelector("#message-error"); // Message Error Div

let successMessage = document.querySelector("#success-message"); // Success Div

// Validate Form

function validateForm() {
  successMessage.style.display = "none"; // Disable success message 
  // Remove Scripts
  name = validateInput(name);
  subject = validateInput(subject);
  message = validateInput(message);

  // Check If Valid Inputs

  if(name.value == ""){
    nameError.style.display = "block";

    return false;
  }else{
    nameError.style.display = "none";
  }

  if(!validateEmail(email.value)){
    emailError.style.display = "block";

    return false;
  }else{
    emailError.style.display = "none";
  }

  if(subject.value == ""){
    subjectError.style.display = 'block';

    return false;
  }else{
    subjectError.style.display = "none";
  }

  if(message.value.length < 20){
    messageError.style.display = "block";

    return false;
  }else{
    messageError.style.display = "none";
  }

  // Send message and show success
  emailjs.sendForm('gagi8', 'portfolio_template', contactForm);
  successMessage.style.display = "block";

  return false;
}


name.addEventListener('keyup', () => {
  if(name.value == ""){
    nameError.style.display = "block";

    return false;
  }else{
    nameError.style.display = "none";
  }
});

email.addEventListener('keyup', () => {
  if(!validateEmail(email.value)){
    emailError.style.display = "block";

    return false;
  }else{
    emailError.style.display = "none";
  }
});

subject.addEventListener('keyup', () => {
  if(subject.value == ""){
    subjectError.style.display = "block";

    return false;
  }else{
    subjectError.style.display = "none";
  }
});

message.addEventListener('keyup', () => {
  if(message.value.length < 20){
    messageError.style.display = "block";

    return false;
  }else{
    messageError.style.display = "none";
  }
});

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
}

function validateInput(input){
  // Create a new div element
  let temporalDivElement = document.createElement("div");
  // Set the HTML content with the providen
  temporalDivElement.innerHTML = input.value;

  input.value = temporalDivElement.textContent || temporalDivElement.innerText || "";

  return input;
}

// When user click srb icon change language to Serbian if its not currently Serbian

srbIcon.addEventListener('click', () => {
  if(languageChosen == 'srb'){
    return;
  }else{
    window.location.href = "indexSRB.html";
  }
});

// When user click eng icon change language to English if its not currently English

engIcon.addEventListener('click', () => {
  if(languageChosen == 'eng'){
    return;
  }else{
    window.location.href = "index.html";
  }
});


