"use strict";

function renderListOfStories(stories) {
  const placeholder = document.getElementById("stories");
  placeholder.replaceChildren();

  for (let i = 0; i < stories.length; i++) {
    const { id, title } = stories[i];
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.textContent = title;
    a.href = "#" + id;
    a.onclick = () => {
      ROUTER.load("story", stories[i]);
    };
    li.appendChild(a);
    placeholder.appendChild(li);
  }
}

function renderStoryComments(story, comments) {
  const st = document.getElementById("story");
  st.textContent = story.content;

  // comments
  const placeholder = document.getElementById("comments");
  placeholder.replaceChildren();

  // sort comments by karma
  comments.sort(compareKarma);

  for (let i = 0; i < comments.length; i++) {
    const { id, user, content, karma } = comments[i];
    const li = document.createElement("li");
    li.textContent = karma + ") " + user + ": " + content;
    placeholder.appendChild(li);
  }
}

window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
});

const PATHS = {
  home: {
    path: "/",
    template: `
      <ul id="stories">
        <div class="spinner"></div>
      </ul>`,
    init: () => {
      fetchLastStories().then((data) => {
        console.log(data);
        renderListOfStories(data);
      });
    },
  },
  story: {
    path: "/story",
    template: `
      <div id="story">
        <div class="spinner"></div>
      </div>
      <ul id="comments">
        <div class="spinner"></div>
      </ul>
    `,
    init: (story) => {
      fetchComments(story.id).then((comments) => {
        renderStoryComments(story, comments);
      });
    },
  },
};

const ROUTER = new Router(PATHS);
