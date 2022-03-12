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
    const pathname = window.location.pathname.replace(BASE_URL, "");
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
    let { path, template, init } = paths[page] || paths.error;
    const $CONTAINER = document.querySelector("#content");
    $CONTAINER.innerHTML = template;
    if (init) {
      init(extraParam);
    }
    path = BASE_URL + path;
    window.history.pushState({}, "Genial", path);
  }
}
