import { baseUrl } from '../constants';

const getByEntryId = async (entryId) => {
    const response = await fetch(`${baseUrl}/images/${entryId}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
};

export const imagesService = { getByEntryId };