const DrawerInitiator = {
  init({
    menuToggle,
    nav,
    aElements,
    checkbox,
  }) {
    this._initialCheckbox(checkbox, false);

    menuToggle.addEventListener('click', (event) => {
      this._toggleDrawer(event, nav);
    });

    aElements.forEach((a) => {
      a.addEventListener('click', (event) => {
        this._aElementsHandler(event, nav);
        this._initialCheckbox(checkbox, !checkbox.checked);
      });
    });
  },

  _initialCheckbox(checkbox, status) {
    const clonedCheckbox = checkbox;
    clonedCheckbox.checked = status;
  },

  _toggleDrawer(event, nav) {
    event.stopPropagation();
    nav.classList.toggle('slide');
  },

  _aElementsHandler(event, nav) {
    event.stopPropagation();
    nav.classList.toggle('slide');
  },
};

export default DrawerInitiator;
