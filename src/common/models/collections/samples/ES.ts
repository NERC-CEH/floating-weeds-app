import defaultSurvey from 'Survey/config';

// eslint-disable-next-line import/prefer-default-export

export default {
  bool: {
    should: [
      {
        match: {
          'metadata.survey.id': defaultSurvey.id,
        },
      },
    ],
  },
};
