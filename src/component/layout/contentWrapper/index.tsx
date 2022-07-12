import React from 'react';
import style from './contentWrapper.module.scss'

interface IContentWrapper {
    children: React.ReactNode
}
const ContentWrapper: React.FC<IContentWrapper> = ({children}) => {
    return (
        <div className={style.contentWrapper}>
            {children}
        </div>
    );
};

export default ContentWrapper;