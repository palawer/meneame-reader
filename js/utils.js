"use strict";

const BASE_URL = "/meneame-reader";
const PROXY_URL = "https://api.allorigins.win/get?url=";
const MEDALS = {
  0: "🥇",
  1: "🥈",
  2: "🥉",
};

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

function parseCommentContent(text) {
  text = text.replace(
    ///(^|\s)(#[a-z\d-]+)/gi,
    /(^|\s)(#[0-9]+)/gi,
    '$1<a href="$2">$2</a>'
  );
  // emojis
  text = text.replace(
    /(^|\s){([a-z\d-]+)}/gi,
    '$1<img src="https://mnmstatic.net/v_149/img/menemojis/36/$2.png" alt="$2" class="comment-emoji">'
  );
  return text;
}
