import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faEllipsis, faXmark } from '@fortawesome/free-solid-svg-icons';

import { getFullDate } from "../../utils";
import { entriesService } from "../../services/entriesService";
import { errorNotification, successNotification } from "../notifications";

import Sidebar from "../Sidebar/Sidebar";

import './Home.css';

const Home = () => {
    const [entries, setEntries] = useState([]);
    const [activeEntry, setActiveEntry] = useState(null);
    const [stateSwitch, setStateSwitch] = useState(false);

    useEffect(() => {
        entriesService.getAll()
            .then(res => {
                setEntries(res);
                setActiveEntry(res[0]);
            })
            .catch(err => {
                errorNotification(err);
            });
    }, [stateSwitch]);

    const updateEntry = (event) => {
        event.preventDefault();
        
        const formData = new FormData(event.target);

        const entryId = formData.get('entry-id');
        const content = formData.get('content');

        entriesService.updateEntry(entryId, content)
            .then(() => {
                setStateSwitch(!stateSwitch);
                successNotification('Entry saved successfully!');
            })
            .catch(() => {
                errorNotification('Could not save entry.');
            }); 
    };

    const createEntry = (event) => {
        event.preventDefault();
  
        entriesService.createEntry()
            .then(res => {
                setStateSwitch(true);
                setActiveEntry(res);
            })
            .catch(() => {
                errorNotification('Could not create entry');
            });
    };

    return (
        <section className="content-wrapper">
            <Sidebar entries={entries} activeEntry={activeEntry} setActiveEntry={setActiveEntry}></Sidebar>

            {activeEntry &&
                <article>
                    <section className="entry-settings">
                        <FontAwesomeIcon icon={faEllipsis} className="icon menu-icon"></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faPlus} onClick={e => createEntry(e)} className="icon plus-icon"></FontAwesomeIcon>
                    </section>

                    <form className="entry-wrapper" onSubmit={(e) => updateEntry(e)}>
                        <input type="hidden" className="entry-id" name="entry-id" value={activeEntry.id} />

                        <section className="entry-content-wrapper">
                            <h1 className="entry-date">{getFullDate(activeEntry.createdAt)}</h1>
                            <textarea className="entry-content" name="content" value={activeEntry.content} onChange={e => setActiveEntry({...activeEntry, content: e.target.value})}></textarea>
                        </section>

                        <button className="save-entry-btn" type="submit">Save</button>
                    </form>
                </article>
            }
        </section>
    );
};

export default Home;