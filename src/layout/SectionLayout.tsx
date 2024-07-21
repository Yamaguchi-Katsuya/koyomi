import { Component, ReactNode } from 'react';
import { Color } from '../types/color';

interface SectionProps {
  bgColor: Color;
  children: ReactNode;
}

class SectionLayout extends Component<SectionProps> {
  render() {
    const { bgColor, children } = this.props;
    const bgColorClass = `bg-${bgColor}`;

    return (
      <section
        className={`${bgColorClass} p-4 md:p-8 md:h-screen md:flex md:items-center md:justify-center md:flex-col w-full overflow-x-hidden`}
      >
        {children}
      </section>
    );
  }
}

export default SectionLayout;
