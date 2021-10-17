import { element, by, ElementFinder } from 'protractor';

export default class ProviderUpdatePage {
  pageTitle: ElementFinder = element(by.id('ratesApp.provider.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#provider-name'));
  logoInput: ElementFinder = element(by.css('input#file_logo'));
  contactInfoInput: ElementFinder = element(by.css('input#provider-contactInfo'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setLogoInput(logo) {
    await this.logoInput.sendKeys(logo);
  }

  async getLogoInput() {
    return this.logoInput.getAttribute('value');
  }

  async setContactInfoInput(contactInfo) {
    await this.contactInfoInput.sendKeys(contactInfo);
  }

  async getContactInfoInput() {
    return this.contactInfoInput.getAttribute('value');
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
