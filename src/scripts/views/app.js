import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({
    menuToggle,
    nav,
    aElements,
    checkbox,
    content,
    jumbotron,
  }) {
    this._menuToggle = menuToggle;
    this._nav = nav;
    this._aElements = aElements;
    this._checkbox = checkbox;
    this._content = content;
    this._jumbotron = jumbotron;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      menuToggle: this._menuToggle,
      nav: this._nav,
      aElements: this._aElements,
      checkbox: this._checkbox,
    });
    this._handleJumbotronVisibility();
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();
    const skipLinkElem = document.querySelector('.skip-link');
    skipLinkElem.addEventListener('click', (event) => {
      event.preventDefault();
      document.querySelector('#mainContent').focus();
    });
    this._handleJumbotronVisibility();
  }

  _handleJumbotronVisibility() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const isJumbotronVisible = url === '/' || url === '/explore-restaurant';

    this._jumbotron.style.display = isJumbotronVisible ? 'block' : 'none';
    this._jumbotron.hidden = !isJumbotronVisible;
  }
}

export default App;
