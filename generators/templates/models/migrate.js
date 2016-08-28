var db = require('./index.js');
var co = require('co');

function * production(){
    //db.sync({force:true});
}

function * init(){
    db.sync({force:true});
    //yield Seed();
}

var pro = process.argv[2] == '--pro';
co(function * () {
    if(pro){
        yield production();
    }else{
        yield init();
    }
    console.log('finished ...');
    process.exit(0);
}).catch(function (err){
    console.log(err.stack);
});