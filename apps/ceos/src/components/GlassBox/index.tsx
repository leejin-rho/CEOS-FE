import { Button, Text, theme } from '@ceos-fe/ui';
import { ArrowUpRight } from '@ceos/assets/ArrowUpRight';
import { Diamond } from '@ceos/assets/Diamond';
import { css } from '@emotion/react';
import { useState } from 'react';
import { ModalPortal, useModal } from '@ceos-fe/utils';
import { DropModal } from '../Modals/dropModal';

// step : 서류 합격 , 면접 합격
// 서류 => 이름 , 면접 시간

export const DocPassGlassBox = () => {
  const [isPossible, setIsPossible] = useState(false);
  const { isOpen, toggleModal } = useModal();
  return (
    <div css={GlassBoxCss}>
      <Diamond />
      <Text
        webTypo="Heading4"
        paletteColor="White"
        css={css`
          gap: 0px;
          margin-top: 4px;
        `}
      >
        면접 일정
      </Text>
      <p>
        000님의 면접 타임은 0월 0일 오후 0시 00분 입니다.
        <br />
        해당 면접 시간에 참여 가능하신지 꼭 확인 부탁드립니다.
      </p>
      {!isPossible ? (
        <div>
          <Button
            variant="white"
            webWidth={223}
            css={css`
              gap: 0px;
              margin-bottom: 12px;
            `}
            onClick={() => {
              setIsPossible(true);
            }}
          >
            네, 참여 가능합니다.
          </Button>
          <p
            css={css`
              text-decoration: underline;
              color: ${theme.palette.Gray3};

              :hover {
                cursor: pointer;
              }
            `}
            onClick={() => {
              toggleModal();
            }}
          >
            아니요, 불가능합니다.
          </p>
        </div>
      ) : (
        <>
          <Text webTypo="Label1">[안내 사항]</Text>
          <p>
            - 인터뷰는 ZOOM을 통해 이루어집니다.
            <br />
            인터뷰 전 ZOOM이 가능한 계정이 있는지 확인해 주세요.
          </p>
          <p>
            - 화상 면접이 가능한 노트북과 이어폰을 준비해 주시고,
            <br />
            조용한 환경에서 면접에 참여해 주시길 부탁드리겠습니다.
            <br />
            면접 전에 미리 이어폰 및 마이크에 문제가 없는지 확인 부탁드립니다
          </p>
          <p>
            - 배정된 인터뷰 시간 15분 전에, <br />
            하단 링크를 통해 오픈 채팅방에 접속해 주세요.
            <br />
            프로필 설정은 [이름(전화번호 뒷 4자리)]로
            <br />
            설정해 주시면 됩니다. (ex) 홍길동(4921)
            <br />
            시간이 되면 줌 링크를 오픈 채팅방에 공유드릴 예정입니다.
          </p>
          <p>- 인터뷰는 최대 4인 1조로 약 30분간 진행됩니다.</p>
          <p>서류 합격을 다시 한번 축하드리며, 면접일에 뵙겠습니다 :)</p>
          <p>CEOS 17기 운영진 드림</p>
          <Button variant="white" webWidth={218}>
            <ArrowUpRight color={theme.palette.Blue} />
            &nbsp;오픈 채팅방 링크
          </Button>
        </>
      )}
      {isOpen && (
        <ModalPortal>
          <DropModal isOpen={isOpen} toggleModal={toggleModal} />
        </ModalPortal>
      )}
    </div>
  );
};

const GlassBoxCss = css`
  width: 552px;
  border-radius: 16px;
  color: ${theme.palette.White};
  ${theme.glass.Border};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  box-sizing: border-box;
  typo: ${theme.typo.Web.Body2};
  color: white;
  background-clip: border-box;
  gap: 24px;

  &:hover {
    background-image: linear-gradient(
        rgba(255, 255, 255, 0.05),
        rgba(255, 255, 255, 0.2)
      ),
      linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.01));
  }
`;
