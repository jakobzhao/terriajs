'use strict';

import React from 'react';
import ChartPanel from '../Chart/ChartPanel.jsx';
import DistanceLegend from './Legend/DistanceLegend.jsx';
import LocationBar from './Legend/LocationBar.jsx';
import Timeline from './Timeline/Timeline.jsx';
import ObserveModelMixin from '../ObserveModelMixin';
import Styles from './bottom-dock.scss';

const BottomDock = React.createClass({
    mixins: [ObserveModelMixin],

    displayName: 'BottomDock',

    propTypes: {
        terria: React.PropTypes.object.isRequired,
        viewState: React.PropTypes.object.isRequired
    },

    render() {
        const terria = this.props.terria;

        return (
            <div className={Styles.bottomDock}>
                <div className={Styles.locationDistance}>
                    <LocationBar terria={terria} mouseCoords={this.props.viewState.mouseCoords} />
                    <DistanceLegend terria={terria}/>
                </div>
                <ChartPanel terria={terria} onHeightChange={this.onHeightChange} viewState={this.props.viewState}/>
                <If condition={terria.timeSeriesStack.topLayer}>
                    <Timeline terria={terria}/>
                </If>
            </div>
        );
    }
});

module.exports = BottomDock;