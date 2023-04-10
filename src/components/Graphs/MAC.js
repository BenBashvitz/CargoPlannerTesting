import React, { useEffect, useRef } from 'react';
import CenterOfGravitiyMac from '../../images/CenterOfGravitiyMac.png'
import JXG from 'jsxgraph';

import { useSelector } from "react-redux"

export function MAC() {

    const objectsData = useSelector((State) => State.objectsData);
    const basicData = useSelector((State) => State.basicData);
    useEffect(() => {
        console.log({ objectsData, basicData })

        const point = {
            x: get_mac(basicData, objectsData),
            y: GetGrossWeight(basicData) / 1000
        }
        const title = "weight limit chart (primary)"
        const board = JXG.JSXGraph.initBoard('jxgbox3', {
            boundingbox: [13.5, 180, 32, 70], // [x_min, y_max, x_max, y_min]
            grid: {
                gridX: 1,
                gridY: 1
            },
            axis: true,
            showNavigation: false,
        });

        const xAxis = board.create('axis', [[14, 75], [32, 75]], { ticks: { visible: true, frequency: 1 } });
        const yAxis = board.create('axis', [[14, 75], [14, 180]], { ticks: { visible: true } });

        const red = board.create('polygon', [[14, 75], [14, 180], [32, 180], [32, 75]], {
            fillColor: 'red',
            fillOpacity: 0.5,
            borders: { strokeWidth: 0 },
            vertices: { visible: false },
            highlightFillColor: 'red',
            highlightFillOpacity: 0.5,
            tabindex: null
        });
        const orange1 = board.create('polygon', [[18.4, 118.5], [25.2, 175], [26.8, 175], [20.4, 125], [18.8, 120]], {
            fillColor: 'orange',
            fillOpacity: 0.5,
            borders: { strokeWidth: 0 },
            vertices: { visible: false },
            highlightFillColor: 'yellow',
            highlightFillOpacity: 0.5,
            tabindex: null
        });
        const orange2 = board.create('polygon', [[29.2, 175], [30, 175], [30, 130], [29.2, 133]], {
            fillColor: 'orange',
            fillOpacity: 0.5,
            borders: { strokeWidth: 0 },
            vertices: { visible: false },
            highlightFillColor: 'yellow',
            highlightFillOpacity: 0.5,
            tabindex: null
        });
        const green = board.create('polygon', [[15, 76], [15, 101.5], [18.4, 118.5], [18.8, 120], [20.4, 125], [26.8, 175], [29.2, 175], [29.2, 133], [30, 130], [30, 115], [25.8, 76]], {
            fillColor: 'green',
            fillOpacity: 0.5,
            borders: { strokeWidth: 0 }, 
            vertices: { visible: false },
            highlightFillColor: 'green',
            highlightFillOpacity: 0.5,
            tabindex: null
        });

        const refPoint = board.create('point', [point.x, point.y], { name: 'Point', size: 3, fixed: true });
        const a = 2000
        const b = 200
        for (let y = 0; y < 5000; y++) {
            for (let x = 0; x < 5000; x++) {
                if (red.hasPoint(x, y)) {
                    x = 5555
                    y = 5555
                }

            }

        }


        const text_x_axis = board.create('text', [35, 105, 'total fuel - 1,000 lbs'], { fontSize: 12, anchorY: 'middle' });
        text_x_axis.setPosition(JXG.COORDS_BY_USER, [35, 72]);

        const text_y_axis = board.create('text', [-3, 105, 'basic weight + cargo weight - 1,000 lbs'], { display: 'internal', rotate: 90, anchorX: 'middle', anchorY: 'bottom' });
        text_y_axis.setPosition(JXG.COORDS_BY_USER, [-1, 105]);

        return () => board.removeObject(xAxis);
    }, []);

    return (
        <div className='bigwrapper'>
            <div className="wrapper">
                <div className="content">
                    <h2 className="title">Center Of Gravity Limitation By %MAC</h2>
                    <div id="jxgbox3" style={{ width: '400px', height: '400px' }} />
                    <p className="subtitle">CG Location - % MAC</p>
                </div>
                <div className="titleWrapper">
                    <p className="tiltedText">AIRPLANE GROSS WEIGHT - 1,000 POUNDS</p>
                </div>
            </div>
        </div>
    );
}

export default MAC;

function GetGrossWeight(basicData) {

    let weight = (basicData.cockpitCrew + basicData.inspectorsCrew) * 170
    weight += basicData.emptyWeight
    weight += (8758 * basicData.slider1) + (8065 * basicData.slider2) + (6127 * basicData.slider3) + (8758 * basicData.slider5) + (8065 * basicData.slider4)
    // console.log(`The GetGrossWeight function returns: ${weight}`)
    return weight
}

function get_mac(basicData, objectsData) {

    let my_aircraft_index = basicData.index
    objectsData.objectListItems.forEach((el) => {
        let fus = el.fs - 245
        my_aircraft_index -= ((fus - 533.46) * el.weight) / 50000
    })
    my_aircraft_index -= (basicData.cockpitCrew * 1.2) + (basicData.inspectorsCrew * 0.8)
    const cg = ((my_aircraft_index - 100) * 50000 / basicData.emptyWeight) + 533.46
    const mac = ((cg - 487.4) * 100) / 164.5
    // console.log(`The GetMAC function returns enter GetMAC: ${mac}`)
    return mac
}