import React from 'react';
import './TailGrid.css'
export default function TileGrid({ tileData, originAttribute }) {
    return <div className='guess-grid' data-guess-grid>

        {tileData.map((e, i) => {
            const getClass = () => {
                let name = 'tile'
                if (e.active) {
                    name = 'tile active'
                    if (e.dance) {
                        name = 'tile active dance'
                        return name

                    }
                    if (e.flip) {
                        name = 'tile active flip'

                        return name

                    }
                    if (e.shake) {
                        name = 'tile active shake'
                        return name

                    }

                }
                return name
            }

            const getBackgroundColor = () => {

                if (e.wrong) {
                    return {
                        border: 'none',
                        backgroundColor: 'hsl(240, 2%, 23%)'
                    }
                }
                if (e.wrongLocation) {
                    return {
                        border: 'none',
                        backgroundColor: 'hsl(49, 51%, 47%)'
                    }
                }
                if (e.correct) {
                    return {
                        border: 'none',
                        backgroundColor: 'hsl(115, 29%, 43%)'
                    }
                }

            }
            return <div
                key={`tile_${i}`}
                className={getClass()}
                style={getBackgroundColor()}
                onAnimationEnd={() => originAttribute()}
            > {e.alphabet}</div>
        })}
        <div> </div>
    </div>;
}
