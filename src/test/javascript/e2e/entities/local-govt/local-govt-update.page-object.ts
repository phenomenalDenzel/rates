import { element, by, ElementFinder } from 'protractor';

export default class LocalGovtUpdatePage {
  pageTitle: ElementFinder = element(by.id('ratesApp.localGovt.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#local-govt-name'));
  stateSelect: ElementFinder = element(by.css('select#local-govt-state'));
  activeInput: ElementFinder = element(by.css('input#local-govt-active'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setStateSelect(state) {
    await this.stateSelect.sendKeys(state);
  }

  async getStateSelect() {
    return this.stateSelect.element(by.css('option:checked')).getText();
  }

  async stateSelectLastOption() {
    await this.stateSelect.all(by.tagName('option')).last().click();
  }
  getActiveInput() {
    return this.activeInput;
  }
  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }
}
