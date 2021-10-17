import { element, by, ElementFinder } from 'protractor';

export default class OtpUpdatePage {
  pageTitle: ElementFinder = element(by.id('ratesApp.otp.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  codeInput: ElementFinder = element(by.css('input#otp-code'));
  actionSelect: ElementFinder = element(by.css('select#otp-action'));
  emailInput: ElementFinder = element(by.css('input#otp-email'));
  createdTimeInput: ElementFinder = element(by.css('input#otp-createdTime'));
  usedInput: ElementFinder = element(by.css('input#otp-used'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setCodeInput(code) {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput() {
    return this.codeInput.getAttribute('value');
  }

  async setActionSelect(action) {
    await this.actionSelect.sendKeys(action);
  }

  async getActionSelect() {
    return this.actionSelect.element(by.css('option:checked')).getText();
  }

  async actionSelectLastOption() {
    await this.actionSelect.all(by.tagName('option')).last().click();
  }
  async setEmailInput(email) {
    await this.emailInput.sendKeys(email);
  }

  async getEmailInput() {
    return this.emailInput.getAttribute('value');
  }

  async setCreatedTimeInput(createdTime) {
    await this.createdTimeInput.sendKeys(createdTime);
  }

  async getCreatedTimeInput() {
    return this.createdTimeInput.getAttribute('value');
  }

  getUsedInput() {
    return this.usedInput;
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
