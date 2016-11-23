
function CalderaFormsAdminClippys( $zone, config, $ ){

    var removed = false, self = this, template;



    this.init = function () {
        template = Handlebars.compile(config.template);

        $.when( get() ).done( function( d ) {
            if( 'object' == typeof d && undefined != typeof d.p  ){
                $.each( d.p, function( i, p  ){
                    if( 3 > i && 'object' == typeof p ){
                        populateClippy(p,i);
                    }
                });

            }else {
                populateClippy( config.fallback, 1 );
            }
        });

        populateClippy( config.email_clippy, 3 );

        $( '.bt-btn' ).on( 'click', function (e) {
            var $this = $( this );
            if( 0 != $this.data( '/cf/bt' ) ){
                e.preventDefault();
                $.get( config.api + '/bt?' + $.param({
                        url: config.url,
                        bt: $this.data('bt')
                    }) ).always( function(){
                    window.open(e.target.href);
                });

            }

        });

    };

    this.remove = function(){
        if ( false === removed ) {
            $zone.fadeOut( 100, function() {
                $zone.remove();
                removed = true;
            });

        }
    };

    function populateClippy( p, i ){
        if( undefined == p.link.bt ){
            p.link.bt = 0;
        }
        document.getElementById( 'caldera-forms-clippy-p' + i ).innerHTML = template(p);



    };


    function get( ) {
        return $.get( url(), {
            crossDomain: true
        } ).done( function(r){
            return r;
        }).error( function(){
            return false;
        });
    }

    function url(  ) {
        var params = $.param({
            p1: config.p1,
            p2: config.p2,
            p3: config.p3,
            url: config.url
        });

        return config.api + '/cf/get?' + params;
    }




}