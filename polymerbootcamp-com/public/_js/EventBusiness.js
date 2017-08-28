function EventBusiness() {

	//const urlSpec = {root:'https://www.polymerbootcamp.com', selectList: '/events.json'}
	const urlSpec = {root:'http://localhost:8070', selectList: '/events.json'}

	var EventDao = BDS.extend({}) 

	var SimpleBusiness = BLX.extend({
		addComp: function(componentSelector) {
			var comp = document.querySelector(componentSelector)
			comp.init(sb) //pass in sb as message bus
		}

		, list: function(componentName) {
			sb.eventDao.selectList().then(function(values) {
					var comp = document.querySelector(componentName) 
					comp.list(values)
				}).catch(function(error) {
					console.log('EventBusiness.selectList error: '+error.message);
				}
			)  
		}
	})

	var sb = new SimpleBusiness()
	sb.eventDao = new EventDao(urlSpec)
	return sb //return instance to page 
}