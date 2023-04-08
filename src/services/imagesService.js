import { baseUrl } from '../constants';
import { get, post, del } from './requester';

const getByEntryId = async (entryId) => get(`${baseUrl}/images/${entryId}`)

const addMany = async (imgs, entryId) => {
    const formData = new FormData();

    Object.values(imgs).forEach(img => {
        formData.append("entry-img", img);
    });

    const data = await post(`${baseUrl}/images/${entryId}`, formData, 'raw');
    return data;
};

const deleteOne = async (imageId) => del(`${baseUrl}/images/${imageId}`);

export const imagesService = { getByEntryId, addMany, deleteOne };