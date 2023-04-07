import { useEffect } from 'react';
import './OptionsMenu.css';

import { closeOptionsMenu } from '../../utils';

const OptionsMenu = (props) => {
    const { options, menuType, id } = props;

    useEffect(() => document.addEventListener('click', () => closeOptionsMenu(menuType)), []);
    
    return (
        <ul className={`options-menu menu-${menuType}`} id={`menu-${menuType}-${id}`}>
            {Object.entries(options).map((optionKvp, i) => (
                <li key={i} className="options-menu-item" onClick={e => optionKvp[1](e)}>{optionKvp[0]}</li>
            ))}
        </ul>
    );
};

export default OptionsMenu;