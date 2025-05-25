import React from 'react';
import { Flex, Spinner } from '@prismane/core';
const LoadingScreen = () => (
    <Flex w="100vw" h="100vh" align="center" justify="center">
        <Spinner size="lg" />
    </Flex>
);
export default LoadingScreen;
