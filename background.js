/* Description: This file is responsible for the background processes of the extension. 
				This background worker is independent from web page process and can be used to
				perform long running tasks.

	Parameters: tabId - integer - The ID of the tab in which the navigation occurs.
				tab - object - The updated Tab object.
*/

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	// Check if the tab is a youtube video
	if (tab.url && tab.url.includes("youtube.com/watch")) {
		// Get the video id from the url
		const queryParameters = tab.url.split("?")[1];
		// Create a new URLSearchParams object
		const urlParameters = new URLSearchParams(queryParameters);
		
		// Send a message to the content script
		chrome.tabs.sendMessage(tabId, {
			type: "NEW",
			videoId: urlParameters.get("v")
		});
	}
});