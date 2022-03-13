"use strict";

function renderStory(story, showLinks = false) {
  const container = document.createElement("div");
  container.className = "clearfix";

  // title
  const title = document.createElement("h2");
  title.className = "story-title";
  title.textContent = story.title;
  container.appendChild(title);

  // detail
  const ts = story.date * 1000;
  const detail = document.createElement("div");
  detail.className = "story-detail";
  detail.textContent = story.user + " a las " + new Date(ts).toLocaleString();
  container.appendChild(detail);

  // thumb
  const thumb = document.createElement("img");
  thumb.className = "story-thumb";
  thumb.src = story.thumb;
  thumb.onerror = (e) => {
    e.target.src = BASE_URL + "/img/noimg.jpg";
  };
  container.appendChild(thumb);

  // content
  const content = document.createElement("p");
  content.className = "story-content";
  content.textContent = story.content;
  container.appendChild(content);

  // comments
  const bottom = document.createElement("div");
  bottom.className = "story-bottom";
  container.appendChild(bottom);

  const comments = document.createElement("div");
  comments.textContent = story.comments + " comentarios";
  bottom.appendChild(comments);

  const sub = document.createElement("div");
  sub.textContent = story.sub;
  bottom.appendChild(sub);

  // source
  if (showLinks) {
    const links = document.createElement("div");
    links.className = "story-links";
    container.appendChild(links);

    const source = document.createElement("a");
    source.href = story.source;
    source.textContent = "Abrir fuente original";
    source.target = "_blank";
    links.appendChild(source);

    const url = document.createElement("a");
    url.href = story.url;
    url.textContent = "Abrir en Menéame";
    url.target = "_blank";
    links.appendChild(url);
  }

  return container;
}

function renderComment(comment, position) {
  const container = document.createElement("li");
  container.className = "clearfix comment-id";
  container.id = "comment-" + comment.order;

  //karma
  const medal = MEDALS[position] || "";
  const karma = document.createElement("div");
  karma.className = "comment-karma";
  karma.innerHTML =
    "k: " + comment.karma + ' <span class="comment-medal">' + medal + "</span>";
  container.appendChild(karma);

  // detail
  const detail = document.createElement("div");
  detail.className = "comment-detail";
  detail.textContent = comment.user;
  container.appendChild(detail);

  // content
  const content = document.createElement("p");
  content.className = "comment-content";
  content.innerHTML = parseCommentContent(comment.content);
  container.appendChild(content);

  return container;
}

function renderListOfStories(stories) {
  const placeholder = document.getElementById("stories");
  placeholder.replaceChildren();

  for (let i = 0; i < stories.length; i++) {
    const story = stories[i];

    const li = document.createElement("li");
    placeholder.appendChild(li);

    li.onclick = () => {
      ROUTER.load("story", story);
    };

    const storyNode = renderStory(story);
    li.appendChild(storyNode);
  }
}

function renderStoryComments(comments) {
  const commentsPlaceholder = document.getElementById("comments");
  commentsPlaceholder.replaceChildren();

  // sort comments by karma
  comments.sort(compareKarma);

  for (let i = 0; i < comments.length; i++) {
    const comment = comments[i];
    const commentNode = renderComment(comment, i);
    commentsPlaceholder.appendChild(commentNode);
  }
}

const PATHS = {
  home: {
    path: "/",
    template: `
      <ul id="stories">
        <div class="spinner"></div>
      </ul>`,
    init: () => {
      fetchLastStories().then((data) => {
        renderListOfStories(data);
      });
    },
  },
  story: {
    path: "/story",
    template: `
      <div id="story"></div>
      <ul id="comments">
        <div class="spinner"></div>
      </ul>
    `,
    init: (story) => {
      // story
      const storyPlaceholder = document.getElementById("story");
      const storyNode = renderStory(story, true);
      storyPlaceholder.appendChild(storyNode);

      // comments
      fetchComments(story.id).then((comments) => {
        renderStoryComments(comments);
      });
    },
  },
};

const ROUTER = new Router(PATHS);
const header = document.getElementById("header");
header.onclick = () => {
  ROUTER.load("home");
};

window.addEventListener("DOMContentLoaded", (event) => {});
