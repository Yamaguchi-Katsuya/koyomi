import { Component, ReactNode } from 'react';
import { BgType, LIGHT } from '../../types/bgType';

interface CircleProps {
    bgType: BgType;
    children: ReactNode;
}

class SectionLayout extends Component<CircleProps> {
    render() {
        const { bgType, children } = this.props;
        const bgClass = bgType === LIGHT ? 'bg-l-gray' : 'bg-d-gray';

        return (
            <section className={`${bgClass} p-4 md:p-8 md:h-screen md:flex md:items-center md:justify-center md:flex-col`} >
                {children}
            </section>
        );
    }
}

export default SectionLayout;
