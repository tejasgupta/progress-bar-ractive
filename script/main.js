var ractive = new Ractive({
    // The `el` option can be a node, an ID, or a CSS selector.
    el: '#container',

    // We could pass in a string, but for the sake of convenience
    // we're passing the ID of the <script> tag above.
    template: '#template',

    // Here, we're passing in some initial data
	data : {
        progressbar : [
            {
                id : "bar1",
                value : 25,
                text: "#progress1",
                selected: true,
                add: ""
            },
            {
                id : "bar2",
                value : 50,
                text: "#progress2",
                selected: false,
                add: ""
            },
            {
                id : "bar3",
                value : 75,
                text: "#progress3",
                selected: false,
                add: ""
            }
        ],
        button : ["-25","-10","+10","+25"]
    }
});
// ractive.on('activate', function(event){
// 	alert('activating cha ching');
// 	ractive.set({name: 'hello world', bar1: 50, color: 'red' });

// });
var listener = ractive.on({
    activate : function(event) {
        var val = parseInt(this.get(event.keypath)),
            data = this.get("progressbar"),
            len = data.length,
            add = "",
            i = 0;
        
        for (i; i < len; i++){
            if(data[i].selected){
                var sum = data[i].value+val;
                if(sum<0){
                    sum = 0;
                }
                else if(sum>=100){
                    add = "completed";
                }
                else{
                    sum = sum;
                }
                this.set("progressbar["+i+"].value",sum);
                this.set("progressbar["+i+"].add",add);
            }
        }
    },
    switchProgressbar : function(event,value) {
        var data = this.get("progressbar"),
            len = data.length,
            i = 0;
        console.log(len);
        this.set("progressbar.*.selected",false);
        
        if(navigator.userAgent.indexOf("MSIE 8.0")>0){
            value = document.querySelector(".buttons select").value
        }
        
        for (i; i < len; i++){
            if(data[i].id == value){
                this.set("progressbar["+i+"].selected",true);
            }
        }
    }
});