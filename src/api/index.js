import axios from 'axios';

const getCards = (page,limit) => {
  return axios.get(`https://api.pokemontcg.io/v2/cards?page=${page}&pageSize=${limit}&rarity=ririty`);
};
export const API = {
  getCards,
};
