import * as pageRepo from './page.repository.js';

export const getPages = async () => {
  const pages = await pageRepo.getPages();
  return pages;
};

export const getPage = async (id) => {
  const page = await pageRepo.getPage(id);
  return page;
};

export const createPage = async (page) => {
  const createdPage = await pageRepo.createPage(page);
  return createdPage;
};

export const updatePage = async (id, page) => {
  const updatedPage = await pageRepo.updatePage(id, page);
  return updatedPage;
};

export const deletePage = async (id) => {
  await pageRepo.deletePage(id);
};
