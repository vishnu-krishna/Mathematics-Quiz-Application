


(function () {

    var app = angular.module('myQuiz', []);
    app.controller('Quizcontroller', ["$scope", "$http", "$sce", function ($scope, $http, $sce) {

        $scope.score = 0;
        $scope.activeQuestion = -1;
        $scope.activeQuestionAnswered = 0;
        $scope.percentage = 0;


        $http.get('quiz_data.json').then(function (quizData) {
            $scope.myQuestions = quizData.data;
            $scope.totalQuestions = $scope.myQuestions.length;
        });


        $scope.selectAnswer = function (qIndex, aIndex) {
            var questionState = $scope.myQuestions[qIndex].questionState;

            if (questionState != 'answered') {
                $scope.myQuestions[qIndex].selectedAnswer = aIndex;
                var correctAnswer = $scope.myQuestions[qIndex].correct;
                $scope.myQuestions[qIndex].correctAnswer = correctAnswer;

                if (correctAnswer === aIndex) {

                    $scope.myQuestions[qIndex].correctness = 'correct';
                    $scope.score += 1;
                } else {
                    $scope.myQuestions[qIndex].correctness = 'incorrect';
                }
                $scope.myQuestions[qIndex].questionState = 'answered'
            }
            $scope.percentage = (($scope.score / $scope.totalQuestions) * 100).toFixed(2);
        };

        $scope.isSelected = function (qIndex, aIndex) {
            return $scope.myQuestions[qIndex].selectedAnswer === aIndex;
        }
        $scope.isCorrect = function (qIndex, aIndex) {
            return $scope.myQuestions[qIndex].correctAnswer === aIndex;
        }
        $scope.selectContinue = function () {
            return $scope.activeQuestion += 1;
        }
        $scope.createShareLinks = function (percentage) {
            var url = 'http://google.co.in';
            var emailLink = '<a class = "btn email" href="mailto:vishnu_cute05@yahoo.com">Email a Friend</a>';
            var twitterLink = '<a class = "btn twitter" target="_blank" href="www.twitter.com">Tweet Your Score</a>';
            var newMarkup = emailLink + twitterLink;
            return $sce.trustAsHtml(newMarkup);

        }

    }]);

})();