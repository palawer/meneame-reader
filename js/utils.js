"use strict";

const PROXY_URL = "https://api.allorigins.win/get?url=";

async function fetchBase(endpoint) {
  endpoint = endpoint + "&_=" + new Date().getTime();
  const url = `${PROXY_URL}${encodeURIComponent(endpoint)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Network response was not ok.");
  }
  const data = await response.json();
  const objects = JSON.parse(data.contents).objects;
  return objects;
}

function fetchLastStories(status) {
  status = status || "published";
  const rows = 25;
  const endpoint = `https://www.meneame.net/api/list.php?rows=${rows}&status=${status}`;
  return fetchBase(endpoint);
}

function fetchComments(storyId) {
  const endpoint = `https://www.meneame.net/api/list.php?id=${storyId}`;
  return fetchBase(endpoint);
}

function compareKarma(a, b) {
  if (a.karma < b.karma) return 1;
  if (a.karma > b.karma) return -1;
  return 0;
}
