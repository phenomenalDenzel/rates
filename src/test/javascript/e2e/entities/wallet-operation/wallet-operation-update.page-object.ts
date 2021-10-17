import { element, by, ElementFinder } from 'protractor';

export default class WalletOperationUpdatePage {
  pageTitle: ElementFinder = element(by.id('ratesApp.walletOperation.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  descriptionInput: ElementFinder = element(by.css('input#wallet-operation-description'));
  amountInput: ElementFinder = element(by.css('input#wallet-operation-amount'));
  operationSelect: ElementFinder = element(by.css('select#wallet-operation-operation'));
  walletSelect: ElementFinder = element(by.css('select#wallet-operation-wallet'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setDescriptionInput(description) {
    await this.descriptionInput.sendKeys(description);
  }

  async getDescriptionInput() {
    return this.descriptionInput.getAttribute('value');
  }

  async setAmountInput(amount) {
    await this.amountInput.sendKeys(amount);
  }

  async getAmountInput() {
    return this.amountInput.getAttribute('value');
  }

  async setOperationSelect(operation) {
    await this.operationSelect.sendKeys(operation);
  }

  async getOperationSelect() {
    return this.operationSelect.element(by.css('option:checked')).getText();
  }

  async operationSelectLastOption() {
    await this.operationSelect.all(by.tagName('option')).last().click();
  }
  async walletSelectLastOption() {
    await this.walletSelect.all(by.tagName('option')).last().click();
  }

  async walletSelectOption(option) {
    await this.walletSelect.sendKeys(option);
  }

  getWalletSelect() {
    return this.walletSelect;
  }

  async getWalletSelectedOption() {
    return this.walletSelect.element(by.css('option:checked')).getText();
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
