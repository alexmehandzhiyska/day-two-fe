import { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEllipsis, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import TextareaAutosize from 'react-textarea-autosize';

import { entriesService } from '../../services/entriesService';
import { imagesService } from '../../services/imagesService';
import { errorNotification, successNotification } from '../notifications';
import { getFullDate, openOptionsMenu } from '../../utils';
import OptionsMenu from '../OptionsMenu/OptionsMenu';

import Sidebar from '../Sidebar/Sidebar';

import './Home.css';

const Home = () => {
    const [entries, setEntries] = useState([]);
    const [activeEntry, setActiveEntry] = useState(null);
    const [entryImgs, setEntryImgs] = useState([]);
    const [stateChanged, setStateChanged] = useState(false);

    const { activeEntryId } = useParams();
    const navigate = useNavigate();

    const hiddenFileInput = useRef(null);

    useEffect(() => {
        entriesService.getAll()
            .then(res => {
                setEntries(res);
                setActiveEntry(res.find(entry => entry.id == activeEntryId));
            })
            .catch(err => {
                errorNotification(err);
            });
    }, [activeEntryId]);

    useEffect(() => {
        imagesService.getByEntryId(activeEntryId)
            .then(res => {
                setEntryImgs(res);
            })
            .catch(() => {
                errorNotification('Error');
            });
    }, [activeEntryId, stateChanged]);

    const updateEntry = (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);

        const entryId = formData.get('entry-id');
        const content = formData.get('content');

        entriesService.updateOne(entryId, content)
            .then(() => {
                successNotification('Entry saved successfully!');
            })
            .catch(() => {
                errorNotification('Could not save entry.');
            }); 
    };

    const createEntry = (event) => {
        event.preventDefault();
  
        entriesService.createOne()
            .then(res => {
                navigate(`/entries/${res.id}`);
            })
            .catch(() => {
                errorNotification('Could not create entry');
            });
    };

    const openFileSystem = () => hiddenFileInput.current.click();

    const uploadImage = (event) => {
        const filesUploaded = event.target.files;

        imagesService.addMany(filesUploaded, activeEntryId)
            .then(res => {
                setEntryImgs(res);
            });
    };

    const deleteImage = (event) => {
        const imgId = event.target.parentElement.parentElement.id;

        imagesService.deleteOne(imgId)
            .then(() => {
                setStateChanged(true);
            })
            .catch(() => {
                errorNotification('Cannot delete this photo.');
            });
    }

    return (
        <section className="content-wrapper">
            <Sidebar entries={entries} activeEntry={activeEntry}></Sidebar>

            {activeEntry &&
                <article>
                    <section className="entry-settings">
                        <FontAwesomeIcon icon={faEllipsis} className="icon menu-icon"></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faPlus} onClick={e => createEntry(e)} className="icon plus-icon"></FontAwesomeIcon>
                        <form method="post">
                            <input type="file" name="entry-img" id="entry-img" multiple ref={hiddenFileInput} onChange={(e) => uploadImage(e)} />
                            <FontAwesomeIcon icon={faPaperclip} onClick={() => openFileSystem()} className="icon menu-icon"></FontAwesomeIcon>
                        </form>
                    </section>

                    <form className="entry-wrapper" onSubmit={(e) => updateEntry(e)}>
                        <input type="hidden" className="entry-id" name="entry-id" value={activeEntry.id} />

                        <section className="entry-content-wrapper">
                            <article className="entry-text-wrapper">
                                <h1 className="entry-date">{getFullDate(activeEntry.createdAt)}</h1>
                                <TextareaAutosize className="entry-text" name="content" value={activeEntry.content} onChange={e => setActiveEntry({...activeEntry, content: e.target.value})}></TextareaAutosize>
                            </article>

                            <article className="entry-imgs-wrapper">
                                {entryImgs.map(img => 
                                    <section id={img.id}>
                                        <img key={img.id} src={`http://localhost:5500${img.path}`} className="entry-img" onContextMenu={e => openOptionsMenu(e, 'img', img.id)}></img>
                                        <OptionsMenu options={{'delete': deleteImage}} menuType="img" id={img.id}></OptionsMenu>
                                    </section>
                                )}
                            </article>
                        </section>

                        <button className="save-entry-btn" type="submit">Save</button>
                    </form>
                </article>
            }

        </section>
    );
};

export default Home;