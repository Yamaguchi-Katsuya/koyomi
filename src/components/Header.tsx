import React, { useState, useEffect } from 'react';
import Circle from '../ui/circle';
import { DARK, LIGHT } from '../types/bgType';
import Heading from '../ui/heading';

const Header: React.FC = () => {
    return (
        <>
            <Circle bgType={DARK}>
                <Heading bgType={LIGHT} text='KOYOMI' />
                <p className='text-white text-center font-kiwi leading-7 md:leading-10'>
                    西暦と和暦の変換や干支<br />
                    今日は何の日？などなど<br />
                    簡単入力ですぐ分かるサービスです！
                </p>
            </Circle>
        </>
    );
};

export default Header;
