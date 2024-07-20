import { Component, ReactNode } from 'react';
import { Color } from '../types/color';

interface CircleProps {
    bgColor: Color;
    children: ReactNode;
}

class Circle extends Component<CircleProps> {
    render() {
        const { bgColor, children } = this.props;
        const bgColorClass = `bg-${bgColor}`

        return (
            <div className={`${bgColorClass} rounded-full w-72 h-72 md:size-8/12 md:w-md-circle md:h-md-circle m-auto flex flex-col items-center justify-center text-center gap-3 text-sm md:text-xl leading-7 md:leading-10`}>
                {children}
            </div>
        );
    }
}

export default Circle;
