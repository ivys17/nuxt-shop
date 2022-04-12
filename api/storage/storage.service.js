import axios from 'axios';

import { IIKO_SERVER_URL } from '../../config/common.js';

import * as storageRepo from './storage.repository.js';

export const getStorage = async () => {
  try {
    return await storageRepo.getStorage();
  } catch (e) {
    throw e;
  }

};

export const getOrganizationId = async () => {
  return storageRepo.getOrganizationId();
};

export const getLogin = async () => {
  return storageRepo.getLogin();
};

export const getPassword = async () => {
  return storageRepo.getPassword();
};

export const getToken = async () => {

  try {
    const userLogin = await getLogin();
    const userPassword = await getPassword();

    if (userLogin && userPassword) {
      const token = await axios.get(
        `${IIKO_SERVER_URL}/api/0/auth/access_token`, {
          params: {
            'user_id': userLogin,
            'user_secret': userPassword,
          },
        });
      return token.data;
    }

  } catch (e) {
    throw e;
  }
};

export const getRevision = async () => {
  return await storageRepo.getRevision();
};

export const getIsNeedCladrUpdate = async () => {
  return await storageRepo.getIsNeedCladrUpdate();
};

export const getTekegramApiKey = async () => {
  return await storageRepo.getTekegramApiKey();
};

export const setRevision = async (revision) => {
  return await storageRepo.updateRevision(revision);
};

export const setIsNeedCladrUpdate = async (isNeedCladrUpdate) => {
  return await storageRepo.setIsNeedCladrUpdate(isNeedCladrUpdate);
};

