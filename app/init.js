define( 'app/init', [
    'app/start',
    'jquery'
], function(app,$) { return {

init: function () {
    $(document).ready(function(){
        app.start();
    });
}

}});
