import { getDay, getDayNum } from '../../utils';

import './Sidebar.css';

const Sidebar = (props) => {
    const entries = props.entries;
    const activeEntry = props.activeEntry;
    const setActiveEntry = props.setActiveEntry;
    
    const changeEntry = (event) => {
        const selectedEntryId = event.currentTarget.querySelector('input').value;
        const selectedEntry = entries.find(e => e.id == selectedEntryId);
        setActiveEntry(selectedEntry);
    }
    
    return (
        <article className="sidebar">
            {activeEntry && 
                <>
                {entries.map((entry) => 
                    <section key={entry.id} className={entry.id == activeEntry.id ? 'entry active' : 'entry'} onClick={e => changeEntry(e)}>
                        <input type="hidden" className="entry-id" name="entry-id" value={entry.id} />

                        <div className="date-card">
                            <h6 className="day">{getDay(entry.createdAt)}</h6>
                            <h4 className="date">{getDayNum(entry.createdAt)}</h4>
                        </div>
    
                        <div className="content-short">
                            <p>{entry.content?.slice(0, 85)}...</p>
                        </div>
                    </section>
                )}
                </>
            }
        </article>
    );
};

export default Sidebar;