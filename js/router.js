const BASE_URL = "/meneame-reader";

class Router {
  /**
   * Metodo inicial.
   *
   * @return {void}.
   */
  constructor(paths) {
    this.paths = paths;
    this.initRouter();
  }

  /**
   * Permite inicializar el router
   *
   * @return {void}.
   */
  initRouter() {
    const {
      location: { pathname = "/" },
    } = window;
    if (window.location.host === "palawer.github.io") {
      pathname = pathname.replace(BASE_URL, "");
    }
    const URI = pathname === "/" ? "home" : pathname.replace("/", "");
    this.load(URI);
  }

  /**
   * Permite iniciar la carga de paginas.
   *
   * @return {void}.
   */
  load(page = "home", extraParam) {
    const { paths } = this;
    const { path, template, init } = paths[page] || paths.error;
    const $CONTAINER = document.querySelector("#content");
    $CONTAINER.innerHTML = template;
    if (init) {
      init(extraParam);
    }

    window.history.pushState({}, "Genial", path);
  }
}
