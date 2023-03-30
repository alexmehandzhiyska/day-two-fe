import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getDay, getDayNum, openOptionsMenu } from '../../utils';
import { entriesService } from '../../services/entriesService';
import { errorNotification } from '../notifications';

import OptionsMenu from '../OptionsMenu/OptionsMenu';

import './Sidebar.css';

const Sidebar = (props) => {
    const entries = props.entries;
    const activeEntry = props.activeEntry;

    const navigate = useNavigate();

    // useEffect(() => {
    //     const sidebarEl = document.querySelector('.sidebar');
        
    //     sidebarEl.addEventListener('click', () => {
    //         const optionsMenuEl = document.querySelector('.menu-active');

    //         if (optionsMenuEl) {
    //             optionsMenuEl.className = 'options-menu';
    //             optionsMenuEl.display = 'none';
    //         }
    //     });
    // }, []);
    
    const changeEntry = (event) => {
        const selectedEntryId = event.currentTarget.querySelector('input').value;
        navigate(`/entries/${selectedEntryId}`);
    };

    const deleteEntry = (event) => {
        event.preventDefault();

        const entryId = event.currentTarget.parentElement.id;
        
        entriesService.deleteOne(entryId)
            .then(() => {
                entriesService.getAll()
                    .then(res => {
                        navigate(`/entries/${res[0].id}`);
                    });
            })
            .catch(() => {
                errorNotification('error');
            });
    };

    return (
        <article className="sidebar">
            {activeEntry && 
                <>
                {entries.map((entry) => 
                    <section key={entry.id} className={entry.id == activeEntry.id ? 'entry active' : 'entry'} onClick={e => changeEntry(e)} onContextMenu={e => openOptionsMenu(e, 'entries')}>
                        <input type="hidden" className="entry-id" name="entry-id" value={entry.id} id={entry.id} />

                        <div className="date-card">
                            <h6 className="day">{getDay(entry.createdAt)}</h6>
                            <h4 className="date">{getDayNum(entry.createdAt)}</h4>
                        </div>
    
                        <div className="content-short">
                            <p>{entry.content?.slice(0, 85)}...</p>
                        </div>

                        <OptionsMenu options={{'delete': deleteEntry}} menuType="entries" id={entry.id}></OptionsMenu>
                    </section>
                )}
                </>
            }
        </article>
    );
};

export default Sidebar;