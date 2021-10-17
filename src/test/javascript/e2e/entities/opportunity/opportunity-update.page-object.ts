import { element, by, ElementFinder } from 'protractor';

export default class OpportunityUpdatePage {
  pageTitle: ElementFinder = element(by.id('ratesApp.opportunity.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  nameInput: ElementFinder = element(by.css('input#opportunity-name'));
  typeSelect: ElementFinder = element(by.css('select#opportunity-type'));
  summaryInput: ElementFinder = element(by.css('textarea#opportunity-summary'));
  fundSizeInput: ElementFinder = element(by.css('input#opportunity-fundSize'));
  startDateInput: ElementFinder = element(by.css('input#opportunity-startDate'));
  endDateInput: ElementFinder = element(by.css('input#opportunity-endDate'));
  visibleInput: ElementFinder = element(by.css('input#opportunity-visible'));
  interestRateInput: ElementFinder = element(by.css('input#opportunity-interestRate'));
  tenorInput: ElementFinder = element(by.css('input#opportunity-tenor'));
  effectiveAprInput: ElementFinder = element(by.css('input#opportunity-effectiveApr'));
  minimumInvestmentInput: ElementFinder = element(by.css('input#opportunity-minimumInvestment'));
  denominationInput: ElementFinder = element(by.css('input#opportunity-denomination'));
  providerSelect: ElementFinder = element(by.css('select#opportunity-provider'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNameInput(name) {
    await this.nameInput.sendKeys(name);
  }

  async getNameInput() {
    return this.nameInput.getAttribute('value');
  }

  async setTypeSelect(type) {
    await this.typeSelect.sendKeys(type);
  }

  async getTypeSelect() {
    return this.typeSelect.element(by.css('option:checked')).getText();
  }

  async typeSelectLastOption() {
    await this.typeSelect.all(by.tagName('option')).last().click();
  }
  async setSummaryInput(summary) {
    await this.summaryInput.sendKeys(summary);
  }

  async getSummaryInput() {
    return this.summaryInput.getAttribute('value');
  }

  async setFundSizeInput(fundSize) {
    await this.fundSizeInput.sendKeys(fundSize);
  }

  async getFundSizeInput() {
    return this.fundSizeInput.getAttribute('value');
  }

  async setStartDateInput(startDate) {
    await this.startDateInput.sendKeys(startDate);
  }

  async getStartDateInput() {
    return this.startDateInput.getAttribute('value');
  }

  async setEndDateInput(endDate) {
    await this.endDateInput.sendKeys(endDate);
  }

  async getEndDateInput() {
    return this.endDateInput.getAttribute('value');
  }

  getVisibleInput() {
    return this.visibleInput;
  }
  async setInterestRateInput(interestRate) {
    await this.interestRateInput.sendKeys(interestRate);
  }

  async getInterestRateInput() {
    return this.interestRateInput.getAttribute('value');
  }

  async setTenorInput(tenor) {
    await this.tenorInput.sendKeys(tenor);
  }

  async getTenorInput() {
    return this.tenorInput.getAttribute('value');
  }

  async setEffectiveAprInput(effectiveApr) {
    await this.effectiveAprInput.sendKeys(effectiveApr);
  }

  async getEffectiveAprInput() {
    return this.effectiveAprInput.getAttribute('value');
  }

  async setMinimumInvestmentInput(minimumInvestment) {
    await this.minimumInvestmentInput.sendKeys(minimumInvestment);
  }

  async getMinimumInvestmentInput() {
    return this.minimumInvestmentInput.getAttribute('value');
  }

  async setDenominationInput(denomination) {
    await this.denominationInput.sendKeys(denomination);
  }

  async getDenominationInput() {
    return this.denominationInput.getAttribute('value');
  }

  async providerSelectLastOption() {
    await this.providerSelect.all(by.tagName('option')).last().click();
  }

  async providerSelectOption(option) {
    await this.providerSelect.sendKeys(option);
  }

  getProviderSelect() {
    return this.providerSelect;
  }

  async getProviderSelectedOption() {
    return this.providerSelect.element(by.css('option:checked')).getText();
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
