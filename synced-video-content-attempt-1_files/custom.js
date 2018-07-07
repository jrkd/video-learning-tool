$(document).ready(function(){

    var activeClass = "vid-active";
    var inactiveClass = "vid-inactive";

    $("[data-vid-sync] [data-vid-active-time]").addClass(inactiveClass);

    $("[data-vid-sync]").each(function(){
        var $container = $(this);
        var $video = $($container.attr("data-vid-sync"));
        $video.bind("timeupdate", function(){
            var $vidSyncItems = $container.children("[data-vid-active-time]");
            var $elementToShow = $vidSyncItems
                .filter(function(){ //Only select those whose time has past or is present
                    return $video[0].currentTime >= $(this).attr("data-vid-active-time");
                }).sort(function(a,b){ //order those by active time being largest
                    return parseFloat($(b).attr("data-vid-active-time")) - parseFloat($(a).attr("data-vid-active-time"));
                }
            ).first();
            
            if($elementToShow != null && !$elementToShow.hasClass(activeClass)){
                $vidSyncItems.removeClass(activeClass).addClass(inactiveClass);
                $elementToShow.removeClass(inactiveClass).addClass(activeClass);            
                $elementToShow.trigger("vidactivated");
                console.log("trigger event");
            }
        });

    });  
    //monaco speicifc
    setTimeout(function(){

        var editor = monaco.editor.create(document.getElementById('container'), {
            value: [
                'function x() {',
                '\tconsole.log("WHAT!");',
                '}'
            ].join('\n'),
            language: 'javascript',
            minimap: {
                enabled: false
            },
            readOnly: true
        });
    
    
        $("[data-vid-monaco-text]").each(function(index, item){
            var $element = $(item);
            $element.bind("vidactivated", function(){
                editor.setValue($element.attr("data-vid-monaco-text"));
            });
        });

    }, 500); 

});

//editor.setValue("the whole editor string!")
//editor.updateOptions({ readOnly: true })