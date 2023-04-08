import { useEffect, useState, useRef, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPaperclip, faBars, faMoon } from '@fortawesome/free-solid-svg-icons';
import TextareaAutosize from 'react-textarea-autosize';

import { entriesService } from '../../services/entriesService';
import { imagesService } from '../../services/imagesService';
import { errorNotification, successNotification } from '../notifications';
import { getFullDate, openOptionsMenu } from '../../utils';
import { ColorThemeContext } from '../../contexts/ColorThemeContext';
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
    const closeMenuRef = useRef(null);
    const settingsRef = useRef(null);

    const theme = useContext(ColorThemeContext);
    const darkMode = localStorage.getItem('darkMode');

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

    const openFileSystem = () => hiddenFileInput.current.click();

    const uploadImage = (event) => {
        const filesUploaded = event.target.files;

        imagesService.addMany(filesUploaded, activeEntryId)
            .then(res => {
                console.log(res);
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
    };

    const changeMenuDisplay = () => {
        const sidebar = document.querySelector('.sidebar');

        if (sidebar.style.display == '' || sidebar.style.display == 'none') {
            sidebar.style.display = 'block';
            settingsRef.current.style.display = 'none';
            closeMenuRef.current.style.display = 'block';
        } else {
            sidebar.style.display = 'none';
            settingsRef.current.style.display = 'flex';
            closeMenuRef.current.style.display = 'none';
        }
    };

    return (
        <section className={darkMode ? 'content-wrapper dark' : 'content-wrapper'}>
            <FontAwesomeIcon icon={faBars} className="icon menu-icon" id="bars-icon-close" ref={closeMenuRef} onClick={() => changeMenuDisplay()}></FontAwesomeIcon>
            <Sidebar entries={entries} activeEntry={activeEntry}></Sidebar>

            {activeEntry &&
                <article className="entry-page">
                    <section className="entry-settings" ref={settingsRef}>
                        <div>
                            <FontAwesomeIcon icon={faBars} className="icon menu-icon" id="bars-icon" onClick={() => changeMenuDisplay()}></FontAwesomeIcon>
                        </div>

                        <div>
                            <FontAwesomeIcon icon={faMoon} className="icon menu-icon" onClick={() => theme.dispatch({ type: darkMode ? 'LIGHT_MODE' : 'DARK_MODE' })}></FontAwesomeIcon>
                            <FontAwesomeIcon icon={faPlus} onClick={e => createEntry(e)} className="icon plus-icon"></FontAwesomeIcon>
                            <form method="post">
                                <input type="file" name="entry-img" id="entry-img" multiple ref={hiddenFileInput} onChange={(e) => uploadImage(e)} />
                                <FontAwesomeIcon icon={faPaperclip} onClick={() => openFileSystem()} className="icon menu-icon"></FontAwesomeIcon>
                            </form>
                        </div>
                    </section>

                    <form className="entry-wrapper" onSubmit={(e) => updateEntry(e)}>
                        <input type="hidden" className="entry-id" name="entry-id" value={activeEntry.id} />

                        <section className="entry-content-wrapper">
                            <article className="entry-text-wrapper">
                                <h1 className="entry-date">{getFullDate(activeEntry.createdAt)}</h1>
                                <TextareaAutosize className={darkMode ? 'entry-text entry-text-dark' : 'entry-text'} name="content" value={activeEntry.content} onChange={e => setActiveEntry({...activeEntry, content: e.target.value})}></TextareaAutosize>
                            </article>

                            <article className="entry-imgs-wrapper">
                                {entryImgs.map(img => 
                                    <section key={img.id} id={img.id}>
                                        <img src={`http://localhost:5500${img.path}`} className="entry-img" onContextMenu={e => openOptionsMenu(e, 'img', img.id)}></img>
                                        <OptionsMenu options={{'Delete': deleteImage}} menuType="img" id={img.id}></OptionsMenu>
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