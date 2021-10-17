import { element, by, ElementFinder } from 'protractor';

export default class WalletUpdatePage {
  pageTitle: ElementFinder = element(by.id('ratesApp.wallet.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  externalIdInput: ElementFinder = element(by.css('input#wallet-externalId'));
  balanceInput: ElementFinder = element(by.css('input#wallet-balance'));
  customerSelect: ElementFinder = element(by.css('select#wallet-customer'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setExternalIdInput(externalId) {
    await this.externalIdInput.sendKeys(externalId);
  }

  async getExternalIdInput() {
    return this.externalIdInput.getAttribute('value');
  }

  async setBalanceInput(balance) {
    await this.balanceInput.sendKeys(balance);
  }

  async getBalanceInput() {
    return this.balanceInput.getAttribute('value');
  }

  async customerSelectLastOption() {
    await this.customerSelect.all(by.tagName('option')).last().click();
  }

  async customerSelectOption(option) {
    await this.customerSelect.sendKeys(option);
  }

  getCustomerSelect() {
    return this.customerSelect;
  }

  async getCustomerSelectedOption() {
    return this.customerSelect.element(by.css('option:checked')).getText();
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
