import {
  Desktop,
  Flex,
  Mobile,
  RelativeContainer,
  Text,
  ActivityCard,
} from '@ceos-fe/ui';
import { Title } from '@ceos/components/Title';
import { QueryClient, dehydrate, useQuery } from '@tanstack/react-query';
import { activityApi } from '@ceos-fe/utils';
import { ResponseInterface } from '@ceos-fe/utils';
import styled from '@emotion/styled';
import { GlassShortcutwithTitle } from '@ceos/components/Shortcut';
import Link from 'next/link';

// TODO: interface 재정의
interface ActivityResponse {
  activities: { content: string; id: number; imageUrl: string; name: string }[];
  pageInfo: {
    pageNum: number;
    limit: number;
    totalPages: number;
    totalElements: number;
  };
}

const Activity = () => {
  const { data, isLoading, isSuccess } = useQuery<{
    activityData: ResponseInterface<ActivityResponse>;
  }>(['ceos', 'activity'], async () => {
    const activityData = await activityApi.GET_ACTIVITY({
      pageNum: 0,
      limit: 10000,
    });
    return { activityData: activityData };
  });

  const acitivityList = data?.activityData.data.activities;

  return (
    <>
      <Desktop>
        <Flex direction="column" justify="space-between">
          <Flex direction="column">
            <Title
              title="Activity"
              explain={[
                'ceos에서는 it 창업과 관련된',
                '다양한 활동을 진행하고 있습니다.',
              ]}
            />
            {acitivityList?.map((_, idx) => {
              return idx % 3 === 0 ? (
                <Flex
                  key={`row_${idx}`}
                  justify="start"
                  width={1032}
                  margin="0 0 32px 0"
                  webGap={24}
                >
                  {acitivityList.slice(idx, idx + 3).map((activity, subIdx) => (
                    <ActivityCard
                      key={`activity_${idx}_${subIdx}`}
                      activityCard={activity}
                    />
                  ))}
                </Flex>
              ) : (
                <></>
              );
            })}
          </Flex>

          <RelativeContainer height={500}>
            <Background src="/shortcuts.svg" />
            <GlassFlex direction="column" webGap={80}>
              <Flex webGap={24}>
                <CustomLink href="/FAQ">
                  <GlassShortcutwithTitle title="더 궁금한 것이 있다면">
                    자주 묻는 질문 <br /> 보러가기
                  </GlassShortcutwithTitle>
                </CustomLink>

                <CustomLink href="/recruit">
                  <GlassShortcutwithTitle title="CEOS에 참여하고 싶다면">
                    CEOS 18기 <br /> 지원하기
                  </GlassShortcutwithTitle>
                </CustomLink>
              </Flex>
              <Text paletteColor="White" webTypo="Label3">
                © 2016-2023 CEOS ALL RIGHTS RESERVED.
              </Text>
            </GlassFlex>
          </RelativeContainer>
        </Flex>
      </Desktop>

      <Mobile>
        <Flex direction="column">
          <Title
            title="Activity"
            explain={[
              'ceos에서는 it 창업과 관련된',
              '다양한 활동을 진행하고 있습니다.',
            ]}
          />
          <Flex direction="column" mobileGap={20} margin="0 0 36px 0">
            {acitivityList?.map((activity, idx) => {
              return (
                <ActivityCard key={`activity_${idx}`} activityCard={activity} />
              );
            })}
          </Flex>
          <RelativeContainer align="start" height={550}>
            <Background src="/mobileShortcuts.svg" />
            <GlassFlex direction="column" mobileGap={63}>
              <Flex mobileGap={17} direction="column">
                <CustomLink href="/FAQ">
                  <GlassShortcutwithTitle title="더 궁금한 것이 있다면">
                    자주 묻는 질문 <br /> 보러가기
                  </GlassShortcutwithTitle>
                </CustomLink>

                <CustomLink href="/recruit">
                  <GlassShortcutwithTitle title="CEOS에 참여하고 싶다면">
                    CEOS 18기 <br /> 지원하기
                  </GlassShortcutwithTitle>
                </CustomLink>
              </Flex>
              <Text paletteColor="White" webTypo="Label3">
                © 2016-2023 CEOS ALL RIGHTS RESERVED.
              </Text>
            </GlassFlex>
          </RelativeContainer>
        </Flex>
      </Mobile>
    </>
  );
};

export const getStaticProps = async () => {
  try {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(['ceos', 'activity'], () =>
      activityApi.GET_ACTIVITY({ pageNum: 0, limit: 10000 }),
    );

    return {
      props: {
        dehydratedProps: dehydrate(queryClient),
      },
    };
  } catch (err) {
    console.error(err);
  }
};

export default Activity;

const GlassFlex = styled(Flex)`
  position: absolute;
  bottom: 80px;
  z-index: 99;
  @media (max-width: 1023px) {
    bottom: 30px;
  }
`;

const Background = styled.img`
  width: 100vw;
  z-index: -99;
  max-height: 500px;

  @media (max-width: 1023px) {
    position: absolute;
    bottom: 0;
    width: 100vw;
    max-height: 550px;
  }
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
