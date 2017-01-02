/**
 * @file utility funcs for jQuery projects
 *
 */
// + + + + + + + + + + + + + + + + + + + + + + + + + + + +
// object literal with funcs for jquery plug-ins
// + + + + + + + + + + + + + + + + + + + + + + + + + + + +
    var spc = {
    /*general options */
    config: {
        debug: false,
        dev: true
    },
    isDef: function(val){
        return (val===undefined) ? false : true;
    },
    /* get options of object */
    get_options: function(key, options){
        var result = null;
        if ('object' == typeof(options)) {
            result = options[key];
        }
        if (!result) { return ""; }
        return result;
    },
    /* set wai aria roles to list of containern */
    set_wa: function(contlist, ariaattr,ariaval){
        $(contlist).attr(ariaattr, ariaval);
    },
    /* Encode/decode htmlentities */
    encode_entities: function(s){
        return $("<acronym/>").text(s).html();
    },
    decode_entities: function(s){
        return $("<acronym/>").html(s).text();
    },
    /* add func to load event */
    add_loadEvent: function(func_name){
        var lastonload = window.onload;
        if (typeof window.onload != 'function') { window.onload = func_name; }
        else { window.onload = function() { lastonload(); func_name(); }; }
    },
    /* logging for debug */
    _debug: function(msg){
        if(this.config.debug) {
            try{
                if(console){
                    console.log(msg);
                } else{
                    alert(msg);
                }
            }catch(err){
                alert(msg);
            }
        }
    },
    /* return obj values for debug */
    _get_objVs: function(objl){
        try{
            var p = typeof JSON != "undefined" ? JSON.stringify : function(objl){
                var arr = [];
                $.each(objl,function(key,val){
                    var next = key + ": ";
                    next += $.isPlainObject(val) ? printObj(val) : val;
                    arr.push( next );
                });
                return "{ " + arr.join(", ") + " }";
            };
            return p(objl);
        }catch(err){
            this._debug(err);
            return '';
        }
    },
    aria_live: function(setobj){
        if(typeof(setobj)=='object'){
            setobj.attr('aria-live',"polite");
        }
    },
    aria_role: function(setobj, role){
        if(typeof(setobj)=='object'){
            setobj.attr('role',role);
        }
    },
    change_tabindex: function(remobj,setobj,i){
        if(typeof(remobj)=='object'){
            remobj.removeAttr('tabindex');
        }
        if(typeof(setobj)=='object'){
            setobj.attr('tabindex',i);
        }
    },
    /* set focus to dom object: param obj */
    set_newfocusObj: function(focusobj){
        try{
            if(focusobj) focusobj.focus();
        }catch(err){
            this._debug('exception: '+err);
        }
    },
    /* set focus to dom object: param id */
    set_newfocusId: function(fid){
        try{
            var focusobj = document.getElementById(fid);
            if(focusobj) focusobj.focus();
            if(focusobj) console.log(focusobj);
        }catch(err){
            this._debug('exception: '+err);
        }
    },
    /* set focus to nonfocussable dom object:  */
    set_newfocusBox: function(remobj,setobj){
        this.change_tabindex(remobj,setobj,0);
        try{
            if(setobj) setobj.focus();
        }catch(err){
            this._debug('exception: '+err);
        }
    },
    /* set title(s) and remove other title(s) if set */
    set_title: function(remobj,setobj,ctitle){
        if(typeof(remobj)=='object'){
            remobj.removeAttr('title');
        }
        if(typeof(setobj)=='object'){
            setobj.attr('title',ctitle);
        }
    },
    /* count appearances of dom elems with certain markup */
    count: function(jqdom){
        var num = 0;
        $(jqdom).each(function() {
            num++;
        });
        return num;
    },
    countOV: function(objlit){
        var i = 0;
        for (var elem in objlit){
            i++;
        }
        return i;
    },
    /*merge object literals (do not overwrite default, not recursively) */
    merge: function(objl1,objl2,objl3,objl4){
        return $.extend({},objl1,objl2,objl3,objl4);
    },
    /*merge object literals (do not overwrite default, recursively) */
    mergeR: function(objl1,objl2,objl3,objl4){
        return $.extend(true,{},objl1,objl2,objl3,objl4);
    },
    loadImage: function(isrc, func, errfunc){
        try{
            var img = new Image();
            img.onload = func;
            img.onerror = errfunc;
            img.src = isrc;
        }catch(err){
            errfunc();
        }
    },
    tb_getPageSize: function(){
        var de=document.documentElement;
        var w=window.innerWidth||self.innerWidth||(de&&de.clientWidth)||document.body.clientWidth;
        var h=window.innerHeight||self.innerHeight||(de&&de.clientHeight)||document.body.clientHeight;
        arrayPageSize=[w,h];
        return arrayPageSize;
    }
};
