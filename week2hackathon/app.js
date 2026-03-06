// Quiz data storage
      let quizzesData = {};
      let currentQuiz = null;
      let currentQuestionIndex = 0;
      let userAnswers = [];

      // Fetch quiz data
      fetch('./quiz.json')
        .then(response => response.json())
        .then(data => {
          quizzesData = data.quizzes;
          if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initializeQuizzes);
          } else {
            initializeQuizzes();
          }
        })
        .catch(error => console.error('Error loading quiz data:', error));

      const getStartedBtn = document.getElementById('getStartedBtn');
      const backBtn = document.getElementById('backBtn');
      const backBtn2 = document.getElementById('backBtn2');
      const homeContent = document.getElementById('homeContent');
      const signupContent = document.getElementById('signupContent');
      const signinContent = document.getElementById('signinContent');

      // Mobile Menu Elements
      const hamburgerBtn = document.getElementById('hamburgerBtn');
      const mobileMenu = document.getElementById('mobileMenu');
      const homeNavBtnMobile = document.getElementById('homeNavBtnMobile');
      const quizzesNavBtnMobile = document.getElementById('quizzesNavBtnMobile');
      const resultsNavBtnMobile = document.getElementById('resultsNavBtnMobile');
      const profileNavBtnMobile = document.getElementById('profileNavBtnMobile');
      const logoutBtnMobile = document.getElementById('logoutBtnMobile');
      const profileImageBtn = document.getElementById('profileImageBtn');

      const signupForm = document.getElementById('signupForm');
      const signinForm = document.getElementById('signinForm');
      const signInLinkBtn = document.getElementById('signInLinkBtn');
      const signUpLinkBtn = document.getElementById('signUpLinkBtn');

      // Form input elements
      const signupFullName = document.getElementById('signupFullName');
      const signupEmail = document.getElementById('signupEmail');
      const signupPassword = document.getElementById('signupPassword');
      const signupConfirmPassword = document.getElementById('signupConfirmPassword');
      const signupError = document.getElementById('signupError');
      const signupSuccess = document.getElementById('signupSuccess');

      const signinEmail = document.getElementById('signinEmail');
      const signinPassword = document.getElementById('signinPassword');
      const signinError = document.getElementById('signinError');
      const signinSuccess = document.getElementById('signinSuccess');

      // Navigation functions
      function showSignup() {
        homeContent.classList.add('hidden');
        signupContent.classList.remove('hidden');
        signinContent.classList.add('hidden');
        clearMessages();
      }

      function showSignin() {
        homeContent.classList.add('hidden');
        signupContent.classList.add('hidden');
        signinContent.classList.remove('hidden');
        clearMessages();
      }

      function showHome() {
        homeContent.classList.remove('hidden');
        signupContent.classList.add('hidden');
        signinContent.classList.add('hidden');
        quizzesContent.classList.add('hidden');
        quizQuestionsContent.classList.add('hidden');
        quizResultsContent.classList.add('hidden');
        reviewAnswersContent.classList.add('hidden');
        profileContent.classList.add('hidden');
        clearMessages();
        clearForms();
        stopTimer();
      }

      function clearMessages() {
        signupError.classList.add('hidden');
        signupSuccess.classList.add('hidden');
        signinError.classList.add('hidden');
        signinSuccess.classList.add('hidden');
      }

      function clearForms() {
        signupForm.reset();
        signinForm.reset();
      }

      // Mobile Menu Toggle Function
      function toggleMobileMenu() {
        mobileMenu.classList.toggle('hidden');
      }

      function closeMobileMenu() {
        mobileMenu.classList.add('hidden');
      }

      // Event listeners for navigation
      getStartedBtn.addEventListener('click', () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
          // User is already logged in, go to quizzes
          showQuizzes();
        } else {
          // User not logged in, show signup
          showSignup();
        }
      });
      backBtn.addEventListener('click', showHome);
      backBtn2.addEventListener('click', showHome);
      signInLinkBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showSignin();
      });
      signUpLinkBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showSignup();
      });

      // Hamburger Menu Event Listeners
      hamburgerBtn.addEventListener('click', toggleMobileMenu);

      homeNavBtnMobile.addEventListener('click', () => {
        closeMobileMenu();
        showHome();
      });

      quizzesNavBtnMobile.addEventListener('click', () => {
        closeMobileMenu();
        showQuizzes();
      });

      resultsNavBtnMobile.addEventListener('click', () => {
        closeMobileMenu();
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
          displayLastQuizResult(currentUser);
        } else {
          showHome();
        }
      });

      profileNavBtnMobile.addEventListener('click', () => {
        closeMobileMenu();
        showProfile();
      });

      logoutBtnMobile.addEventListener('click', () => {
        closeMobileMenu();
        logoutUser();
      });

      // Profile Image Click (Open Profile)
      profileImageBtn.addEventListener('click', () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
          showProfile();
        } else {
          showHome();
        }
      });

      // Signup form submission
      signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const fullName = signupFullName.value.trim();
        const email = signupEmail.value.trim();
        const password = signupPassword.value;
        const confirmPassword = signupConfirmPassword.value;

        // Validation
        if (!fullName || !email || !password || !confirmPassword) {
          signupError.textContent = 'All fields are required.';
          signupError.classList.remove('hidden');
          return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          signupError.textContent = 'Please enter a valid email address.';
          signupError.classList.remove('hidden');
          return;
        }

        if (password !== confirmPassword) {
          signupError.textContent = 'Passwords do not match.';
          signupError.classList.remove('hidden');
          return;
        }

        if (password.length < 6) {
          signupError.textContent = 'Password must be at least 6 characters.';
          signupError.classList.remove('hidden');
          return;
        }

        // Get existing users from localStorage
        const existingUsers = JSON.parse(localStorage.getItem('quizMasterUsers')) || {};

        // Check if email already exists
        if (existingUsers[email]) {
          signupError.textContent = 'This email is already registered.';
          signupError.classList.remove('hidden');
          return;
        }

        // Store new user
        existingUsers[email] = {
          fullName: fullName,
          email: email,
          password: password,
          createdAt: new Date().toISOString()
        };

        localStorage.setItem('quizMasterUsers', JSON.stringify(existingUsers));

        // Show success message
        signupError.classList.add('hidden');
        signupSuccess.textContent = 'Account created successfully! Redirecting to sign in...';
        signupSuccess.classList.remove('hidden');

        // Reset form and redirect to signin after 2 seconds
        setTimeout(() => {
          signupForm.reset();
          showSignin();
          signinEmail.value = email;
          signinEmail.focus();
        }, 2000);
      });

      // Signin form submission
      signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = signinEmail.value.trim();
        const password = signinPassword.value;

        // Validation
        if (!email || !password) {
          signinError.textContent = 'Email and password are required.';
          signinError.classList.remove('hidden');
          return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          signinError.textContent = 'Please enter a valid email address.';
          signinError.classList.remove('hidden');
          return;
        }

        // Get users from localStorage
        const existingUsers = JSON.parse(localStorage.getItem('quizMasterUsers')) || {};

        // Check if user exists
        const user = existingUsers[email];
        if (!user) {
          signinError.textContent = 'Email not found. Please sign up first.';
          signinError.classList.remove('hidden');
          return;
        }

        // Check password
        if (user.password !== password) {
          signinError.textContent = 'Incorrect password.';
          signinError.classList.remove('hidden');
          return;
        }

        // Successful signin
        signinError.classList.add('hidden');
        signinSuccess.textContent = `Welcome back, ${user.fullName}!`;
        signinSuccess.classList.remove('hidden');

        // Store current logged in user
        localStorage.setItem('currentUser', JSON.stringify(user));

        // Reset form and redirect after 2 seconds
        setTimeout(() => {
          signinForm.reset();
          showHome();
        }, 2000);
      });

      // Get quiz elements
      const quizzesContent = document.getElementById('quizzesContent');
      const quizQuestionsContent = document.getElementById('quizQuestionsContent');
      const quizResultsContent = document.getElementById('quizResultsContent');
      const reviewAnswersContent = document.getElementById('reviewAnswersContent');
      const quizzesNavBtn = document.getElementById('quizzesNavBtn');
      const homeNavBtn = document.getElementById('homeNavBtn');
      const resultsNavBtn = document.getElementById('resultsNavBtn');
      const quizzesBackBtn = document.getElementById('quizzesBackBtn');
      const quizBackBtn = document.getElementById('quizBackBtn');
      const nextBtn = document.getElementById('nextBtn');
      const prevBtn = document.getElementById('prevBtn');
      const questionText = document.getElementById('questionText');
      const optionsContainer = document.getElementById('optionsContainer');
      const questionCounter = document.getElementById('questionCounter');
      const progressFill = document.getElementById('progressFill');
      const hoursDisplay = document.getElementById('hoursDisplay');
      const minutesDisplay = document.getElementById('minutesDisplay');
      const secondsDisplay = document.getElementById('secondsDisplay');
      const scoreDisplay = document.getElementById('scoreDisplay');
      const congratsMessage = document.getElementById('congratsMessage');
      const reviewAnswersBtn = document.getElementById('reviewAnswersBtn');
      const anotherQuizBtn = document.getElementById('anotherQuizBtn');
      const backToQuizzesFromReviewBtn = document.getElementById('backToQuizzesFromReviewBtn');
      const incorrectAnswersContainer = document.getElementById('incorrectAnswersContainer');

      // Profile elements
      const profileContent = document.getElementById('profileContent');
      const profileNavBtn = document.getElementById('profileNavBtn');
      const profileBackBtn = document.getElementById('profileBackBtn');
      const profileName = document.getElementById('profileName');
      const profileTitle = document.getElementById('profileTitle');
      const profileJoined = document.getElementById('profileJoined');
      const profileNameDisplay = document.getElementById('profileNameDisplay');
      const profileEmailDisplay = document.getElementById('profileEmailDisplay');
      const profileBioDisplay = document.getElementById('profileBioDisplay');
      const quizHistoryContainer = document.getElementById('quizHistoryContainer');
      const profileAvatar = document.getElementById('profileAvatar');

      // Quiz state
      let quizTimer = null;
      let timeRemaining = 5 * 60; // 5 minutes total for quiz
      let selectedAnswers = {}; // Store selected answers

      // Quizzes navigation functions
      function showQuizzes() {
        homeContent.classList.add('hidden');
        signupContent.classList.add('hidden');
        signinContent.classList.add('hidden');
        quizzesContent.classList.remove('hidden');
        quizQuestionsContent.classList.add('hidden');
        profileContent.classList.add('hidden');
        quizResultsContent.classList.add('hidden');
        reviewAnswersContent.classList.add('hidden');
      }

      function hideQuizzes() {
        quizzesContent.classList.add('hidden');
        homeContent.classList.remove('hidden');
      }

      function showQuizQuestions() {
        quizzesContent.classList.add('hidden');
        quizQuestionsContent.classList.remove('hidden');
        displayQuestion();
        startTimer();
      }

      function hideQuizQuestions() {
        quizQuestionsContent.classList.add('hidden');
        stopTimer();
      }

      // Profile navigation functions
      function showProfile() {
        homeContent.classList.add('hidden');
        signupContent.classList.add('hidden');
        signinContent.classList.add('hidden');
        quizzesContent.classList.add('hidden');
        quizQuestionsContent.classList.add('hidden');
        quizResultsContent.classList.add('hidden');
        reviewAnswersContent.classList.add('hidden');
        profileContent.classList.remove('hidden');
        populateProfileData();
      }

      function hideProfile() {
        profileContent.classList.add('hidden');
        homeContent.classList.remove('hidden');
      }

      // Event listeners for quizzes navigation
      quizzesNavBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showQuizzes();
      });

      homeNavBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showHome();
      });

      resultsNavBtn.addEventListener('click', (e) => {
        e.preventDefault();
        // Show results from localStorage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
          displayLastQuizResult(currentUser);
        } else {
          showHome();
        }
      });

      profileNavBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showProfile();
      });

      profileBackBtn.addEventListener('click', () => {
        hideProfile();
      });

      // Logout functionality
      function logoutUser() {
        localStorage.removeItem('currentUser');
        selectedAnswers = {};
        currentQuestionIndex = 0;
        currentQuiz = null;
        showHome();
      }

      // Add logout button listener if it exists
      const logoutBtn = document.getElementById('logoutBtn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
      }

      quizzesBackBtn.addEventListener('click', () => {
        hideQuizzes();
      });

      quizBackBtn.addEventListener('click', () => {
        stopTimer();
        hideQuizQuestions();
        showQuizzes();
      });

      // Profile tab functionality
      const activityTab = document.getElementById('activityTab');
      const profileTab = document.getElementById('profileTab');
      
      if (activityTab && profileTab) {
        activityTab.addEventListener('click', () => {
          activityTab.classList.add('text-[#121417]', 'border-[#121417]');
          activityTab.classList.remove('text-[#61738A]', 'border-[#E6E8EB]');
          profileTab.classList.add('text-[#61738A]', 'border-[#E6E8EB]');
          profileTab.classList.remove('text-[#121417]', 'border-[#121417]');
        });

        profileTab.addEventListener('click', () => {
          profileTab.classList.add('text-[#121417]', 'border-[#121417]');
          profileTab.classList.remove('text-[#61738A]', 'border-[#E6E8EB]');
          activityTab.classList.add('text-[#61738A]', 'border-[#E6E8EB]');
          activityTab.classList.remove('text-[#121417]', 'border-[#121417]');
        });
      }

      // Initialize quiz card clicks
      function initializeQuizzes() {
        const quizCards = document.querySelectorAll('[data-quiz-id]');
        quizCards.forEach(card => {
          card.addEventListener('click', function() {
            const quizId = this.getAttribute('data-quiz-id');
            startQuiz(quizId);
          });
        });

        // Initialize filter buttons
        initializeFilterButtons();
      }

      // Function to initialize filter button clicks
      function initializeFilterButtons() {
        const filterButtons = document.querySelectorAll('.filterBtn');
        
        filterButtons.forEach(button => {
          button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the selected category
            const selectedCategory = this.getAttribute('data-category');
            
            // Update active button styling
            filterButtons.forEach(btn => {
              if (btn.getAttribute('data-category') === selectedCategory) {
                btn.classList.add('bg-[#0D78F2]', 'text-white');
                btn.classList.remove('bg-[#F0F2F5]', 'text-[#121417]', 'hover:bg-gray-300');
              } else {
                btn.classList.remove('bg-[#0D78F2]', 'text-white');
                btn.classList.add('bg-[#F0F2F5]', 'text-[#121417]', 'hover:bg-gray-300');
              }
            });
            
            // Filter the quiz items
            filterQuizzes(selectedCategory);
          });
        });

        // Set "All" as default active button
        const allButton = document.querySelector('[data-category="all"]');
        if (allButton) {
          allButton.classList.add('bg-[#0D78F2]', 'text-white');
          allButton.classList.remove('bg-[#F0F2F5]', 'text-[#121417]', 'hover:bg-gray-300');
        }
      }

      // Function to filter quizzes based on category
      function filterQuizzes(category) {
        const quizItems = document.querySelectorAll('.quizItem');
        
        quizItems.forEach(item => {
          const itemCategory = item.getAttribute('data-category');
          
          if (category === 'all' || itemCategory === category) {
            item.style.display = 'flex';
          } else {
            item.style.display = 'none';
          }
        });
      }

      // Function to start a quiz
      function startQuiz(quizId) {
        currentQuiz = quizzesData[quizId];
        currentQuestionIndex = 0;
        selectedAnswers = {};
        userAnswers = [];
        timeRemaining = 5 * 60; // Reset timer to 5 minutes
        
        if (currentQuiz) {
          console.log('Starting quiz:', currentQuiz.title);
          showQuizQuestions();
        }
      }

      // Display current question
      function displayQuestion() {
        if (!currentQuiz || currentQuestionIndex >= currentQuiz.questions.length) {
          endQuiz();
          return;
        }

        const question = currentQuiz.questions[currentQuestionIndex];
        
        // Update question text
        questionText.textContent = question.question;
        
        // Update question counter
        const totalQuestions = currentQuiz.questions.length;
        questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${totalQuestions}`;
        
        // Update progress bar
        const progressPercent = ((currentQuestionIndex + 1) / totalQuestions) * 100;
        progressFill.style.width = progressPercent + '%';
        
        // Clear and regenerate options
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
          const isSelected = selectedAnswers[currentQuestionIndex] === index;
          const optionDiv = document.createElement('div');
          optionDiv.className = 'flex flex-row items-center gap-4 p-4 border border-[#DBE0E6] rounded-lg hover:bg-gray-50 transition cursor-pointer';
          if (isSelected) {
            optionDiv.classList.add('bg-blue-50', 'border-[#0D78F2]');
          }
          optionDiv.innerHTML = `
            <input type="radio" name="answer" id="option-${index}" value="${index}" 
              ${isSelected ? 'checked' : ''} 
              class="w-5 h-5 cursor-pointer" />
            <label for="option-${index}" class="flex-1 text-sm font-medium text-[#121417] cursor-pointer">
              ${option}
            </label>
          `;
          
          optionDiv.addEventListener('click', () => {
            selectAnswer(index);
          });
          
          optionsContainer.appendChild(optionDiv);
        });

        // Update button states
        prevBtn.disabled = currentQuestionIndex === 0;
        nextBtn.disabled = !((currentQuestionIndex in selectedAnswers) || currentQuestionIndex === totalQuestions - 1);
      }

      // Select an answer
      function selectAnswer(optionIndex) {
        selectedAnswers[currentQuestionIndex] = optionIndex;
        displayQuestion();
      }

      // Navigate to next question
      nextBtn.addEventListener('click', () => {
        if (currentQuestionIndex < currentQuiz.questions.length - 1) {
          currentQuestionIndex++;
          displayQuestion();
        } else {
          endQuiz();
        }
      });

      // Navigate to previous question
      prevBtn.addEventListener('click', () => {
        if (currentQuestionIndex > 0) {
          currentQuestionIndex--;
          displayQuestion();
        }
      });

      // Timer functionality
      function startTimer() {
        stopTimer(); // Clear any existing timer
        quizTimer = setInterval(() => {
          timeRemaining--;
          
          const hours = Math.floor(timeRemaining / 3600);
          const minutes = Math.floor((timeRemaining % 3600) / 60);
          const seconds = timeRemaining % 60;
          
          hoursDisplay.textContent = String(hours).padStart(2, '0');
          minutesDisplay.textContent = String(minutes).padStart(2, '0');
          secondsDisplay.textContent = String(seconds).padStart(2, '0');
          
          if (timeRemaining <= 0) {
            stopTimer();
            endQuiz();
          }
        }, 1000);
      }

      function stopTimer() {
        if (quizTimer) {
          clearInterval(quizTimer);
          quizTimer = null;
        }
      }

      // End quiz function
      function endQuiz() {
        stopTimer();
        
        // Calculate score
        let correctAnswers = 0;
        currentQuiz.questions.forEach((question, index) => {
          if (selectedAnswers[index] === question.correct) {
            correctAnswers++;
          }
        });

        // Get current user
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (currentUser) {
          // Store quiz results
          const quizResults = JSON.parse(localStorage.getItem('quizResults')) || {};
          
          if (!quizResults[currentUser.email]) {
            quizResults[currentUser.email] = {};
          }

          const percentage = ((correctAnswers / currentQuiz.questions.length) * 100).toFixed(2);
          quizResults[currentUser.email][currentQuiz.id] = {
            quizTitle: currentQuiz.title,
            score: correctAnswers,
            totalQuestions: currentQuiz.questions.length,
            percentage: percentage,
            answers: selectedAnswers,
            completedAt: new Date().toISOString()
          };

          localStorage.setItem('quizResults', JSON.stringify(quizResults));
          
          // Display results page
          displayResults(currentUser, correctAnswers, currentQuiz.questions.length);
        }
      }

      // Display results page
      function displayResults(user, score, total) {
        scoreDisplay.textContent = `${score}/${total}`;
        const percentage = ((score / total) * 100).toFixed(0);
        congratsMessage.textContent = `Congratulations, ${user.fullName}! You've completed the quiz with a score of ${score} out of ${total}. Your performance indicates a ${getPerformanceMessage(percentage)}. Keep up the excellent work!`;
        
        quizQuestionsContent.classList.add('hidden');
        quizResultsContent.classList.remove('hidden');
      }

      // Get performance message based on score
      function getPerformanceMessage(percentage) {
        if (percentage >= 90) return 'outstanding understanding';
        if (percentage >= 80) return 'strong understanding';
        if (percentage >= 70) return 'good understanding';
        if (percentage >= 60) return 'satisfactory understanding';
        return 'need for improvement in';
      }

      // Review Answers button
      reviewAnswersBtn.addEventListener('click', () => {
        displayReviewAnswers();
      });

      // Take Another Quiz button
      anotherQuizBtn.addEventListener('click', () => {
        quizResultsContent.classList.add('hidden');
        showQuizzes();
      });

      // Back to Quizzes from Review button
      backToQuizzesFromReviewBtn.addEventListener('click', () => {
        reviewAnswersContent.classList.add('hidden');
        showQuizzes();
      });

      // Function to populate profile data
      function populateProfileData() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (!currentUser) {
          showHome();
          return;
        }

        // Set user info
        const userInitial = currentUser.fullName.charAt(0).toUpperCase();
        profileAvatar.textContent = userInitial;
        profileName.textContent = currentUser.fullName;
        profileNameDisplay.textContent = currentUser.fullName;
        profileEmailDisplay.textContent = currentUser.email;
        profileTitle.textContent = 'Quiz Enthusiast'; // Default title
        profileBioDisplay.textContent = 'Avid quiz taker and trivia lover. Always up for a challenge!'; // Default bio
        
        // Set joined date
        const createdDate = new Date(currentUser.createdAt);
        const year = createdDate.getFullYear();
        profileJoined.textContent = `Joined ${year}`;

        // Populate quiz history
        const quizResults = JSON.parse(localStorage.getItem('quizResults')) || {};
        const userQuizResults = quizResults[currentUser.email] || {};

        quizHistoryContainer.innerHTML = '';

        if (Object.keys(userQuizResults).length === 0) {
          quizHistoryContainer.innerHTML = '<div class="col-span-3 text-center py-6 text-[#61738A]">No quizzes completed yet. Start a quiz to see your history!</div>';
        } else {
          // Sort by date (most recent first)
          const sortedResults = Object.entries(userQuizResults).sort((a, b) => 
            new Date(b[1].completedAt) - new Date(a[1].completedAt)
          );

          sortedResults.forEach(([quizId, result]) => {
            const resultRow = document.createElement('div');
            resultRow.className = 'flex flex-row w-full bg-white border-t border-[#E6E8EB]';
            
            const completedDate = new Date(result.completedAt);
            const formattedDate = completedDate.toISOString().split('T')[0]; // YYYY-MM-DD format
            
            resultRow.innerHTML = `
              <div class="flex-1 px-4 py-3 text-sm font-normal text-[#121417]">${result.quizTitle}</div>
              <div class="flex-1 px-4 py-3 text-sm font-normal text-[#61738A]">${result.score}/${result.totalQuestions}</div>
              <div class="flex-1 px-4 py-3 text-sm font-normal text-[#61738A]">${formattedDate}</div>
            `;
            
            quizHistoryContainer.appendChild(resultRow);
          });
        }
      }

      // Function to display review answers
      function displayReviewAnswers() {
        incorrectAnswersContainer.innerHTML = '';
        
        if (!currentQuiz) return;

        let questionNumber = 1;
        let hasIncorrectAnswers = false;

        currentQuiz.questions.forEach((question, index) => {
          const userAnswerIndex = selectedAnswers[index];
          
          // Only show incorrect answers
          if (userAnswerIndex !== undefined && userAnswerIndex !== question.correct) {
            hasIncorrectAnswers = true;
            
            const userAnswer = question.options[userAnswerIndex];
            const correctAnswer = question.options[question.correct];
            
            const answerDiv = document.createElement('div');
            answerDiv.className = 'flex flex-col gap-3 border-b border-[#DBE0E6] pb-6 last:border-b-0';
            answerDiv.innerHTML = `
              <div class="flex flex-col gap-2">
                <h3 class="text-lg font-bold text-[#121417]">Question ${questionNumber}</h3>
              </div>
              <div class="flex flex-col gap-2">
                <p class="text-base font-normal text-[#121417]">${question.question}</p>
              </div>
              <div class="flex flex-col gap-2">
                <p class="text-base font-normal text-[#121417]"><span class="font-medium">Your answer:</span> ${userAnswer}</p>
              </div>
              <div class="flex flex-col gap-2">
                <p class="text-base font-normal text-[#121417]"><span class="font-medium">Correct answer:</span> ${correctAnswer}</p>
              </div>
            `;
            
            incorrectAnswersContainer.appendChild(answerDiv);
            questionNumber++;
          }
        });

        if (!hasIncorrectAnswers) {
          incorrectAnswersContainer.innerHTML = '<p class="text-center text-lg font-medium text-[#61738A] py-8">Perfect! You got all answers correct!</p>';
        }

        quizResultsContent.classList.add('hidden');
        reviewAnswersContent.classList.remove('hidden');
      }

      // Function to display last quiz result
      function displayLastQuizResult(user) {
        const quizResults = JSON.parse(localStorage.getItem('quizResults')) || {};
        const userQuizResults = quizResults[user.email] || {};

        if (Object.keys(userQuizResults).length === 0) {
          // No quiz results found
          scoreDisplay.textContent = 'No Results';
          congratsMessage.textContent = 'You haven\'t completed any quizzes yet. Start a quiz to see your results here.';
          showResults();
          return;
        }

        // Get the most recent quiz result
        const sortedResults = Object.entries(userQuizResults).sort((a, b) => 
          new Date(b[1].completedAt) - new Date(a[1].completedAt)
        );

        const [quizId, lastResult] = sortedResults[0];
        
        // Display the last quiz result
        scoreDisplay.textContent = `${lastResult.score}/${lastResult.totalQuestions}`;
        const percentage = Math.round(lastResult.percentage);
        congratsMessage.textContent = `Congratulations, ${user.fullName}! You completed "${lastResult.quizTitle}" with a score of ${lastResult.score} out of ${lastResult.totalQuestions}. Your performance indicates a ${getPerformanceMessage(percentage)}. Keep up the excellent work!`;
        
        // Set current quiz data for review functionality
        currentQuiz = quizzesData[quizId];
        if (currentQuiz) {
          const savedAnswers = lastResult.answers;
          selectedAnswers = {};
          // Convert string keys back to numbers
          Object.keys(savedAnswers).forEach(key => {
            selectedAnswers[parseInt(key)] = savedAnswers[key];
          });
        }

        showResults();
      }

      // Show results page (main results view)
      function showResults() {
        homeContent.classList.add('hidden');
        signupContent.classList.add('hidden');
        signinContent.classList.add('hidden');
        quizzesContent.classList.add('hidden');
        quizQuestionsContent.classList.add('hidden');
        quizResultsContent.classList.remove('hidden');
        reviewAnswersContent.classList.add('hidden');
        profileContent.classList.add('hidden');
      }

      // Function to show question screen (initial placeholder)
      function showQuestionScreen() {
        // This is called when quiz starts
        showQuizQuestions();
      }