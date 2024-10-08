
import React from 'react'; // Ensure React is imported
import styled from 'styled-components';

const ItemSection = () => {
  return (
    <ItemSectionWrapper>
      <HeaderWrapper>
      </HeaderWrapper>
    </ItemSectionWrapper>
  );
};

const Select = styled.div``;
const Title = styled.div`
  font-size: 20px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  padding: 0px 20px;
`;

const ItemSectionWrapper = styled.div`
  width: 100%;
  height: 300px;
  display: inline-flex;
  margin-top: 20px;
  background-color: white;
`;

export default ItemSection;
