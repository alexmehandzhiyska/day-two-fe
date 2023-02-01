import { baseUrl } from "../constants";

const getAll = async () => {
    const response = await fetch(`${baseUrl}/entries`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
}

const getOne = async (entryId) => {
    const response = await fetch(`${baseUrl}/entries/${entryId}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
}

const createEntry = async () => {
    const response = await fetch(`${baseUrl}/entries`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
}

const updateEntry = async (entryId, content) => {
    const response = await fetch(`${baseUrl}/entries/${entryId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({content})
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data);
    }

    return data;
}

export const entriesService = { getAll, getOne, createEntry, updateEntry };