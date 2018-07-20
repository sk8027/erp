var Login = function() {

    var handleLogin = function() {

        $('.login-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                },
                remember: {
                    required: false
                }
            },

            messages: {
                username: {
                    required: "Username is required."
                },
                password: {
                    required: "Password is required."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit
                $('#serverError span').html("Username and Password are required fields");
                $('#serverError', $('.login-form')).show();

            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                error.insertAfter(element.closest('.input-icon'));
            },

            /*submitHandler: function(form) {
                /!*$("#message span").html('System is performing various security checks,Please wait ...');
                $("#message").show();
                $("#error").hide();*!/
                $('#serverError span').html('');
                $('#serverError').hide();
                App.blockUI({
                    target: '#loginContent',
                     message : 'Login in Process,Please wait ...'

                });
                $.post(CONTEXT_PATH+"/app/login", $("#loginForm").serialize())
                    .done(function( data ) {
                        App.unblockUI('#loginContent');
                        //$("#message").hide();
                        if(data.dataHeader.messageType=='ERROR'){
                            $("#serverError span").html(data.dataHeader.message);
                            $("#serverError").show();
                            //window.open(data.data,'_top');
                        }else{
                            var url =data.data.URL;
                            if(data.data.length>1){
                                url = data.data.URL+"?loginAction="+data.data.loginAction+"&loginId="+data.data.userName;
                            }
                            window.open(url,'_self',
                                'menubar=no,toolbar=no,location=no,directories=no,status=no,scrollbars=no,resizable=no,dependent,width='+screen.width+',height='+screen.height+',left=0,top=0');

                            //return popitup(data.data);
                        }
                    });
            }*/
        });

        $('.login-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.login-form').validate().form()) {
                    $('.login-form').submit(); //form validation success, call ajax form submit
                }
                return false;
            }
        });

        $('.forget-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.forget-form').validate().form()) {
                    $('.forget-form').submit();
                }
                return false;
            }
        });

        $('#forget-password').click(function(){
            $('.login-form').hide();
            $('.forget-form').show();
        });

        $('#back-btn').click(function(){
            $('.login-form').show();
            $('.forget-form').hide();
        });
    }

 
  

    return {
        //main function to initiate the module
        init: function() {
            handleLogin();

            // init background slide images
         /*   $('.login-bg').backstretch([
                "resources/assets/pages/img/login/bg1.jpg",
                "resources/assets/pages/img/login/bg2.jpg",
                "resources/assets/pages/img/login/bg3.jpg"
                ], {
                  fade: 1000,
                  duration: 8000
                }
            );
*/
            $('.forget-form').hide();

        }

    };

}();

jQuery(document).ready(function() {
    Login.init();
});