/**
 * JENPAS UG Mock Test Portal - Main JavaScript File
 * Dynamically loads exam configuration and manages the complete exam flow
 * Author: AI Frontend Developer
 * Version: 1.0
 */

class JENPASPortal {
    constructor() {
        this.settings = null;
        this.questions = null;
        this.currentQuestion = 0;
        this.userResponses = {};
        this.startTime = null;
        this.endTime = null;
        this.timer = null;
        this.reloadCount = 0;
        this.isExamStarted = false;
        
        // Initialize the portal
        this.init();
    }

    /**
     * Initialize the portal - load settings and setup event listeners
     */
    async init() {
        try {
            await this.loadSettings();
            this.setupTheme();
            this.renderLandingPage();
            this.setupEventListeners();
        } catch (error) {
            console.error('Failed to initialize portal:', error);
            this.showError('Failed to load exam configuration. Please refresh the page.');
        }
    }

    /**
     * Load settings.json configuration
     */
    async loadSettings() {
        try {
            const response = await fetch('./config/settings.json');
            if (!response.ok) {
                throw new Error('Failed to load settings');
            }
            this.settings = await response.json();
            console.log('Settings loaded successfully:', this.settings);
        } catch (error) {
            console.error('Error loading settings:', error);
            throw error;
        }
    }

    /**
     * Load questions.json for the exam
     */
    async loadQuestions() {
        try {
            const response = await fetch('./questions.json');
            if (!response.ok) {
                throw new Error('Failed to load questions');
            }
            const data = await response.json();
            this.questions = data.questions;
            console.log('Questions loaded successfully:', this.questions.length + ' questions');
        } catch (error) {
            console.error('Error loading questions:', error);
            throw error;
        }
    }

    /**
     * Apply theme colors from settings
     */
    setupTheme() {
        const theme = this.settings.theme;
        const root = document.documentElement;
        
        root.style.setProperty('--primary-color', theme.primaryColor);
        root.style.setProperty('--attempted-color', theme.attemptedColor);
        root.style.setProperty('--unattempted-color', theme.unattemptedColor);
        root.style.setProperty('--review-color', theme.reviewColor);
    }

    /**
     * Render the landing page with exam information
     */
    renderLandingPage() {
        const container = document.getElementById('app') || document.body;
        
        container.innerHTML = `
            <div class="portal-container">
                <div class="header">
                    <div class="exam-title">
                        <h1>${this.settings.examTitle}</h1>
                        <div class="exam-date">
                            <i class="icon-calendar"></i>
                            <span>Exam Date: ${this.formatDate(this.settings.examDate)}</span>
                        </div>
                    </div>
                </div>

                <div class="content-wrapper">
                    <div class="exam-overview">
                        <h2>Exam Overview</h2>
                        <div class="overview-grid">
                            <div class="overview-card">
                                <div class="card-icon">⏱️</div>
                                <div class="card-content">
                                    <h3>Duration</h3>
                                    <p>${this.formatDuration(this.settings.examDuration)}</p>
                                </div>
                            </div>
                            <div class="overview-card">
                                <div class="card-icon">📝</div>
                                <div class="card-content">
                                    <h3>Total Questions</h3>
                                    <p>${this.settings.pattern.totalQuestions}</p>
                                </div>
                            </div>
                            <div class="overview-card">
                                <div class="card-icon">🎯</div>
                                <div class="card-content">
                                    <h3>Total Marks</h3>
                                    <p>${this.settings.pattern.totalMarks}</p>
                                </div>
                            </div>
                            <div class="overview-card">
                                <div class="card-icon">🔄</div>
                                <div class="card-content">
                                    <h3>Max Reloads</h3>
                                    <p>${this.settings.maxReloads}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="sections-breakdown">
                        <h2>Section-wise Breakdown</h2>
                        <div class="sections-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Section</th>
                                        <th>Category I</th>
                                        <th>Category II</th>
                                        <th>Total Questions</th>
                                        <th>Marks</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${this.generateSectionsTable()}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div class="marking-scheme">
                        <h2>Marking Scheme</h2>
                        <div class="scheme-grid">
                            <div class="scheme-card">
                                <h3>Category I Questions</h3>
                                <div class="scheme-details">
                                    <div class="scheme-item correct">
                                        <span>Correct Answer:</span>
                                        <strong>+${this.settings.pattern.markingScheme.categoryI.correct} mark</strong>
                                    </div>
                                    <div class="scheme-item wrong">
                                        <span>Wrong Answer:</span>
                                        <strong>${this.settings.pattern.markingScheme.categoryI.wrong} marks</strong>
                                    </div>
                                    <div class="scheme-item unanswered">
                                        <span>Unanswered:</span>
                                        <strong>${this.settings.pattern.markingScheme.categoryI.unanswered} marks</strong>
                                    </div>
                                </div>
                            </div>
                            <div class="scheme-card">
                                <h3>Category II Questions</h3>
                                <div class="scheme-details">
                                    <div class="scheme-item correct">
                                        <span>Correct Answer:</span>
                                        <strong>+${this.settings.pattern.markingScheme.categoryII.correct} marks</strong>
                                    </div>
                                    <div class="scheme-item wrong">
                                        <span>Wrong Answer:</span>
                                        <strong>${this.settings.pattern.markingScheme.categoryII.wrong} marks</strong>
                                    </div>
                                    <div class="scheme-item unanswered">
                                        <span>Unanswered:</span>
                                        <strong>${this.settings.pattern.markingScheme.categoryII.unanswered} marks</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="instructions">
                        <h2>Instructions</h2>
                        <div class="instructions-content">
                            <ul>
                                <li><strong>Time Management:</strong> You have ${this.formatDuration(this.settings.examDuration)} to complete the exam. The timer will start as soon as you click "Start Test".</li>
                                <li><strong>Navigation:</strong> You can navigate between questions using Previous/Next buttons or by clicking question numbers in the navigation panel.</li>
                                <li><strong>Answering:</strong> Click on your chosen option to select it. You can change your answer anytime before submission.</li>
                                <li><strong>Review:</strong> Mark questions for review using the "Mark for Review" button. These will be highlighted in orange.</li>
                                <li><strong>Submission:</strong> ${this.settings.autoSubmit ? 'The exam will auto-submit when time expires.' : 'Click Submit to end the exam manually.'}</li>
                                <li><strong>Reloads:</strong> Maximum ${this.settings.maxReloads} page reloads are allowed. Excessive reloads may result in disqualification.</li>
                                <li><strong>Technical Issues:</strong> In case of technical difficulties, you have ${this.settings.graceTime} seconds of grace time.</li>
                            </ul>
                        </div>
                    </div>

                    <div class="legend">
                        <h3>Question Status Legend</h3>
                        <div class="legend-items">
                            <div class="legend-item">
                                <div class="legend-color attempted"></div>
                                <span>Attempted</span>
                            </div>
                            <div class="legend-item">
                                <div class="legend-color unattempted"></div>
                                <span>Unattempted</span>
                            </div>
                            <div class="legend-item">
                                <div class="legend-color review"></div>
                                <span>Marked for Review</span>
                            </div>
                        </div>
                    </div>

                    <div class="start-section">
                        <div class="start-content">
                            <h2>Ready to Begin?</h2>
                            <p>Make sure you have a stable internet connection and are in a quiet environment.</p>
                            <button id="startExamBtn" class="start-btn">
                                <span class="btn-icon">🚀</span>
                                Start Test
                            </button>
                        </div>
                    </div>
                </div>

                <div class="footer">
                    <p>&copy; 2025 JENPAS UG Mock Test Portal. All rights reserved.</p>
                </div>
            </div>
        `;
    }

    /**
     * Generate sections table HTML
     */
    generateSectionsTable() {
        return this.settings.pattern.sections.map(section => `
            <tr>
                <td class="section-name">${section.name}</td>
                <td class="category-count">${section.categoryI}</td>
                <td class="category-count">${section.categoryII}</td>
                <td class="total-questions">${section.categoryI + section.categoryII}</td>
                <td class="section-marks">${section.marks}</td>
            </tr>
        `).join('');
    }

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        // Start exam button
        document.getElementById('startExamBtn').addEventListener('click', () => {
            this.startExam();
        });

        // Page reload/visibility tracking
        window.addEventListener('beforeunload', () => {
            if (this.isExamStarted) {
                this.reloadCount++;
                localStorage.setItem('examReloadCount', this.reloadCount);
            }
        });

        // Check for excessive reloads
        const savedReloadCount = localStorage.getItem('examReloadCount');
        if (savedReloadCount) {
            this.reloadCount = parseInt(savedReloadCount);
            if (this.reloadCount > this.settings.maxReloads) {
                this.showError('Maximum reload limit exceeded. Exam access denied.');
                return;
            }
        }

        // Prevent right-click and common shortcuts
        document.addEventListener('contextmenu', e => e.preventDefault());
        document.addEventListener('keydown', e => {
            if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I')) {
                e.preventDefault();
            }
        });
    }

    /**
     * Start the exam
     */
    async startExam() {
        try {
            this.showLoading('Loading exam questions...');
            
            await this.loadQuestions();
            
            if (!this.questions || this.questions.length === 0) {
                throw new Error('No questions available');
            }

            this.isExamStarted = true;
            this.startTime = new Date().toISOString();
            this.initializeUserResponses();
            this.renderExamInterface();
            this.startTimer();
            
            this.hideLoading();
        } catch (error) {
            console.error('Failed to start exam:', error);
            this.showError('Failed to load exam questions. Please try again.');
            this.hideLoading();
        }
    }

    /**
     * Initialize user responses tracking
     */
    initializeUserResponses() {
        this.userResponses = {
            userId: 'anonymous',
            startTime: this.startTime,
            endTime: null,
            responses: this.questions.map(q => ({
                questionId: q.id,
                selected: null,
                status: 'unattempted',
                markedForReview: false
            })),
            totalPoints: 0,
            correctPoints: 0,
            reloadCount: this.reloadCount
        };
    }

    /**
     * Render exam interface
     */
    renderExamInterface() {
        const container = document.getElementById('app') || document.body;
        
        container.innerHTML = `
            <div class="exam-interface">
                <div class="exam-header">
                    <div class="exam-info">
                        <h2>${this.settings.examTitle}</h2>
                        <div class="question-counter">
                            Question <span id="currentQuestionNum">1</span> of ${this.questions.length}
                        </div>
                    </div>
                    <div class="timer-section">
                        <div class="timer" id="examTimer">
                            <span class="timer-icon">⏰</span>
                            <span id="timerDisplay">02:00:00</span>
                        </div>
                    </div>
                </div>

                <div class="exam-content">
                    <div class="question-panel">
                        <div class="question-navigation">
                            <h3>Questions</h3>
                            <div class="question-grid" id="questionGrid">
                                ${this.generateQuestionGrid()}
                            </div>
                            <div class="navigation-legend">
                                <div class="nav-legend-item">
                                    <div class="nav-color attempted"></div>
                                    <span>Attempted</span>
                                </div>
                                <div class="nav-legend-item">
                                    <div class="nav-color unattempted"></div>
                                    <span>Unattempted</span>
                                </div>
                                <div class="nav-legend-item">
                                    <div class="nav-color review"></div>
                                    <span>For Review</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="question-content">
                        <div class="question-display" id="questionDisplay">
                            ${this.renderQuestion(0)}
                        </div>

                        <div class="question-controls">
                            <button id="prevBtn" class="control-btn secondary" disabled>
                                ← Previous
                            </button>
                            <button id="markReviewBtn" class="control-btn warning">
                                Mark for Review
                            </button>
                            <button id="clearBtn" class="control-btn neutral">
                                Clear Response
                            </button>
                            <button id="nextBtn" class="control-btn primary">
                                Next →
                            </button>
                        </div>

                        <div class="submit-section">
                            <button id="submitExamBtn" class="submit-btn">
                                Submit Exam
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        this.setupExamEventListeners();
    }

    /**
     * Generate question grid for navigation
     */
    generateQuestionGrid() {
        return this.questions.map((_, index) => `
            <button class="question-nav-btn unattempted" data-question="${index}">
                ${index + 1}
            </button>
        `).join('');
    }

    /**
     * Render individual question
     */
    renderQuestion(index) {
        const question = this.questions[index];
        const userResponse = this.userResponses.responses[index];
        
        return `
            <div class="question-container">
                <div class="question-header">
                    <div class="question-meta">
                        <span class="section-tag">${question.section}</span>
                        <span class="category-tag category-${question.category.toLowerCase()}">
                            Category ${question.category}
                        </span>
                        <span class="marks-info">
                            ${question.marks} mark${question.marks > 1 ? 's' : ''}
                            ${question.negativeMarks !== 0 ? `(${question.negativeMarks} for wrong)` : '(No negative)'}
                        </span>
                    </div>
                </div>
                
                <div class="question-text">
                    <p>${question.questionText}</p>
                </div>

                <div class="options-container">
                    ${question.options.map((option, optIndex) => `
                        <div class="option-item">
                            <input type="radio" 
                                   id="option_${index}_${optIndex}" 
                                   name="question_${index}" 
                                   value="${optIndex}"
                                   ${userResponse.selected === optIndex ? 'checked' : ''}>
                            <label for="option_${index}_${optIndex}" class="option-label">
                                <span class="option-marker">${String.fromCharCode(65 + optIndex)}</span>
                                <span class="option-text">${option}</span>
                            </label>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Setup exam interface event listeners
     */
    setupExamEventListeners() {
        // Navigation buttons
        document.getElementById('prevBtn').addEventListener('click', () => this.navigateQuestion(-1));
        document.getElementById('nextBtn').addEventListener('click', () => this.navigateQuestion(1));
        
        // Control buttons
        document.getElementById('markReviewBtn').addEventListener('click', () => this.toggleMarkForReview());
        document.getElementById('clearBtn').addEventListener('click', () => this.clearResponse());
        document.getElementById('submitExamBtn').addEventListener('click', () => this.submitExam());

        // Question grid navigation
        document.querySelectorAll('.question-nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const questionIndex = parseInt(e.target.dataset.question);
                this.navigateToQuestion(questionIndex);
            });
        });

        // Option selection
        this.setupOptionListeners();
    }

    /**
     * Setup option selection listeners
     */
    setupOptionListeners() {
        const questionIndex = this.currentQuestion;
        const options = document.querySelectorAll(`input[name="question_${questionIndex}"]`);
        
        options.forEach(option => {
            option.addEventListener('change', (e) => {
                const selectedValue = parseInt(e.target.value);
                this.recordResponse(questionIndex, selectedValue);
                this.updateQuestionStatus(questionIndex, 'attempted');
            });
        });
    }

    /**
     * Record user response
     */
    recordResponse(questionIndex, selectedValue) {
        this.userResponses.responses[questionIndex].selected = selectedValue;
        this.userResponses.responses[questionIndex].status = 'attempted';
    }

    /**
     * Update question status in navigation
     */
    updateQuestionStatus(questionIndex, status) {
        const navBtn = document.querySelector(`[data-question="${questionIndex}"]`);
        if (navBtn) {
            navBtn.className = `question-nav-btn ${status}`;
            if (this.userResponses.responses[questionIndex].markedForReview) {
                navBtn.classList.add('review');
            }
        }
    }

    /**
     * Navigate between questions
     */
    navigateQuestion(direction) {
        const newIndex = this.currentQuestion + direction;
        if (newIndex >= 0 && newIndex < this.questions.length) {
            this.navigateToQuestion(newIndex);
        }
    }

    /**
     * Navigate to specific question
     */
    navigateToQuestion(index) {
        this.currentQuestion = index;
        
        // Update question display
        document.getElementById('questionDisplay').innerHTML = this.renderQuestion(index);
        document.getElementById('currentQuestionNum').textContent = index + 1;
        
        // Update navigation buttons
        document.getElementById('prevBtn').disabled = index === 0;
        document.getElementById('nextBtn').disabled = index === this.questions.length - 1;
        
        // Update mark for review button
        const markBtn = document.getElementById('markReviewBtn');
        if (this.userResponses.responses[index].markedForReview) {
            markBtn.textContent = 'Unmark Review';
            markBtn.classList.add('marked');
        } else {
            markBtn.textContent = 'Mark for Review';
            markBtn.classList.remove('marked');
        }
        
        // Highlight current question in navigation
        document.querySelectorAll('.question-nav-btn').forEach(btn => {
            btn.classList.remove('current');
        });
        document.querySelector(`[data-question="${index}"]`).classList.add('current');
        
        // Setup option listeners for new question
        this.setupOptionListeners();
    }

    /**
     * Toggle mark for review
     */
    toggleMarkForReview() {
        const currentResponse = this.userResponses.responses[this.currentQuestion];
        currentResponse.markedForReview = !currentResponse.markedForReview;
        
        this.updateQuestionStatus(this.currentQuestion, currentResponse.status);
        
        // Update button
        const markBtn = document.getElementById('markReviewBtn');
        if (currentResponse.markedForReview) {
            markBtn.textContent = 'Unmark Review';
            markBtn.classList.add('marked');
        } else {
            markBtn.textContent = 'Mark for Review';
            markBtn.classList.remove('marked');
        }
    }

    /**
     * Clear current response
     */
    clearResponse() {
        const questionIndex = this.currentQuestion;
        
        // Clear from data
        this.userResponses.responses[questionIndex].selected = null;
        this.userResponses.responses[questionIndex].status = 'unattempted';
        
        // Clear from UI
        const options = document.querySelectorAll(`input[name="question_${questionIndex}"]`);
        options.forEach(option => option.checked = false);
        
        // Update navigation status
        this.updateQuestionStatus(questionIndex, 'unattempted');
    }

    /**
     * Start exam timer
     */
    startTimer() {
        let timeLeft = this.settings.examDuration + this.settings.graceTime;
        
        this.timer = setInterval(() => {
            timeLeft--;
            this.updateTimerDisplay(timeLeft);
            
            if (timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }

    /**
     * Update timer display
     */
    updateTimerDisplay(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        const display = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        document.getElementById('timerDisplay').textContent = display;
        
        // Change color when time is running out
        const timerElement = document.getElementById('examTimer');
        if (seconds <= 300) { // Last 5 minutes
            timerElement.classList.add('urgent');
        } else if (seconds <= 600) { // Last 10 minutes
            timerElement.classList.add('warning');
        }
    }

    /**
     * Handle time up
     */
    timeUp() {
        if (this.settings.autoSubmit) {
            this.showAlert('Time is up! Exam will be submitted automatically.', () => {
                this.submitExam();
            });
        } else {
            this.showAlert('Time is up! Please submit your exam.');
        }
        
        if (this.timer) {
            clearInterval(this.timer);
        }
    }

    /**
     * Submit exam
     */
    submitExam() {
        this.showConfirmation('Are you sure you want to submit the exam? This action cannot be undone.', () => {
            this.endTime = new Date().toISOString();
            this.userResponses.endTime = this.endTime;
            
            this.calculateResults();
            this.showSubmissionDialog();
            
            if (this.timer) {
                clearInterval(this.timer);
            }
        });
    }

    /**
     * Calculate results
     */
    calculateResults() {
        let totalPoints = 0;
        let correctPoints = 0;
        
        this.userResponses.responses.forEach((response, index) => {
            const question = this.questions[index];
            
            if (response.selected !== null) {
                if (response.selected === question.correctOption) {
                    // Correct answer
                    const points = question.marks;
                    totalPoints += points;
                    correctPoints += points;
                } else {
                    // Wrong answer
                    totalPoints += question.negativeMarks;
                }
            }
            // Unanswered questions get 0 points (already initialized)
        });
        
        this.userResponses.totalPoints = totalPoints;
        this.userResponses.correctPoints = correctPoints;
    }

    /**
     * Show submission dialog
     */
    showSubmissionDialog() {
        const container = document.getElementById('app') || document.body;
        
        container.innerHTML = `
            <div class="submission-container">
                <div class="submission-content">
                    <div class="submission-header">
                        <div class="success-icon">✅</div>
                        <h2>Exam Completed Successfully!</h2>
                        <p>Your responses have been recorded.</p>
                    </div>
                    
                    <div class="submission-summary">
                        <h3>Submission Summary</h3>
                        <div class="summary-grid">
                            <div class="summary-item">
                                <span class="summary-label">Started:</span>
                                <span class="summary-value">${this.formatDateTime(this.startTime)}</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-label">Completed:</span>
                                <span class="summary-value">${this.formatDateTime(this.endTime)}</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-label">Questions Attempted:</span>
                                <span class="summary-value">${this.getAttemptedCount()} / ${this.questions.length}</span>
                            </div>
                            <div class="summary-item">
                                <span class="summary-label">Marked for Review:</span>
                                <span class="summary-value">${this.getReviewCount()}</span>
                            </div>
                        </div>
                    </div>

                    ${this.settings.showResultsImmediately ? this.renderResults() : ''}

                    <div class="submission-actions">
                        <button id="emailResultsBtn" class="action-btn primary">
                            📧 Send Results via Email
                        </button>
                        <button id="downloadResultsBtn" class="action-btn secondary">
                            💾 Download Results
                        </button>
                    </div>

                    <div class="submission-status" id="submissionStatus" style="display: none;">
                        <div class="loading-spinner"></div>
                        <p>Submitting results...</p>
                    </div>
                </div>
            </div>
        `;

        this.setupSubmissionListeners();
    }

    /**
     * Setup submission dialog listeners
     */
    setupSubmissionListeners() {
        document.getElementById('emailResultsBtn').addEventListener('click', () => {
            this.emailResults();
        });

        document.getElementById('downloadResultsBtn').addEventListener('click', () => {
            this.downloadResults();
        });
    }

    /**
     * Email results
     */
    emailResults() {
        const statusDiv = document.getElementById('submissionStatus');
        statusDiv.style.display = 'block';

        // Simulate email sending (replace with actual EmailJS implementation)
        setTimeout(() => {
            statusDiv.innerHTML = `
                <div class="success-message">
                    <div class="success-icon">✅</div>
                    <p>Results sent successfully to ${this.settings.submission.recipientEmail}</p>
                </div>
            `;
        }, 3000);
    }

    /**
     * Download results as JSON
     */
    downloadResults() {
        const dataStr = JSON.stringify(this.userResponses, null, 2);
        const dataBlob = new Blob([dataStr], {type: 'application/json'});
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `jenpas-results-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        URL.revokeObjectURL(url);
    }

    /**
     * Render results if enabled
     */
    renderResults() {
        const attempted = this.getAttemptedCount();
        const unattempted = this.questions.length - attempted;
        const percentage = ((this.userResponses.correctPoints / this.settings.pattern.totalMarks) * 100).toFixed(2);

        return `
            <div class="results-section">
                <h3>Your Performance</h3>
                <div class="results-grid">
                    <div class="result-card">
                        <div class="result-value">${this.userResponses.totalPoints}</div>
                        <div class="result-label">Total Score</div>
                    </div>
                    <div class="result-card">
                        <div class="result-value">${percentage}%</div>
                        <div class="result-label">Percentage</div>
                    </div>
                    <div class="result-card">
                        <div class="result-value">${attempted}</div>
                        <div class="result-label">Attempted</div>
                    </div>
                    <div class="result-card">
                        <div class="result-value">${unattempted}</div>
                        <div class="result-label">Unattempted</div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Get count of attempted questions
     */
    getAttemptedCount() {
        return this.userResponses.responses.filter(r => r.status === 'attempted').length;
    }

    /**
     * Get count of questions marked for review
     */
    getReviewCount() {
        return this.userResponses.responses.filter(r => r.markedForReview).length;
    }

    /**
     * Utility function to format date
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    /**
     * Utility function to format date and time
     */
    formatDateTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    }

    /**
     * Utility function to format duration
     */
    formatDuration(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        
        if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
        }
        return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
    }

    /**
     * Show loading spinner
     */
    showLoading(message = 'Loading...') {
        const loadingHtml = `
            <div class="loading-overlay">
                <div class="loading-content">
                    <div class="loading-spinner"></div>
                    <p>${message}</p>
                </div>
            </div>
        `;
        
        const existingLoading = document.querySelector('.loading-overlay');
        if (!existingLoading) {
            document.body.insertAdjacentHTML('beforeend', loadingHtml);
        }
    }

    /**
     * Hide loading spinner
     */
    hideLoading() {
        const loading = document.querySelector('.loading-overlay');
        if (loading) {
            loading.remove();
        }
    }

    /**
     * Show error message
     */
    showError(message) {
        const errorHtml = `
            <div class="error-overlay">
                <div class="error-content">
                    <div class="error-icon">❌</div>
                    <h2>Error</h2>
                    <p>${message}</p>
                    <button onclick="location.reload()" class="error-btn">Reload Page</button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', errorHtml);
    }

    /**
     * Show alert message
     */
    showAlert(message, callback = null) {
        const alertHtml = `
            <div class="alert-overlay">
                <div class="alert-content">
                    <div class="alert-icon">⚠️</div>
                    <p>${message}</p>
                    <button id="alertOkBtn" class="alert-btn">OK</button>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', alertHtml);
        
        document.getElementById('alertOkBtn').addEventListener('click', () => {
            document.querySelector('.alert-overlay').remove();
            if (callback) callback();
        });
    }

    /**
     * Show confirmation dialog
     */
    showConfirmation(message, onConfirm) {
        const confirmHtml = `
            <div class="confirm-overlay">
                <div class="confirm-content">
                    <div class="confirm-icon">❓</div>
                    <p>${message}</p>
                    <div class="confirm-buttons">
                        <button id="confirmCancelBtn" class="confirm-btn cancel">Cancel</button>
                        <button id="confirmOkBtn" class="confirm-btn confirm">Confirm</button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', confirmHtml);
        
        document.getElementById('confirmCancelBtn').addEventListener('click', () => {
            document.querySelector('.confirm-overlay').remove();
        });
        
        document.getElementById('confirmOkBtn').addEventListener('click', () => {
            document.querySelector('.confirm-overlay').remove();
            onConfirm();
        });
    }
}

/**
 * Initialize the portal when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    new JENPASPortal();
});

/**
 * CSS Styles - Add these to your style.css file
 */
const cssStyles = `
/* CSS Variables for theme colors */
:root {
    --primary-color: #2c3e50;
    --attempted-color: #2ecc71;
    --unattempted-color: #e74c3c;
    --review-color: #f39c12;
    --background-color: #f8f9fa;
    --text-color: #2c3e50;
    --border-color: #dee2e6;
    --card-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

/* Base Styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
    color: var(--text-color);
    background-color: var(--background-color);
    overflow-x: hidden;
}

/* Portal Container */
.portal-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* Header */
.header {
    background: linear-gradient(135deg, var(--primary-color), #34495e);
    color: white;
    padding: 2rem 0;
    text-align: center;
    box-shadow: var(--card-shadow);
}

.exam-title h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    letter-spacing: -0.5px;
}

.exam-date {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    font-size: 1.1rem;
    opacity: 0.9;
}

/* Content Wrapper */
.content-wrapper {
    flex: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    width: 100%;
}

/* Section Headings */
h2 {
    color: var(--primary-color);
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    font-weight: 600;
    border-bottom: 3px solid var(--primary-color);
    padding-bottom: 0.5rem;
}

/* Overview Grid */
.overview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
    margin-bottom: 3rem;
}

.overview-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: var(--card-shadow);
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.overview-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 20px rgba(0,0,0,0.15);
}

.card-icon {
    font-size: 2.5rem;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--primary-color);
    color: white;
    border-radius: 50%;
    flex-shrink: 0;
}

.card-content h3 {
    font-size: 1.1rem;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.card-content p {
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--text-color);
}

/* Sections Table */
.sections-table {
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: var(--card-shadow);
    margin-bottom: 3rem;
}

table {
    width: 100%;
    border-collapse: collapse;
}

thead {
    background: var(--primary-color);
    color: white;
}

thead th {
    padding: 1rem;
    text-align: left;
    font-weight: 600;
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

tbody tr {
    border-bottom: 1px solid var(--border-color);
    transition: background-color 0.3s ease;
}

tbody tr:hover {
    background-color: #f8f9fa;
}

tbody td {
    padding: 1rem;
    font-weight: 500;
}

.section-name {
    font-weight: 600;
    color: var(--primary-color);
}

.category-count, .total-questions, .section-marks {
    text-align: center;
    font-weight: 600;
}

/* Marking Scheme */
.scheme-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 3rem;
}

.scheme-card {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: var(--card-shadow);
}

.scheme-card h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
    font-size: 1.2rem;
}

.scheme-details {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
}

.scheme-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem;
    border-radius: 8px;
    font-weight: 500;
}

.scheme-item.correct {
    background-color: rgba(46, 204, 113, 0.1);
    border-left: 4px solid var(--attempted-color);
}

.scheme-item.wrong {
    background-color: rgba(231, 76, 60, 0.1);
    border-left: 4px solid var(--unattempted-color);
}

.scheme-item.unanswered {
    background-color: rgba(149, 165, 166, 0.1);
    border-left: 4px solid #95a5a6;
}

/* Instructions */
.instructions {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: var(--card-shadow);
    margin-bottom: 2rem;
}

.instructions-content ul {
    list-style: none;
    padding: 0;
}

.instructions-content li {
    margin-bottom: 1rem;
    padding: 1rem;
    background-color: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid var(--primary-color);
    line-height: 1.6;
}

.instructions-content li strong {
    color: var(--primary-color);
}

/* Legend */
.legend {
    background: white;
    border-radius: 12px;
    padding: 1.5rem;
    box-shadow: var(--card-shadow);
    margin-bottom: 2rem;
}

.legend h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
    font-size: 1.1rem;
}

.legend-items {
    display: flex;
    gap: 2rem;
    flex-wrap: wrap;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
}

.legend-color {
    width: 20px;
    height: 20px;
    border-radius: 4px;
}

.legend-color.attempted {
    background-color: var(--attempted-color);
}

.legend-color.unattempted {
    background-color: var(--unattempted-color);
}

.legend-color.review {
    background-color: var(--review-color);
}

/* Start Section */
.start-section {
    text-align: center;
    padding: 3rem 0;
}

.start-content {
    background: white;
    border-radius: 12px;
    padding: 3rem;
    box-shadow: var(--card-shadow);
    max-width: 500px;
    margin: 0 auto;
}

.start-content h2 {
    color: var(--primary-color);
    margin-bottom: 1rem;
    border: none;
    padding: 0;
}

.start-content p {
    margin-bottom: 2rem;
    color: #666;
    font-size: 1.1rem;
}

.start-btn {
    background: linear-gradient(135deg, var(--primary-color), #34495e);
    color: white;
    border: none;
    padding: 1rem 3rem;
    font-size: 1.2rem;
    font-weight: 600;
    border-radius: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 0 auto;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.start-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(44, 62, 80, 0.3);
}

.btn-icon {
    font-size: 1.3rem;
}

/* Footer */
.footer {
    background: var(--primary-color);
    color: white;
    text-align: center;
    padding: 1.5rem;
    margin-top: auto;
}

/* Exam Interface Styles */
.exam-interface {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

.exam-header {
    background: var(--primary-color);
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: var(--card-shadow);
}

.exam-info h2 {
    color: white;
    margin: 0;
    font-size: 1.5rem;
    border: none;
    padding: 0;
}

.question-counter {
    font-size: 1rem;
    opacity: 0.9;
    margin-top: 0.25rem;
}

.timer-section .timer {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255,255,255,0.1);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 1.1rem;
    font-weight: 600;
}

.timer.warning {
    background: rgba(243, 156, 18, 0.2);
    animation: pulse 2s infinite;
}

.timer.urgent {
    background: rgba(231, 76, 60, 0.2);
    animation: pulse 1s infinite;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
}

.exam-content {
    flex: 1;
    display: flex;
    min-height: calc(100vh - 80px);
}

.question-panel {
    width: 300px;
    background: white;
    border-right: 1px solid var(--border-color);
    padding: 1rem;
    overflow-y: auto;
}

.question-navigation h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
    font-size: 1.1rem;
}

.question-grid {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0.5rem;
    margin-bottom: 2rem;
}

.question-nav-btn {
    width: 40px;
    height: 40px;
    border: 2px solid var(--border-color);
    background: white;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}

.question-nav-btn:hover {
    transform: scale(1.05);
}

.question-nav-btn.attempted {
    background-color: var(--attempted-color);
    border-color: var(--attempted-color);
    color: white;
}

.question-nav-btn.unattempted {
    background-color: var(--unattempted-color);
    border-color: var(--unattempted-color);
    color: white;
}

.question-nav-btn.review {
    background-color: var(--review-color);
    border-color: var(--review-color);
    color: white;
}

.question-nav-btn.current {
    transform: scale(1.1);
    box-shadow: 0 0 10px rgba(44, 62, 80, 0.3);
}

.navigation-legend {
    border-top: 1px solid var(--border-color);
    padding-top: 1rem;
}

.nav-legend-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
}

.nav-color {
    width: 16px;
    height: 16px;
    border-radius: 3px;
}

.nav-color.attempted {
    background-color: var(--attempted-color);
}

.nav-color.unattempted {
    background-color: var(--unattempted-color);
}

.nav-color.review {
    background-color: var(--review-color);
}

.question-content {
    flex: 1;
    padding: 2rem;
    overflow-y: auto;
    background-color: var(--background-color);
}

.question-container {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: var(--card-shadow);
    margin-bottom: 2rem;
}

.question-header {
    margin-bottom: 1.5rem;
}

.question-meta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;
}

.section-tag, .category-tag, .marks-info {
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.section-tag {
    background: var(--primary-color);
    color: white;
}

.category-tag {
    background: var(--review-color);
    color: white;
}

.category-tag.category-i {
    background: #3498db;
}

.category-tag.category-ii {
    background: #9b59b6;
}

.marks-info {
    background: #ecf0f1;
    color: var(--text-color);
}

.question-text {
    margin-bottom: 2rem;
}

.question-text p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--text-color);
}

.options-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.option-item {
    position: relative;
}

.option-item input[type="radio"] {
    position: absolute;
    opacity: 0;
    cursor: pointer;
}

.option-label {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border: 2px solid var(--border-color);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1rem;
    line-height: 1.6;
}

.option-label:hover {
    border-color: var(--primary-color);
    background-color: rgba(44, 62, 80, 0.05);
}

.option-item input[type="radio"]:checked + .option-label {
    border-color: var(--primary-color);
    background-color: rgba(44, 62, 80, 0.1);
}

.option-marker {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: var(--primary-color);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    flex-shrink: 0;
}

.option-text {
    flex: 1;
}

.question-controls {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin: 2rem 0;
    flex-wrap: wrap;
}

.control-btn {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 0.9rem;
}

.control-btn.primary {
    background: var(--primary-color);
    color: white;
}

.control-btn.secondary {
    background: #6c757d;
    color: white;
}

.control-btn.warning {
    background: var(--review-color);
    color: white;
}

.control-btn.neutral {
    background: #95a5a6;
    color: white;
}

.control-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.control-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
}

.control-btn.marked {
    background: var(--attempted-color);
}

.submit-section {
    text-align: center;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border-color);
}

.submit-btn {
    background: linear-gradient(135deg, #e74c3c, #c0392b);
    color: white;
    border: none;
    padding: 1rem 3rem;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.submit-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 6px 20px rgba(231, 76, 60, 0.3);
}

/* Submission Styles */
.submission-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--background-color);
    padding: 2rem;
}

.submission-content {
    background: white;
    border-radius: 12px;
    padding: 3rem;
    box-shadow: var(--card-shadow);
    max-width: 800px;
    width: 100%;
    text-align: center;
}

.submission-header {
    margin-bottom: 2rem;
}

.success-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
}

.submission-header h2 {
    color: var(--attempted-color);
    margin-bottom: 0.5rem;
    border: none;
    padding: 0;
}

.submission-summary {
    background: var(--background-color);
    border-radius: 8px;
    padding: 1.5rem;
    margin: 2rem 0;
    text-align: left;
}

.submission-summary h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
    text-align: center;
}

.summary-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.summary-item {
    display: flex;
    justify-content: space-between;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border-color);
}

.summary-label {
    font-weight: 600;
    color: var(--text-color);
}

.summary-value {
    font-weight: 700;
    color: var(--primary-color);
}

.results-section {
    margin: 2rem 0;
    padding: 1.5rem;
    background: var(--background-color);
    border-radius: 8px;
}

.results-section h3 {
    color: var(--primary-color);
    margin-bottom: 1rem;
}

.results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
}

.result-card {
    background: white;
    border-radius: 8px;
    padding: 1rem;
    text-align: center;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.result-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--primary-color);
    margin-bottom: 0.5rem;
}

.result-label {
    font-size: 0.9rem;
    color: #666;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.submission-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin: 2rem 0;
    flex-wrap: wrap;
}

.action-btn {
    padding: 1rem 2rem;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.action-btn.primary {
    background: var(--primary-color);
    color: white;
}

.action-btn.secondary {
    background: #6c757d;
    color: white;
}

.action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.submission-status {
    background: var(--background-color);
    border-radius: 8px;
    padding: 2rem;
    margin: 1rem 0;
}

/* Overlay Styles */
.loading-overlay, .error-overlay, .alert-overlay, .confirm-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
}

.loading-content, .error-content, .alert-content, .confirm-content {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    text-align: center;
    max-width: 400px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

.loading-spinner {
    width: 40px;
    height: 40px;
    border: 4px solid var(--border-color);
    border-top: 4px solid var(--primary-color);
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 1rem;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.error-icon, .alert-icon, .confirm-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.error-btn, .alert-btn {
    background: var(--primary-color);
    color: white;
    border: none;
    padding: 0.8rem 2rem;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    margin-top: 1rem;
}

.confirm-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 1.5rem;
}

.confirm-btn {
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
}

.confirm-btn.cancel {
    background: #6c757d;
    color: white;
}

.confirm-btn.confirm {
    background: var(--primary-color);
    color: white;
}

.confirm-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.success-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background: rgba(46, 204, 113, 0.1);
    border-radius: 8px;
    color: var(--attempted-color);
    font-weight: 600;
}

/* Responsive Design */
@media (max-width: 768px) {
    .content-wrapper {
        padding: 1rem;
    }
    
    .overview-grid {
        grid-template-columns: 1fr;
    }
    
    .scheme-grid {
        grid-template-columns: 1fr;
    }
    
    .exam-content {
        flex-direction: column;
    }
    
    .question-panel {
        width: 100%;
        max-height: 200px;
        border-right: none;
        border-bottom: 1px solid var(--border-color);
    }
    
    .question-grid {
        grid-template-columns: repeat(10, 1fr);
    }
    
    .question-nav-btn {
        width: 35px;
        height: 35px;
        font-size: 0.8rem;
    }
    
    .exam-header {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
    }
    
    .question-controls {
        flex-direction: column;
        align-items: center;
    }
    
    .control-btn {
        min-width: 200px;
    }
    
    .submission-actions {
        flex-direction: column;
        align-items: center;
    }
    
    .action-btn {
        min-width: 250px;
        justify-content: center;
    }
    
    .header .exam-title h1 {
        font-size: 1.8rem;
    }
    
    .start-content {
        padding: 2rem 1rem;
    }
    
    .sections-table {
        overflow-x: auto;
    }
    
    table {
        min-width: 600px;
    }
    
    .legend-items {
        flex-direction: column;
        gap: 1rem;
    }
    
    .summary-grid {
        grid-template-columns: 1fr;
    }
    
    .results-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    .question-grid {
        grid-template-columns: repeat(8, 1fr);
    }
    
    .option-label {
        flex-direction: column;
        text-align: center;
        gap: 0.5rem;
        padding: 0.8rem;
    }
    
    .option-marker {
        align-self: center;
    }
    
    .results-grid {
        grid-template-columns: 1fr;
    }
    
    .exam-header .exam-info h2 {
        font-size: 1.2rem;
    }
    
    .question-counter {
        font-size: 0.9rem;
    }
    
    .timer {
        font-size: 1rem !important;
    }
}

/* Print Styles */
@media print {
    .question-panel,
    .question-controls,
    .submit-section,
    .exam-header .timer-section {
        display: none;
    }
    
    .exam-content {
        flex-direction: column;
    }
    
    .question-content {
        width: 100%;
        padding: 1rem;
    }
    
    body {
        font-size: 12pt;
        line-height: 1.4;
    }
    
    .question-container {
        page-break-inside: avoid;
        margin-bottom: 2rem;
        box-shadow: none;
        border: 1px solid #000;
    }
}

/* High Contrast Mode */
@media (prefers-contrast: high) {
    :root {
        --primary-color: #000;
        --attempted-color: #008000;
        --unattempted-color: #FF0000;
        --review-color: #FFA500;
        --background-color: #FFFFFF;
        --text-color: #000000;
        --border-color: #000000;
    }
    
    .overview-card,
    .scheme-card,
    .question-container {
        border: 2px solid #000;
    }
    
    .option-label {
        border-width: 2px;
    }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    .loading-spinner {
        animation: none;
        border: 4px solid var(--primary-color);
    }
}

/* Focus Styles for Accessibility */
button:focus,
input:focus,
.question-nav-btn:focus,
.option-label:focus {
    outline: 3px solid var(--primary-color);
    outline-offset: 2px;
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
    :root {
        --background-color: #1a1a1a;
        --text-color: #ffffff;
        --border-color: #404040;
    }
    
    body {
        background-color: var(--background-color);
        color: var(--text-color);
    }
    
    .overview-card,
    .scheme-card,
    .question-container,
    .instructions,
    .legend,
    .start-content,
    .sections-table,
    .submission-content,
    .loading-content,
    .error-content,
    .alert-content,
    .confirm-content {
        background-color: #2d2d2d;
        color: var(--text-color);
    }
    
    .question-panel {
        background-color: #2d2d2d;
        border-color: var(--border-color);
    }
    
    .option-label {
        background-color: #2d2d2d;
        border-color: var(--border-color);
    }
    
    .option-label:hover {
        background-color: rgba(44, 62, 80, 0.2);
    }
    
    tbody tr:hover {
        background-color: rgba(255,255,255,0.05);
    }
    
    .scheme-item.correct {
        background-color: rgba(46, 204, 113, 0.2);
    }
    
    .scheme-item.wrong {
        background-color: rgba(231, 76, 60, 0.2);
    }
    
    .scheme-item.unanswered {
        background-color: rgba(149, 165, 166, 0.2);
    }
}
`;

// Add the CSS to the document head if it doesn't exist
if (!document.getElementById('jenpas-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'jenpas-styles';
    styleElement.textContent = cssStyles;
    document.head.appendChild(styleElement);
}
