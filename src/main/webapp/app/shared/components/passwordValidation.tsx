import React, { useState, useEffect } from 'react';
import { Translate } from 'react-jhipster';

import './passwordValidation.scss';

const invalidIcon = <i className="fa fa-times" aria-hidden="true"></i>;
const validIcon = <i className="fa fa-check" aria-hidden="true"></i>;

interface IValidateValue {
  lowercase?: boolean;
  uppercase?: boolean;
  number?: boolean;
  specialCharacter?: boolean;
}

interface IPasswordValidation {
  password?: string;
}

const passwordRules = (word: string) => {
  return [
    { name: 'uppercase', rule: /^(?=.*[A-Z]).{1,}$/.test(word) },
    { name: 'lowercase', rule: /^(?=.*[a-z]).{1,}$/.test(word) },
    { name: 'number', rule: /^(?=.*\d).{1,}$/.test(word) },
    { name: 'specialCharacter', rule: /[!@#$%^&*(),.?'_":{}|<>]/g.test(word) }, // eslint-disable-line
  ];
};

export const validatePassword = (value, ctx, input, cb) => {
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,64}$/; // eslint-disable-line
  cb(re.test(value));
};

export const PasswordValidation = (props: IPasswordValidation) => {
  const [validateValue, setValidateValue] = useState<IValidateValue>({});

  const passwordValidator = (password: string) => {
    let value = {};
    passwordRules(password).forEach(val => {
      const name = val.name;
      value = val.rule ? { ...value, [name]: true } : { ...value, [name]: false };
    });
    setValidateValue(value);
  };

  useEffect(() => {
    if (props.password) {
      passwordValidator(props.password);
    }
  }, [props.password]);

  const { lowercase, uppercase, number, specialCharacter } = validateValue;
  const minPassword = props.password && props.password.toString().length > 7;
  const passwordValid = lowercase && uppercase && number && specialCharacter && minPassword;

  return props.password && !passwordValid ? (
    <div className="validate-password">
      <div> New password must contain the following</div>
      <div className={lowercase ? 'valid' : 'invalid'}>
        {lowercase ? validIcon : invalidIcon} <Translate contentKey="password.rules.lowercase">Atleast one lowercase letter</Translate>
      </div>
      <div className={uppercase ? 'valid' : 'invalid'}>
        {uppercase ? validIcon : invalidIcon} <Translate contentKey="password.rules.uppercase">Atleast one uppercase letter</Translate>
      </div>
      <div className={number ? 'valid' : 'invalid'}>
        {number ? validIcon : invalidIcon} <Translate contentKey="password.rules.number">A number</Translate>
      </div>
      <div className={specialCharacter ? 'valid' : 'invalid'}>
        {specialCharacter ? validIcon : invalidIcon}{' '}
        <Translate contentKey="password.rules.specialcharacter">Special symbol eg !&quot;#$%&apos;()*+,-./:;=?@[]^_`</Translate>
      </div>
      <div className={minPassword ? 'valid' : 'invalid'}>
        {minPassword ? validIcon : invalidIcon} <Translate contentKey="password.rules.minimum.character">Minimum of 8 characters</Translate>
      </div>
    </div>
  ) : null;
};
