import { baseUrl } from '../constants';

const getByEntryId = async (entryId) => {
    const response = await fetch(`${baseUrl}/images/${entryId}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
};

const addImages = async (imgs, entryId) => {
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
    console.log(data);    
    if (!response.ok) {
        throw new Error(data);
    }

    return data;
}

export const imagesService = { getByEntryId, addImages };