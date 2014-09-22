/* global hljs, $, console */
/* jshint browser: true */
hljs.initHighlightingOnLoad();

$("#main").fitVids();

function featuredImage() {
    if($('#featured').length){
        $('#header').css('background-image','url('+$('#featured').attr('src')+')');
    }
}


function fullImage(){
    $(".full").each(function() {
        $(this).addClass("full-loaded");
        $(this).closest("p").css("min-height",$(this).height());
        $(this).closest("p").addClass("full-image-container");
    });
}

$(".gallery").imagesLoaded(gallery);
$(window).resize(gallery);


function gallery(){
    var size = 0;
    if ($(window).height() > $(window).width()){
        size = $(window).height();
    } else {
        size = $(window).width();
    }
    if (size < 210 ){
        size = 210;
    }
    $('.gallery').removeWhitespace().collagePlus(
        {
            'targetHeight':size/5
        }
    );
}

var timesince=function(t){var n={prefix:"",future:"",suffix:" sedan",seconds:"Några sekunder",minute:"En minut",minutes:"%d minuter",hour:"Mindre än en timme",hours:"%d timmar",day:"En dag",days:"%d dagar",month:"En månad",months:"%d månader",year:"Ungefär ett år",years:"%d år"};var r=function(e,t){return n[e]&&n[e].replace(/%d/i,Math.abs(Math.round(t)))};var i=function(e){if(!e)return;e=parseInt(e)*1e3;e=new Date(e);var t=new Date;var i=(t.getTime()-e)*.001>>0;var s=i/60;var o=s/60;var u=o/24;var a=u/365;return n.prefix+(i<0&&r("future")||i<45&&r("seconds",i)||i<90&&r("minute",1)||s<45&&r("minutes",s)||s<90&&r("hour",1)||o<24&&r("hours",o)||o<42&&r("day",1)||u<30&&r("days",u)||u<45&&r("month",1)||u<365&&r("months",u/30)||a<1.5&&r("year",1)||r("years",a))+(i<0&&""||n.suffix)};var s=document.getElementsByClassName("timesince");for(var o in s){var u=s[o];if(typeof u==="object"){u.innerHTML=i(u.dataset.timesince||u.dataset.timesince)}}setTimeout(timesince,6e4)}


$(window).load(timesince);
$("#main").imagesLoaded(fullImage);
$("#main").imagesLoaded(featuredImage);
$(window).resize(fullImage);