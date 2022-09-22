import React, {FC} from 'react';

const NotFound:FC = () => {
    return (
        <div style={{display: "flex", justifyContent: "center",
            alignItems: "center"}}>
            <h1 style={{font:"Roboto"}}>
                Увы, потерялось
            </h1>
        </div>

    );
};

export default NotFound;