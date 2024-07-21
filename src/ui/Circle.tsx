import { Component, ReactNode } from 'react';
import { Color } from '../types/color';

interface CircleProps {
  bgColor: Color;
  children: ReactNode;
  className?: string;
}

class Circle extends Component<CircleProps> {
  render() {
    const { bgColor, children, className } = this.props;
    const bgColorClass = `bg-${bgColor}`;

    return (
      <div
        className={`${bgColorClass} rounded-full w-72 h-72 md:size-8/12 md:w-md-circle md:h-md-circle m-auto flex flex-col items-center justify-center text-center gap-1 md:gap-9 text-sm md:text-3xl leading-relaxed md:leading-loose　${className}`}
      >
        {children}
      </div>
    );
  }
}

export default Circle;
