import React from 'react'
import Flex from './Flex';

const NoData = ({text}) => {
  return (
    <Flex className="items-center justify-center h-full text-lg font-semibold capitalize font-inter">
      <p>{text}</p>
    </Flex>
  );
}

export default NoData