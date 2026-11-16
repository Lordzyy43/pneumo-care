const symptomQuestionIds = new Set([
  "breathingDifficulty",
  "oneSidedChestPain",
  "rapidBreathing",
]);

const historyQuestionIds = new Set([
  "recentTrauma",
  "chestProcedure",
  "previousPneumothorax",
  "lungDisease",
]);

export function evaluateScreening(questions, answers = {}) {
  const answeredQuestions = questions.map((question) => ({
    ...question,
    answer: answers[question.id] ?? null,
  }));
  const yesAnswers = answeredQuestions.filter(({ answer }) => answer === "yes");
  const noAnswers = answeredQuestions.filter(({ answer }) => answer === "no");
  const uncertainAnswers = answeredQuestions.filter(({ answer }) => answer === "unsure");
  const unansweredQuestions = answeredQuestions.filter(({ answer }) => answer === null);
  const triggeredSafetyQuestions = answeredQuestions.filter(({ safety, answer }) =>
    safety?.triggerValues?.includes(answer),
  );

  const hasEmergency = triggeredSafetyQuestions.some(({ safety }) => safety.priority === "emergency");
  const hasUrgent = triggeredSafetyQuestions.some(({ safety }) => safety.priority === "urgent");
  const hasSymptomAnswers = yesAnswers.some(({ id }) => symptomQuestionIds.has(id));
  const hasHistoryAnswers = yesAnswers.some(({ id }) => historyQuestionIds.has(id));
  const hasUncertainty = uncertainAnswers.length > 0;
  const isIncomplete = unansweredQuestions.length > 0;

  let status = "no_symptoms";
  if (hasEmergency) status = "emergency";
  else if (hasUrgent) status = "urgent";
  else if (isIncomplete) status = "incomplete";
  else if (hasSymptomAnswers || hasUncertainty) status = "attention";

  return {
    answeredQuestions,
    yesAnswers,
    noAnswers,
    uncertainAnswers,
    unansweredQuestions,
    triggeredSafetyQuestions,
    hasEmergency,
    hasUrgent,
    hasSymptomAnswers,
    hasHistoryAnswers,
    hasUncertainty,
    isIncomplete,
    status,
  };
}
