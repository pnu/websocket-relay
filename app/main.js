define('app/main', [
    'app/io',
    'app/start',
    'jquery'
],
function(socket,app,$) {
    return {
        init: function () {
            $(document).ready(function(){
                app.start(socket);
            });
        }
    };
});
