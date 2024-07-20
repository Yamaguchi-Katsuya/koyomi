import { Component, ReactNode } from 'react';
import { BgType, LIGHT } from '../types/bgType';

interface HeadingProps {
    bgType: BgType;
    text: string;
}

class Heading extends Component<HeadingProps> {
    render() {
        const { bgType, text } = this.props;
        const bgClass = bgType === LIGHT ? 'text-l-gray' : 'text-d-gray';

        return (
            <h2 className={`${bgClass} text-2xl md:text-6xl font-bold  font-mono px-4 pt-4 text-right`}>{text}</h2>
        );
    }
}

export default Heading;
