import { Flex, Text, Button, theme } from '@ceos-fe/ui';
import Information from './Information';
import styled from '@emotion/styled';
import {
  QueryClient,
  dehydrate,
  useInfiniteQuery,
} from '@tanstack/react-query';

import {
  recruitApi,
  RecruitApplyValuesInterface,
  ResponseInterface,
} from '@ceos-fe/utils';
import { useForm } from 'react-hook-form';
import { Title } from '../../../components/Title';
import Common from './Common';
import Part from './Part';
import Schedule from './Schedule';
import { useEffect, useState } from 'react';
import {
  PartName,
  RecruitApplyFormInterface,
  RecruitApplyResponse,
} from './interface';

const Apply = () => {
  const { register, watch, setValue, getValues, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      gender: '',
      birth: '',
      email: '',
      phoneNumber: '',

      university: '',
      major: '',
      semestersLeftNumber: null,
      generation: 17,

      otDate: '',
      demodayDate: '',
      otherActivities: '',

      part: '기획',
      commonAnswers: [],
      partAnswers: [],

      unableTimes: [],
    } as RecruitApplyValuesInterface,
  }) as RecruitApplyFormInterface;

  const { data, isLoading, isSuccess } = useInfiniteQuery<
    ResponseInterface<RecruitApplyResponse>
  >(['ceos', 'recuit', 'apply'], () => recruitApi.GET_QUESTION());

  const [questionList, setQuestionList] = useState<
    RecruitApplyResponse | undefined
  >(undefined);

  useEffect(() => {
    setQuestionList(data?.pages[0].data);

    // 공통 질문 수만큼 초기화 값 세팅
    const commons = data?.pages[0].data?.commonQuestions.map((common) => ({
      questionId: common.questionId,
      answer: '',
    }));
    if (commons) setValue('commonAnswers', commons);

    // 각 파트 질문수만큼 초기화 값 세팅
    const partNameList: PartName[] = [
      'productQuestions',
      'designQuestions',
      'frontendQuestions',
      'backendQuestions',
    ];
    setValue('partAnswers', []);
    for (const PartName of partNameList) {
      const productObj = data?.pages[0].data?.[PartName].map((product) => ({
        questionId: product.questionId,
        answer: '',
      }));

      productObj
        ? setValue('partAnswers', [...getValues('partAnswers'), productObj])
        : setValue('partAnswers', [...getValues('partAnswers'), []]);
    }

    const times = data?.pages[0].data?.times;
    let setTimes = [] as number[][];

    times?.forEach((time) => {
      let temp = [] as number[];
      time.durations.forEach((dur) => {
        temp.push(0);
      });
      setTimes.push(temp);
    });

    setValue('unableTimes', setTimes);
  }, [data]);

  const submitForm = () => {
    const body = getValues();
    console.log(body, getValues('name'));
    if (questionList) recruitApi.POST_APPLY(questionList?.times, body);
  };

  const changeDate = (date: string) => {
    let newDate = new Date(date);
    return `${newDate.getFullYear()}.${String(newDate.getMonth() + 1).padStart(
      2,
      '0',
    )}.${String(newDate.getDate()).padStart(2, '0')}`;
  };

  return (
    <Wrapper direction="column">
      <Title
        title="CEOS 18기 리크루팅"
        explain={['서류 답변은 한 번만 가능하니,', '꼼꼼하게 확인 바랍니다:)']}
      ></Title>
      <TopMargin />
      <Flex direction="column">
        {/* 인적사항 질문 */}
        <Information register={register} setValue={setValue} />
        {/* 공통 질문 */}
        <Common setValue={setValue} questionList={questionList} />
        {/* 파트별 질문 */}
        <Part
          register={register}
          watch={watch}
          setValue={setValue}
          getValues={getValues}
          questionList={questionList}
        />
        {/* 면접 날짜 */}
        <Schedule
          watch={watch}
          setValue={setValue}
          getValues={getValues}
          questionList={questionList}
        />
        <Button variant="default" onClick={submitForm}>
          제출하기
        </Button>
        <Text webTypo="Label3" paletteColor="Gray3" margin="80px 0 56px 0">
          © 2016-2023 Ceos ALL RIGHTS RESERVED.
        </Text>
      </Flex>
    </Wrapper>
  );
};

export const getStaticProps = async () => {
  try {
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery(['ceos', 'recuit', 'apply'], () => {
      recruitApi.GET_QUESTION;
    });

    return {
      props: {
        dehydratedProps: dehydrate(queryClient),
      },
    };
  } catch (err) {
    console.error(err);
  }
};

export default Apply;

const TopMargin = styled.div`
  height: 80px;
  @media (max-width: 1023px) {
    height: 36px;
  }
`;

const Wrapper = styled(Flex)`
  @media (max-width: 1023px) {
    padding: 23px;
  }
`;

export const RowLine = styled.div`
  width: 856px;
  height: 2px;
  background: #e9ebef;
  margin: 24px 0;

  @media (max-width: 1023px) {
    width: 100%;
  }
`;

export const ColumnLine = styled.div`
  width: 2px;
  height: 70px;
  background-color: ${theme.palette.Gray2};
`;

export const Section = styled(Flex)`
  flex-direction: column;
  align-items: start;
  width: 856px;
  gap: 36px;
  margin: 24px 0 0 0;

  @media (max-width: 1023px) {
    width: 100%;
    gap: 28px;
  }
`;
