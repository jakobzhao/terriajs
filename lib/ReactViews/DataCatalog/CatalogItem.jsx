import React from 'react';
import classNames from 'classnames';
import Icon from "../Icon.jsx";

import defaultValue from 'terriajs-cesium/Source/Core/defaultValue';

import Styles from './data-catalog-item.scss';

const STATE_TO_TITLE = {
    loading: 'Loading...',
    remove: 'Remove',
    add: 'Add'
};

const STATE_TO_ICONS = {
    loading: <Icon glyph={Icon.GLYPHS.loader}/>,
    remove: <Icon glyph={Icon.GLYPHS.remove}/>,
    add: <Icon glyph={Icon.GLYPHS.add}/>,
    stats: <Icon glyph={Icon.GLYPHS.barChart}/>,
    preview: <Icon glyph={Icon.GLYPHS.right}/>
};

/** Dumb catalog item */
function CatalogItem(props) {
    const stateToTitle = defaultValue(props.titleOverrides, STATE_TO_TITLE);
    return (
        <li className={classNames(Styles.root)}>
            <button type='button'
                    onClick={props.onTextClick}
                    title={props.title}
                    className={classNames(
                            Styles.btnCatalogItem,
                            {[Styles.btnCatalogItemIsPreviewed]: props.selected}
                        )}>
                {props.text}
            </button>
            <button type='button'
                    onClick={props.onBtnClick}
                    title={stateToTitle[props.btnState] || ''}
                    className={Styles.btnAction}>
                    {STATE_TO_ICONS[props.btnState]}
            </button>
        </li>
    );
}

CatalogItem.propTypes = {
    onTextClick: React.PropTypes.func,
    selected: React.PropTypes.bool,
    text: React.PropTypes.string,
    title: React.PropTypes.string,
    onBtnClick: React.PropTypes.func,
    btnState: React.PropTypes.oneOf(Object.keys(STATE_TO_ICONS)),
    titleOverrides: React.PropTypes.object
};

export default CatalogItem;
