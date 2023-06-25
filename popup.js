import { getActiveTabURL } from "./utils.js";

const addNewBookmark = (bookmarksElement, bookmark) => {
	const bookmarkTitleElement = document.createElement("div");
	const newBookmarkElement = document.createElement("div");
	const controlsElement = document.createElement("div");

	bookmarkTitleElement.textContent = bookmark.description;
	bookmarkTitleElement.className = "bookmark-title";

	controlsElement.className = "bookmark-controls";

	newBookmarkElement.id = `bookmark-${bookmark.time}`;
	newBookmarkElement.className = "bookmark";
	newBookmarkElement.setAttribute("timestamp", bookmark.time);

	setBookmarkAttributes("play", onPlay, controlsElement);

	newBookmarkElement.appendChild(bookmarkTitleElement);
	newBookmarkElement.appendChild(controlsElement);
	bookmarksElement.appendChild(newBookmarkElement);
};

const viewBookmarks = (currentBookmarks=[]) => {
	const boookmarksElement = document.getElementById("bookmarks");
	boookmarksElement.innerHTML = "";

	if (currentBookmarks.length > 0) {
		for (let i = 0; i < currentBookmarks.length; i++) {
			const bookmark = currentBookmarks[i];
			addNewBookmark(boookmarksElement, bookmark);
		}
	} else {
		boookmarksElement.innerHTML = '<i class="row"> No bookmarks yet.</i>';
	}
};

const onPlay = e => {};

const onDelete = e => {};

const setBookmarkAttributes = (src, eventListener, controlParentElement) => {
	const controlElement = document.createElement("div");

	controlElement.src = `assets/${src}.png`;
	controlElement.title = src;
	controlElement.addEventListener("click", eventListener);
	controlParentElement.appendChild(controlElement);
};

document.addEventListener("DOMContentLoaded", async () => {
	const activeTab = await getActiveTabURL();
	const queryParameters = activeTab.url.split("?")[1];
	const urlParameters = new URLSearchParams(queryParameters);

	const currentVideo = urlParameters.get("v");

	if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
		chrome.storage.sync.get([currentVideo], data => {
			const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : [];

			viewBookmarks(currentVideoBookmarks);
		});
	} else {
		const container = document.getElementsByClassName("container")[0];

		container.innerHTML = '<div class="title"> This is not a youtube video page.</div>';
	}
});
