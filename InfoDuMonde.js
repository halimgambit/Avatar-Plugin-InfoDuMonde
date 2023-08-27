exports.action = function(data, callback){

	var tblCommand = {
		infoMonde : function() {infoMonde (data, client);
					},						
		command2 : function() {command2 (data, client);
					}					
	};
	
	let client = setClient(data);
	info("InfoDuMonde:", data.action.command, "From:", data.client, "To:", client);
	tblCommand[data.action.command]();
	callback();
}


function infoMonde (data, client) {

	fetch('https://rss-to-json-serverless-api.vercel.app/api?feedURL=https://www.lemonde.fr/rss/une.xml')
    .then(response => response.json())
    .then(reponse2 =>  {
    console.log(reponse2)
    Avatar.speak(`Info un:  ${reponse2.items[0].description} Info deux: ${reponse2.items[1].description} Info trois: ${reponse2.items[2].description} Info quatre: ${reponse2.items[3].description} Info cinq:  ${reponse2.items[4].description}`, data.client, () => {
	Avatar.Speech.end(data.client);
});
})
	
}

function demandeContinue (data, client) {

}



function command2 (data, client) {
	
}

function setClient (data) {
	var client = data.client;
    if (data.action.room)
	client = (data.action.room != 'current') ? data.action.room : (Avatar.currentRoom) ? Avatar.currentRoom : Config.default.client;
	if (data.action.setRoom)
	client = data.action.setRoom;
	return client;
}