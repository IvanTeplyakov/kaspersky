import React from 'react';
import { Button } from 'antd';

interface ButtonProps {
    onClick?: () => void;
    text: string;
}

const CustomButton: React.FC<ButtonProps> = ({ onClick, text}) => {
    return (
        <Button onClick={onClick}>{text}</Button>
    );
};

export default CustomButton;
