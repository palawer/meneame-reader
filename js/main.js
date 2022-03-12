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
      ROUTER.load("story");
    };
    li.appendChild(a);
    placeholder.appendChild(li);
  }
}

function startApp() {
  fetchLastStories().then((data) => {
    console.log(data);
    renderListOfStories(data);
  });
  /*
  fetchComments(3636716).then((data) => {
    console.log(data);
  });
  */
}

window.addEventListener("DOMContentLoaded", (event) => {
  console.log("DOM fully loaded and parsed");
  //startApp();
});

const PATHS = {
  home: {
    path: "/",
    template: `<ul id="stories">Loading...</ul>`,
    init: () => {
      fetchLastStories().then((data) => {
        console.log(data);
        renderListOfStories(data);
      });
    },
  },
  story: {
    path: "/story",
    template: `<h1>👩🏻‍💻 Sobre mi</h1>`,
  },
};

const ROUTER = new Router(PATHS);
