import { baseUrl } from '../constants';
import {get, post, patch, del } from './requester';

const getAll = () => get(`${baseUrl}/entries`);

const getOne = (entryId) => get(`${baseUrl}/entries/${entryId}`);

const createOne = () => post(`${baseUrl}/entries`);

const updateOne = (entryId, content) => patch(`${baseUrl}/entries/${entryId}`, { content });

const deleteOne = (entryId) => del(`${baseUrl}/entries/${entryId}`);

export const entriesService = { getAll, getOne, createOne, updateOne, deleteOne };