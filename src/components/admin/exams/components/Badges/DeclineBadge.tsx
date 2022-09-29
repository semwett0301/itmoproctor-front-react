import React, {FC} from 'react';
import {Badge} from "@consta/uikit/Badge";

const DeclineBadge: FC= () => {
    return (
        <Badge
            form='default'
            size='m'
            view='stroked'
            label='Отклонен'
            status='error'
        />
    );
};

export default DeclineBadge;