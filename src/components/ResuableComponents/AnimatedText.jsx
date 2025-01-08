import React from 'react';
import { motion } from 'framer-motion';

const AnimatedText = ({ text, className }) => {
    return (
        <div className='flex justify-center'>
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className={`${className}`}
            >
                {text}
            </motion.h1>
        </div>
    );
}

export default AnimatedText;
