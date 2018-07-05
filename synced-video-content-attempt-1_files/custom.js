$(document).ready(function(){

    var activeClass = "vid-active";
    var inactiveClass = "vid-inactive";

    $("[data-vid]").addClass(inactiveClass);

    $("[data-vid]").each(function(index, item){
        var $element = $(item);
        var $video = $($element.attr("data-vid"));
        $video.bind("timeupdate", function(){
            var elementShowAt = $(item).attr("data-vid-active-time");
            if($video[0].currentTime >= elementShowAt){
                //Set others to inactive
                $("[data-vid='#"+$video.attr("id")+"']").removeClass(activeClass).addClass(inactiveClass);
                $element.removeClass(inactiveClass).addClass(activeClass);
            }
        })
    });
});