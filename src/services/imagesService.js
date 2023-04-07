import { baseUrl } from '../constants';

const getByEntryId = async (entryId) => {
    const response = await fetch(`${baseUrl}/images/${entryId}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
};

const addMany = async (imgs, entryId) => {
    const formData = new FormData();

    const imgArr = Object.values(imgs);

    imgArr.forEach(img => {
        formData.append("entry-img", img);
    });

    const response = await fetch(`${baseUrl}/images/${entryId}`, {
        method: 'POST',
        body: formData
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
};

const deleteOne = async (imageId) => {
    const response = await fetch(`${baseUrl}/images/${imageId}`, {
        method: 'DELETE'
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
};

export const imagesService = { getByEntryId, addMany, deleteOne };