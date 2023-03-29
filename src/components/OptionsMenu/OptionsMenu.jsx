import { UilTrash } from '@iconscout/react-unicons'
import { useNavigate } from 'react-router-dom';

import { entriesService } from '../../services/entriesService';
import { errorNotification } from '../notifications';

import './OptionsMenu.css';

const OptionsMenu = (props) => {
    const entryId = props.entryId;
    const navigate = useNavigate();

    const deleteEntry = (event) => {
        event.preventDefault();
        const currentEntryId = event.currentTarget.parentElement.parentElement.querySelector('input').id;
        
        entriesService.deleteOne(currentEntryId)
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
        <ul className='options-menu' id={entryId}>
            <li className="options-menu-item" onClick={e => deleteEntry(e)}>
                <UilTrash size="25" className="options-menu-icon"/>
                <span>Delete</span>
            </li>

            <li className="options-menu-item">
                <UilTrash size="25" className="options-menu-icon"/>
                <span>Test</span>
            </li>
        </ul>
    );
};

export default OptionsMenu;