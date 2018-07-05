$(document).ready(function(){



    var activeClass = "vid-active";
    var inactiveClass = "vid-inactive";

    $("[data-vid]").addClass(inactiveClass);

    $("[data-vid]").each(function(index, item){
        var $element = $(item);
        var $video = $($element.attr("data-vid"));
        $video.bind("timeupdate", function(){
            var elementShowAt = $element.attr("data-vid-active-time");
            if($video[0].currentTime >= elementShowAt){
                //Set others to inactive

                // Theres an issue here - since all those before this one will also be before current time. 
                // This method currently operates for each data-vid item separately, 
                // but we need to know the next item isnt the proper one to be shown and not us.
                //Tried with looking ahead eq index + 1, but it doesnt work cause all this is async

                // Need to order all the showAt times and skip ahead to the most ready one here. 
                // Maybe we dont bind for each [data-vid] then?

                if(!$element.hasClass(activeClass)){
                    $("[data-vid='#"+$video.attr("id")+"']").removeClass(activeClass).addClass(inactiveClass);
                    $element.removeClass(inactiveClass).addClass(activeClass);            
                    $element.trigger("vidactivated");
                    console.log("trigger event");
                }
            }
        })
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