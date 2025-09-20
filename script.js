/**
 * Online Exam Portal - Complete Exam Engine
 * Landing page + Full exam interface with logging and email submission
 */

// Global variables
let examConfig = null;
let themeColors = null;
let questions = null;
let examLog = null;
let currentQuestionIndex = 0;
let examTimer = null;
let examStartTime = null;
let questionStartTime = null;
let isExamStarted = false;

/**
 * Main initialization function - loads config and renders the landing page
 */
async function initializeExamPortal() {
    try {
        showLoadingState();
        await loadExamConfiguration();
        await loadQuestions();
        renderLandingPage();
        applyThemeColors();
    } catch (error) {
        console.error('Failed to initialize exam portal:', error);
        showErrorState('Failed to load exam configuration. Please refresh the page.');
    }
}

/**
 * Fetches and parses the settings.json configuration file
 */
async function loadExamConfiguration() {
    try {
        const response = await fetch('config/settings.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        examConfig = await response.json();
        themeColors = examConfig.theme;
        console.log('Exam configuration loaded successfully:', examConfig);
    } catch (error) {
        throw new Error(`Configuration loading failed: ${error.message}`);
    }
}

/**
 * Fetches and parses the questions.json file
 */
async function loadQuestions() {
    try {
        const response = await fetch('questions.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        questions = data.questions;
        console.log(`Loaded ${questions.length} questions successfully`);
    } catch (error) {
        throw new Error(`Questions loading failed: ${error.message}`);
    }
}

/**
 * Initializes the exam log structure
 */
function initializeExamLog() {
    examLog = {
        examTitle: examConfig.examTitle,
        startTime: new Date().toISOString(),
        endTime: null,
        totalTimeTaken: null,
        responses: questions.map(q => ({
            questionId: q.id,
            selectedOption: null,
            markedForReview: false,
            timeSpent: 0,
            actions: []
        }))
    };
}

/**
 * Updates the exam log with user actions
 */
function updateLog(questionId, action, selectedOption = null) {
    const response = examLog.responses.find(r => r.questionId === questionId);
    if (!response) return;

    // Update time spent on previous question
    if (questionStartTime && action === 'viewed') {
        const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
        if (currentQuestionIndex > 0) {
            const prevResponse = examLog.responses.find(r => r.questionId === questions[currentQuestionIndex - 1]?.id);
            if (prevResponse) {
                prevResponse.timeSpent += timeSpent;
            }
        }
        questionStartTime = Date.now();
    }

    // Add action to log
    response.actions.push({
        event: action,
        timestamp: new Date().toISOString()
    });

    // Update selected option if provided
    if (selectedOption !== null) {
        response.selectedOption = selectedOption;
    }

    console.log(`Log updated: Q${questionId} - ${action}`, response);
}

/**
 * Renders the complete landing page with all sections
 */
function renderLandingPage() {
    const appContainer = document.getElementById('app');
    
    if (!appContainer) {
        throw new Error('App container not found');
    }
    
    const landingPageHTML = `
        <div class="exam-portal-container">
            ${renderHeader()}
            ${renderExamDetails()}
            ${renderSectionBreakdown()}
            ${renderActionButtons()}
        </div>
    `;
    
    appContainer.innerHTML = landingPageHTML;
}

/**
 * Renders the exam header with title and branding
 */
function renderHeader() {
    return `
        <header class="exam-header">
            <div class="header-content">
                <h1 class="exam-title" id="examTitle">${examConfig.examTitle}</h1>
                <div class="exam-subtitle">Built with love, exclusively for my Urmi!</div>
            </div>
        </header>
    `;
}

/**
 * Renders exam details section with key information
 */
function renderExamDetails() {
    const formattedDate = formatExamDate(examConfig.examDate);
    const totalDuration = examConfig.examDuration + (examConfig.graceTime || 0);
    const durationHours = Math.floor(totalDuration / 3600);
    const durationMinutes = Math.floor((totalDuration % 3600) / 60);
    const durationText = durationHours > 0 
        ? `${durationHours}h ${durationMinutes}m` 
        : `${durationMinutes} minutes`;
    
    return `
        <section class="exam-details">
            <div class="details-container">
                <h2 class="section-title">Exam Information</h2>
                <div class="details-grid">
                    <div class="detail-item">
                        <div class="detail-icon">📅</div>
                        <div class="detail-content">
                            <span class="detail-label">Date</span>
                            <span class="detail-value">${formattedDate}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-icon">⏱️</div>
                        <div class="detail-content">
                            <span class="detail-label">Duration</span>
                            <span class="detail-value">${durationText}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-icon">❓</div>
                        <div class="detail-content">
                            <span class="detail-label">Total Questions</span>
                            <span class="detail-value">${examConfig.pattern.totalQuestions}</span>
                        </div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-icon">🏆</div>
                        <div class="detail-content">
                            <span class="detail-label">Total Marks</span>
                            <span class="detail-value">${examConfig.pattern.totalMarks}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

/**
 * Renders the section breakdown table
 */
function renderSectionBreakdown() {
    const sections = examConfig.pattern.sections;
    
    const sectionRows = sections.map(section => `
        <tr class="section-row">
            <td class="section-name">${section.name}</td>
            <td class="section-category">${section.categoryI || '-'}</td>
            <td class="section-category">${section.categoryII || '-'}</td>
            <td class="section-marks">${section.marks}</td>
        </tr>
    `).join('');
    
    return `
        <section class="section-breakdown">
            <div class="breakdown-container">
                <h2 class="section-title">Exam Pattern</h2>
                <div class="table-container">
                    <table class="sections-table">
                        <thead>
                            <tr class="table-header">
                                <th>Section</th>
                                <th>Category I</th>
                                <th>Category II</th>
                                <th>Total Marks</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${sectionRows}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    `;
}

/**
 * Renders action buttons section
 */
function renderActionButtons() {
    return `
        <section class="action-section">
            <div class="button-container">
                <button class="btn-primary start-exam-btn" onclick="startExam()">
                    <span class="btn-icon">🚀</span>
                    Start Exam
                </button>
                <button class="btn-secondary instructions-btn" onclick="showInstructions()">
                    <span class="btn-icon">📋</span>
                    Instructions
                </button>
            </div>
        </section>
    `;
}

/**
 * Renders the complete exam interface
 */
function renderExamInterface() {
    const appContainer = document.getElementById('app');
    
    const examHTML = `
        <div class="exam-interface">
            ${renderExamHeader()}
            <div class="exam-body">
                ${renderQuestionPalette()}
                ${renderQuestionPanel()}
            </div>
        </div>
    `;
    
    appContainer.innerHTML = examHTML;
    
    // Render the first question
    renderQuestion(0);
    
    // Start MathJax rendering if available
    if (window.MathJax) {
        MathJax.typesetPromise();
    }
}

/**
 * Renders the exam header with timer
 */
function renderExamHeader() {
    return `
        <header class="exam-header-bar">
            <div class="exam-header-content">
                <h2 class="exam-title-small">${examConfig.examTitle}</h2>
                <div class="timer-container">
                    <span class="timer-label">Time Remaining:</span>
                    <span class="timer" id="examTimer">00:00:00</span>
                </div>
            </div>
        </header>
    `;
}

/**
 * Renders the question palette sidebar
 */
function renderQuestionPalette() {
    const paletteItems = questions.map((q, index) => {
        const response = examLog.responses.find(r => r.questionId === q.id);
        let status = 'unattempted';
        
        if (response) {
            if (response.markedForReview) {
                status = 'review';
            } else if (response.selectedOption !== null) {
                status = 'attempted';
            }
        }
        
        return `
            <button class="palette-item ${status} ${index === currentQuestionIndex ? 'current' : ''}" 
                    onclick="navigateToQuestion(${index})" 
                    data-question-id="${q.id}">
                ${index + 1}
            </button>
        `;
    }).join('');
    
    return `
        <div class="question-palette">
            <div class="palette-header">
                <h3>Question Palette</h3>
                <div class="legend">
                    <div class="legend-item">
                        <span class="legend-color attempted"></span>
                        <span>Attempted</span>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color unattempted"></span>
                        <span>Unattempted</span>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color review"></span>
                        <span>Review</span>
                    </div>
                </div>
            </div>
            <div class="palette-grid">
                ${paletteItems}
            </div>
        </div>
    `;
}

/**
 * Renders the question panel
 */
function renderQuestionPanel() {
    return `
        <div class="question-panel">
            <div class="question-content" id="questionContent">
                <!-- Question will be rendered here -->
            </div>
            <div class="question-controls">
                <button class="btn-secondary" onclick="previousQuestion()" id="prevBtn">
                    <span class="btn-icon">←</span>
                    Previous
                </button>
                <button class="btn-outline" onclick="toggleReview()" id="reviewBtn">
                    <span class="btn-icon">🔖</span>
                    Mark for Review
                </button>
                <button class="btn-secondary" onclick="nextQuestion()" id="nextBtn">
                    Next
                    <span class="btn-icon">→</span>
                </button>
                <button class="btn-primary submit-btn" onclick="submitExam()">
                    <span class="btn-icon">📤</span>
                    Submit Exam
                </button>
            </div>
        </div>
    `;
}

/**
 * Renders a specific question
 */
function renderQuestion(index) {
    if (index < 0 || index >= questions.length) return;
    
    currentQuestionIndex = index;
    const question = questions[index];
    const response = examLog.responses.find(r => r.questionId === question.id);
    
    // Update log for question view
    updateLog(question.id, 'viewed');
    
    const questionHTML = `
        <div class="question-header">
            <div class="question-meta">
                <span class="question-number">Question ${index + 1} of ${questions.length}</span>
                <span class="question-section">${question.section} - Category ${question.category}</span>
                <span class="question-marks">Marks: ${question.marks} | Negative: ${question.negativeMarks}</span>
            </div>
        </div>
        
        <div class="question-text">
            ${question.questionText}
        </div>
        
        <div class="options-container">
            ${question.options.map((option, optIndex) => `
                <label class="option-label">
                    <input type="radio" 
                           name="question_${question.id}" 
                           value="${optIndex}"
                           ${response?.selectedOption === optIndex ? 'checked' : ''}
                           onchange="selectOption(${question.id}, ${optIndex})">
                    <span class="option-text">${option}</span>
                </label>
            `).join('')}
        </div>
    `;
    
    document.getElementById('questionContent').innerHTML = questionHTML;
    
    // Update palette
    updateQuestionPalette();
    
    // Update button states
    updateControlButtons();
    
    // Render MathJax if available
    if (window.MathJax) {
        MathJax.typesetPromise([document.getElementById('questionContent')]);
    }
}

/**
 * Updates the question palette colors
 */
function updateQuestionPalette() {
    questions.forEach((q, index) => {
        const paletteItem = document.querySelector(`[data-question-id="${q.id}"]`);
        const response = examLog.responses.find(r => r.questionId === q.id);
        
        if (paletteItem) {
            paletteItem.className = 'palette-item';
            
            if (response.markedForReview) {
                paletteItem.classList.add('review');
            } else if (response.selectedOption !== null) {
                paletteItem.classList.add('attempted');
            } else {
                paletteItem.classList.add('unattempted');
            }
            
            if (index === currentQuestionIndex) {
                paletteItem.classList.add('current');
            }
        }
    });
}

/**
 * Updates control button states
 */
function updateControlButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const reviewBtn = document.getElementById('reviewBtn');
    
    // Previous button
    prevBtn.disabled = currentQuestionIndex === 0;
    
    // Next button
    nextBtn.disabled = currentQuestionIndex === questions.length - 1;
    
    // Review button
    const response = examLog.responses.find(r => r.questionId === questions[currentQuestionIndex].id);
    if (response?.markedForReview) {
        reviewBtn.innerHTML = '<span class="btn-icon">🔖</span> Remove Review';
        reviewBtn.classList.add('marked');
    } else {
        reviewBtn.innerHTML = '<span class="btn-icon">🔖</span> Mark for Review';
        reviewBtn.classList.remove('marked');
    }
}

/**
 * Starts the exam
 */
function startExam() {
    const confirmed = confirm(`Are you ready to start the exam?\n\nOnce started:\n• Timer will begin immediately\n• You cannot pause or restart\n• Duration: ${Math.floor((examConfig.examDuration + examConfig.graceTime) / 60)} minutes\n\nClick OK to begin.`);
    
    if (confirmed) {
        isExamStarted = true;
        examStartTime = Date.now();
        questionStartTime = Date.now();
        
        // Initialize exam log
        initializeExamLog();
        
        // Render exam interface
        renderExamInterface();
        
        // Start timer
        startTimer();
        
        console.log('Exam started at:', new Date().toISOString());
    }
}

/**
 * Starts the exam timer
 */
function startTimer() {
    const totalTime = (examConfig.examDuration + (examConfig.graceTime || 0)) * 1000;
    const endTime = Date.now() + totalTime;
    
    examTimer = setInterval(() => {
        const remainingTime = endTime - Date.now();
        
        if (remainingTime <= 0) {
            clearInterval(examTimer);
            submitExam(true); // Auto-submit
            return;
        }
        
        const hours = Math.floor(remainingTime / (1000 * 60 * 60));
        const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
        
        const timerElement = document.getElementById('examTimer');
        if (timerElement) {
            timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Change color when less than 5 minutes remaining
            if (remainingTime < 5 * 60 * 1000) {
                timerElement.classList.add('warning');
            }
        }
    }, 1000);
}

/**
 * Navigates to a specific question
 */
function navigateToQuestion(index) {
    if (index >= 0 && index < questions.length) {
        renderQuestion(index);
    }
}

/**
 * Goes to previous question
 */
function previousQuestion() {
    if (currentQuestionIndex > 0) {
        navigateToQuestion(currentQuestionIndex - 1);
    }
}

/**
 * Goes to next question
 */
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        navigateToQuestion(currentQuestionIndex + 1);
    }
}

/**
 * Handles option selection
 */
function selectOption(questionId, optionIndex) {
    updateLog(questionId, 'answered', optionIndex);
    updateQuestionPalette();
    console.log(`Selected option ${optionIndex} for question ${questionId}`);
}

/**
 * Toggles review mark for current question
 */
function toggleReview() {
    const questionId = questions[currentQuestionIndex].id;
    const response = examLog.responses.find(r => r.questionId === questionId);
    
    response.markedForReview = !response.markedForReview;
    updateLog(questionId, response.markedForReview ? 'review-marked' : 'review-unmarked');
    
    updateQuestionPalette();
    updateControlButtons();
}

/**
 * Submits the exam
 */
function submitExam(auto = false) {
    const confirmed = auto || confirm(`Are you sure you want to submit the exam?\n\nThis action cannot be undone.`);
    
    if (confirmed) {
        // Stop timer
        if (examTimer) {
            clearInterval(examTimer);
        }
        
        // Show submission loading
        showSubmissionLoading();
        
        // Finalize exam log
        finalizeExamLog();
        
        // Simulate processing delay
        setTimeout(() => {
            openGmailCompose();
        }, 2000);
    }
}

/**
 * Shows submission loading state
 */
function showSubmissionLoading() {
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = `
        <div class="submission-container">
            <div class="submission-content">
                <div class="loading-spinner large"></div>
                <h2 class="submission-title">Submitting your exam...</h2>
                <p class="submission-text">Please wait while we process your responses.</p>
                <div class="submission-progress">
                    <div class="progress-bar">
                        <div class="progress-fill"></div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Finalizes the exam log with end time and total time
 */
function finalizeExamLog() {
    examLog.endTime = new Date().toISOString();
    examLog.totalTimeTaken = Math.floor((Date.now() - examStartTime) / 1000);
    
    // Update time spent on last question
    if (questionStartTime) {
        const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
        const lastResponse = examLog.responses.find(r => r.questionId === questions[currentQuestionIndex]?.id);
        if (lastResponse) {
            lastResponse.timeSpent += timeSpent;
        }
    }
    
    console.log('Final exam log:', examLog);
}

/**
 * Opens Gmail compose with exam log
 */
function openGmailCompose() {
    const subject = encodeURIComponent(examConfig.submission.subjectLine);
    const body = encodeURIComponent(JSON.stringify(examLog, null, 2));
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${subject}&body=${body}`;
    
    // Show success message
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = `
        <div class="submission-success">
            <div class="success-content">
                <div class="success-icon">✅</div>
                <h2 class="success-title">Exam Submitted Successfully!</h2>
                <p class="success-text">Your exam has been processed. Gmail will open in a new tab with your responses.</p>
                <p class="success-subtext">If Gmail doesn't open automatically, you can manually copy your responses.</p>
                <div class="success-actions">
                    <button class="btn-primary" onclick="window.open('${gmailURL}', '_blank')">
                        <span class="btn-icon">📧</span>
                        Open Gmail
                    </button>
                    <button class="btn-secondary" onclick="location.reload()">
                        <span class="btn-icon">🔄</span>
                        Take Another Test
                    </button>
                </div>
            </div>
        </div>
    `;
    
    // Auto-open Gmail
    window.open(gmailURL, '_blank');
}

/**
 * Shows exam instructions in a modal
 */
function showInstructions() {
    const modalHTML = `
        <div class="modal-overlay" id="instructionsModal" onclick="closeInstructions(event)">
            <div class="modal-container">
                <div class="modal-header">
                    <h2 class="modal-title">Exam Instructions</h2>
                    <button class="modal-close-btn" onclick="closeInstructions()">&times;</button>
                </div>
                <div class="modal-content">
                    ${generateInstructionsContent()}
                </div>
                <div class="modal-footer">
                    <button class="btn-primary" onclick="closeInstructions()">
                        <span class="btn-icon">✓</span>
                        I Understand
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    addModalStyles();
    document.body.style.overflow = 'hidden';
}

/**
 * Generates comprehensive instructions content
 */
function generateInstructionsContent() {
    const totalDuration = examConfig.examDuration + (examConfig.graceTime || 0);
    const durationHours = Math.floor(totalDuration / 3600);
    const durationMinutes = Math.floor((totalDuration % 3600) / 60);
    const durationText = durationHours > 0 
        ? `${durationHours} hour${durationHours > 1 ? 's' : ''} and ${durationMinutes} minute${durationMinutes > 1 ? 's' : ''}` 
        : `${durationMinutes} minute${durationMinutes > 1 ? 's' : ''}`;
    
    return `
        <div class="instructions-content">
            <div class="instruction-section">
                <h3 class="instruction-heading">📋 General Instructions</h3>
                <ul class="instruction-list">
                    <li>This exam contains <strong>${examConfig.pattern.totalQuestions} questions</strong> for a total of <strong>${examConfig.pattern.totalMarks} marks</strong></li>
                    <li>Total duration: <strong>${durationText}</strong></li>
                    <li>Once you start the exam, the timer will begin automatically</li>
                    <li>You can navigate between questions using the question palette</li>
                    <li>${examConfig.autoSubmit ? 'The exam will auto-submit when time expires' : 'Manual submission is required before time expires'}</li>
                    <li>Maximum page reloads allowed: <strong>${examConfig.maxReloads}</strong></li>
                    <li>Grace time for technical issues: <strong>${examConfig.graceTime} seconds</strong></li>
                </ul>
            </div>

            <div class="instruction-section">
                <h3 class="instruction-heading">📚 Section-wise Breakdown</h3>
                <div class="sections-info">
                    ${examConfig.pattern.sections.map(section => `
                        <div class="section-info">
                            <strong>${section.name}:</strong> 
                            ${section.categoryI} Category I questions${section.categoryII > 0 ? ` + ${section.categoryII} Category II questions` : ''} 
                            = <strong>${section.marks} marks</strong>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="instruction-section">
                <h3 class="instruction-heading">🎯 Marking Scheme</h3>
                <div class="marking-info">
                    <div class="category-marking">
                        <strong>Category I Questions:</strong>
                        <ul class="marking-list">
                            <li>Correct Answer: <span class="positive-mark">+${examConfig.pattern.markingScheme.categoryI.correct} mark</span></li>
                            <li>Wrong Answer: <span class="negative-mark">${examConfig.pattern.markingScheme.categoryI.wrong} marks</span></li>
                            <li>Unanswered: <span class="neutral-mark">${examConfig.pattern.markingScheme.categoryI.unanswered} marks</span></li>
                        </ul>
                    </div>
                    <div class="category-marking">
                        <strong>Category II Questions:</strong>
                        <ul class="marking-list">
                            <li>Correct Answer: <span class="positive-mark">+${examConfig.pattern.markingScheme.categoryII.correct} marks</span></li>
                            <li>Wrong Answer: <span class="negative-mark">${examConfig.pattern.markingScheme.categoryII.wrong} marks</span></li>
                            <li>Unanswered: <span class="neutral-mark">${examConfig.pattern.markingScheme.categoryII.unanswered} marks</span></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="instruction-section">
                <h3 class="instruction-heading">🎨 Question Status Colors</h3>
                <div class="color-legend">
                    <div class="color-item">
                        <span class="color-box attempted-color"></span>
                        <span>Attempted Questions</span>
                    </div>
                    <div class="color-item">
                        <span class="color-box unattempted-color"></span>
                        <span>Unattempted Questions</span>
                    </div>
                    <div class="color-item">
                        <span class="color-box review-color"></span>
                        <span>Questions Marked for Review</span>
                    </div>
                </div>
            </div>

            <div class="instruction-section">
                <h3 class="instruction-heading">⚠️ Important Guidelines</h3>
                <ul class="instruction-list warning-list">
                    <li>Ensure stable internet connection throughout the exam</li>
                    <li>Do not close the browser or refresh the page unnecessarily</li>
                    <li>Use only one browser tab for the exam</li>
                    <li>Keep your system charged or connected to power</li>
                    <li>${examConfig.allowReview ? 'You can review your answers before final submission' : 'Review of answers is not allowed'}</li>
                    <li>Results will ${examConfig.showResultsImmediately ? 'be shown immediately after submission' : 'be available later'}</li>
                </ul>
            </div>

            <div class="instruction-section good-luck">
                <h3 class="instruction-heading">🍀 Best of Luck!</h3>
                <p>Read each question carefully and manage your time wisely. Remember, there's negative marking for Category I questions, so answer only when you're confident.</p>
            </div>
        </div>
    `;
}

/**
 * Closes the instructions modal
 */
function closeInstructions(event) {
    if (event && event.target.id !== 'instructionsModal') return;
    
    const modal = document.getElementById('instructionsModal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = 'auto';
    }
}

/**
 * Applies dynamic theme colors
 */
function applyThemeColors() {
    const root = document.documentElement;
    
    root.style.setProperty('--primary-color', themeColors.primaryColor);
    root.style.setProperty('--attempted-color', themeColors.attemptedColor);
    root.style.setProperty('--unattempted-color', themeColors.unattemptedColor);
    root.style.setProperty('--review-color', themeColors.reviewColor);
    
    // Apply primary color to specific elements
    const primaryElements = document.querySelectorAll('#examTitle, .table-header');
    primaryElements.forEach(element => {
        element.style.color = themeColors.primaryColor;
    });
    
    // Apply border colors to table
    const table = document.querySelector('.sections-table');
    if (table) {
        table.style.borderColor = themeColors.primaryColor;
    }
}

/**
 * Utility function to format exam date
 */
function formatExamDate(dateString) {
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        return dateString;
    }
}

/**
 * Shows loading state while configuration is being fetched
 */
function showLoadingState() {
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = `
        <div class="loading-container">
            <div class="loading-spinner"></div>
            <p class="loading-text">Loading exam configuration...</p>
        </div>
    `;
}

/**
 * Shows error state if configuration loading fails
 */
function showErrorState(message) {
    const appContainer = document.getElementById('app');
    appContainer.innerHTML = `
        <div class="error-container">
            <div class="error-icon">⚠️</div>
            <h2 class="error-title">Configuration Error</h2>
            <p class="error-message">${message}</p>
            <button class="btn-secondary" onclick="location.reload()">Retry</button>
        </div>
    `;
}

/**
 * Adds dynamic styles for the instructions modal
 */
function addModalStyles() {
    if (document.getElementById('modalStyles')) return;
    
    const styles = document.createElement('style');
    styles.id = 'modalStyles';
    styles.textContent = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            backdrop-filter: blur(2px);
        }
        
        .modal-container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
            max-width: 800px;
            max-height: 90vh;
            width: 90%;
            overflow: hidden;
            animation: modalSlideIn 0.3s ease-out;
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .modal-header {
            background: var(--primary-color, #2c3e50);
            color: white;
            padding: 20px 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-title {
            margin: 0;
            font-size: 1.5em;
            font-weight: 600;
        }
        
        .modal-close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 24px;
            cursor: pointer;
            padding: 5px;
            border-radius: 4px;
            transition: background 0.3s;
        }
        
        .modal-close-btn:hover {
            background: rgba(255, 255, 255, 0.1);
        }
        
        .modal-content {
            padding: 30px;
            max-height: 60vh;
            overflow-y: auto;
        }
        
        .modal-footer {
            background: #f8f9fa;
            padding: 20px 30px;
            border-top: 1px solid #e9ecef;
            text-align: center;
        }
        
        .instructions-content {
            line-height: 1.6;
        }
        
        .instruction-section {
            margin-bottom: 25px;
            padding-bottom: 20px;
            border-bottom: 1px solid #eee;
        }
        
        .instruction-section:last-child {
            border-bottom: none;
            margin-bottom: 0;
        }
        
        .instruction-heading {
            color: var(--primary-color, #2c3e50);
            margin-bottom: 15px;
            font-size: 1.2em;
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .instruction-list {
            margin: 10px 0;
            padding-left: 20px;
        }
        
        .instruction-list li {
            margin-bottom: 8px;
            line-height: 1.5;
        }
        
        .sections-info {
            display: grid;
            gap: 10px;
            margin: 15px 0;
        }
        
        .section-info {
            background: #f8f9fa;
            padding: 12px 15px;
            border-radius: 6px;
            border-left: 4px solid var(--primary-color, #2c3e50);
        }
        
        .marking-info {
            display: grid;
            gap: 20px;
            margin-top: 15px;
        }
        
        .category-marking {
            background: #f8f9fa;
            padding: 15px;
            border-radius: 8px;
            border: 1px solid #e9ecef;
        }
        
        .marking-list {
            margin-top: 10px;
            padding-left: 20px;
        }
        
        .positive-mark {
            color: #28a745;
            font-weight: 600;
        }
        
        .negative-mark {
            color: #dc3545;
            font-weight: 600;
        }
        
        .neutral-mark {
            color: #6c757d;
            font-weight: 600;
        }
        
        .color-legend {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            margin-top: 15px;
        }
        
        .color-item {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .color-box {
            width: 20px;
            height: 20px;
            border-radius: 4px;
            border: 2px solid #ddd;
        }
        
        .attempted-color {
            background-color: var(--attempted-color, #2ecc71);
        }
        
        .unattempted-color {
            background-color: var(--unattempted-color, #e74c3c);
        }
        
        .review-color {
            background-color: var(--review-color, #f39c12);
        }
        
        .warning-list li {
            color: #856404;
        }
        
        .good-luck {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            padding: 20px;
            border-radius: 8px;
            text-align: center;
        }
        
        .good-luck p {
            margin: 10px 0 0 0;
            font-style: italic;
            color: #495057;
        }
        
        /* Exam Interface Styles */
        .exam-interface {
            height: 100vh;
            display: flex;
            flex-direction: column;
            background: #f8f9fa;
        }
        
        .exam-header-bar {
            background: white;
            border-bottom: 2px solid var(--primary-color, #2c3e50);
            padding: 15px 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .exam-header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1400px;
            margin: 0 auto;
        }
        
        .exam-title-small {
            margin: 0;
            font-size: 1.2em;
            color: var(--primary-color, #2c3e50);
        }
        
        .timer-container {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .timer-label {
            font-weight: 500;
            color: #666;
        }
        
        .timer {
            background: var(--primary-color, #2c3e50);
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            font-family: monospace;
            font-size: 1.2em;
            font-weight: bold;
        }
        
        .timer.warning {
            background: #dc3545;
            animation: timerBlink 1s infinite;
        }
        
        @keyframes timerBlink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0.7; }
        }
        
        .exam-body {
            flex: 1;
            display: flex;
            max-width: 1400px;
            margin: 0 auto;
            width: 100%;
            gap: 20px;
            padding: 20px;
            overflow: hidden;
        }
        
        .question-palette {
            width: 300px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            padding: 20px;
            overflow-y: auto;
        }
        
        .palette-header h3 {
            margin: 0 0 15px 0;
            color: var(--primary-color, #2c3e50);
        }
        
        .legend {
            margin-bottom: 20px;
        }
        
        .legend-item {
            display: flex;
            align-items: center;
            gap: 8px;
            margin-bottom: 6px;
            font-size: 0.9em;
        }
        
        .legend-color {
            width: 12px;
            height: 12px;
            border-radius: 2px;
            border: 1px solid #ddd;
        }
        
        .legend-color.attempted {
            background: var(--attempted-color, #2ecc71);
        }
        
        .legend-color.unattempted {
            background: var(--unattempted-color, #e74c3c);
        }
        
        .legend-color.review {
            background: var(--review-color, #f39c12);
        }
        
        .palette-grid {
            display: grid;
            grid-template-columns: repeat(5, 1fr);
            gap: 8px;
        }
        
        .palette-item {
            width: 40px;
            height: 40px;
            border: 2px solid #ddd;
            background: white;
            cursor: pointer;
            border-radius: 4px;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }
        
        .palette-item:hover {
            transform: scale(1.05);
        }
        
        .palette-item.current {
            border-color: var(--primary-color, #2c3e50);
            border-width: 3px;
            box-shadow: 0 0 0 2px rgba(44, 62, 80, 0.2);
        }
        
        .palette-item.attempted {
            background: var(--attempted-color, #2ecc71);
            color: white;
            border-color: var(--attempted-color, #2ecc71);
        }
        
        .palette-item.unattempted {
            background: var(--unattempted-color, #e74c3c);
            color: white;
            border-color: var(--unattempted-color, #e74c3c);
        }
        
        .palette-item.review {
            background: var(--review-color, #f39c12);
            color: white;
            border-color: var(--review-color, #f39c12);
        }
        
        .question-panel {
            flex: 1;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }
        
        .question-content {
            flex: 1;
            padding: 30px;
            overflow-y: auto;
        }
        
        .question-header {
            margin-bottom: 20px;
            padding-bottom: 15px;
            border-bottom: 2px solid #eee;
        }
        
        .question-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            font-size: 0.9em;
            color: #666;
        }
        
        .question-meta span {
            background: #f8f9fa;
            padding: 4px 8px;
            border-radius: 4px;
            border: 1px solid #e9ecef;
        }
        
        .question-number {
            background: var(--primary-color, #2c3e50) !important;
            color: white !important;
            font-weight: 600;
        }
        
        .question-text {
            font-size: 1.1em;
            line-height: 1.6;
            margin-bottom: 25px;
            color: #333;
        }
        
        .options-container {
            display: grid;
            gap: 12px;
        }
        
        .option-label {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 15px;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
            background: #fafafa;
        }
        
        .option-label:hover {
            border-color: var(--primary-color, #2c3e50);
            background: white;
        }
        
        .option-label input[type="radio"] {
            width: 18px;
            height: 18px;
            margin: 0;
        }
        
        .option-text {
            flex: 1;
            line-height: 1.5;
        }
        
        .question-controls {
            background: #f8f9fa;
            padding: 20px 30px;
            border-top: 1px solid #e9ecef;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
        }
        
        .question-controls .btn-primary,
        .question-controls .btn-secondary,
        .question-controls .btn-outline {
            padding: 12px 20px;
            border-radius: 6px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.2s;
            border: none;
            cursor: pointer;
        }
        
        .question-controls .btn-primary {
            background: var(--primary-color, #2c3e50);
            color: white;
        }
        
        .question-controls .btn-secondary {
            background: #6c757d;
            color: white;
        }
        
        .question-controls .btn-outline {
            background: transparent;
            color: var(--primary-color, #2c3e50);
            border: 2px solid var(--primary-color, #2c3e50);
        }
        
        .question-controls .btn-outline.marked {
            background: var(--review-color, #f39c12);
            color: white;
            border-color: var(--review-color, #f39c12);
        }
        
        .question-controls button:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .question-controls button:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .submit-btn {
            margin-left: auto;
        }
        
        /* Submission States */
        .submission-container,
        .submission-success {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
        }
        
        .submission-content,
        .success-content {
            text-align: center;
            background: white;
            padding: 50px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.1);
            max-width: 500px;
            width: 90%;
        }
        
        .loading-spinner.large {
            width: 60px;
            height: 60px;
            margin: 0 auto 20px;
        }
        
        .submission-title,
        .success-title {
            color: var(--primary-color, #2c3e50);
            margin-bottom: 15px;
        }
        
        .submission-text,
        .success-text {
            color: #666;
            margin-bottom: 25px;
            line-height: 1.5;
        }
        
        .success-subtext {
            color: #888;
            font-size: 0.9em;
            margin-bottom: 30px;
        }
        
        .submission-progress {
            margin-top: 20px;
        }
        
        .progress-bar {
            background: #e9ecef;
            border-radius: 10px;
            overflow: hidden;
            height: 8px;
        }
        
        .progress-fill {
            background: var(--primary-color, #2c3e50);
            height: 100%;
            width: 0%;
            animation: progressFill 2s ease-out forwards;
        }
        
        @keyframes progressFill {
            to { width: 100%; }
        }
        
        .success-icon {
            font-size: 4em;
            margin-bottom: 20px;
        }
        
        .success-actions {
            display: flex;
            gap: 15px;
            justify-content: center;
            flex-wrap: wrap;
        }
        
        /* Mobile Responsiveness */
        @media (max-width: 768px) {
            .exam-header-content {
                flex-direction: column;
                gap: 10px;
                text-align: center;
            }
            
            .exam-body {
                flex-direction: column;
                padding: 10px;
                gap: 15px;
            }
            
            .question-palette {
                width: 100%;
                order: 2;
            }
            
            .palette-grid {
                grid-template-columns: repeat(8, 1fr);
            }
            
            .palette-item {
                width: 35px;
                height: 35px;
                font-size: 0.9em;
            }
            
            .question-panel {
                order: 1;
            }
            
            .question-content {
                padding: 20px;
            }
            
            .question-controls {
                padding: 15px 20px;
                flex-direction: column;
                gap: 10px;
            }
            
            .question-controls > div {
                display: flex;
                gap: 10px;
                width: 100%;
            }
            
            .question-controls button {
                flex: 1;
                justify-content: center;
            }
            
            .modal-container {
                width: 95%;
                max-height: 95vh;
            }
            
            .modal-header,
            .modal-content,
            .modal-footer {
                padding: 15px 20px;
            }
            
            .color-legend {
                flex-direction: column;
                gap: 10px;
            }
            
            .marking-info {
                gap: 15px;
            }
            
            .submission-content,
            .success-content {
                padding: 30px 20px;
            }
        }
    `;
    
    document.head.appendChild(styles);
}

/**
 * Responsive design handler for mobile optimization
 */
function handleResponsiveDesign() {
    const isMobile = window.innerWidth <= 768;
    const appContainer = document.getElementById('app');
    
    if (isMobile) {
        appContainer.classList.add('mobile-view');
    } else {
        appContainer.classList.remove('mobile-view');
    }
}

// Event listeners and initialization
document.addEventListener('DOMContentLoaded', () => {
    initializeExamPortal();
    window.addEventListener('resize', handleResponsiveDesign);
    handleResponsiveDesign();
});

// Prevent accidental page refresh during exam
window.addEventListener('beforeunload', (e) => {
    if (isExamStarted && examTimer) {
        e.preventDefault();
        e.returnValue = 'Are you sure you want to leave? Your exam progress will be lost.';
        return e.returnValue;
    }
});

// Export functions for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeExamPortal,
        loadExamConfiguration,
        startExam,
        showInstructions,
        submitExam
    };
}
