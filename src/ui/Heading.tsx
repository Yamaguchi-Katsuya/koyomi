import React from 'react';
import { Color } from '../types/color';

interface HeadingProps {
  textColor: Color;
  text: string;
}

function Heading({ textColor, text }: HeadingProps): JSX.Element {
  const textColorClass = `text-${textColor}`;

  return (
    <h2
      className={`${textColorClass} text-2xl md:text-7xl font-mono px-4 pt-4 text-right`}
    >
      {text}
    </h2>
  );
}

export default Heading;
