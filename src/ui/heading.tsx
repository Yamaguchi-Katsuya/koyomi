import { Component, ReactNode } from 'react';
import { Color } from '../types/color';

interface HeadingProps {
    textColor: Color;
    text: string;
}

class Heading extends Component<HeadingProps> {
    render() {
        const { textColor, text } = this.props;
        const textColorClass = `text-${textColor}`

        return (
            <h2 className={`${textColorClass} text-2xl md:text-6xl font-bold  font-mono px-4 pt-4 text-right`}>{text}</h2>
        );
    }
}

export default Heading;
