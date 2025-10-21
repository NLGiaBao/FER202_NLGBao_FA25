import React, { useReducer, useEffect } from "react";
import { Button, Container, Card, Badge } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  timeLeft: 10,
  awaitingFeedback: false,
  feedback: null, // { type: 'correct'|'incorrect', correctAnswer: '...' }
  highScore: 0,
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      if (state.awaitingFeedback) return state;
      return { ...state, selectedOption: action.payload };

    case "TICK":
      return { ...state, timeLeft: Math.max(0, state.timeLeft - 1) };

    case "SUBMIT_ANSWER": {
      // Evaluate and set feedback, update score if correct
      const currentQ = state.questions[state.currentQuestion];
      const isCorrect = state.selectedOption === currentQ.answer;
      const newScore = isCorrect ? state.score + 1 : state.score;
      const feedback = isCorrect
        ? { type: "correct", correctAnswer: currentQ.answer }
        : { type: "incorrect", correctAnswer: currentQ.answer };
      const showScore =
        state.currentQuestion + 1 === state.questions.length ? true : false;
      return {
        ...state,
        score: newScore,
        awaitingFeedback: true,
        feedback,
        showScore,
      };
    }

    case "ADVANCE_QUESTION": {
      // Move to next question, reset selection/timer/feedback
      const nextIndex = state.currentQuestion + 1;
      if (nextIndex >= state.questions.length) {
        return {
          ...state,
          currentQuestion: nextIndex,
          selectedOption: "",
          timeLeft: 10,
          awaitingFeedback: false,
          feedback: null,
          showScore: true,
        };
      }
      return {
        ...state,
        currentQuestion: nextIndex,
        selectedOption: "",
        timeLeft: 10,
        awaitingFeedback: false,
        feedback: null,
      };
    }

    case "TIME_EXPIRED": {
      // If time runs out before submitting, treat as incorrect and show feedback
      const currentQ = state.questions[state.currentQuestion];
      const feedback = { type: "incorrect", correctAnswer: currentQ.answer };
      const showScore =
        state.currentQuestion + 1 === state.questions.length ? true : false;
      return {
        ...state,
        awaitingFeedback: true,
        feedback,
        showScore,
      };
    }

    case "RESTART_QUIZ":
      return { ...initialState, highScore: state.highScore };

    case "SET_HIGH_SCORE":
      return { ...state, highScore: action.payload };

    default:
      return state;
  }
}

// Component chính
function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const {
    questions,
    currentQuestion,
    selectedOption,
    score,
    showScore,
    timeLeft,
    awaitingFeedback,
    feedback,
    highScore,
  } = state;

  // load high score on mount
  useEffect(() => {
    const stored = parseInt(localStorage.getItem("qb_high_score") || "0", 10);
    if (!isNaN(stored)) dispatch({ type: "SET_HIGH_SCORE", payload: stored });
  }, []);

  // timer tick every second when quiz active and not awaiting feedback
  useEffect(() => {
    if (showScore || awaitingFeedback) return;
    const timer = setInterval(() => {
      dispatch({ type: "TICK" });
    }, 1000);
    return () => clearInterval(timer);
  }, [showScore, awaitingFeedback, currentQuestion]);

  // when timeLeft reaches 0 => time expired
  useEffect(() => {
    if (timeLeft === 0 && !showScore && !awaitingFeedback) {
      dispatch({ type: "TIME_EXPIRED" });
    }
  }, [timeLeft, showScore, awaitingFeedback]);

  // auto-advance after feedback is shown
  useEffect(() => {
    if (!awaitingFeedback) return;
    const t = setTimeout(() => {
      // if completed, update high score and stop
      if (currentQuestion + 1 >= questions.length) {
        // update localStorage high score if needed
        const stored = parseInt(localStorage.getItem("qb_high_score") || "0", 10);
        if (score > stored) {
          localStorage.setItem("qb_high_score", String(score));
          dispatch({ type: "SET_HIGH_SCORE", payload: score });
        }
        dispatch({ type: "ADVANCE_QUESTION" });
        return;
      }
      dispatch({ type: "ADVANCE_QUESTION" });
    }, 1500);
    return () => clearTimeout(t);
  }, [awaitingFeedback, currentQuestion, questions.length, score]);

  const handleOptionSelect = (option) => {
    if (awaitingFeedback) return;
    dispatch({ type: "SELECT_OPTION", payload: option });
  };

  const handleNextQuestion = () => {
    if (awaitingFeedback) return;
    // Only submit if user selected an option; otherwise do nothing (time will expire)
    if (!selectedOption) return;
    dispatch({ type: "SUBMIT_ANSWER" });
  };

  const handleRestartQuiz = () => {
    dispatch({ type: "RESTART_QUIZ" });
  };

  // progress text
  const progressText = `${Math.min(currentQuestion + 1, questions.length)}/${questions.length}`;

  return (
    <Container className="mt-4">
      <Card className="p-4">
        {showScore ? (
          <div className="text-center">
            <h2>
              Your Score: {score} / {questions.length}
            </h2>
            <p>
              High Score: <strong>{highScore}</strong>
            </p>
            <Button variant="primary" onClick={handleRestartQuiz}>
              Restart Quiz
            </Button>
          </div>
        ) : (
          <div>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <strong>
                  Question {questions[currentQuestion].id}:
                </strong>
              </div>
              <div>
                <Badge bg="secondary">{progressText}</Badge>
              </div>
            </div>

            <h4 className="mb-3">{questions[currentQuestion].question}</h4>

            <div className="mb-3">
              Time left:{" "}
              <span style={{ color: timeLeft < 5 ? "red" : "inherit", fontWeight: 600 }}>
                {timeLeft}s
              </span>
            </div>

            <div className="mt-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    selectedOption === option
                      ? awaitingFeedback && feedback?.type === "correct"
                        ? "success"
                        : "outline-success"
                      : "outline-secondary"
                  }
                  className="m-2"
                  onClick={() => handleOptionSelect(option)}
                  disabled={awaitingFeedback}
                >
                  {option}
                </Button>
              ))}
            </div>

            {/* Feedback area */}
            {awaitingFeedback && feedback && (
              <div className="mt-3 d-flex align-items-center">
                {feedback.type === "correct" ? (
                  <div style={{ color: "green", display: "flex", alignItems: "center", gap: 8 }}>
                    <FaCheckCircle />
                    <strong>Correct! 🎉</strong>
                  </div>
                ) : (
                  <div style={{ color: "red", display: "flex", alignItems: "center", gap: 8 }}>
                    <FaTimesCircle />
                    <strong>Incorrect! The correct answer is {feedback.correctAnswer}</strong>
                  </div>
                )}
              </div>
            )}

            <Button
              variant="primary"
              className="mt-3"
              disabled={!selectedOption || awaitingFeedback}
              onClick={handleNextQuestion}
            >
              {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Submit Answer"}
            </Button>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default QuestionBank;
