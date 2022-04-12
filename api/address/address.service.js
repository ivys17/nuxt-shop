import * as addressRepo from './address.repository.js';

export const getAddresses = async () => {
  const addresses = await addressRepo.getAddresses();
  return addresses;
};

export const getAddressesByUserId = async (userId) => {
  const address = await addressRepo.getAddressesByUserId(userId);
  return address;
};

export const createAddress = async (address) => {
  const newAddress = await addressRepo.createAddress(address);
  return newAddress;
};

export const updateAddress = async (id, address) => {
  const updatedAddress = await addressRepo.updateAddress(id, address);
  return updatedAddress;
};

export const deleteAddress = async (id) => {
  await addressRepo.deleteAddress(id);
};
