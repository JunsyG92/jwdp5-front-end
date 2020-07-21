import { badgeCount } from './util/Function.js';
badgeCount();

$(window).scroll(function(){
    $(this).scrollTop()>300?$(".top-smooth").addClass("transition-smooth "):$(".top-smooth").removeClass("transition-smooth ")
});