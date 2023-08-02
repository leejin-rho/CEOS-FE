import {
  Desktop,
  Flex,
  Mobile,
  ProjectCard,
  ProjectCardProps,
} from '@ceos-fe/ui';
import { Title } from '@ceos/components/Title';
import { projectApi } from '@ceos-fe/utils';
import {
  QueryClient,
  dehydrate,
  useInfiniteQuery,
} from '@tanstack/react-query';
import Footer from '@ceos/components/Footer';
import { TopMargin } from '../FAQ/index';
import { useState } from 'react';
import styled from '@emotion/styled';
import DetailModal from './DetailModal';
import { useRecoilValue } from 'recoil';
import { generationState } from '@ceos/state';

interface ProjectResponse {
  content: ProjectCardProps[];
  pageInfo: {
    pageNum: number;
    limit: number;
    totalPages: number;
    totalElements: number;
  };
}

const Project = () => {
  const { data, isLoading, isSuccess } = useInfiniteQuery<ProjectResponse>(
    ['ceos', 'project'],
    ({ pageParam = 0 }) =>
      projectApi.GET_ALL_PROJECTS({ pageNum: 0, limit: 16 }),
    {
      getNextPageParam: (lastPage) => {
        return true;
      },
    },
  );

  const generation = useRecoilValue(generationState);

  const projectList = data?.pages[0].content;

  const leftBtn = {
    title: '더 궁금한 것이 있다면',
    content: ['자주 묻는 질문', '보러가기'],
    link: '/FAQ',
  };
  const rightBtn = {
    title: 'CEOS에 참여하고 싶다면',
    content: [`CEOS ${generation}기`, '지원하기'],
    link: '/recruit',
  };

  const [modalNumber, setModalNumber] = useState(-1);
  const setClose = () => {
    setModalNumber(-1);
  };

  return (
    <Container>
      <Desktop>
        <Flex direction="column" data-section="White">
          <Title
            title="Project"
            explain={[
              '신촌 연합 IT 창업동아리 CEOS의',
              '활동 프로젝트를 소개합니다.',
            ]}
          />
          <TopMargin />
          <GridContainer length={projectList?.length ?? 0}>
            {projectList?.map((project, idx) => (
              <div onClick={() => setModalNumber(project.id)}>
                <ProjectCard projectCard={project} key={`project_card${idx}`} />
              </div>
            ))}
          </GridContainer>
          <Footer leftBtn={leftBtn} rightBtn={rightBtn} />
        </Flex>
      </Desktop>
      <Mobile>
        <Flex direction="column" data-section="White">
          <Title
            title="Project"
            explain={[
              '신촌 연합 IT 창업동아리 CEOS의',
              '활동 프로젝트를 소개합니다.',
            ]}
          />
          <TopMargin />
          <Flex direction="column" mobileGap={50} margin="0 0 36px 0">
            {projectList?.map((project, idx) => (
              <div
                onClick={() => setModalNumber(project.id)}
                key={`project_mobile_${idx}`}
              >
                <ProjectCard projectCard={project} />
              </div>
            ))}
          </Flex>
          <Footer leftBtn={leftBtn} rightBtn={rightBtn} />
        </Flex>
      </Mobile>
      {modalNumber !== -1 && (
        <DetailModal id={modalNumber} setClose={setClose} />
      )}
    </Container>
  );
};

export const getStaticProps = async () => {
  try {
    const queryClient = new QueryClient();

    await queryClient.prefetchInfiniteQuery(['ceos', 'project'], () =>
      projectApi.GET_ALL_PROJECTS({ pageNum: 0, limit: 10000 }),
    );

    return {
      props: {
        dehydratedProps: JSON.parse(JSON.stringify(dehydrate(queryClient))),
      },
    };
  } catch (err) {
    console.error(err);
  }
};

export default Project;

const Container = styled.div`
  position: relative;
`;

const GridContainer = styled.div<{ length: number }>`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 24px;
  row-gap: 48px;

  margin-bottom: 100px;

  @media (min-width: 1023px) {
    height: ${({ length }) => Math.ceil(length / 3) * 184 + 160}px;
  }
`;
