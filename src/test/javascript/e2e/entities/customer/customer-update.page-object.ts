import { element, by, ElementFinder } from 'protractor';

export default class CustomerUpdatePage {
  pageTitle: ElementFinder = element(by.id('ratesApp.customer.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  annualIncomeSelect: ElementFinder = element(by.css('select#customer-annualIncome'));
  employmentStatusSelect: ElementFinder = element(by.css('select#customer-employmentStatus'));
  qualificationLevelSelect: ElementFinder = element(by.css('select#customer-qualificationLevel'));
  mobileInput: ElementFinder = element(by.css('input#customer-mobile'));
  bvnInput: ElementFinder = element(by.css('input#customer-bvn'));
  dobInput: ElementFinder = element(by.css('input#customer-dob'));
  countryOfBirthInput: ElementFinder = element(by.css('input#customer-countryOfBirth'));
  nationalityInput: ElementFinder = element(by.css('input#customer-nationality'));
  mothersMaidenNameInput: ElementFinder = element(by.css('input#customer-mothersMaidenName'));
  verifiedInput: ElementFinder = element(by.css('input#customer-verified'));
  userSelect: ElementFinder = element(by.css('select#customer-user'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setAnnualIncomeSelect(annualIncome) {
    await this.annualIncomeSelect.sendKeys(annualIncome);
  }

  async getAnnualIncomeSelect() {
    return this.annualIncomeSelect.element(by.css('option:checked')).getText();
  }

  async annualIncomeSelectLastOption() {
    await this.annualIncomeSelect.all(by.tagName('option')).last().click();
  }
  async setEmploymentStatusSelect(employmentStatus) {
    await this.employmentStatusSelect.sendKeys(employmentStatus);
  }

  async getEmploymentStatusSelect() {
    return this.employmentStatusSelect.element(by.css('option:checked')).getText();
  }

  async employmentStatusSelectLastOption() {
    await this.employmentStatusSelect.all(by.tagName('option')).last().click();
  }
  async setQualificationLevelSelect(qualificationLevel) {
    await this.qualificationLevelSelect.sendKeys(qualificationLevel);
  }

  async getQualificationLevelSelect() {
    return this.qualificationLevelSelect.element(by.css('option:checked')).getText();
  }

  async qualificationLevelSelectLastOption() {
    await this.qualificationLevelSelect.all(by.tagName('option')).last().click();
  }
  async setMobileInput(mobile) {
    await this.mobileInput.sendKeys(mobile);
  }

  async getMobileInput() {
    return this.mobileInput.getAttribute('value');
  }

  async setBvnInput(bvn) {
    await this.bvnInput.sendKeys(bvn);
  }

  async getBvnInput() {
    return this.bvnInput.getAttribute('value');
  }

  async setDobInput(dob) {
    await this.dobInput.sendKeys(dob);
  }

  async getDobInput() {
    return this.dobInput.getAttribute('value');
  }

  async setCountryOfBirthInput(countryOfBirth) {
    await this.countryOfBirthInput.sendKeys(countryOfBirth);
  }

  async getCountryOfBirthInput() {
    return this.countryOfBirthInput.getAttribute('value');
  }

  async setNationalityInput(nationality) {
    await this.nationalityInput.sendKeys(nationality);
  }

  async getNationalityInput() {
    return this.nationalityInput.getAttribute('value');
  }

  async setMothersMaidenNameInput(mothersMaidenName) {
    await this.mothersMaidenNameInput.sendKeys(mothersMaidenName);
  }

  async getMothersMaidenNameInput() {
    return this.mothersMaidenNameInput.getAttribute('value');
  }

  getVerifiedInput() {
    return this.verifiedInput;
  }
  async userSelectLastOption() {
    await this.userSelect.all(by.tagName('option')).last().click();
  }

  async userSelectOption(option) {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect() {
    return this.userSelect;
  }

  async getUserSelectedOption() {
    return this.userSelect.element(by.css('option:checked')).getText();
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
