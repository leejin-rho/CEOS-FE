import styled from '@emotion/styled';
import { theme } from '../../styles';
import { Text } from '../common';
import { CheckIcon } from '../../assets/CheckIcon';

export const enum DisplayPriorities {
  BLOCK = 'block',
  NONE = 'none',
}

interface CheckBoxProps {
  checked: boolean;
  onClick: () => void;
  value: string;
  type: string;
}

export const CheckBox = ({ checked, onClick, value, type }: CheckBoxProps) => {
  let display = DisplayPriorities.NONE;
  if (checked === false) display = DisplayPriorities.NONE;
  else if (checked === true) display = DisplayPriorities.BLOCK;

  return (
    <StyledCheckBoxContainer type={type}>
      <StyledCheckBox onClick={onClick}>
        <CheckIcon display={display} />
      </StyledCheckBox>
      <Text color={checked ? 'Blue' : 'Gray2'}>{value}</Text>
    </StyledCheckBoxContainer>
  );
};

// checkbox
const StyledCheckBoxContainer = styled.div<{ type?: string }>`
  display: flex;
  flex-direction: ${(props) => (props.type == 'row' ? 'row' : 'column')};
  align-items: center;
  justify-content: center;
  width: fit-content;
  height: fit-content;
  gap: 7px;

  // 이미지 및 텍스트 드래그 방지
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
`;
const StyledCheckBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  border-radius: 2px;
  background-color: ${theme.palette.Gray2};
`;
