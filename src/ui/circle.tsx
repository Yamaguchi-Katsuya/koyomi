import { Component, ReactNode } from 'react';
import { BgType, LIGHT } from '../types/bgType';

interface CircleProps {
    bgType: BgType;
    children: ReactNode;
}

class Circle extends Component<CircleProps> {
    render() {
        const { bgType, children } = this.props;
        const bgClass = bgType === LIGHT ? 'bg-l-gray' : 'bg-d-gray';

        return (
            <div className={`${bgClass} rounded-full w-72 h-72 md:size-8/12 md:w-md-circle md:h-md-circle m-auto flex flex-col items-center justify-center text-center gap-3 text-sm md:text-xl leading-7 md:leading-10`}>
                {children}
            </div>
        );
    }
}

export default Circle;
