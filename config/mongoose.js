var config=require('./config'),
mongoose=require('mongoose');

module.exports=function(){
    var db=mongoose.connect(config.db);
    
    require('../app/models/student.server.model');
    require('../app/models/experience.server.model');
    
    return db;
}