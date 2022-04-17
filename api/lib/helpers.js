import jwt from 'jsonwebtoken';

import env from '../env.js';

export const sleep = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

/**
 * rename name key in object
 * @param {object} obj
 * @param {string} oldKey
 * @param {string} newKey
 */
export const renameObjectKey = (obj, oldKey, newKey) => {
  Object.defineProperty(obj, newKey, Object.getOwnPropertyDescriptor(obj, oldKey));
  delete obj[oldKey];
};

export const generateAccessToken = (payload) => jwt.sign(payload, env.API_JWT_SECRET_KEY, { expiresIn: '24h' });

export const delay = async (ms) => new Promise((resolve) => setTimeout(resolve, ms));
