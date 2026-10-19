import { test as base, expect } from '@playwright/test';

export type TextBoxData = {
  url: string;
  validForm: {
    fullName: string;
    email: string;
    currentAddress: string;
    permanentAddress: string;
  };
  correctedEmail: string;
  invalidEmails: {
    missingAt: string;
    missingUser: string;
    missingDomain: string;
    whitespace: string;
  };
  boundaryForm: {
    fullName: string;
    email: string;
    currentAddress: string;
    permanentAddress: string;
  };
};

export const textBoxData: TextBoxData = {
  url: 'https://demoqa.com/text-box',
  validForm: {
    fullName: 'Ada Lovelace',
    email: 'ada.lovelace@example.com',
    currentAddress: "12 St James's Square, London",
    permanentAddress: 'Same as current address',
  },
  correctedEmail: 'qa.user@example.com',
  invalidEmails: {
    missingAt: 'correo-invalido',
    missingUser: '@example.com',
    missingDomain: 'qa.user@',
    whitespace: 'qa user@example.com',
  },
  boundaryForm: {
    fullName: 'Ada Lovelace',
    email: 'ada.lovelace@example.com',
    currentAddress: "12 St James's Square, Apt. 4",
    permanentAddress: '45, Calle Juárez #2',
  },
};

export const test = base.extend<{ textBoxData: TextBoxData }>({
  textBoxData: async ({}, use) => {
    await use(textBoxData);
  },
});

export { expect };
