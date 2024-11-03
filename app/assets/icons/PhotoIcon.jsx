import React from 'react';
import Svg, { Rect, Defs, Pattern, Image } from 'react-native-svg';

const PhotoIcon = () => {
    return (
        <Svg width={10} height={10} viewBox="0 0 61 65" fill="none">
            <Rect width={10} height={10} fill="url(#pattern0_28_1369)" />
            <Defs>
                <Pattern id="pattern0_28_1369" patternContentUnits="objectBoundingBox" width={1} height={1}>
                    <Image
                        xlinkHref="data:image/png;base64,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"
                        width={10}
                        height={10}
                        style={{ width: '100%', height: '100%' }}
                    />
                </Pattern>
            </Defs>
        </Svg>
    );
};

export default PhotoIcon;
