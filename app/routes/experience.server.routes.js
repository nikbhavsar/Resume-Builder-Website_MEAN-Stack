var users=require('../../app/controllers/student.server.controller'),
experiences=require('../../app/controllers/experience.server.controller');

module.exports=function(app){
	app.route('/api/experiences')
	.get(experiences.list)
	.post(users.requireLogin,experiences.create);
	
	app.route('/api/experiences/:experienceId')
	.get(experiences.read)
	.put(users.requireLogin,experiences.hasAuthorization,experiences.update)
	.delete(users.requireLogin,experiences.hasAuthorization,experiences.delete);
	
	app.param('experienceId',experiences.experienceByID);
	
};
    
