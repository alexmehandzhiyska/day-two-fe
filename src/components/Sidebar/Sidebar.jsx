import { useEffect } from 'react';

import { getDay, getDayNum } from '../../utils';
import OptionsMenu from '../OptionsMenu/OptionsMenu';

import './Sidebar.css';

const Sidebar = (props) => {
    const entries = props.entries;
    const activeEntry = props.activeEntry;
    const setActiveEntry = props.setActiveEntry;
    const stateSwitch = props.stateSwitch;
    const setStateSwitch = props.setStateSwitch;

    useEffect(() => {
        window.addEventListener('click', () => {
            const optionsMenuEl = document.querySelector('.menu-active');
            optionsMenuEl.className = 'options-menu';
            optionsMenuEl.display = 'none';
        });
    }, []);
    
    const changeEntry = (event) => {
        const selectedEntryId = event.currentTarget.querySelector('input').value;
        const selectedEntry = entries.find(e => e.id == selectedEntryId);
        setActiveEntry(selectedEntry);
    };

    const openOptionsMenu = (event) => {
        event.preventDefault();

        const optionsMenuEl = event.currentTarget.querySelector('ul');

        optionsMenuEl.classList.add('menu-active');

        const xPosition = event.clientX;
        const yPosition = event.clientY;

        optionsMenuEl.style.left = `${xPosition}px`;
        optionsMenuEl.style.top = `${yPosition}px`;
    };
    
    return (
        <article className="sidebar">
            {activeEntry && 
                <>
                {entries.map((entry) => 
                    <section key={entry.id} className={entry.id == activeEntry.id ? 'entry active' : 'entry'} onClick={e => changeEntry(e)} onContextMenu={e => openOptionsMenu(e)}>
                        <input type="hidden" className="entry-id" name="entry-id" value={entry.id} id={entry.id} />

                        <div className="date-card">
                            <h6 className="day">{getDay(entry.createdAt)}</h6>
                            <h4 className="date">{getDayNum(entry.createdAt)}</h4>
                        </div>
    
                        <div className="content-short">
                            <p>{entry.content?.slice(0, 85)}...</p>
                        </div>

                        <OptionsMenu entryId={entry.id} stateSwitch={stateSwitch} setStateSwitch={setStateSwitch}></OptionsMenu>
                    </section>
                )}
                </>
            }
        </article>
    );
};

export default Sidebar;