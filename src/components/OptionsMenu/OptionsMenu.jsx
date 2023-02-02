import { UilTrash } from '@iconscout/react-unicons'

import { entriesService } from '../../services/entriesService';
import { errorNotification } from '../notifications';

import './OptionsMenu.css';

const OptionsMenu = (props) => {
    const entryId = props.entryId;
    const stateSwitch = props.stateSwitch;
    const setStateSwitch = props.setStateSwitch;

    const deleteEntry = (event) => {
        event.preventDefault();
        const currentEntryId = event.currentTarget.parentElement.parentElement.querySelector('input').id;
        
        entriesService.deleteOne(currentEntryId)
            .then(() => {
                setStateSwitch(!stateSwitch);
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