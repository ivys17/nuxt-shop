import { generateAccessToken } from '../lib/helpers.js';

export const registrationUser = async () => {

};

export const loginUser = async (body) => {
  const { login, password } = body;
  //TODO: implement create manager
  if (login === 'manager' && password === '999666999') {
    return { token: generateAccessToken({ isAdmin: true }) };
  }

  return false;
};


