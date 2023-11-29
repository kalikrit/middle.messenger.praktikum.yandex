const VALID_EMAIL = 'validEmail';
const VALID_PASSWORD = 'validPassword';
const VALID_LOGIN = 'validLogin';
const VALID_PHONE = 'validPhone';
const VALID_NAME = 'validName';
const REQUIRED = 'required';
const MIN_LENGTH = 'minLength';
const MAX_LENGTH = 'maxLength';

const errors = {
  default: 'поле заполнено неверно',
};

const rules: Record<string, Record<string, any>> = {

  login: {
    [MIN_LENGTH]: 3,
    [MAX_LENGTH]: 20,
    [VALID_LOGIN]: true,
  },

  password: {
    [VALID_PASSWORD]: true,
    [MIN_LENGTH]: 3,
    [MAX_LENGTH]: 40,
  },

  password_again: {
    [VALID_PASSWORD]: true,
    [MIN_LENGTH]: 3,
    [MAX_LENGTH]: 40,
  },

  oldPassword: {
    [VALID_PASSWORD]: true,
    [MIN_LENGTH]: 3,
    [MAX_LENGTH]: 40,
  },

  newPassword: {
    [VALID_PASSWORD]: true,
    [MIN_LENGTH]: 3,
    [MAX_LENGTH]: 40,
  },

  email: {
    [VALID_EMAIL]: true,
    [REQUIRED]: true,
    [MIN_LENGTH]: 8,
    [MAX_LENGTH]: 40,
  },

  phone: {
    [VALID_PHONE]: true,
    [MIN_LENGTH]: 8,
    [MAX_LENGTH]: 20,
  },

  search: {
    [REQUIRED]: true,
  },

  message: {
    [REQUIRED]: true,
  },
  
  first_name: {
    [VALID_NAME]: true,
  },
  
  second_name: {
    [VALID_NAME]: true,
  },

  display_name: {
    [VALID_NAME]: true,
  },
};

type ICheck =(value: string, length?: number) => boolean;

const validateField: Record<string, ICheck> = {

  /**
  латиница, 
  может включать цифры и спецсимволы вроде дефиса и подчёркивания, 
  обязательно должна быть «собака» (@) и точка после неё, 
  но перед точкой обязательно должны быть буквы.
  */
  [VALID_EMAIL]: (value) => !!value.match(/^[A-Z0-9._-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i),

  /**
  от 8 до 40 символов, 
  обязательно хотя бы одна заглавная буква и цифра.
   */
  [VALID_PASSWORD]: (value) => !!value.match(/^(?=.*[A-Z])(?=.*\d).+$/),

  /**
  от 3 до 20 символов, 
  латиница, может содержать цифры, но не состоять из них, 
  без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).
  */
  [VALID_LOGIN]: (value) => !!value.match(/^(?!\d+$)[a-zA-Z0-9_-]+$/),

  /**
  от 10 до 15 символов, 
  состоит из цифр, может начинается с плюса.
  */
  [VALID_PHONE]: (value) => !!value.match(/^\+?(\d{1,3})?[- .]?\(?(?:\d{2,3})\)?[- .]?\d\d\d[- .]?\d\d\d\d$/),

  /**
  латиница или кириллица, 
  первая буква должна быть заглавной, 
  без пробелов и без цифр, 
  нет спецсимволов (допустим только дефис).
  */
  [VALID_NAME]: (value) => !!value.match(/^([A-ZА-ЯЁ])[a-zA-Zа-яёА-ЯЁ-]+$/),

  // минимальная длина поля
  [MIN_LENGTH]: (value, length) => (length ? value.length >= length : true),

  // максимальная длина поля
  [MAX_LENGTH]: (value, length) => (length ? value.length <= length : true),

  // обязательно для заполнения
  [REQUIRED]: (value) => !!value,
};

const validateForm = (fields: Record<string, any>) : Record<string, any> => {
  if (Object.keys(fields).length === 0) {
    return {};
  }

  return Object.entries(fields)
    .reduce((acc: Record<string, any>, [key, valueField] : [string, string]) => {
      if (!rules[key]) {
        return acc;
      }
      const validates = rules[key];
      for (const [rule, valueRule] of Object.entries(validates)) {
        if (valueRule === undefined || valueRule === null || valueRule === false) {
          return acc;
        }
        const fn = validateField[rule];

        if (fn && typeof fn === 'function') {
          const isValid = fn(valueField, valueRule);

          if (!isValid) {
            acc[key] = errors.default;
            break;
          }
        }
      }
      return acc;
    }, {});
};

export default validateForm
